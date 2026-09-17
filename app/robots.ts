import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://6ixmediasa.com/sitemap.xml",
    host: "https://6ixmediasa.com",
  };
}
