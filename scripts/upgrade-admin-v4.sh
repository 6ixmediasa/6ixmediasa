#!/usr/bin/env bash
set -euo pipefail
BASE="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts"
HOME_DIR="${HOME:-/home/ixmedia1}"
TMP="$(mktemp -d "$HOME_DIR/.6ixmedia-admin-v4.XXXXXX")"
trap 'rm -rf "$TMP" 2>/dev/null || true' EXIT
for f in deploy-admin.sh migrate-content-v4.php seed-existing-content-v3.php verify-cms-v4.php; do
  curl -fsSL --retry 4 --retry-delay 2 "$BASE/$f" -o "$TMP/$f"
done
bash "$TMP/deploy-admin.sh"
php "$TMP/migrate-content-v4.php"
php "$TMP/seed-existing-content-v3.php"
php "$TMP/verify-cms-v4.php"
php -l "$HOME_DIR/admin.6ixmediasa.com/index.php" >/dev/null
php -l "$HOME_DIR/admin.6ixmediasa.com/api/published.php" >/dev/null
echo "6ixMedia Admin v4 upgrade complete and verified."
