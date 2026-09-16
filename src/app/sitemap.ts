import type { MetadataRoute } from "next";
import { siteUrl } from "./layout";

/** Two routes, two audiences. `/` is the one that should rank. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/servicios`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
