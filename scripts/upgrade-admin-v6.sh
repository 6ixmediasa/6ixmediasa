#!/usr/bin/env bash
set -euo pipefail

BASE="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts"
HOME_DIR="${HOME:-/home/ixmedia1}"
STATE_DIR="$HOME_DIR/.6ixmedia-admin"
STATE_FILE="$STATE_DIR/rollout-state.txt"
TMP="$(mktemp -d "$HOME_DIR/.6ixmedia-admin-v6.XXXXXX")"
trap 'rm -rf "$TMP" 2>/dev/null || true' EXIT
mkdir -p "$STATE_DIR"

set_state() {
  printf '%s\n' "$1" > "$STATE_FILE"
}

fail() {
  set_state "failed:$1"
  echo "$1" >&2
  exit 1
}

set_state "starting:v6"
for f in deploy-admin.sh migrate-content-v4.php seed-existing-content-v3.php verify-cms-v4.php; do
  curl -fsSL --retry 4 --retry-delay 2 "$BASE/$f" -o "$TMP/$f" || fail "download:$f"
done

bash "$TMP/deploy-admin.sh" || fail "deploy-admin"
set_state "deployed:v6"

# cPanel can expose a different PHP runtime to cron/CLI than it does to Apache.
# Select a CLI binary that definitely has PDO MySQL before running database work.
shopt -s nullglob
CANDIDATES=()
if command -v php >/dev/null 2>&1; then CANDIDATES+=("$(command -v php)"); fi
CANDIDATES+=(/opt/cpanel/ea-php*/root/usr/bin/php)
CANDIDATES+=(/opt/alt/php*/usr/bin/php)
CANDIDATES+=(/usr/local/bin/php /usr/bin/php)

PHP_BIN=""
for candidate in "${CANDIDATES[@]}"; do
  [ -x "$candidate" ] || continue
  if "$candidate" -r 'exit(extension_loaded("pdo_mysql") ? 0 : 1);' >/dev/null 2>&1; then
    PHP_BIN="$candidate"
    break
  fi
done

[ -n "$PHP_BIN" ] || fail "php-runtime:no-pdo-mysql"
set_state "php-runtime:$("$PHP_BIN" -r 'echo PHP_VERSION;' 2>/dev/null || echo unknown)"

"$PHP_BIN" "$TMP/migrate-content-v4.php" || fail "migration"
set_state "migrated:v6"
"$PHP_BIN" "$TMP/seed-existing-content-v3.php" || fail "seed"
set_state "seeded:v6"
"$PHP_BIN" "$TMP/verify-cms-v4.php" || fail "verify"
set_state "verified:v6"

"$PHP_BIN" -l "$HOME_DIR/admin.6ixmediasa.com/index.php" >/dev/null || fail "lint:index"
"$PHP_BIN" -l "$HOME_DIR/admin.6ixmediasa.com/api/published.php" >/dev/null || fail "lint:published"
"$PHP_BIN" -l "$HOME_DIR/admin.6ixmediasa.com/api/status.php" >/dev/null || fail "lint:status"
set_state "complete:v6"
echo "6ixMedia Admin v6 upgrade complete and verified using $PHP_BIN."
