import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import CTA from "@/components/CTA";
import DocViewer from "@/components/DocViewer";
import { pricing } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing | Website Design South Africa from R1,500",
  description:
    "Full price list for 6ixMedia SA. Websites from R1,500, logos from R450, online stores from R5,500, apps from R25,000. Once-off prices in rand, quoted upfront.",
  alternates: { canonical: "/pricing" },
};

const groups = [
  {
    label: "Websites",
    icon: "globe",
    rows: [
      ["Landing page", "1 page, WhatsApp button, hosting and domain", "R1,500", "3–10 days"],
      ["Business website", "Up to 5 pages, SEO setup, analytics", "R3,500", "3–10 days"],
      ["Website redesign", "Rebuild of an existing site", "From R3,000", "3–10 days"],
      ["Extra pages", "Added to any package", "R350 each", "1-2 days"],
    ],
  },
  {
    label: "Ecommerce",
    icon: "cart",
    rows: [
      ["Online store", "20 products, payment gateway, shipping rules", "R5,500", "3–10 days"],
      ["Wholesale and B2B portal", "Trade pricing, bulk ordering, approvals", "From R12,000", "2–3 weeks"],
      ["Multi-vendor marketplace", "Vendor storefronts, commissions, payouts", "From R12,000", "4–8 weeks"],
      ["Extra products loaded", "Per 50 products from your spreadsheet", "R450", "1—3 days"],
      ["Additional payment gateway", "PayFast, Yoco or Ozow", "R1,800", "1-2 weeks"],
    ],
  },
  {
    label: "Brand and design",
    icon: "palette",
    rows: [
      ["Logo design", "Unlimited revisions, vector files, social kit", "R450", "3–10 days"],
      ["Full brand identity", "Logo suite, colour, type, guidelines", "R2,500", "3–10 days"],
      ["Graphic design", "Flyers, menus, signage, packaging", "From R250", "By deadline"],
      ["Motion and video", "Promos, animated logos, social cuts", "From R2,500", "By deadline"],
      ["Pitch deck design", "Investor or sales decks", "From R1,200", "By deadline"],
    ],
  },
  {
    label: "Development",
    icon: "code",
    rows: [
      ["Mobile app", "iOS and Android, store submission handled", "From R10,000", "2–3 weeks"],
      ["Web application", "Portals, dashboards, workflow tools", "From R10,000", "Scoped"],
      ["Custom software", "Internal systems and integrations", "From R25,000", "Scoped"],
      ["Booking or membership system", "Scheduling, payments, reminders", "From R8,000", "2–3 weeks"],
    ],
  },
  {
    label: "Ongoing",
    icon: "chart",
    rows: [
      ["Website care plan", "Backups, updates, monitoring, small changes", "R450 / month", "Monthly"],
      ["SEO retainer", "Local SEO, content, reporting", "R2,500 / month", "Monthly"],
      ["Hosting and domain renewal", "After the free first year", "From R200", "Yearly"],
      ["Google and social ads management", "Excluding ad spend", "From R1,500 / month", "Monthly"],
    ],
  },
  {
    label: "China sourcing",
    icon: "truck",
    rows: [
      ["Supplier search and vetting", "Finding and checking factories", "Quoted per job", "By deadline"],
      ["Order consolidation", "Combining suppliers into one shipment", "Quoted per job", "By deadline"],
      ["Freight coordination", "Arranged to South Africa", "Quoted per job", "By shipment"],
    ],
  },
];

