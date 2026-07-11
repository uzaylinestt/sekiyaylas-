"use client";

import React, { use } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import activitiesData from "@/content/activities.json";
import hotelInfo from "@/content/hotel-info.json";

interface Activity {
    slug: string;
    name: { az: string; en: string };
    shortDesc: { az: string; en: string };
    description: { az: string; en: string };
    price: { amount: number; currency: string; per: string };
    duration: { az: string; en: string };
    schedule: { az: string; en: string };
    capacity: number;
    difficulty: "easy" | "medium" | "hard";
    category: { az: string; en: string };
    tags: string[];
    image: string;
    includes: { az: string[]; en: string[] };
}

const difficultyColors: Record<string, string> = {
    easy: "bg-sage/20 text-forest",
    medium: "bg-bark/15 text-bark",
    hard: "bg-red-100 text-red-700",
};

interface Props {
    params: Promise<{ slug: string }>;
}

export default function ActivityDetailPage({ params }: Props) {
    const { slug } = use(params);
    const t = useTranslations("Activities");
    const locale = useLocale();

    const items: Activity[] = activitiesData.items as any;
    const activity = items.find((item) => item.slug === slug);

    if (!activity) {
        return (
            <main className="flex-1  bg-transparent py-24 text-center">
                <div className="max-w-md mx-auto px-4">
                    <h1 className="font-serif text-3xl font-bold text-ink mb-4">
                        {locale === "az" ? "Fəaliyyət Tapılmadı" : "Activity Not Found"}
                    </h1>
                    <Link
                        href="/eylence"
                        className="inline-flex items-center justify-center px-6 py-3 bg-forest text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-200"
                    >
                        {t("back_to_activities")}
                    </Link>
                </div>
            </main>
        );
    }

    const waMessage = locale === "az"
        ? `Salam, "${activity.name.az}" fəaliyyətinə yazılmaq istəyirəm.`
        : `Hello, I want to join the "${activity.name.en}" activity.`;

    const waLink = `https://wa.me/${hotelInfo.phoneRaw.replace(/[+\s()-]/g, "")}?text=${encodeURIComponent(waMessage)}`;

    return (
        <main className="flex-1  bg-transparent py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Back button */}
                <div className="mb-8">
                    <Link
                        href="/eylence"
                        className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-moss transition duration-200 cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        {t("back_to_activities")}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Visual landscape card */}
                        <div className="relative h-[250px] sm:h-[400px] w-full rounded-3xl overflow-hidden border border-sage/20 bg-gradient-to-br from-forest/15 to-sage/20 flex items-center justify-center">
                            <svg className="w-20 h-20 text-sage/40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {/* Category badge */}
                            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur-md border border-sage/20 text-xs font-bold uppercase tracking-wider text-ink">
                                {activity.category[locale as "az" | "en"]}
                            </div>
                        </div>

                        {/* Title block */}
                        <div className="bg-cream/90 rounded-3xl border border-sage/20 p-8 flex flex-col gap-4">
                            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
                                {activity.name[locale as "az" | "en"]}
                            </h1>
                            <p className="text-sm font-medium text-bark uppercase tracking-widest">
                                {t("duration")}: {activity.duration[locale as "az" | "en"]}
                            </p>
                            <div className="w-12 h-1 bg-sage rounded-full" />
                            <p className="text-sm sm:text-base text-muted leading-relaxed font-sans font-medium">
                                {activity.description[locale as "az" | "en"]}
                            </p>
                        </div>

                        {/* Includes block */}
                        {activity.includes[locale as "az" | "en"]?.length > 0 && (
                            <div className="bg-cream/90 rounded-3xl border border-sage/20 p-8 flex flex-col gap-4">
                                <h3 className="font-serif text-lg font-bold text-ink">
                                    {t("includes")}
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {activity.includes[locale as "az" | "en"].map((inc, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-sm text-muted font-medium font-sans">
                                            <svg className="w-4 h-4 text-sage shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {inc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                    {/* Sidebar CTA Information (1 col) */}
                    <div className="flex flex-col gap-6">

                        {/* Reservation Box */}
                        <div className="bg-cream/90 rounded-3xl border border-sage/20 p-6 flex flex-col gap-6 shadow-sm">
                            <div>
                                <span className="text-xs font-bold text-muted uppercase tracking-widest block mb-1">
                                    {locale === "az" ? "Fəaliyyət Qiyməti" : "Activity Price"}
                                </span>
                                <span className="font-serif text-3xl font-black text-bark">
                                    {activity.price.amount} {activity.price.currency}
                                    <span className="text-sm font-sans font-normal text-muted"> / {locale === "az" ? "nəfər" : "person"}</span>
                                </span>
                            </div>

                            <hr className="border-sage/20" />

                            {/* Details meta */}
                            <div className="flex flex-col gap-4 text-xs font-medium text-muted">
                                <div className="flex items-center justify-between">
                                    <span>{t("schedule")}:</span>
                                    <span className="text-ink font-semibold">{activity.schedule[locale as "az" | "en"]}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>{t("capacity")}:</span>
                                    <span className="text-ink font-semibold">{activity.capacity} {locale === "az" ? "nəfər" : "people"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>{t("difficulty")}:</span>
                                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${difficultyColors[activity.difficulty]}`}>
                                        {t(`difficulty_${activity.difficulty}` as any)}
                                    </span>
                                </div>
                            </div>

                            <hr className="border-sage/20" />

                            {/* Actions — Only WhatsApp / Phone */}
                            <div className="flex flex-col gap-3">
                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-moss hover:bg-forest text-cream font-bold text-xs tracking-wider uppercase rounded-xl transition duration-200 shadow-md min-h-[44px] cursor-pointer"
                                >
                                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.398 1.451 5.234 1.452 5.482.002 9.944-4.461 9.947-9.948.002-2.658-1.03-5.157-2.905-7.03C17.05 1.751 14.555.72 11.902.72 6.42.72 1.958 5.183 1.955 10.67c-.001 1.87.498 3.697 1.446 5.31L2.385 21.05l5.262-1.896zm12.062-7.29c-.33-.165-1.951-.963-2.251-1.073-.3-.11-.52-.165-.74.165-.22.33-.85 1.073-1.04 1.293-.19.22-.38.247-.71.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.954-1.83-2.284-.19-.33-.02-.508.145-.672.15-.148.33-.33.495-.495.165-.165.22-.275.33-.458.11-.183.055-.343-.027-.508-.08-.165-.74-1.786-1.013-2.446-.267-.643-.561-.557-.74-.557-.19 0-.41-.023-.63-.023-.22 0-.58.083-.88.413-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.18 3.19 1.34 3.41.16.22 2.32 3.54 5.62 4.97 1.97.85 2.75.95 3.73.8l.9-.533c.33-.195.33-.8-.01-.965" />
                                    </svg>
                                    <span>{t("book_activity")}</span>
                                </a>
                                <a
                                    href={`tel:${hotelInfo.phoneRaw}`}
                                    className="flex items-center justify-center gap-2.5 w-full py-3.5 border-2 border-forest text-forest hover:bg-forest hover:text-cream font-bold text-xs tracking-wider uppercase rounded-xl transition duration-200 min-h-[44px] cursor-pointer"
                                >
                                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                        <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H4c-.8 0-1.5.7-1.5 1.5 0 9.7 7.8 17.5 17.5 17.5.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5z" />
                                    </svg>
                                    <span>{locale === "az" ? "Zəng Edin" : "Call Now"}</span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
