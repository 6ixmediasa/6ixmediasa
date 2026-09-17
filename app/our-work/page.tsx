import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTA from "@/components/CTA";
import DocViewer from "@/components/DocViewer";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio | Web Design & Development Projects | 6ixMedia SA",
  description:
    "Websites, online stores, apps, software and branding delivered by 6ixMedia SA for businesses across South Africa and China.",
  alternates: { canonical: "/our-work" },
};

export default function OurWork() {
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
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
              <li>
                <Link href="/" className="transition hover:text-azure-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-azure-400">Our work</li>
            </ol>
          </nav>

          <p className="eyebrow-dark">Our work</p>
          <h1 className="mt-4 max-w-4xl font-display text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
            Our portfolio
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-dim">
            Browse {projects.length} projects across websites, online stores, apps, software and
            branding, for clients in South Africa and beyond.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/quote" className="btn-primary">
              Request a quote
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-ghost-dark">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <PortfolioGrid />

      <section className="border-t border-paper-edge bg-paper py-16 lg:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Portfolio document</p>
            <h2 className="h-section mt-4">Take the whole portfolio with you.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/75">
              Every project in one document — websites, apps, branding, print, packaging and
              more. Read it here, or download a copy to share with your team.
            </p>
          </div>
          <div className="mt-8">
            <DocViewer
              docs={[
                {
                  label: "Complete portfolio",
                  file: "/docs/our-work-portfolio.pdf",
                  note: "Every category, in one document",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
