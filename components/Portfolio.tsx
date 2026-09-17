import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { projects } from "@/lib/projects";

/* Six projects on the home page. Full filtering lives on /our-work.
   To choose which six, reorder lib/projects.ts or set FEATURED below
   to an array of slugs. */
const FEATURED: string[] = [];

const shown = FEATURED.length
  ? (FEATURED.map((s) => projects.find((p) => p.slug === s)).filter(Boolean) as typeof projects)
  : projects.slice(0, 6);

export default function Portfolio() {
  return (
    <section id="work" className="border-y border-paper-edge bg-paper py-24">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="h-section mt-4 max-w-lg">The proof is in what we have shipped.</h2>
          </div>
          <Link href="/our-work" className="btn-ghost">
            View all {projects.length} projects
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <Link
              key={p.slug}
              href={`/our-work/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-paper-edge bg-white transition hover:-translate-y-1 hover:border-azure-400"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-azure-50 to-paper-edge/50">
                {p.cover ? (
                  <Image
                    src={p.cover}
                    alt={`${p.name} — ${p.tagline}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="font-display text-[52px] font-medium tracking-[-0.03em] text-azure-200 transition group-hover:text-azure-400">
                    {p.name.charAt(0)}
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="text-[15px] font-medium transition group-hover:text-azure-600">
                    {p.name}
                  </h3>
                  <p className="mt-0.5 text-[13px] leading-snug text-ink-mute">{p.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full bg-azure-50 px-2.5 py-1 font-mono text-[11px] text-azure-600">
                  {p.industry}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
