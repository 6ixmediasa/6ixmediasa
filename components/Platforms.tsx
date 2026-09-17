import Link from "next/link";
import { platforms } from "@/lib/site";
import Icon from "./Icon";

export default function Platforms() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-dark">Ready-made platforms</p>
            <h2 className="h-section mt-4 max-w-xl text-white">
              Marketplace software, launched in weeks rather than years.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-dim">
            Eight platforms you can brand as your own. Built, hosted and supported by us.
            From R18,000.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <Link
              key={p.name}
              href={`/platforms/${p.name.toLowerCase()}`}
              className="group bg-ink p-6 transition hover:bg-ink-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-azure-900 text-azure-400">
                <Icon name={p.icon} className="h-[18px] w-[18px]" />
              </span>
              <h3 className="mt-5 font-display text-[17px] text-white group-hover:text-azure-400">
                {p.name}
              </h3>
              <p className="mt-1.5 text-[13px] leading-snug text-ink-mute">{p.what}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
