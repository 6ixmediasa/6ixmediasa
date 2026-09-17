"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { projects, categories } from "@/lib/projects";

export default function PortfolioGrid() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter((p) => {
      const inCat = cat === "All" || p.category === cat;
      const inSearch =
        term === "" ||
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.industry.toLowerCase().includes(term) ||
        p.tagline.toLowerCase().includes(term);
      return inCat && inSearch;
    });
  }, [cat, q]);

  const tabs = ["All", ...categories];

  return (
    <>
      <div className="border-b border-paper-edge bg-paper">
        <div className="shell flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCat(t)}
                aria-pressed={cat === t}
                className={`rounded-full px-4 py-2 text-[13.5px] font-medium transition ${
                  cat === t
                    ? "bg-ink text-white"
                    : "border border-paper-edge bg-white text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects"
              aria-label="Search projects"
              className="w-full rounded-lg border border-paper-edge bg-white py-2.5 pl-10 pr-4 text-[14px] outline-none transition placeholder:text-ink-mute/70 focus:border-azure-400 focus:ring-2 focus:ring-azure-400/25"
            />
          </div>
        </div>
      </div>

      <div className="shell py-12 lg:py-16">
        <p className="text-[14px] text-ink-mute">
          Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {cat !== "All" && <> in {cat}</>}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-paper-edge py-20 text-center">
            <p className="font-display text-[20px]">Nothing matches that.</p>
            <p className="mt-2 text-[14px] text-ink/60">Try a different category or clear the search.</p>
            <button
              type="button"
              onClick={() => {
                setCat("All");
                setQ("");
              }}
              className="btn-ghost mt-6"
            >
              Show everything
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/our-work/${p.slug}`}
                className="group rounded-2xl border border-paper-edge bg-white p-5 transition hover:-translate-y-1 hover:border-azure-400"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-paper to-azure-50">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={`${p.name} — ${p.tagline}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="font-display text-[44px] font-medium text-azure-200 transition group-hover:text-azure-300">
                      {p.name.charAt(0)}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-[15px] font-medium leading-snug">{p.name}</p>
                <p className="mt-1 text-[12.5px] text-ink-mute">{p.category}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
