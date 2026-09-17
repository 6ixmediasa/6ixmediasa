import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { projects, getProject, relatedProjects } from "@/lib/content";
import { projectDocs } from "@/lib/projectdocs";
import DocViewer from "@/components/DocViewer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.seoTitle || `${p.name} — ${p.category} | 6ixMedia SA`,
    description: p.seoDescription || `${p.tagline}. ${p.category} project delivered by 6ixMedia SA.`,
    alternates: { canonical: `/our-work/${p.slug}` },
    openGraph: { title: p.seoTitle || `${p.name} | 6ixMedia SA`, description: p.seoDescription || p.tagline, type: "article" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const related = relatedProjects(p);
  const docs = p.docs && p.docs.length ? p.docs : projectDocs(slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CreativeWork", name: p.name, description: p.about, dateCreated: p.year, creator: { "@id": "https://6ixmediasa.com/#org" }, genre: p.category },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://6ixmediasa.com/" },
        { "@type": "ListItem", position: 2, name: "Our work", item: "https://6ixmediasa.com/our-work" },
        { "@type": "ListItem", position: 3, name: p.name, item: `https://6ixmediasa.com/our-work/${p.slug}` },
      ]},
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="on-dark relative overflow-hidden bg-ink">
        <div className="arc" aria-hidden="true"><svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute -right-24 -top-32 h-[150%] w-auto opacity-[0.16]"><path d="M600 640C600 340 780 80 1080 -20" fill="none" stroke="#2BA8E0" strokeWidth="34" strokeLinecap="round" opacity="0.5" /><path d="M680 660C680 360 860 100 1160 0" fill="none" stroke="#0E5A9B" strokeWidth="90" strokeLinecap="round" opacity="0.55" /></svg></div>
        <div className="shell relative py-16 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-6"><ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute"><li><Link href="/" className="transition hover:text-azure-400">Home</Link></li><li aria-hidden="true">/</li><li><Link href="/our-work" className="transition hover:text-azure-400">Our work</Link></li><li aria-hidden="true">/</li><li className="text-azure-400">{p.category}</li></ol></nav>
          <p className="eyebrow-dark">{p.category}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">{p.name}</h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-dim">{p.tagline}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3"><Link href="/quote" className="btn-primary">Request a quote<Icon name="arrow" className="h-4 w-4" /></Link>{docs.length>0&&<a href="#project-document" className="btn-ghost-dark"><Icon name="file" className="h-4 w-4" />View project</a>}<Link href="/our-work" className="btn-ghost-dark"><Icon name="arrow" className="h-4 w-4 rotate-180" />Back to portfolio</Link><p className="ml-1 font-mono text-[13px] text-azure-400">{p.year}<span className="ml-2 text-ink-mute">{p.services.join(" · ")}</span></p></div>
        </div>
      </section>
      <section className="shell py-12 lg:py-16"><div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14"><div>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-paper to-paper-edge/60">{p.cover?<Image src={p.cover} alt={`${p.name} — ${p.tagline}`} fill priority sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover"/>:<span className="font-display text-[110px] font-medium tracking-[-0.04em] text-ink/10">{p.name.charAt(0)}</span>}</div>
        <h2 className="h-section mt-12">About this project</h2><p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/75">{p.about}</p>
        {p.shots&&p.shots.length>0&&<div className="mt-10 grid gap-4 sm:grid-cols-2">{p.shots.map((src,i)=><div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper"><Image src={src} alt={`${p.name} screenshot ${i+1}`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover"/></div>)}</div>}
        {docs.length>0&&<div id="project-document" className="mt-14 border-t border-paper-edge pt-12"><h2 className="h-section">View the project</h2><p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/75">The documents for {p.name} — preview them here, open them in a new tab, or download a copy.</p><div className="mt-6"><DocViewer docs={docs}/></div></div>}
      </div><aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="card"><h2 className="font-display text-[17px] tracking-[-0.01em]">Project details</h2><dl className="mt-4 space-y-4"><div className="flex gap-3"><Icon name="tag" className="mt-0.5 h-4 w-4 shrink-0 text-azure-500"/><div><dt className="text-[12.5px] text-ink-mute">Category</dt><dd className="text-[15px] font-medium">{p.category}</dd></div></div><div className="flex gap-3"><Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-azure-500"/><div><dt className="text-[12.5px] text-ink-mute">Year</dt><dd className="text-[15px] font-medium">{p.year}</dd></div></div>{p.industry&&<div><dt className="text-[12.5px] text-ink-mute">Industry</dt><dd className="text-[15px] font-medium">{p.industry}</dd></div>}</dl></div>
        <div className="card"><h2 className="font-display text-[17px] tracking-[-0.01em]">Services provided</h2><div className="mt-4 flex flex-wrap gap-2">{p.services.map((s)=><span key={s} className="rounded-full border border-paper-edge px-3 py-1.5 text-[12.5px] text-ink/75">{s}</span>)}</div></div>
        <div className="card"><h2 className="font-display text-[17px] tracking-[-0.01em]">Technologies used</h2><div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t)=><span key={t} className="rounded-full bg-ink px-3 py-1.5 text-[12.5px] text-white">{t}</span>)}</div></div>
        <div className="rounded-2xl bg-ink p-6"><h2 className="font-display text-[17px] tracking-[-0.01em] text-white">Like what you see?</h2><p className="mt-2 text-[14px] leading-relaxed text-ink-dim">Tell us what you are building and we will send a fixed price in rand.</p><Link href="/quote" className="btn-primary mt-5 w-full">Request a quote</Link></div>
      </aside></div>
      {related.length>0&&<div className="mt-16 border-t border-paper-edge pt-12"><h2 className="h-section">More {p.category.toLowerCase()} work</h2><div className="mt-6 grid gap-5 sm:grid-cols-3">{related.map((r)=><Link key={r.slug} href={`/our-work/${r.slug}`} className="group rounded-2xl border border-paper-edge bg-white p-5 transition hover:-translate-y-1 hover:border-azure-400"><div className="relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-paper to-paper-edge/60">{r.cover?<Image src={r.cover} alt={r.name} fill sizes="33vw" className="object-cover"/>:<span className="font-display text-[38px] text-ink/15 transition group-hover:text-azure-400/40">{r.name.charAt(0)}</span>}</div><p className="mt-3 text-[15px] font-medium">{r.name}</p><p className="mt-0.5 text-[12.5px] text-ink-mute">{r.tagline}</p></Link>)}</div></div>}
      </section>
    </>
  );
}
