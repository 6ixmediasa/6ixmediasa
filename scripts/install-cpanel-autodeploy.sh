#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="${HOME:-/home/ixmedia1}"
DEPLOY_SCRIPT_URL="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/main/scripts/cpanel-pull-deploy.sh"
LOCAL_DIR="$HOME_DIR/.6ixmedia"
LOCAL_DEPLOY_SCRIPT="$LOCAL_DIR/cpanel-pull-deploy.sh"
RUNNER_SCRIPT="$LOCAL_DIR/run-autodeploy.sh"
LOG_FILE="$HOME_DIR/6ixmedia-deploy.log"
CRON_MARKER="# 6ixMedia SA GitHub auto-deploy"
CRON_LINE="*/5 * * * * /bin/bash '$RUNNER_SCRIPT' >> '$LOG_FILE' 2>&1"

command -v crontab >/dev/null 2>&1 || { echo "crontab is not available on this hosting account." >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }

mkdir -p "$LOCAL_DIR"
chmod 700 "$LOCAL_DIR"

# Keep a small local runner. It downloads the current deploy script to a normal
# file first, then executes it. This avoids /dev/fd failures seen when nesting
# `curl | bash` on some cPanel shared-hosting shells.
cat > "$RUNNER_SCRIPT" <<'RUNNER'
#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="${HOME:-/home/ixmedia1}"
LOCAL_DIR="$HOME_DIR/.6ixmedia"
LOCAL_DEPLOY_SCRIPT="$LOCAL_DIR/cpanel-pull-deploy.sh"
TMP_SCRIPT="$LOCAL_DEPLOY_SCRIPT.tmp"
DEPLOY_SCRIPT_URL="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/main/scripts/cpanel-pull-deploy.sh"

mkdir -p "$LOCAL_DIR"
curl -fsSL --retry 4 --retry-delay 2 "$DEPLOY_SCRIPT_URL" -o "$TMP_SCRIPT"
test -s "$TMP_SCRIPT"
mv -f "$TMP_SCRIPT" "$LOCAL_DEPLOY_SCRIPT"
chmod 700 "$LOCAL_DEPLOY_SCRIPT"
exec /bin/bash "$LOCAL_DEPLOY_SCRIPT"
RUNNER
chmod 700 "$RUNNER_SCRIPT"

CURRENT="$(crontab -l 2>/dev/null || true)"
FILTERED="$(printf '%s\n' "$CURRENT" | grep -vF "$CRON_MARKER" | grep -vF '6ixmedia' | grep -vF "$DEPLOY_SCRIPT_URL" || true)"
{
  printf '%s\n' "$FILTERED"
  printf '%s\n' "$CRON_MARKER"
  printf '%s\n' "$CRON_LINE"
} | sed '/^[[:space:]]*$/d' | crontab -

# Run once now using a normal file-backed script.
/bin/bash "$RUNNER_SCRIPT"

echo "Automatic deployment installed. cPanel will check GitHub every 5 minutes."
echo "Runner: $RUNNER_SCRIPT"
echo "Log: $LOG_FILE"
