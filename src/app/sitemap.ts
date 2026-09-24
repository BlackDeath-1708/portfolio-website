import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";
import { posts } from "@/lib/writing";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/research", "/writing", "/about", "/contact"].map(
    (path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${siteConfig.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
