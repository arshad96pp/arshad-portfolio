import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/contact", ...projects.map((p) => `/work/${p.slug}`)];
  return routes.map((path) => ({ url: `${site.url}${path}` }));
}
