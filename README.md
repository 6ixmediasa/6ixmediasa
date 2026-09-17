# 6ixMedia SA

Official website source for [6ixMedia SA](https://www.6ixmediasa.com).

## Stack

- Next.js 16.3.0 (App Router)
- React 19.2.8
- TypeScript 5
- Tailwind CSS 3.4.6

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production build:

```bash
npm run build
npm start
```

## Project structure

```text
app/          Routes, metadata, sitemap and robots
components/   Reusable UI components
lib/          Site content, pricing, project and document data
public/       Images, project covers, client/project PDFs and documents
```

Most general site copy, navigation, pricing and contact information is maintained in `lib/site.ts`. Inner-page content is primarily maintained in `lib/pages.ts`.

Portfolio/project data is maintained in `lib/projects.ts`, with project assets under `public/projects/`.

## Important project-document note

Project PDFs are real source assets. Do not replace a `project.pdf` merely because another deployment contains a file with the same filename. Compare the actual file contents before replacing any client/project document.

## Deployment

The GitHub repository is the source of truth for the Next.js website. Deploy from this repository rather than editing the generated/static HTML export.

The previous static HTML export should be treated as a deployment/reference copy only.

## Content additions

New content areas such as the blog will be added after the core Next.js site has been fully restored and verified.
