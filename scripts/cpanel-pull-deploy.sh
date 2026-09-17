#!/usr/bin/env bash
set -euo pipefail

REPO="6ixmediasa/6ixmediasa"
BRANCH="production-static"
HOME_DIR="${HOME:-/home/ixmedia1}"
DEPLOY_PATH="$HOME_DIR/public_html"
BACKUP_DIR="$HOME_DIR/deploy-backups"
BACKUP_KEEP=5
MARKER_FILE="$HOME_DIR/.6ixmedia-last-deploy"
LOCK_DIR="$HOME_DIR/.6ixmedia-deploy-lock"
RAW_MARKER_URL="https://raw.githubusercontent.com/${REPO}/${BRANCH}/.deploy-sha"
ARCHIVE_URL="https://codeload.github.com/${REPO}/tar.gz/refs/heads/${BRANCH}"
ADMIN_VERSION="6"
ADMIN_VERSION_FILE="$HOME_DIR/.6ixmedia-admin-version"
ADMIN_CONFIG="$HOME_DIR/.6ixmedia-admin/config.php"
ADMIN_UPGRADE_URL="https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts/upgrade-admin-v6.sh"

if ! mkdir "$LOCK_DIR" 2>/dev/null; then
  echo "Another 6ixMedia deployment is already running; exiting."
  exit 0
fi
cleanup_lock() { rmdir "$LOCK_DIR" 2>/dev/null || true; }
trap cleanup_lock EXIT

command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { echo "tar is required." >&2; exit 1; }

if [ -f "$ADMIN_CONFIG" ]; then
  CURRENT_ADMIN_VERSION=""
  [ -f "$ADMIN_VERSION_FILE" ] && CURRENT_ADMIN_VERSION="$(tr -d '\r\n' < "$ADMIN_VERSION_FILE")"
  if [ "$CURRENT_ADMIN_VERSION" != "$ADMIN_VERSION" ]; then
    ADMIN_TMP="$HOME_DIR/.6ixmedia-admin-upgrade-$ADMIN_VERSION.sh"
    curl -fsSL --retry 4 --retry-delay 2 "$ADMIN_UPGRADE_URL" -o "$ADMIN_TMP"
    bash "$ADMIN_TMP"
    rm -f "$ADMIN_TMP"
    printf '%s\n' "$ADMIN_VERSION" > "$ADMIN_VERSION_FILE"
    echo "Admin CMS upgraded to v$ADMIN_VERSION."
  fi
fi

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

PRESERVE_DIR="$TMP_DIR/preserve"
mkdir -p "$PRESERVE_DIR"
if [ -d "$DEPLOY_PATH/.well-known" ]; then
  mkdir -p "$PRESERVE_DIR/.well-known"
  cp -a "$DEPLOY_PATH/.well-known/." "$PRESERVE_DIR/.well-known/"
fi
if [ -d "$DEPLOY_PATH/cms-uploads" ]; then
  mkdir -p "$PRESERVE_DIR/cms-uploads"
  cp -a "$DEPLOY_PATH/cms-uploads/." "$PRESERVE_DIR/cms-uploads/"
fi

find "$DEPLOY_PATH" -mindepth 1 -maxdepth 1 ! -name '.well-known' ! -name 'cms-uploads' -exec rm -rf -- {} +
cp -a "$SRC_DIR/." "$DEPLOY_PATH/"

if [ -d "$PRESERVE_DIR/.well-known" ]; then
  mkdir -p "$DEPLOY_PATH/.well-known"
  cp -a "$PRESERVE_DIR/.well-known/." "$DEPLOY_PATH/.well-known/"
fi
if [ -d "$PRESERVE_DIR/cms-uploads" ]; then
  mkdir -p "$DEPLOY_PATH/cms-uploads"
  cp -a "$PRESERVE_DIR/cms-uploads/." "$DEPLOY_PATH/cms-uploads/"
fi

test -f "$DEPLOY_PATH/index.html"
test -f "$DEPLOY_PATH/logo.png"
test -f "$DEPLOY_PATH/projects/exquisite-management/project.pdf"
printf '%s\n' "$REMOTE_SHA" > "$MARKER_FILE"

if [ -d "$BACKUP_DIR" ]; then
  find "$BACKUP_DIR" -maxdepth 1 -type f -name 'public_html-before-nextjs-*.tar.gz' -printf '%T@ %p\n' \
    | sort -nr \
    | awk -v keep="$BACKUP_KEEP" 'NR > keep {sub(/^[^ ]+ /, ""); print}' \
    | while IFS= read -r old_backup; do
        [ -n "$old_backup" ] && rm -f -- "$old_backup"
      done
fi

echo "6ixMedia SA deployment complete: $REMOTE_SHA"
