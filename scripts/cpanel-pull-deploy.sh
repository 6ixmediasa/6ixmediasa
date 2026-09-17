#!/usr/bin/env bash
set -euo pipefail

REPO="6ixmediasa/6ixmediasa"
BRANCH="production-static"
HOME_DIR="${HOME:-/home/ixmedia1}"
DEPLOY_PATH="$HOME_DIR/public_html"
BACKUP_DIR="$HOME_DIR/deploy-backups"
MARKER_FILE="$HOME_DIR/.6ixmedia-last-deploy"
LOCK_DIR="$HOME_DIR/.6ixmedia-deploy-lock"
RAW_MARKER_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/.deploy-sha"
ARCHIVE_URL="https://codeload.github.com/${REPO}/tar.gz/refs/heads/${BRANCH}"

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "Another 6ixMedia deployment is already running; exiting."
  exit 0
fi
cleanup_lock() { rmdir "$LOCK_DIR" 2>/dev/null || true; }
trap cleanup_lock EXIT

command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { echo "tar is required." >&2; exit 1; }

REMOTE_SHA="$(curl -fsSL --retry 4 --retry-delay 2 "$RAW_MARKER_URL" | tr -d '\r\n')"
test -n "$REMOTE_SHA"

if [ -f "$MARKER_FILE" ] && [ "$(tr -d '\r\n' < "$MARKER_FILE")" = "$REMOTE_SHA" ] && [ -f "$DEPLOY_PATH/index.html" ]; then
  echo "Already deployed: $REMOTE_SHA"
  exit 0
fi

TMP_DIR="$(mktemp -d "$HOME_DIR/.6ixmedia-pull.XXXXXX")"
cleanup_tmp() { rm -rf "$TMP_DIR" 2>/dev/null || true; cleanup_lock; }
trap cleanup_tmp EXIT

ARCHIVE="$TMP_DIR/site.tar.gz"
curl -fsSL --retry 4 --retry-delay 2 "$ARCHIVE_URL" -o "$ARCHIVE"
tar -xzf "$ARCHIVE" -C "$TMP_DIR"

SRC_DIR="$(find "$TMP_DIR" -mindepth 1 -maxdepth 1 -type d -name '6ixmediasa-production-static*' -print -quit)"
test -n "$SRC_DIR"
test -f "$SRC_DIR/index.html"
test -f "$SRC_DIR/logo.png"
test -f "$SRC_DIR/projects/exquisite-management/project.pdf"

mkdir -p "$DEPLOY_PATH" "$BACKUP_DIR"
if [ -n "$(find "$DEPLOY_PATH" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]; then
  STAMP="$(date +%Y%m%d-%H%M%S)"
  BACKUP="$BACKUP_DIR/public_html-before-nextjs-$STAMP.tar.gz"
  tar -czf "$BACKUP" -C "$DEPLOY_PATH" .
  echo "Backup created: $BACKUP"
fi

PRESERVE_DIR="$TMP_DIR/well-known-preserve"
if [ -d "$DEPLOY_PATH/.well-known" ]; then
  mkdir -p "$PRESERVE_DIR"
  cp -a "$DEPLOY_PATH/.well-known/." "$PRESERVE_DIR/"
fi

find "$DEPLOY_PATH" -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf -- {} +
cp -a "$SRC_DIR/." "$DEPLOY_PATH/"

if [ -d "$PRESERVE_DIR" ]; then
  mkdir -p "$DEPLOY_PATH/.well-known"
  cp -a "$PRESERVE_DIR/." "$DEPLOY_PATH/.well-known/"
fi

test -f "$DEPLOY_PATH/index.html"
test -f "$DEPLOY_PATH/logo.png"
test -f "$DEPLOY_PATH/projects/exquisite-management/project.pdf"
printf '%s\n' "$REMOTE_SHA" > "$MARKER_FILE"

echo "6ixMedia SA deployment complete: $REMOTE_SHA"
