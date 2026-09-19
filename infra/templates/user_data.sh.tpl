#!/usr/bin/env bash
# Runs once on first boot (EC2 user-data / cloud-init). Installs Caddy + Node,
# clones the repo, builds the frontend, and serves it. Re-run /opt/app/deploy.sh
# by hand (or via SSH) to pull and rebuild after future git pushes.
set -euxo pipefail

REPO_URL="${repo_url}"
REPO_BRANCH="${repo_branch}"
DOMAIN_NAME="${domain_name}"
APP_DIR="/opt/app"

export DEBIAN_FRONTEND=noninteractive

# --- swap: t3.micro has 1GB RAM, which npm/vite build can exceed without headroom ---
if [ ! -f /swapfile ]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi

apt-get update -y
apt-get install -y ca-certificates curl gnupg git debian-keyring debian-archive-keyring apt-transport-https

# --- Caddy (official apt repo) ---
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | tee /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

# --- Node.js LTS (NodeSource) ---
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs

# --- clone + build the site ---
if [ ! -d "$APP_DIR" ]; then
  git clone --branch "$REPO_BRANCH" --depth 1 "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR/frontend"
npm ci
npm run build

# --- Caddyfile ---
if [ -n "$DOMAIN_NAME" ]; then
  cat > /etc/caddy/Caddyfile <<EOF
$DOMAIN_NAME {
    root * $APP_DIR/frontend/dist
    encode gzip
    file_server
    try_files {path} /index.html
}
EOF
else
  cat > /etc/caddy/Caddyfile <<EOF
:80 {
    root * $APP_DIR/frontend/dist
    encode gzip
    file_server
    try_files {path} /index.html
}
EOF
fi

# --- redeploy helper for future pushes (run manually over SSH) ---
cat > "$APP_DIR/deploy.sh" <<'EOF'
#!/usr/bin/env bash
set -euxo pipefail
cd /opt/app
git pull
cd frontend
npm ci
npm run build
systemctl reload caddy
EOF
chmod +x "$APP_DIR/deploy.sh"

systemctl enable caddy
systemctl restart caddy
