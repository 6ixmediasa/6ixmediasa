#!/usr/bin/env bash
set -euo pipefail

HOME_DIR="${HOME:-/home/ixmedia1}"
TARGET="$HOME_DIR/admin.6ixmediasa.com"
BACKUP_DIR="$HOME_DIR/deploy-backups"
BRANCH="admin-cms"
ARCHIVE_URL="https://codeload.github.com/6ixmediasa/6ixmediasa/tar.gz/refs/heads/$BRANCH"
TTY="/dev/tty"

echo "6ixMedia SA Admin installer"
echo "Target: $TARGET"
echo

command -v php >/dev/null 2>&1 || { echo "PHP CLI is required." >&2; exit 1; }
command -v curl >/dev/null 2>&1 || { echo "curl is required." >&2; exit 1; }
command -v tar >/dev/null 2>&1 || { echo "tar is required." >&2; exit 1; }
php -r 'exit(version_compare(PHP_VERSION,"8.1.0",">=")?0:1);' || { echo "PHP 8.1+ is required." >&2; exit 1; }
php -m | grep -qi '^pdo_mysql$' || { echo "PHP pdo_mysql extension is required." >&2; exit 1; }
[ -r "$TTY" ] && [ -w "$TTY" ] || { echo "An interactive terminal is required for secure credential entry." >&2; exit 1; }

# Initialize prompt variables so set -u cannot fail if an input operation is interrupted.
DB_HOST_INPUT=""
DB_NAME_INPUT=""
DB_USER_INPUT=""
DB_PASS_INPUT=""
ADMIN_EMAIL_INPUT=""
ADMIN_PASSWORD_INPUT=""
ADMIN_PASSWORD_CONFIRM=""

# Read explicitly from /dev/tty. This is required because the installer is normally
# started with `curl ... | bash`, where standard input is occupied by the script itself.
read -r -p "Database host [localhost]: " DB_HOST_INPUT < "$TTY"
DB_HOST_INPUT="${DB_HOST_INPUT:-localhost}"
read -r -p "Database name: " DB_NAME_INPUT < "$TTY"
read -r -p "Database user: " DB_USER_INPUT < "$TTY"
read -r -s -p "Database password: " DB_PASS_INPUT < "$TTY"; printf '\n' > "$TTY"
read -r -p "Admin email: " ADMIN_EMAIL_INPUT < "$TTY"
read -r -s -p "Admin password (minimum 12 characters): " ADMIN_PASSWORD_INPUT < "$TTY"; printf '\n' > "$TTY"
read -r -s -p "Confirm admin password: " ADMIN_PASSWORD_CONFIRM < "$TTY"; printf '\n' > "$TTY"

[ -n "$DB_NAME_INPUT" ] || { echo "Database name is required." >&2; exit 1; }
[ -n "$DB_USER_INPUT" ] || { echo "Database user is required." >&2; exit 1; }
php -r 'exit(filter_var($argv[1], FILTER_VALIDATE_EMAIL) ? 0 : 1);' "$ADMIN_EMAIL_INPUT" || { echo "A valid admin email is required." >&2; exit 1; }
[ "$ADMIN_PASSWORD_INPUT" = "$ADMIN_PASSWORD_CONFIRM" ] || { echo "Admin passwords do not match." >&2; exit 1; }
[ "${#ADMIN_PASSWORD_INPUT}" -ge 12 ] || { echo "Admin password must be at least 12 characters." >&2; exit 1; }

# Verify the supplied database credentials before touching the current admin document root.
DB_HOST="$DB_HOST_INPUT" DB_NAME="$DB_NAME_INPUT" DB_USER="$DB_USER_INPUT" DB_PASS="$DB_PASS_INPUT" php -r '
try {
    new PDO(
        sprintf("mysql:host=%s;dbname=%s;charset=utf8mb4", getenv("DB_HOST"), getenv("DB_NAME")),
        getenv("DB_USER"),
        getenv("DB_PASS"),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "Database connection verified.\n";
} catch (Throwable $e) {
    fwrite(STDERR, "Database connection failed. Check the database name, user, password and privileges.\n");
    exit(1);
}
'

TMP_DIR="$(mktemp -d "$HOME_DIR/.6ixmedia-admin-install.XXXXXX")"
cleanup(){ rm -rf "$TMP_DIR" 2>/dev/null || true; unset DB_PASS_INPUT ADMIN_PASSWORD_INPUT ADMIN_PASSWORD_CONFIRM DB_PASS ADMIN_PASSWORD; }
trap cleanup EXIT

curl -fsSL --retry 4 --retry-delay 2 "$ARCHIVE_URL" -o "$TMP_DIR/admin.tar.gz"
tar -xzf "$TMP_DIR/admin.tar.gz" -C "$TMP_DIR"
SRC_DIR="$(find "$TMP_DIR" -mindepth 1 -maxdepth 1 -type d -name '6ixmediasa-admin-cms*' -print -quit)"
[ -n "$SRC_DIR" ] || { echo "Could not locate extracted admin source." >&2; exit 1; }
[ -f "$SRC_DIR/public/index.php" ] || { echo "Admin source is incomplete." >&2; exit 1; }

mkdir -p "$TARGET" "$BACKUP_DIR"
if [ -n "$(find "$TARGET" -mindepth 1 -maxdepth 1 -print -quit 2>/dev/null)" ]; then
  STAMP="$(date +%Y%m%d-%H%M%S)"
  BACKUP="$BACKUP_DIR/admin-before-install-$STAMP.tar.gz"
  tar -czf "$BACKUP" -C "$TARGET" .
  echo "Existing admin root backed up: $BACKUP"
fi

PRESERVE="$TMP_DIR/well-known-preserve"
if [ -d "$TARGET/.well-known" ]; then
  mkdir -p "$PRESERVE"
  cp -a "$TARGET/.well-known/." "$PRESERVE/"
fi

find "$TARGET" -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf -- {} +
cp -a "$SRC_DIR/public/." "$TARGET/"
mkdir -p "$TARGET/uploads"
chmod 755 "$TARGET" "$TARGET/uploads"

if [ -d "$PRESERVE" ]; then
  mkdir -p "$TARGET/.well-known"
  cp -a "$PRESERVE/." "$TARGET/.well-known/"
fi

export DB_HOST="$DB_HOST_INPUT"
export DB_NAME="$DB_NAME_INPUT"
export DB_USER="$DB_USER_INPUT"
export DB_PASS="$DB_PASS_INPUT"
export APP_KEY="$(php -r 'echo bin2hex(random_bytes(32));')"
export CONTENT_API_KEY="$(php -r 'echo bin2hex(random_bytes(32));')"
export ADMIN_EMAIL="$ADMIN_EMAIL_INPUT"
export ADMIN_PASSWORD="$ADMIN_PASSWORD_INPUT"

php "$SRC_DIR/scripts/write-config.php"
php "$SRC_DIR/scripts/init-db.php"
php -l "$TARGET/index.php" >/dev/null
php -l "$TARGET/api/content.php" >/dev/null

echo
echo "6ixMedia Admin installed successfully."
echo "Login: https://admin.6ixmediasa.com"
echo "Private config: $HOME_DIR/.6ixmedia-admin/config.php"
echo "Content API key was generated and stored only in the private config."
