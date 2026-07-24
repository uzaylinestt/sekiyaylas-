"use client";

import React, { useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import menuData from "@/content/menu.json";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface MenuItem {
    slug: string;
    name: { az: string; en: string };
    description: { az: string; en: string };
    price: { amount: number; currency: string };
    tags: string[];
    image: string;
    category: { az: string; en: string };
}

export default function FeaturedMenu() {
    const locale = useLocale();
    const t = useTranslations("Home");
    const scrollRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const items = (menuData.items as MenuItem[]).filter(i => i.tags.includes("popular"));
    const allItems = [...items, ...items];

    const startAutoScroll = () => {
        intervalRef.current = setInterval(() => {
            if (!scrollRef.current) return;
            const el = scrollRef.current;
            const maxScroll = el.scrollWidth / 2;
            if (el.scrollLeft >= maxScroll) {
                el.scrollLeft = 0;
            } else {
                el.scrollLeft += 2;
            }
        }, 16);
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    return (
        <section className="py-24 bg-transparent overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-cream mb-3 block">
                        {locale === "az" ? "Mətbəximizdən" : "From Our Kitchen"}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        {t("featured_menu_title")}
                    </h2>
                    <div className="w-16 h-1 bg-sage mx-auto rounded-full" />
                </div>
            </div>

            {/* Scroll Strip */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: "auto" }}
                onMouseEnter={stopAutoScroll}
                onMouseLeave={startAutoScroll}
                onTouchStart={stopAutoScroll}
                onTouchEnd={startAutoScroll}
            >
                {allItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="relative shrink-0 h-[280px] sm:h-[380px] w-[260px] sm:w-[420px] rounded-2xl overflow-hidden border border-sage/20 shadow-md group"
                    >
                        <Image
                            src={item.image}
                            alt={item.name[locale as "az" | "en"]}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="420px"
                             
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/80 to-transparent">
                            <p className="text-cream text-sm font-bold">
                                {item.name[locale as "az" | "en"]}
                            </p>
                            <p className="text-cream/70 text-xs mt-1">
                                {item.price.amount} {item.price.currency}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
                <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-cream text-cream hover:bg-cream hover:text-forest font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300"
                >
                    {locale === "az" ? "Tam Menyuya Bax" : "View Full Menu"}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}