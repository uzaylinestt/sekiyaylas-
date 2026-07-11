import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import activitiesData from "@/content/activities.json";
import ScrollReveal from "@/components/shared/ScrollReveal";

interface Activity {
    slug: string;
    name: { az: string; en: string };
    shortDesc: { az: string; en: string };
    price: { amount: number; currency: string; per: string };
    duration: { az: string; en: string };
    difficulty: string;
    tags: string[];
    image: string;
}

const difficultyColors: Record<string, string> = {
    easy: "bg-sage/20 text-forest",
    medium: "bg-bark/15 text-bark",
    hard: "bg-red-100 text-red-700",
};

export default function FeaturedActivities() {
    const t = useTranslations("Home");
    const tAct = useTranslations("Activities");
    const locale = useLocale();

    const featured = (activitiesData.items as Activity[]).slice(0, 3);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {locale === "az" ? "Aktivliklər" : "Activities"}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mb-4">
                        {t("featured_activities_title")}
                    </h2>
                    <div className="w-16 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
                        {t("featured_activities_subtitle")}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featured.map((activity, index) => (
                        <ScrollReveal key={activity.slug} delay={index * 100}>
                            <Link
                                href={`/eylence/${activity.slug}`}
                                className="group  bg-cream rounded-2xl border border-sage/20 overflow-hidden hover:shadow-lg hover:border-sage/40 transition duration-300 cursor-pointer flex flex-col h-full"
                            >
                                {/* Image placeholder */}
                                <div className="relative h-52 overflow-hidden">
                                     <img src={activity.image} alt={activity.name[locale as "az" | "en"]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    {/* Difficulty badge */}
                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${difficultyColors[activity.difficulty] || difficultyColors.easy}`}>
                                        {tAct(`difficulty_${activity.difficulty}` as any)}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col gap-3 flex-1">
                                    <h3 className="font-serif text-lg font-bold text-ink group-hover:text-forest transition duration-200">
                                        {activity.name[locale as "az" | "en"]}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed flex-1">
                                        {activity.shortDesc[locale as "az" | "en"]}
                                    </p>

                                    {/* Meta row */}
                                    <div className="flex items-center justify-between pt-3 border-t border-sage/20">
                                        <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {activity.duration[locale as "az" | "en"]}
                                        </div>
                                        <span className="text-bark font-bold text-sm">
                                            {activity.price.amount} {activity.price.currency}
                                            <span className="text-muted font-normal text-xs"> / {locale === "az" ? "nəfər" : "person"}</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>

                {/* View all CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/eylence"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 cursor-pointer"
                    >
                        {locale === "az" ? "Bütün Aktivliklər" : "All Activities"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
