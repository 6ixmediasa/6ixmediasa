import { process } from "@/lib/site";

export default function Process() {
  return (
    <section className="py-24">
      <div className="shell">
        <p className="eyebrow">How it works</p>
        <h2 className="h-section mt-4 max-w-xl">Four stages, and you know where you are in all of them.</h2>

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} className="border-t-2 border-azure-400 pt-5">
              <span className="font-mono text-[12px] text-ink-mute">Stage {i + 1}</span>
              <h3 className="mt-2 font-display text-[20px] tracking-[-0.01em]">{p.step}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-mute">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
