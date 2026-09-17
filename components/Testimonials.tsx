"use client";

import { useState } from "react";
import { testimonials } from "@/lib/site";
import Icon from "./Icon";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const move = (d: number) => setI((n) => (n + d + testimonials.length) % testimonials.length);

  return (
    <section className="border-y border-paper-edge bg-paper py-24">
      <div className="shell max-w-3xl text-center">
        <p className="eyebrow">Reviews</p>
        <div className="mt-8 flex justify-center gap-1 text-azure-400" aria-label="Five stars">
          {[0, 1, 2, 3, 4].map((n) => (
            <Icon key={n} name="star" className="h-4 w-4" />
          ))}
        </div>
        <blockquote className="mt-6 font-display text-[24px] leading-snug tracking-[-0.02em] sm:text-[28px]">
          {t.quote}
        </blockquote>
        <p className="mt-6 text-[14px] font-medium">{t.name}</p>
        <p className="text-[13px] text-ink-mute">{t.role}</p>

        <div className="mt-9 flex items-center justify-center gap-3">
          <button onClick={() => move(-1)} aria-label="Previous review" className="btn-ghost !px-3 !py-2">
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>
          <span className="font-mono text-[12px] text-ink-mute">
            {i + 1} / {testimonials.length}
          </span>
          <button onClick={() => move(1)} aria-label="Next review" className="btn-ghost !px-3 !py-2">
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
