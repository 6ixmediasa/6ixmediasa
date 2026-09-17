import Link from "next/link";
import Icon from "@/components/Icon";

const routes = [
  { href: "/websites/web-design", label: "Web design", blurb: "Custom business websites" },
  { href: "/ecommerce/online-stores", label: "Online stores", blurb: "Sell from day one" },
  { href: "/design/branding", label: "Logo and branding", blurb: "A mark people remember" },
  { href: "/pricing", label: "Pricing", blurb: "The full price list" },
  { href: "/our-work", label: "Our work", blurb: "Projects we have shipped" },
  { href: "/quote", label: "Request a quote", blurb: "Fixed price, within a day" },
];

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[86vh] items-center overflow-hidden bg-ink">
      <div className="arc" aria-hidden="true">
        <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="absolute -right-32 -top-40 h-[160%] w-auto opacity-[0.2]">
          <path d="M600 740C600 400 780 100 1080 -20" fill="none" stroke="#2BA8E0" strokeWidth="34" strokeLinecap="round" opacity="0.5" />
          <path d="M680 760C680 420 860 120 1160 0" fill="none" stroke="#0E5A9B" strokeWidth="90" strokeLinecap="round" opacity="0.55" />
          <circle cx="742" cy="352" r="13" fill="#2BA8E0" />
        </svg>
      </div>

      <div className="shell relative py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-azure-400">Error 404</p>

        <p
          aria-hidden="true"
          className="mt-4 font-display text-[120px] font-medium leading-[0.82] tracking-[-0.06em] text-white/[0.07] sm:text-[190px]"
        >
          404
        </p>

        <h1 className="-mt-10 max-w-2xl font-display text-[34px] font-medium leading-[1.06] tracking-[-0.03em] text-white sm:-mt-16 sm:text-[52px]">
          We could design that page.
          <br />
          <span className="text-azure-400">It just does not exist yet.</span>
        </h1>

        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-dim">
          The link may be out of date, or the address slightly off. Here is where most people were
          heading.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group rounded-xl border border-ink-line bg-ink-soft p-4 transition hover:border-azure-400"
            >
              <p className="flex items-center justify-between text-[15px] font-medium text-white">
                {r.label}
                <Icon name="arrow" className="h-4 w-4 text-azure-400 transition group-hover:translate-x-1" />
              </p>
              <p className="mt-1 text-[13px] text-ink-mute">{r.blurb}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-ink-line pt-8">
          <Link href="/" className="btn-primary">
            Back to home
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/quote" className="btn-ghost-dark">
            Tell us what you were looking for
          </Link>
        </div>
      </div>
    </section>
  );
}
