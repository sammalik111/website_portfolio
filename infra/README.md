# Infra

Terraform for hosting the portfolio site on a single small EC2 instance instead of GitHub Pages.

## What this creates

- A dedicated VPC (`10.20.0.0/16`) with one public subnet, an internet gateway, and a route table — not the AWS default VPC.
- A security group allowing inbound 80/443 from anywhere and 22 (SSH) from a CIDR you control.
- One EC2 instance (`t3.micro` by default — free-tier eligible) running Ubuntu 22.04.
- An Elastic IP attached to that instance, so the address is stable across reboots/replacements — point your domain's A record at it.
- User-data (cloud-init) that runs once on first boot: installs Caddy + Node.js, clones this repo, builds `frontend/`, and serves the static build with Caddy.

- An S3 **content bucket** (`s3.tf`) holding `resume.json` and `resume.pdf`, which the site fetches at runtime so page content is editable without redeploying. Only those two keys are publicly readable (via bucket policy; ACLs stay blocked), CORS allows browser GETs, and versioning keeps 90 days of history. Cost is effectively $0 (a few KB, a few requests). Everything else about editing is in the root `README.md` ("Editing content").

No load balancer, ECS, RDS, etc. — this is intentionally a single-box setup.

### First-time content setup

After `terraform apply`:

```bash
echo "VITE_CONTENT_URL=$(terraform output -raw content_url)" > ../frontend/.env.production
../scripts/content.sh publish      # upload the current resume.json
# commit frontend/.env.production, push, then run /opt/app/deploy.sh on the instance once
```

From then on, content edits are just `scripts/content.sh publish`.

## Naming & tagging (shared AWS account)

If this account also holds other side projects, everything here is identifiable at a glance:

- Every resource name/tag is prefixed with `var.project_name` (default `shahmeer-portfolio-site`), e.g. `shahmeer-portfolio-site-vpc`, `shahmeer-portfolio-site-web-server`, `shahmeer-portfolio-site-elastic-ip`.
- The provider block in `versions.tf` sets `default_tags` (`Project`, `ManagedBy = terraform`, `Repo`) on *every* resource automatically, so you can filter by tag in the AWS Console (Resource Groups & Tag Editor → search `Project: shahmeer-portfolio-site`) without hunting through unrelated resources.
- This config creates its own dedicated VPC rather than using the account's default VPC, so it never shares networking with anything else you've built.

## Prerequisites

1. [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.6, and AWS credentials configured (`aws configure` or environment variables) for an account with EC2/VPC permissions.
2. An existing EC2 key pair for SSH access:
   ```
   aws ec2 create-key-pair --key-name shahmeer-portfolio-key --query 'KeyMaterial' --output text > shahmeer-portfolio-key.pem
   chmod 400 shahmeer-portfolio-key.pem
   ```

## Test locally before touching AWS

Two independent things can — and should — be verified before `terraform apply` ever boots a real instance:

**1. The site itself** (no AWS needed):
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173, live-reloading
# or, to check exactly what EC2 will actually serve:
npm run build && npm run preview   # http://localhost:4173, the real production build
```

**2. The Terraform plan** (needs AWS credentials, but creates nothing):
```bash
cd infra
terraform init      # downloads the aws provider
terraform validate  # checks syntax/types only, no API calls
terraform plan       # shows exactly what would be created — read this before apply
```
`plan` is the safe dry run: it makes read-only AWS API calls (e.g. to look up the latest Ubuntu AMI) and prints a full diff of every resource it would create, but nothing is actually launched until you run `apply`.

**3. (Optional) The boot script itself**, in a disposable container instead of a real EC2 boot cycle — catches typos/bad commands in `templates/user_data.sh.tpl` for free:
```bash
docker run --rm -it ubuntu:22.04 bash
# paste the body of templates/user_data.sh.tpl in, with repo_url/repo_branch/domain_name
# substituted for the real values (Docker won't run Terraform's templatefile() for you)
```
This won't exercise the AWS-specific bits (Elastic IP, security group) but will catch anything wrong with the apt/Caddy/Node/npm install sequence before you pay for a boot.

## Usage

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars: set key_name and ssh_ingress_cidr at minimum

terraform init
terraform plan
terraform apply
```

`terraform apply` prints the Elastic IP as `public_ip`. Point your domain's A record at that IP once you buy it. The site is reachable at `http://<public_ip>` a minute or two after `apply` finishes (cloud-init needs time to install packages and run `npm run build`).

## Pointing a domain at it

1. Buy the domain, add an A record → the `public_ip` output.
2. Set `domain_name` in `terraform.tfvars` to that domain and `terraform apply` again (this regenerates the Caddyfile via user-data — see note below on updates) — or just SSH in and edit `/etc/caddy/Caddyfile` directly to swap `:80 { ... }` for `yourdomain.com { ... }`, then `sudo systemctl reload caddy`. Caddy auto-provisions a Let's Encrypt TLS certificate the moment DNS resolves and it can bind port 443.

## Deploying updates

User-data only runs once, on first boot. After pushing new commits, SSH in and re-run the deploy helper it creates:

```bash
ssh -i shahmeer-portfolio-key.pem ubuntu@<public_ip>
sudo /opt/app/deploy.sh
```

That pulls the branch, rebuilds the frontend, and reloads Caddy.

## Cost

`t3.micro` + 12GB gp3 root volume + one Elastic IP (free while attached to a running instance) runs roughly $7-9/month after the AWS free tier, or effectively free during your first 12 months on a new account.

## Tearing down

```bash
terraform destroy
```
