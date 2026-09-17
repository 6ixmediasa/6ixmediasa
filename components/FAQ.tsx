"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import Icon from "./Icon";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="shell grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="h-section mt-4">The things people ask before they commit.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-mute">
            For anything not covered here, message us. We would rather answer a question now than
            have you find out later.
          </p>
          <img 
  src="/projects/2154831.svg" 
  alt="Cover" 
  className="mt-6 w-32 sm:w-48 md:w-56 lg:w-64 rounded-lg" 
/>
        </div>

        <dl className="divide-y divide-paper-edge border-y border-paper-edge">
          {faqs.map((f, i) => (
            <div key={f.q}>
              <dt>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[16px] font-medium">{f.q}</span>
                  <Icon
                    name="plus"
                    className={`h-4 w-4 shrink-0 text-azure-500 transition ${open === i ? "rotate-45" : ""}`}
                  />
                </button>
              </dt>
              {open === i && (
                <dd className="pb-6 pr-8 text-[15px] leading-relaxed text-ink-mute">{f.a}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
