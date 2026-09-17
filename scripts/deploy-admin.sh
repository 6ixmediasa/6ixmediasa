#!/usr/bin/env bash
set -euo pipefail
HOME_DIR="${HOME:-/home/ixmedia1}"
TARGET="$HOME_DIR/admin.6ixmediasa.com"
BACKUP_DIR="$HOME_DIR/deploy-backups"
ARCHIVE_URL="https://codeload.github.com/6ixmediasa/6ixmediasa/tar.gz/refs/heads/admin-cms"
CONFIG="$HOME_DIR/.6ixmedia-admin/config.php"
[ -f "$CONFIG" ] || { echo "Admin is not installed yet." >&2; exit 1; }
TMP_DIR="$(mktemp -d "$HOME_DIR/.6ixmedia-admin-update.XXXXXX")"
trap 'rm -rf "$TMP_DIR" 2>/dev/null || true' EXIT
curl -fsSL --retry 4 --retry-delay 2 "$ARCHIVE_URL" -o "$TMP_DIR/admin.tar.gz"
tar -xzf "$TMP_DIR/admin.tar.gz" -C "$TMP_DIR"
SRC_DIR="$(find "$TMP_DIR" -mindepth 1 -maxdepth 1 -type d -name '6ixmediasa-admin-cms*' -print -quit)"
[ -f "$SRC_DIR/public/index.php" ] || { echo "Admin source is incomplete." >&2; exit 1; }
mkdir -p "$TARGET" "$BACKUP_DIR"
STAMP="$(date +%Y%m%d-%H%M%S)"
if [ -n "$(find "$TARGET" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]; then
  tar -czf "$BACKUP_DIR/admin-before-update-$STAMP.tar.gz" -C "$TARGET" .
fi
PRESERVE="$TMP_DIR/preserve"
mkdir -p "$PRESERVE"
[ -d "$TARGET/.well-known" ] && cp -a "$TARGET/.well-known" "$PRESERVE/" || true
[ -d "$TARGET/uploads" ] && cp -a "$TARGET/uploads" "$PRESERVE/" || true
find "$TARGET" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
cp -a "$SRC_DIR/public/." "$TARGET/"
[ -d "$PRESERVE/.well-known" ] && cp -a "$PRESERVE/.well-known" "$TARGET/" || true
if [ -d "$PRESERVE/uploads" ]; then rm -rf "$TARGET/uploads"; cp -a "$PRESERVE/uploads" "$TARGET/"; fi
mkdir -p "$TARGET/uploads"
chmod 755 "$TARGET/uploads"
php -l "$TARGET/index.php" >/dev/null
php -l "$TARGET/api/content.php" >/dev/null
echo "6ixMedia Admin code updated successfully."
