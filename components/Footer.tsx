import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import Icon from "./Icon";

const columns = [
  { title: "Websites", key: "Websites" },
  { title: "Ecommerce", key: "Ecommerce" },
  { title: "Design", key: "Design" },
  { title: "Development", key: "Development" },
];

export default function Footer() {
  return (
    <footer className="on-dark bg-ink pt-20">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
              <span className="font-display text-[17px] text-white">
                6ixMedia <span className="text-azure-400">SA</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-mute">
              {site.tagline} A web design and development studio based in {site.base},
              working across {site.reach}.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`https://wa.me/${site.whatsapp.za.intl}`}
                className="flex items-center gap-2.5 text-[14px] text-ink-dim transition hover:text-azure-400"
              >
                <Icon name="whatsapp" className="h-4 w-4 text-azure-400" />
                {site.whatsapp.za.number}
                <span className="font-mono text-[11px] text-ink-mute">ZA</span>
              </a>
              <a
                href={`https://wa.me/${site.whatsapp.cn.intl}`}
                className="flex items-center gap-2.5 text-[14px] text-ink-dim transition hover:text-azure-400"
              >
                <Icon name="whatsapp" className="h-4 w-4 text-azure-400" />
                {site.whatsapp.cn.number}
                <span className="font-mono text-[11px] text-ink-mute">CN</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2.5 text-[14px] text-ink-dim transition hover:text-azure-400"
              >
                <Icon name="mail" className="h-4 w-4 text-azure-400" />
                {site.email}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((c) => {
              const group = nav.find((g) => g.label === c.key);
              return (
                <div key={c.key}>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                    {c.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group?.items.map((it) => (
                      <li key={it.href}>
                        <Link
                          href={it.href}
                          className="text-[14px] text-ink-dim transition hover:text-azure-400"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-ink-line py-7">
          <p className="text-[13px] text-ink-mute">
            © {new Date().getFullYear()} 6ixMedia SA. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-[13px] text-ink-mute transition hover:text-azure-400"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex gap-5">
            <Link href="/terms" className="text-[13px] text-ink-mute hover:text-azure-400">
              Terms
            </Link>
            <Link href="/privacy" className="text-[13px] text-ink-mute hover:text-azure-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
