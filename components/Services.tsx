import Link from "next/link";
import { services } from "@/lib/site";
import Icon from "./Icon";

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="shell">
        <p className="eyebrow">What we do</p>
        <h2 className="h-section mt-4 max-w-2xl">
          Four things, done properly, instead of forty done thinly.
        </h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-mute">
          From a first logo to a full marketplace platform — designed, built and supported
          by one small team.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div key={s.title} className="card flex flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-azure-50 text-azure-600">
                <Icon name={s.icon} />
              </span>
              <h3 className="mt-5 font-display text-[19px] tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-mute">{s.body}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2 text-[13px] text-ink">
                    <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure-400" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-paper-edge pt-4">
                <span className="font-mono text-[12px] text-ink-mute">{s.price}</span>
                <Link
                  href={s.href}
                  className="inline-flex items-center gap-1 text-[13px] font-medium text-azure-600 hover:text-azure-500"
                >
                  Details
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
