PROJECT IMAGES AND PRESENTATIONS
================================

One folder per client, named with the project slug.

  public/projects/amani-lodge/cover.jpg      the card image
  public/projects/amani-lodge/project.pdf    the presentation

COVER IMAGE
  cover.jpg   1200 x 900 (4:3). Shows on the portfolio grid, the home
              page and the top of the project page.

  Every project currently has a branded placeholder cover. Replace the
  file with real work — same name, same path — and nothing in the code
  needs changing.

PROJECT PRESENTATION
  project.pdf   Appears as a "View the project" section on that client's
                page, with Preview, Open in new tab and Download. A
                "View project" button also appears in the page header.

  IMPORTANT: every folder currently holds a COPY OF THE PRICE LIST as a
  stand-in, so you can see how the viewer displays. Replace each one with
  that client's real presentation before going live. A prospect opening
  a project page and finding your price list is not the impression you
  want.

  If a project has no PDF, the section and the button simply do not
  appear on that page. So you can delete the stand-ins and add real ones
  gradually.

EXTRA DOCUMENTS
  Any other PDF in the same folder shows as a second tab, labelled from
  the filename:

    public/projects/amani-lodge/brand-guidelines.pdf  -> "Brand guidelines"
    public/projects/amani-lodge/case-study.pdf        -> "Case study"

  project.pdf always shows first.

AFTER ADDING FILES
  Development updates on refresh. A live site needs a rebuild and
  redeploy, because file detection happens at build time.
