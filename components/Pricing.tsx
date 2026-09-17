import Link from "next/link";
import { pricing, addons } from "@/lib/site";
import Icon from "./Icon";

export default function Pricing() {
  return (
    <section id="pricing" className="border-y border-paper-edge bg-paper py-24">
      <div className="shell">
        <p className="eyebrow">Pricing</p>
        <h2 className="h-section mt-4 max-w-2xl">
          Once-off prices, quoted upfront, with no retainer hiding in the small print.
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-mute">
          Every website package includes twelve months of hosting and a free domain for the
          first year. What you see is what you pay.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-2xl bg-white p-6 ${
                p.featured ? "border-2 border-azure-400" : "border border-paper-edge"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-azure-400 px-3 py-1 font-mono text-[11px] text-azure-900">
                  Most chosen
                </span>
              )}
              <h3 className="text-[14px] font-medium text-ink-mute">{p.name}</h3>
              <p className="mt-3 font-display text-[34px] tracking-[-0.02em]">{p.price}</p>
              <p className="font-mono text-[12px] text-ink-mute">{p.unit}</p>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-mute">{p.best}</p>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-paper-edge pt-5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-[13px]">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className={`mt-6 w-full ${p.featured ? "btn-primary" : "btn-ghost"}`}
              >
                Get a quote
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-paper-edge bg-white p-7">
          <h3 className="font-display text-[19px]">Everything else</h3>
          <dl className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map((a) => (
              <div
                key={a.name}
                className="flex items-baseline justify-between gap-3 border-b border-paper-edge pb-2.5"
              >
                <dt className="text-[14px]">{a.name}</dt>
                <dd className="font-mono text-[13px] text-azure-600">{a.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
