import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/site";

const stats = [
  { value: "R1,500", label: "Sites start here" },
  { value: "3–10 days", label: "Typical delivery" },
  { value: "5", label: "Countries served" },
  { value: "12 months", label: "Hosting included" },
];

export default function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-ink">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_42%] saturate-[.75]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,22,26,.97)_0%,rgba(20,22,26,.93)_34%,rgba(20,22,26,.62)_64%,rgba(20,22,26,.55)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,22,26,.9)_0%,rgba(20,22,26,.2)_38%,rgba(20,22,26,.96)_100%)]" />
      </div>

      <div className="shell relative flex min-h-[82vh] flex-col justify-center py-20 lg:py-28">
        <div className="animate-rise">
          <p className="eyebrow-dark">Web design studio — Pretoria, South Africa and China</p>
          <h1 className="mt-5 max-w-[15ch] font-display text-[40px] font-medium leading-[1.04] tracking-[-0.035em] text-white sm:text-[58px] lg:text-[70px]">
            If you can imagine it,{" "}
            <span className="text-azure-400">we can design it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-dim">
            6ixMedia SA designs and builds custom websites, online stores, brands and software
            for startups across South Africa and China. Packages from R1,500, with a year of
            hosting and a domain included.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/quote" className="btn-primary">
              Start your project
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <a href={`https://wa.me/${site.whatsapp.za.intl}`} className="btn-ghost-dark">
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp us
            </a>
          </div>
        </div>

        <dl className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[26px] leading-none text-azure-400 sm:text-[30px]">
                {s.value}
              </dd>
              <dd className="mt-2 text-[13px] text-ink-dim">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
