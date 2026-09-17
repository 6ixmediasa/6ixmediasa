#!/usr/bin/env bash
set -euo pipefail
BASE="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts"
TMP="$(mktemp -d "${HOME:-/home/ixmedia1}/.6ixmedia-admin-v3.XXXXXX")"
trap 'rm -rf "$TMP" 2>/dev/null || true' EXIT
curl -fsSL "$BASE/deploy-admin.sh" -o "$TMP/deploy.sh"
curl -fsSL "$BASE/migrate-content-v3.php" -o "$TMP/migrate.php"
curl -fsSL "$BASE/seed-existing-content-v3.php" -o "$TMP/seed.php"
bash "$TMP/deploy.sh"
php "$TMP/migrate.php"
php "$TMP/seed.php"
php -l "${HOME:-/home/ixmedia1}/admin.6ixmediasa.com/index.php" >/dev/null
php -l "${HOME:-/home/ixmedia1}/admin.6ixmediasa.com/api/published.php" >/dev/null
echo "6ixMedia Admin v3 upgrade complete."
echo "Dashboard: https://admin.6ixmediasa.com"
echo "Published content API: https://admin.6ixmediasa.com/api/published.php"
