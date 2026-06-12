import type { MetadataRoute } from "next";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  return navLinks.map((l) => ({
    url: `${base}${l.href === "/" ? "" : l.href}`,
    changeFrequency: l.href === "/" ? "daily" : "weekly",
    priority: l.href === "/" ? 1 : 0.7,
  }));
}
