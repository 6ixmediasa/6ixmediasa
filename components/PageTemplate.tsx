import Link from "next/link";
import Icon from "./Icon";
import CTA from "./CTA";
import DocViewer from "./DocViewer";
import { docsForSlug } from "@/lib/docs";
import { site } from "@/lib/site";
import type { PageDoc } from "@/lib/pages";
import { getPage } from "@/lib/pages";

function Crumbs({ page }: { page: PageDoc }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
        <li>
          <Link href="/" className="transition hover:text-azure-400">
            Home
          </Link>
        </li>
        {page.parent && (
          <>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={page.parent.href} className="transition hover:text-azure-400">
                {page.parent.label}
              </Link>
            </li>
          </>
        )}
        <li aria-hidden="true">/</li>
        <li className="text-azure-400">{page.eyebrow}</li>
      </ol>
    </nav>
  );
}

export default function PageTemplate({ page }: { page: PageDoc }) {
  const docs = page.docs && page.docs.length > 0 ? page.docs : docsForSlug(page.slug);

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink">
        <div className="arc" aria-hidden="true">
          <svg
            viewBox="0 0 1200 600"
            preserveAspectRatio="xMidYMid slice"
            className="absolute -right-24 -top-32 h-[150%] w-auto opacity-[0.16]"
          >
            <path d="M600 640C600 340 780 80 1080 -20" fill="none" stroke="#2BA8E0" strokeWidth="34" strokeLinecap="round" opacity="0.5" />
            <path d="M680 660C680 360 860 100 1160 0" fill="none" stroke="#0E5A9B" strokeWidth="90" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>

        <div className="shell relative py-16 lg:py-24">
          <Crumbs page={page} />
          <p className="eyebrow-dark">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
            {page.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-dim">{page.lead}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn-primary">
              Request a quote
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href={`https://wa.me/${site.whatsapp.za.intl}`} className="btn-ghost-dark">
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp us
            </a>
            {page.price && (
              <p className="ml-1 font-mono text-[13px] text-azure-400">
                {page.price}
                {page.priceNote && <span className="ml-2 text-ink-mute">{page.priceNote}</span>}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <div className="space-y-12">
            {page.blocks.map((b) => (
              <article key={b.h}>
                <h2 className="h-section">{b.h}</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/80">{b.body}</p>
                {b.points && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[15px] text-ink/80">
                        <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-azure-500" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {docs.length > 0 && (
              <article id="documents">
                <h2 className="h-section">See what you are buying</h2>
                <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink/80">
                  Browse the full overview before you commit. Preview it here, or download a copy
                  to share with your team.
                </p>
                <div className="mt-6">
                  <DocViewer docs={docs} />
                </div>
              </article>
            )}

            {page.faqs && page.faqs.length > 0 && (
              <article>
                <h2 className="h-section">Common questions</h2>
                <dl className="mt-6 divide-y divide-paper-edge border-t border-paper-edge">
                  {page.faqs.map((f) => (
                    <div key={f.q} className="py-5">
                      <dt className="font-display text-[17px] tracking-[-0.01em]">{f.q}</dt>
                      <dd className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/70">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {page.deliverables && (
              <div className="card">
                <h2 className="font-display text-[18px] tracking-[-0.01em]">What you get</h2>
                <ul className="mt-4 space-y-2.5">
                  {page.deliverables.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[14px] text-ink/75">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-azure-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {page.price && (
              <div className="rounded-2xl border border-azure-200 bg-azure-50 p-6">
                <p className="eyebrow">Starting at</p>
                <p className="mt-2 font-display text-[30px] tracking-[-0.02em] text-azure-700">{page.price}</p>
                {page.priceNote && <p className="mt-1 text-[13px] text-azure-600">{page.priceNote}</p>}
                <Link href="/quote" className="btn-primary mt-5 w-full">
                  Get a fixed quote
                </Link>
              </div>
            )}

            {page.related && page.related.length > 0 && (
              <div className="card">
                <h2 className="font-display text-[18px] tracking-[-0.01em]">Related</h2>
                <ul className="mt-4 space-y-2">
                  {page.related.map((href) => {
                    const target = getPage(href.replace(/^\//, ""));
                    if (!target) return null;
                    return (
                      <li key={href}>
                        <Link
                          href={href}
                          className="group flex items-start gap-2 text-[14px] text-ink/75 transition hover:text-azure-600"
                        >
                          <Icon name="arrow" className="mt-1 h-3.5 w-3.5 shrink-0 text-azure-400" />
                          <span>
                            {target.eyebrow}
                            <span className="block text-[12px] text-ink-mute">{target.h1}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="card">
              <h2 className="font-display text-[18px] tracking-[-0.01em]">Talk to us</h2>
              <p className="mt-2 text-[14px] text-ink/70">Fixed quotes in rand, usually back within a day.</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li>
                  <a href={`mailto:${site.email}`} className="text-azure-600 hover:underline">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${site.whatsapp.za.intl}`} className="text-azure-600 hover:underline">
                    WhatsApp SA {site.whatsapp.za.number}
                  </a>
                </li>
                <li>
                  <a href={`https://wa.me/${site.whatsapp.cn.intl}`} className="text-azure-600 hover:underline">
                    WhatsApp CN {site.whatsapp.cn.number}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CTA />
    </>
  );
}
