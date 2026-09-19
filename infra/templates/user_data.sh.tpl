#!/usr/bin/env bash
# Runs once on first boot (EC2 user-data / cloud-init). Installs Caddy + Node,
# clones the repo, builds the frontend, and serves it. Re-run /opt/app/deploy.sh
# by hand (or via SSH) to pull and rebuild after future git pushes.
#
# Everything is logged to /var/log/portfolio-setup.log so a failed boot can be debugged over SSH.
exec > >(tee -a /var/log/portfolio-setup.log) 2>&1
echo "===== user-data started at $(date -u) ====="

set -euxo pipefail

REPO_URL="${repo_url}"
REPO_BRANCH="${repo_branch}"
DOMAIN_NAME="${domain_name}"
APP_DIR="/opt/app"

export DEBIAN_FRONTEND=noninteractive

# --- wait for outbound network: cloud-init can fire before the default route exists,
#     and apt then dies with "Network is unreachable" ---
echo "--- waiting for outbound network"
for i in $(seq 1 60); do
  if curl -fsS --max-time 3 https://deb.nodesource.com >/dev/null 2>&1; then
    echo "network up after roughly $((i * 2))s"
    break
  fi
  sleep 2
done

# --- wait out the unattended-upgrades apt lock (bounded to ~10 minutes) ---
echo "--- waiting for apt lock"
for i in $(seq 1 120); do
  if ! fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1 && ! fuser /var/lib/apt/lists/lock >/dev/null 2>&1; then
    break
  fi
  echo "apt is busy, sleeping 5s"
  sleep 5
done

# --- swap: t3.micro has 1GB RAM, which npm/vite build can exceed without headroom ---
if [ ! -f /swapfile ]; then
  fallocate -l 1G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo "/swapfile none swap sw 0 0" >> /etc/fstab
fi

# --- base packages (no debian-keyring: it doesn't exist on Ubuntu 24.04 and isn't needed) ---
echo "--- base packages"
apt-get update -y
apt-get install -y curl git ca-certificates gnupg apt-transport-https

# --- Caddy (official apt repo) ---
echo "--- caddy"
curl -fsSL 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -fsSL 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  > /etc/apt/sources.list.d/caddy-stable.list
apt-get update -y
apt-get install -y caddy

# --- Node.js 20 (NodeSource) ---
echo "--- node 20"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# --- clone + build the site ---
echo "--- cloning and building"
if [ ! -d "$APP_DIR" ]; then
  git clone --branch "$REPO_BRANCH" --depth 1 "$REPO_URL" "$APP_DIR"
fi

cd "$APP_DIR/frontend"
npm ci
npm run build

# --- Caddyfile ---
echo "--- caddyfile"
if [ -n "$DOMAIN_NAME" ]; then
  cat > /etc/caddy/Caddyfile <<EOF
$DOMAIN_NAME {
    root * $APP_DIR/frontend/dist
    encode zstd gzip
    file_server
    try_files {path} /index.html
}
EOF
else
  cat > /etc/caddy/Caddyfile <<EOF
:80 {
    root * $APP_DIR/frontend/dist
    encode zstd gzip
    file_server
    try_files {path} /index.html
}
EOF
fi

# --- redeploy helper for future pushes (run over SSH, or via scripts/deploy.sh) ---
cat > "$APP_DIR/deploy.sh" <<'EOF'
#!/usr/bin/env bash
set -euxo pipefail
cd /opt/app
git pull --ff-only
cd frontend
npm ci
npm run build
systemctl reload caddy
EOF
chmod +x "$APP_DIR/deploy.sh"

systemctl enable --now caddy
systemctl reload caddy

echo "===== user-data finished at $(date -u) ====="
