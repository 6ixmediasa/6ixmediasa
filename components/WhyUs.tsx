import { whyUs } from "@/lib/site";

export default function WhyUs() {
  return (
    <section className="py-24">
      <div className="shell">
        <p className="eyebrow">Why us</p>
        <h2 className="h-section mt-4 max-w-xl">
          A studio small enough to care, set up to work across two markets.
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <div key={w.title}>
              <h3 className="font-display text-[18px] tracking-[-0.01em]">{w.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-mute">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
