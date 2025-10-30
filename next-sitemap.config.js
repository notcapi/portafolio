/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://borjagalvan.dev",
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Single sitemap for small sites
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"], // Exclude API routes from sitemap

  // Custom priority and changefreq per route
  transform: async (config, path) => {
    // Homepage has highest priority
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Important pages
    if (path === "/projects" || path === "/about" || path === "/contact") {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    // Default for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/api/*"],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if needed in the future
    ],
  },
};
