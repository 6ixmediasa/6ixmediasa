# 6ixMedia SA Admin CMS

Custom PHP/MySQL administration dashboard for `admin.6ixmediasa.com`.

## Architecture

- Public website: Next.js static site at `6ixmediasa.com`
- Admin dashboard: PHP/MySQL at `admin.6ixmediasa.com`
- Private configuration: `/home/ixmedia1/.6ixmedia-admin/config.php`
- Admin uploads: `/home/ixmedia1/admin.6ixmediasa.com/uploads`
- Protected content API: `/api/content.php` using the `X-6ixMedia-Key` header

## Security

- Passwords use PHP `password_hash` / `password_verify`
- PDO prepared statements
- CSRF protection on state-changing forms
- Strict session cookies
- Security headers and CSP
- PHP execution blocked from the uploads directory
- Database credentials and API key stored outside the web root
- Audit log records admin actions

## Install

Run from the cPanel Terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts/install-admin.sh | bash
```

The installer interactively requests the existing database credentials and first admin login. Secrets are never stored in GitHub.

## Update dashboard code

```bash
curl -fsSL https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/admin-cms/scripts/deploy-admin.sh | bash
```

Uploads and the private config are preserved during code updates.

## Current modules

- Dashboard
- Clients
- Portfolio Projects
- Blog Posts
- Media/PDF uploads
- SEO fields
- Settings
- Audit logging
- Protected JSON content API

The Next.js publishing bridge is intentionally separate and will be connected after the admin dashboard has been installed and verified.
