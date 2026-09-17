import fs from "fs";
import path from "path";

export type Doc = { label: string; file: string; note?: string };

/* ---------------------------------------------------------------------------
   AUTOMATIC DOCUMENT DETECTION

   Drop PDFs into public/docs and they appear on the matching page. No code
   changes needed.

   Naming rule: start the filename with the page slug, then a dash, then
   whatever you want to call it.

     public/docs/vendra-overview.pdf        -> /platforms/vendra
     public/docs/vendra-technical-spec.pdf  -> /platforms/vendra
     public/docs/freshlane-brochure.pdf     -> /platforms/freshlane
     public/docs/web-design-samples.pdf     -> /websites/web-design

   The label shown on the card is built from the part after the slug, so
   "vendra-technical-spec.pdf" displays as "Technical spec".

   A file named exactly after the slug (vendra.pdf) is labelled "Overview".

   Ordering: files starting with "overview" or "brochure" come first, then
   the rest alphabetically.
--------------------------------------------------------------------------- */

const DOCS_DIR = path.join(process.cwd(), "public", "docs");

function prettify(stem: string) {
  const words = stem.replace(/[-_]+/g, " ").trim();
  if (!words) return "Overview";
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function listPdfs(): string[] {
  try {
    return fs.readdirSync(DOCS_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  } catch {
    return [];
  }
}

export function docsForSlug(slug: string): Doc[] {
  /* Match on the last part of the path: "platforms/vendra" -> "vendra" */
  const key = slug.split("/").filter(Boolean).pop() ?? slug;
  const files = listPdfs();

  const matched = files.filter((f) => {
    const base = f.slice(0, -4).toLowerCase();
    return base === key || base.startsWith(`${key}-`);
  });

  const docs = matched.map((f) => {
    const base = f.slice(0, -4);
    const rest = base.toLowerCase() === key ? "" : base.slice(key.length + 1);
    return { label: prettify(rest), file: `/docs/${f}` };
  });

  const priority = (d: Doc) => {
    const l = d.label.toLowerCase();
    if (l.startsWith("overview")) return 0;
    if (l.startsWith("brochure")) return 1;
    return 2;
  };

  return docs.sort((a, b) => priority(a) - priority(b) || a.label.localeCompare(b.label));
}
