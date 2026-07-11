import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://sekiyaylasi.az";
    const locales = ["az", "en"];

    const pages = [
        { path: "", priority: 1.0, changeFreq: "monthly" as const },
        { path: "/odalar", priority: 0.9, changeFreq: "monthly" as const },
        { path: "/odalar/deluxe-sea-view", priority: 0.8, changeFreq: "monthly" as const },
        { path: "/odalar/standard-forest-view", priority: 0.8, changeFreq: "monthly" as const },
        { path: "/odalar/family-suite", priority: 0.8, changeFreq: "monthly" as const },
        { path: "/galeri", priority: 0.7, changeFreq: "monthly" as const },
        { path: "/hakkimizda", priority: 0.6, changeFreq: "yearly" as const },
        { path: "/iletisim", priority: 0.8, changeFreq: "yearly" as const },
    ];

    const entries: MetadataRoute.Sitemap = [];

    for (const locale of locales) {
        for (const page of pages) {
            entries.push({
                url: `${baseUrl}/${locale}${page.path}`,
                lastModified: new Date(),
                changeFrequency: page.changeFreq,
                priority: page.priority,
            });
        }
    }

    return entries;
}
