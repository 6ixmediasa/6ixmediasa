import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a Quote | Web Design Pretoria | 6ixMedia SA",
  description:
    "Request a free website design quote from 6ixMedia SA. Fixed prices in rand, no obligation. Email, WhatsApp South Africa or China.",
  alternates: { canonical: "/quote" },
};

const steps = [
  { n: "01", h: "You send the brief", b: "The form below, WhatsApp, or a plain email. Whatever suits you." },
  { n: "02", h: "We ask what is missing", b: "Two or three questions if the brief is unclear, rather than padding the price." },
  { n: "03", h: "You get a fixed number", b: "In rand, with a timeline, usually inside one working day." },
];

export default function QuotePage() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink">
        <div className="arc" aria-hidden="true">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute -right-24 -top-32 h-[150%] w-auto opacity-[0.16]">
            <path d="M600 640C600 340 780 80 1080 -20" fill="none" stroke="#2BA8E0" strokeWidth="34" strokeLinecap="round" opacity="0.5" />
            <path d="M680 660C680 360 860 100 1160 0" fill="none" stroke="#0E5A9B" strokeWidth="90" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>
        <div className="shell relative py-16 lg:py-24">
          <p className="eyebrow-dark">Get started</p>
          <h1 className="mt-4 max-w-3xl font-display text-[36px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:text-[50px]">
            Tell us what you are building.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-dim">
            Fill in the form and we will reply with a fixed price in rand, usually within a working day.
            No obligation, and no follow-up sequence if you decide against it.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`https://wa.me/${site.whatsapp.za.intl}`} className="btn-primary">
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp South Africa
            </a>
            <a href={`https://wa.me/${site.whatsapp.cn.intl}`} className="btn-ghost-dark">
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp China
            </a>
            <a href={`mailto:${site.email}`} className="btn-ghost-dark">
              <Icon name="mail" className="h-4 w-4" />
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <div>
            <h2 className="h-section">Send us the details</h2>
            <p className="mt-3 max-w-xl text-ink/70">
              Everything except your name, email and a short description is optional.
            </p>
            <div className="mt-8">
              <QuoteForm />
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card">
              <h2 className="font-display text-[18px] tracking-[-0.01em]">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="border-l-2 border-azure-200 pl-4">
                    <p className="font-mono text-[11px] tracking-[0.14em] text-azure-500">{s.n}</p>
                    <p className="mt-1 text-[15px] font-medium">{s.h}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink/65">{s.b}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-azure-200 bg-azure-50 p-6">
              <p className="eyebrow">Turnaround</p>
              <p className="mt-2 font-display text-[26px] tracking-[-0.02em] text-azure-700">3–10 days</p>
              <p className="mt-1 text-[13px] text-azure-600">
                Websites and logos. Apps take two to three weeks. Working to a deadline? Say so and we will build to it.
              </p>
            </div>

            <div className="card">
              <h2 className="font-display text-[18px] tracking-[-0.01em]">Prefer to browse first?</h2>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li>
                  <Link href="/pricing" className="text-azure-600 hover:underline">
                    See the full price list
                  </Link>
                </li>
                <li>
                  <Link href="/our-work" className="text-azure-600 hover:underline">
                    Look at our work
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-azure-600 hover:underline">
                    About the studio
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
