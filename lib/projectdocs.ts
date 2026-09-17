import fs from "fs";
import path from "path";

/* ---------------------------------------------------------------------------
   PROJECT PRESENTATION PDFs

   Drop a PDF named project.pdf into the client's folder and a "View project"
   section appears on that project's page. No code changes needed.

     public/projects/kopano-attorneys/project.pdf
     public/projects/amani-lodge/project.pdf

   Optional extras: any other PDF in the same folder is picked up too and
   shown as a second tab, labelled from the filename.

     public/projects/amani-lodge/brand-guidelines.pdf   ->  "Brand guidelines"

   If a project has no PDF, no section renders on that page.
--------------------------------------------------------------------------- */

export type ProjectDoc = { label: string; file: string; note?: string };

function prettify(stem: string) {
  const words = stem.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function projectDocs(slug: string): ProjectDoc[] {
  const dir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".pdf"));
  } catch {
    return [];
  }

  const docs = files.map((f) => {
    const stem = f.slice(0, -4);
    return {
      label: stem.toLowerCase() === "project" ? "Project presentation" : prettify(stem),
      file: `/projects/${slug}/${f}`,
      note: stem.toLowerCase() === "project" ? "The full project, page by page" : undefined,
    };
  });

  /* project.pdf always leads */
  return docs.sort((a, b) =>
    a.label === "Project presentation" ? -1 : b.label === "Project presentation" ? 1 : a.label.localeCompare(b.label)
  );
}
