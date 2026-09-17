import Link from "next/link";
import { site } from "@/lib/site";

export type LegalSection = { h: string; p: string[] };

export default function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink">
        <div className="shell relative py-14 lg:py-20">
          <p className="eyebrow-dark">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-[32px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[44px]">
            {title}
          </h1>
          <p className="mt-5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-mute">
            Last updated {updated}
          </p>
        </div>
      </section>

      <section className="shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-[17px] leading-relaxed text-ink/80">{intro}</p>
            <div className="mt-10 space-y-9">
              {sections.map((s, i) => (
                <article key={s.h} id={`s${i + 1}`}>
                  <h2 className="font-display text-[21px] tracking-[-0.015em]">
                    <span className="mr-3 font-mono text-[13px] text-azure-500">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </h2>
                  {s.p.map((para, j) => (
                    <p key={j} className="mt-3 text-[15.5px] leading-relaxed text-ink/75">
                      {para}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-paper-edge bg-paper p-6">
              <h2 className="font-display text-[17px] tracking-[-0.01em]">Questions about this page</h2>
              <p className="mt-2 text-[14px] text-ink/70">
                Email{" "}
                <a href={`mailto:${site.email}`} className="text-azure-600 hover:underline">
                  {site.email}
                </a>{" "}
                or WhatsApp {site.whatsapp.za.number} and a person will answer.
              </p>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <h2 className="font-display text-[16px] tracking-[-0.01em]">On this page</h2>
              <ol className="mt-4 space-y-2">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s${i + 1}`} className="flex gap-2.5 text-[13.5px] text-ink/70 transition hover:text-azure-600">
                      <span className="font-mono text-[11px] text-azure-400">{String(i + 1).padStart(2, "0")}</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card mt-5">
              <ul className="space-y-2 text-[13.5px]">
                <li><Link href="/terms" className="text-azure-600 hover:underline">Terms of service</Link></li>
                <li><Link href="/privacy" className="text-azure-600 hover:underline">Privacy policy</Link></li>
                <li><Link href="/pricing" className="text-azure-600 hover:underline">Pricing</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
