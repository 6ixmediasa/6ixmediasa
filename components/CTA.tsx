import Link from "next/link";
import { site } from "@/lib/site";
import Icon from "./Icon";

export default function CTA() {
  return (
    <section className="on-dark relative overflow-hidden bg-azure-600">
      <div className="arc" aria-hidden="true">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-20">
          <path d="M-100 420C200 420 380 180 700 40" fill="none" stroke="#fff" strokeWidth="70" strokeLinecap="round" />
        </svg>
      </div>

      <div className="shell relative py-20 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[32px] leading-tight tracking-[-0.02em] text-white sm:text-[42px]">
          Tell us what you are building.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed text-azure-100">
          Domain, hosting, SSL and a design that makes the right first impression — handled
          by one team, in Pretoria and in China.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/quote" className="btn-primary !bg-white !text-azure-700 hover:!bg-azure-50">
            Get a free quote
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp.za.intl}`}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3 font-medium text-white transition hover:bg-white/10"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            {site.whatsapp.za.number}
          </a>
        </div>
      </div>
    </section>
  );
}
