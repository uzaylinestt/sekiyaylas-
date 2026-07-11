import React from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AmenitiesStrip() {
    const t = useTranslations("Home");

    const amenities = [
        {
            key: "wifi",
            label: t("amenity_wifi"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8.24 14.76a6 6 0 017.51 0M5.42 11.93a10 10 0 0113.15 0M2.58 9.1a14 14 0 0118.85 0" />
                </svg>
            ),
        },
        {
            key: "pool",
            label: t("amenity_pool"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 17c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1M3 12c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1M3 7l5 3 4-6 4 6 5-3" />
                </svg>
            ),
        },
        {
            key: "breakfast",
            label: t("amenity_breakfast"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zm4-7v3M12 1v3M8 1v3" />
                </svg>
            ),
        },
        {
            key: "parking",
            label: t("amenity_parking"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7h5a3 3 0 010 6H9" />
                </svg>
            ),
        },
        {
            key: "view",
            label: t("amenity_view"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 21l8-14 8 14M11 13l3-3 4 4" />
                </svg>
            ),
        },
        {
            key: "restaurant",
            label: t("amenity_restaurant"),
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18M8 3c0 4 4 6 4 9s-4 5-4 9M16 3v6m0 0a3 3 0 003 3 3 3 0 01-3 3v6" />
                </svg>
            ),
        },
    ];

    return (
        <ScrollReveal>
            <section className="bg-cream/90 border-y border-sage/30 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h3 className="sr-only">{t("amenities_title")}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
                        {amenities.map((item) => (
                            <div
                                key={item.key}
                                className="flex flex-col items-center p-4  bg-transparent rounded-xl border border-sage/20 hover:border-sage/50 hover:shadow-sm transition duration-300 group"
                            >
                                <div className="p-3 bg-sage/15 rounded-lg group-hover:bg-sage/25 transition duration-300 mb-3">
                                    {item.icon}
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-ink text-center tracking-wide font-sans">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </ScrollReveal>
    );
}
