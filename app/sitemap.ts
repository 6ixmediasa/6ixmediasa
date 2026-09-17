import type { MetadataRoute } from "next";
import { pages } from "@/lib/pages";
import { projects, platforms, posts } from "@/lib/content";

export const dynamic = "force-static";
const BASE = "https://6ixmediasa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/our-work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...projects.map((p) => ({ url: `${BASE}/our-work/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...platforms.map((p) => ({ url: `${BASE}/platforms/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...pages.map((p) => ({ url: `${BASE}/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: p.slug.includes("/") ? 0.7 : 0.8 })),
  ];
}