export default function PricingPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "6ixMedia SA price list",
    provider: { "@id": "https://6ixmediasa.com/#org" },
    itemListElement: groups.flatMap((g) =>
      g.rows.map(([name, desc, price]) => ({
        "@type": "Offer",
        name,
        description: desc,
        priceCurrency: "ZAR",
        price: price.replace(/[^0-9]/g, "") || undefined,
        category: g.label,
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="on-dark relative overflow-hidden bg-ink">
        <div className="arc" aria-hidden="true">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="absolute -right-24 -top-32 h-[150%] w-auto opacity-[0.16]">
            <path d="M600 640C600 340 780 80 1080 -20" fill="none" stroke="#2BA8E0" strokeWidth="34" strokeLinecap="round" opacity="0.5" />
            <path d="M680 660C680 360 860 100 1160 0" fill="none" stroke="#0E5A9B" strokeWidth="90" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>
        <div className="shell relative py-16 lg:py-24">
          <p className="eyebrow-dark">Pricing</p>
          <h1 className="mt-4 max-w-3xl font-display text-[36px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:text-[50px]">
            Once-off prices, in rand, quoted upfront.
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-dim">
            No retainer hiding in the small print and no surprise invoice at handover. Every website
            package includes hosting and a domain for the first year.
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
            {[
              ["R450", "Logos from"],
              ["R1,500", "Sites from"],
              ["3–10 days", "Typical delivery"],
              ["50%", "Deposit to start"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-[24px] text-azure-400 sm:text-[28px]">{v}</dd>
                <dd className="mt-1.5 text-[13px] text-ink-dim">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shell py-16 lg:py-20">
        <h2 className="h-section">Most popular packages</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((t) => (
            <article
              key={t.name}
              className={`relative rounded-2xl bg-white p-6 ${
                t.featured ? "border-2 border-azure-400 shadow-[0_18px_44px_-22px_rgba(41,169,224,.5)]" : "border border-paper-edge"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-azure-400 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-azure-900">
                  Most picked
                </span>
              )}
              <h3 className="font-display text-[19px] tracking-[-0.01em]">{t.name}</h3>
              <p className="mt-2 min-h-[40px] text-[13px] leading-relaxed text-ink/60">{t.best}</p>
              <p className="mt-4 font-display text-[34px] tracking-[-0.03em]">
                {t.price} <span className="text-[13px] font-normal text-ink-mute">{t.unit}</span>
              </p>
              <ul className="mt-5 space-y-2.5">
                {t.features.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[13.5px] text-ink/75">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-azure-500" />
                    {x}
                  </li>
                ))}
              </ul>
              <Link href="/quote" className={`mt-6 w-full ${t.featured ? "btn-primary" : "btn-ghost"}`}>
                Request a quote
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-20">
        <div className="shell">
          <h2 className="h-section">Full price list</h2>
          <p className="mt-3 max-w-2xl text-ink/70">
            Everything we offer. Where a price says &ldquo;from&rdquo;, the final number depends on scope —
            we quote it before starting, and it does not move afterwards.
          </p>

          <div className="mt-10 space-y-8">
            {groups.map((g) => (
              <div key={g.label} className="overflow-hidden rounded-2xl border border-paper-edge bg-white">
                <div className="flex items-center gap-3 border-b border-paper-edge px-6 py-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-azure-50 text-azure-600">
                    <Icon name={g.icon} className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="font-display text-[18px] tracking-[-0.01em]">{g.label}</h3>
                </div>
                <table className="w-full text-left">
                  <thead className="sr-only">
                    <tr>
                      <th>Service</th>
                      <th>What it includes</th>
                      <th>Price</th>
                      <th>Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map(([name, desc, price, time], i) => (
                      <tr key={name} className={i ? "border-t border-paper-edge" : ""}>
                        <td className="px-6 py-4 align-top">
                          <p className="text-[15px] font-medium">{name}</p>
                          <p className="mt-0.5 text-[13px] leading-relaxed text-ink/60">{desc}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right align-top font-mono text-[14px] text-azure-600">
                          {price}
                        </td>
                        <td className="hidden whitespace-nowrap px-6 py-4 text-right align-top text-[13px] text-ink-mute sm:table-cell">
                          {time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              ["Payment terms", "Half to book your slot in the schedule, half on launch. Larger builds split across milestones."],
              ["What is included", "Every website package comes with hosting and a domain for the first year, SSL, and handover training."],
              ["What is not included", "Ad spend, stock photography licences, and third-party subscriptions are billed at cost or paid by you directly."],
            ].map(([h, b]) => (
              <div key={h} className="rounded-2xl border border-paper-edge bg-white p-6">
                <h3 className="font-display text-[16px] tracking-[-0.01em]">{h}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{b}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[13px] text-ink-mute">
            Prices exclude VAT where applicable and are valid at time of quoting. Rush work outside
            normal turnaround may carry a surcharge, which we tell you about before you commit.
          </p>
        </div>
      </section>

      <section className="border-t border-paper-edge bg-white py-16 lg:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Price list document</p>
            <h2 className="h-section mt-4">Prefer it as a document?</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/75">
              The full price list as a PDF, including delivery times and payment terms. Read it
              here or download a copy. A version showing US dollars and Chinese yuan alongside
              the rand price is available too.
            </p>
          </div>
          <div className="mt-8">
            <DocViewer
              docs={[
                {
                  label: "Price list (ZAR)",
                  file: "/docs/pricing-price-list.pdf",
                  note: "Prices in South African rand",
                },
                {
                  label: "ZAR, USD and CNY",
                  file: "/docs/pricing-all-currencies.pdf",
                  note: "All three currencies in one document",
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
