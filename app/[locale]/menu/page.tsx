"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import menuData from "@/content/menu.json";

interface MenuItem {
    slug: string;
    name: { az: string; en: string };
    description: { az: string; en: string };
    price: { amount: number; currency: string };
    image: string;
    category: { az: string; en: string };
    tags: string[];
}

export default function MenuPage() {
    const t = useTranslations("Menu");
    const locale = useLocale();

    // Categories list based on active locale
    const categoriesList = [
        t("all_categories"),
        ...(menuData.categories[locale as "az" | "en"] || menuData.categories.az),
    ];

    const [activeCategory, setActiveCategory] = useState(t("all_categories"));

    const items: MenuItem[] = menuData.items as MenuItem[];

    // Filter items
    const filteredItems = items.filter((item) => {
        if (activeCategory === t("all_categories")) return true;
        const localizedCat = item.category[locale as "az" | "en"] || item.category.az;
        return localizedCat.toLowerCase() === activeCategory.toLowerCase();
    });

    return (
        <main className="flex-1  bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {locale === "az" ? "Ləzzət addımı" : "Delicious Journey"}
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-ink mb-4">
                        {t("title")}
                    </h1>
                    <div className="w-20 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categoriesList.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide rounded-xl border transition duration-200 cursor-pointer ${activeCategory === cat
                                ? "bg-forest border-forest text-cream shadow-xs"
                                : "bg-cream/90 border-sage/30 text-ink hover:border-sage/60 hover: bg-transparent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item) => (
                            <div
                                key={item.slug}
                                className="bg-cream/90 rounded-2xl border border-sage/20 overflow-hidden hover:shadow-lg hover:border-sage/40 transition duration-300 flex flex-col group"
                            >
                                {/* Photo placeholder with nature design */}
                                <div className="h-56 relative overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.name[locale as "az" | "en"]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />

                                    {/* Traditional / popular tag */}
                                    {item.tags.includes("popular") && (
                                        <span className="absolute top-4 left-4 px-2 py-1 rounded-full bg-bark text-cream text-[10px] font-bold uppercase tracking-wider">
                                            {t("popular")}
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                                        {item.category[locale as "az" | "en"]}
                                    </span>
                                    <h3 className="font-serif text-xl font-bold text-ink leading-tight">
                                        {item.name[locale as "az" | "en"]}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed flex-1">
                                        {item.description[locale as "az" | "en"]}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-sage/20 mt-2">
                                        <span className="font-serif text-2xl font-bold text-bark">
                                            {item.price.amount} <span className="text-sm font-sans">{item.price.currency}</span>
                                        </span>
                                        <span className="text-xs text-muted">
                                            {locale === "az" ? "1 porsiya" : "1 serving"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted">{t("no_items")}</p>
                    </div>
                )}

            </div>
        </main>
    );
}
