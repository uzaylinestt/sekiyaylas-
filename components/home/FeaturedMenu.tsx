import React from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import menuData from "@/content/menu.json";
import ScrollReveal from "@/components/shared/ScrollReveal";

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
    const t = useTranslations("Home");
    const locale = useLocale();

    // Show items with "popular" tag, max 3
    const popularItems = (menuData.items as MenuItem[])
        .filter((item) => item.tags.includes("popular"))
        .slice(0, 3);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8  bg-transparent">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {locale === "az" ? "Mətbəximizdən" : "From Our Kitchen"}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mb-4">
                        {t("featured_menu_title")}
                    </h2>
                    <div className="w-16 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
                        {t("featured_menu_subtitle")}
                    </p>
                </div>

                {/* Menu Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {popularItems.map((item, index) => (
                        <ScrollReveal key={item.slug} delay={index * 100}>
                            <div className="bg-cream/90 rounded-2xl border border-sage/20 overflow-hidden hover:shadow-lg hover:border-sage/40 transition duration-300 group h-full">
                                {/* Image placeholder with gradient */}
                                <div className="h-44 relative overflow-hidden">
                                    <img src={item.image} alt={item.name[locale as "az" | "en"]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    {/* Popular badge */}
                                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-bark text-cream text-[10px] font-bold uppercase tracking-wider">
                                        {locale === "az" ? "Populyar" : "Popular"}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col gap-2">
                                    {/* Category */}
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
                                        {item.category[locale as "az" | "en"]}
                                    </span>
                                    <h3 className="font-serif text-lg font-bold text-ink">
                                        {item.name[locale as "az" | "en"]}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed line-clamp-2">
                                        {item.description[locale as "az" | "en"]}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-sage/20 mt-1">
                                        <span className="font-serif text-xl font-bold text-bark">
                                            {item.price.amount} <span className="text-sm font-sans">{item.price.currency}</span>
                                        </span>
                                        <span className="text-xs text-muted">
                                            {locale === "az" ? "1 porsiya" : "1 serving"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* View Full Menu CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 cursor-pointer"
                    >
                        {locale === "az" ? "Tam Menyuya Bax" : "View Full Menu"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
