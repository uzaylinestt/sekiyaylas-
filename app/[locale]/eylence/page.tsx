"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import activitiesData from "@/content/activities.json";

interface Activity {
    slug: string;
    name: { az: string; en: string };
    shortDesc: { az: string; en: string };
    price: { amount: number; currency: string; per: string };
    duration: { az: string; en: string };
    difficulty: string;
    category: { az: string; en: string };
    tags: string[];
    image: string;
}

const difficultyColors: Record<string, string> = {
    easy: "bg-sage/20 text-forest",
    medium: "bg-bark/15 text-bark",
    hard: "bg-red-100 text-red-700",
};

export default function ActivitiesPage() {
    const t = useTranslations("Activities");
    const tHome = useTranslations("Home");
    const locale = useLocale();

    // Category filter values
    const categoriesList = [
        t("all_categories"),
        ...(activitiesData.categories[locale as "az" | "en"] || activitiesData.categories.az),
    ];

    const [activeCategory, setActiveCategory] = useState(t("all_categories"));

    const items: Activity[] = activitiesData.items as Activity[];

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
                        {locale === "az" ? "Dağ Həyatı" : "Mountain Life"}
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

                {/* Grid */}
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((activity) => (
                            <Link
                                key={activity.slug}
                                href={`/eylence/${activity.slug}`}
                               className="group bg-cream rounded-2xl border border-sage/20 overflow-hidden hover:shadow-lg hover:border-sage/40 transition duration-300 flex flex-col cursor-pointer"
                            >
                                {/* Media area */}
                               <div className="h-52 relative overflow-hidden shrink-0">
                                    <img src={activity.image} alt={activity.name[locale as "az" | "en"]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />

                                    {/* Difficulty badge */}
                                    <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[activity.difficulty] || difficultyColors.easy}`}>
                                        {t(`difficulty_${activity.difficulty}` as any)}
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                                        {activity.category[locale as "az" | "en"]}
                                    </span>
                                    <h3 className="font-serif text-xl font-bold text-ink leading-tight group-hover:text-forest transition duration-200">
                                        {activity.name[locale as "az" | "en"]}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed flex-1">
                                        {activity.shortDesc[locale as "az" | "en"]}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-sage/20 mt-2">
                                        <div className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                                            <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {activity.duration[locale as "az" | "en"]}
                                        </div>
                                        <span className="text-bark font-bold text-base">
                                            {activity.price.amount} {activity.price.currency}
                                            <span className="text-muted font-normal text-xs"> / {locale === "az" ? "nəfər" : "person"}</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
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
