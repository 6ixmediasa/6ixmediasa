# 6ixMedia SA

Official website source for [6ixMedia SA](https://www.6ixmediasa.com).

## Stack

- Next.js 16.3.x (App Router)
- React 19.2.8
- TypeScript 5
- Tailwind CSS 3.4.6

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

This project is deployed as a static Next.js export for shared hosting.

```bash
npm ci
npm run build
```

The deployable site is generated in:

```text
out/
```

Do not use `npm start` for the production hosting setup. The live cPanel server serves the generated static files from `public_html`.

## Project structure

```text
app/          Routes, metadata, sitemap and robots
components/   Reusable UI components
lib/          Site content, pricing, project and document data
public/       Images, project covers, client/project PDFs and documents
scripts/      cPanel pull-deployment utilities
```

Most general site copy, navigation, pricing and contact information is maintained in `lib/site.ts`. Inner-page content is primarily maintained in `lib/pages.ts`.

Portfolio/project data is maintained in `lib/projects.ts`, with project assets under `public/projects/`.

## Important project-document note

Project PDFs are real source assets. Do not replace a `project.pdf` merely because another deployment contains a file with the same filename. Compare the actual file contents or hashes before replacing any client/project document.

The Next.js version of `public/projects/exquisite-management/project.pdf` is intentionally preserved and verified in CI by SHA-256.

## Deployment architecture

The GitHub repository is the source of truth.

```text
main
  ↓ GitHub Actions
security audit + static build + asset verification
  ↓
production-static branch
  ↓ cPanel pull script
/home/ixmedia1/public_html
```

`.github/workflows/publish-static.yml` builds the site on every push to `main`, verifies required assets, writes `.deploy-sha`, and force-publishes only the generated `out/` contents to the `production-static` branch.

On cPanel, `scripts/cpanel-pull-deploy.sh` downloads that verified static branch, creates a rollback backup, preserves `.well-known`, publishes the new site, verifies critical output files and records the deployed SHA. It keeps the newest five production backups.

For automatic cPanel updates, install the cron job once with:

```bash
curl -fsSL https://raw.githubusercontent.com/6ixmediasa/6ixmediasa/main/scripts/install-cpanel-autodeploy.sh | bash
```

The cron task checks GitHub every five minutes. If the deployed SHA already matches the production branch, it exits without changing the live site.

## CI safeguards

The persistent GitHub checks verify:

- required public assets and expected file counts
- exact trusted hashes for selected PDFs
- production dependency audit at high/critical severity
- successful static Next.js export
- critical deployment output files

## Content additions

The public site remains Next.js. A future headless CMS at `admin.6ixmediasa.com` can manage portfolio/client data and later blog posts without controlling the public design.
