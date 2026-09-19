#!/usr/bin/env bash
# One-command first-time deploy. Checks prerequisites, creates the SSH key pair and
# infra/terraform.tfvars if they're missing, then runs Terraform (which asks for
# confirmation before creating anything). Safe to re-run.
#
#   git push && scripts/setup.sh
#
# Overrides: AWS_REGION (default us-east-1), KEY_NAME (default shahmeer-portfolio-key).
set -euo pipefail

cd "$(dirname "$0")/.."
REGION="${AWS_REGION:-us-east-1}"
KEY_NAME="${KEY_NAME:-shahmeer-portfolio-key}"
KEY_FILE="$HOME/.ssh/$KEY_NAME.pem"

for tool in aws terraform git curl; do
  command -v "$tool" > /dev/null || { echo "Missing '$tool' — install it and re-run." >&2; exit 1; }
done

# The instance clones the repo from GitHub on first boot, so what's pushed is what gets deployed.
git fetch --quiet origin
if [ "$(git rev-parse HEAD)" != "$(git rev-parse '@{u}')" ]; then
  echo "Local HEAD doesn't match origin — the server would build different code than you have here." >&2
  echo "Run 'git push' (or 'git pull') and re-run." >&2
  exit 1
fi
if [ -n "$(git status --porcelain)" ]; then
  echo "Note: you have uncommitted changes; the server will only get what's pushed." >&2
fi

aws sts get-caller-identity --region "$REGION" > /dev/null \
  || { echo "AWS credentials aren't working (run 'aws configure' or set AWS_PROFILE)." >&2; exit 1; }

# SSH key pair
if ! aws ec2 describe-key-pairs --region "$REGION" --key-names "$KEY_NAME" > /dev/null 2>&1; then
  echo "Creating EC2 key pair '$KEY_NAME' -> $KEY_FILE"
  mkdir -p "$HOME/.ssh"
  rm -f "$KEY_FILE"
  aws ec2 create-key-pair --region "$REGION" --key-name "$KEY_NAME" \
    --query KeyMaterial --output text > "$KEY_FILE"
  chmod 400 "$KEY_FILE"
elif [ ! -f "$KEY_FILE" ]; then
  echo "Key pair '$KEY_NAME' exists in AWS but $KEY_FILE is missing." >&2
  echo "Put the .pem there, or set KEY_NAME to a different name." >&2
  exit 1
fi

# terraform.tfvars (gitignored). SSH is limited to this machine's current public IP.
TFVARS=infra/terraform.tfvars
if [ ! -f "$TFVARS" ]; then
  MY_IP="$(curl -fsS https://checkip.amazonaws.com | tr -d '[:space:]')"
  cat > "$TFVARS" <<TFVARS_EOF
aws_region       = "$REGION"
key_name         = "$KEY_NAME"
ssh_ingress_cidr = "$MY_IP/32"
TFVARS_EOF
  echo "Wrote $TFVARS (SSH allowed from $MY_IP only)"
fi

terraform -chdir=infra init -input=false
terraform -chdir=infra apply

IP="$(terraform -chdir=infra output -raw public_ip)"
echo
echo "Provisioned. First boot takes ~3-5 minutes (installs + npm build); then open http://$IP"
echo "Watch progress:  ssh -i $KEY_FILE ubuntu@$IP 'sudo tail -f /var/log/portfolio-setup.log'"
echo "Later updates:   git push, then scripts/deploy.sh"
