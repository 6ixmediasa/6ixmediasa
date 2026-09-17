import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTemplate from "@/components/PageTemplate";
import { pages, getPage } from "@/lib/pages";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) return {};
  const url = `/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      type: "website",
      locale: "en_ZA",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function CatchAllPage({ params }: Props) {
  const { slug: parts } = await params;
  const slug = parts.join("/");
  const page = getPage(slug);
  if (!page) notFound();

  const crumbs = [
    { name: "Home", item: "https://6ixmediasa.com/" },
    ...(page.parent ? [{ name: page.parent.label, item: `https://6ixmediasa.com${page.parent.href}` }] : []),
    { name: page.eyebrow, item: `https://6ixmediasa.com/${page.slug}` },
  ];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
    {
      "@type": "Service",
      name: page.h1,
      description: page.metaDescription,
      serviceType: page.eyebrow,
      provider: { "@id": "https://6ixmediasa.com/#org" },
      areaServed: [
        { "@type": "Country", name: "South Africa" },
        { "@type": "Country", name: "China" },
      ],
      ...(page.price
        ? {
            offers: {
              "@type": "Offer",
              priceCurrency: "ZAR",
              price: page.price.replace(/[^0-9]/g, "") || undefined,
              description: page.price,
            },
          }
        : {}),
    },
  ];

  if (page.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
      <PageTemplate page={page} />
    </>
  );
}
