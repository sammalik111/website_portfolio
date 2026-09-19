#!/usr/bin/env bash
# Deploy the latest pushed code: SSH into the instance and run its redeploy helper
# (git pull, npm ci, npm run build, reload Caddy).
#
#   git push && scripts/deploy.sh
#
# Override the key with KEY_NAME (default shahmeer-portfolio-key, expected in ~/.ssh).
set -euo pipefail

cd "$(dirname "$0")/.."
KEY_FILE="$HOME/.ssh/${KEY_NAME:-shahmeer-portfolio-key}.pem"
IP="$(terraform -chdir=infra output -raw public_ip)"

git fetch --quiet origin
if [ "$(git rev-parse HEAD)" != "$(git rev-parse '@{u}')" ]; then
  echo "Warning: local HEAD differs from origin — the server only gets what's pushed." >&2
fi

ssh -i "$KEY_FILE" -o StrictHostKeyChecking=accept-new "ubuntu@$IP" 'sudo /opt/app/deploy.sh'
echo "Deployed: http://$IP"
