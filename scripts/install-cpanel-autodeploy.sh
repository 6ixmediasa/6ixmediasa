#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="${HOME:-/home/ixmedia1}"
DEPLOY_SCRIPT_URL="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/main/scripts/cpanel-pull-deploy.sh"
LOG_FILE="$HOME_DIR/6ixmedia-deploy.log"
CRON_MARKER="# 6ixMedia SA GitHub auto-deploy"
CRON_LINE="*/5 * * * * curl -fsSL '$DEPLOY_SCRIPT_URL' | bash >> '$LOG_FILE' 2>&1"

command -v crontab >/dev/null 2>&1 || { echo "crontab is not available on this hosting account." >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }

CURRENT="$(crontab -l 2>/dev/null || true)"
FILTERED="$(printf '%s\n' "$CURRENT" | grep -vF "$CRON_MARKER" | grep -vF "$DEPLOY_SCRIPT_URL" || true)"
{
  printf '%s\n' "$FILTERED"
  printf '%s\n' "$CRON_MARKER"
  printf '%s\n' "$CRON_LINE"
} | sed '/^[[:space:]]*$/d' | crontab -

# Run once now so the current production branch is synchronized immediately.
curl -fsSL "$DEPLOY_SCRIPT_URL" | bash

echo "Automatic deployment installed. cPanel will check GitHub every 5 minutes."
echo "Log: $LOG_FILE"
