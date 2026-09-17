"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import Icon from "./Icon";

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const active = nav.find((g) => g.label === open);

  return (
    <header className="on-dark sticky top-0 z-50 bg-ink" ref={wrap}>
      <div className="shell flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
            priority
          />
          <span className="font-display text-[17px] tracking-[-0.01em] text-white">
            6ixMedia <span className="text-azure-400">SA</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-[14px] text-ink-dim transition hover:text-white"
          >
            Home
          </Link>
          {nav.map((g) => (
            <button
              key={g.label}
              onMouseEnter={() => setOpen(g.label)}
              onClick={() => setOpen(open === g.label ? null : g.label)}
              aria-expanded={open === g.label}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[14px] transition ${
                open === g.label ? "text-white" : "text-ink-dim hover:text-white"
              }`}
            >
              {g.label}
              <svg
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 transition ${open === g.label ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/quote" className="hidden btn-primary !px-4 !py-2 text-[14px] sm:inline-flex">
            Get a quote
          </Link>
          <button
            onClick={() => setMobile(!mobile)}
            aria-label="Menu"
            aria-expanded={mobile}
            className="rounded-lg p-2 text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {mobile ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {active && (
        <div
          onMouseLeave={() => setOpen(null)}
          className="absolute inset-x-0 top-full hidden border-t border-ink-line bg-paper shadow-lg lg:block"
        >
          <div className="shell py-8">
            <Link
              href={active.href}
              className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-azure-600 hover:text-azure-500"
            >
              View all {active.label.toLowerCase()}
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </Link>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 xl:grid-cols-4">
              {active.items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(null)}
                  className="group flex gap-3.5"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-azure-50 text-azure-600 transition group-hover:bg-azure-400 group-hover:text-azure-900">
                    <Icon name={it.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-medium text-ink group-hover:text-azure-600">
                      {it.label}
                    </span>
                    <span className="block text-[13px] leading-snug text-ink-mute">{it.blurb}</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-paper-edge pt-6">
              <p className="text-[13px] text-ink-mute">
                Not sure which one you need? Send us a message and we will point you at the right thing.
              </p>
              <Link href="/quote" className="btn-primary !px-4 !py-2 text-[14px]">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="max-h-[calc(100vh-68px)] overflow-y-auto border-t border-ink-line bg-ink pb-8 lg:hidden">
          <div className="shell">
            {nav.map((g) => (
              <div key={g.label} className="border-b border-ink-line">
                <button
                  onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                  aria-expanded={expanded === g.label}
                  className="flex w-full items-center justify-between py-4 text-left text-[15px] text-white"
                >
                  {g.label}
                  <Icon
                    name="plus"
                    className={`h-4 w-4 text-azure-400 transition ${expanded === g.label ? "rotate-45" : ""}`}
                  />
                </button>
                {expanded === g.label && (
                  <div className="space-y-3 pb-4">
                    {g.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={() => setMobile(false)}
                        className="block text-[14px] text-ink-dim"
                      >
                        {it.label}
                        <span className="block text-[12px] text-ink-mute">{it.blurb}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 space-y-3">
              <Link href="/quote" className="btn-primary w-full">
                Get a quote
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp.za.intl}`}
                className="btn-ghost-dark w-full"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
