import React from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("About");
    const locale = useLocale();

    const highlights = [
        {
            icon: (
                <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: locale === "az" ? "Ecazkar Mövqe" : "Magical Location",
            desc: locale === "az"
                ? "Kiş kəndi, Qafqazın ən qədim yaşayış məskənlərindən biri. Qədim Alban Məbədindən yalnız addımlar uzaqda."
                : "Kish village, one of the Caucasus's oldest settlements — just steps away from the ancient Albanian Temple.",
        },
        {
            icon: (
                <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            title: locale === "az" ? "Premium Xidmət" : "Premium Service",
            desc: locale === "az"
                ? "Sizin hər ehtiyacınızı qayğı, gülərüz və dürüstlüklə qarşılamağı özümüzə borc bilirik."
                : "We consider it our duty to meet your every need with care, warmth, and sincerity.",
        },
        {
            icon: (
                <svg className="w-7 h-7 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            title: locale === "az" ? "Autentik Azərbaycan" : "Authentic Azerbaijan",
            desc: locale === "az"
                ? "Yeməklərimizdən dekorumuza, musiqimizdən mənzərəmizə qədər hər detalda Azərbaycanın lüks ruhu yaşayır."
                : "From our cuisine to our décor, from our music to our scenery — the luxury soul of Azerbaijan lives in every detail.",
        },
    ];

    return (
        <main className="flex-1  bg-transparent">

            {/* Hero Banner */}
            <section className="relative h-[45vh] w-full overflow-hidden bg-ink">
                <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
                    alt="Beautiful Kish village Sheki mountain scenery"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/35 to-ink/75" />
                <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                    <div className="text-center text-cream">
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 drop-shadow-md">
                            {t("title")}
                        </h1>
                        <p className="text-sage text-base sm:text-lg max-w-xl mx-auto font-medium leading-relaxed">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream/90">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left visual */}
                    <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-sage/20 bg-mist group">
                        <div className="absolute inset-0 bg-forest/5 z-10" />
                        <Image
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                            alt="Sheki Yaylasi resort building"
                            fill
                            sizes="(max-width: 1024px) 100vw, 560px"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                    </div>

                    {/* Right text content */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-bark mb-2 block">
                                {locale === "az" ? "Tariximiz" : "Our History"}
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight mb-4">
                                {t("story_title")}
                            </h2>
                            <div className="w-14 h-1 bg-sage rounded-full mb-6" />
                        </div>
                        <p className="text-muted leading-relaxed font-sans text-sm sm:text-base font-medium">
                            {t("story_text")}
                        </p>
                        <p className="text-muted leading-relaxed font-sans text-sm sm:text-base font-medium">
                            {locale === "az"
                                ? "Müasir komfort imkanlarını qoruyaraq, Azərbaycan kənd həyatının orijinal toxumasını və isti qonaqpərvərliyini sizi hər an hiss etdirməyi qarşımıza məqsəd qoymuşuq. Şəki Yaylasında keçirdiyiniz hər gün, bir unudulmaz xatirəyə çevrilsin istəyirik."
                                : "While preserving all modern amenities, our mission is to let you feel the authentic fabric of Azerbaijani village life and its warm hospitality at every moment. We want every day you spend at Sheki Yaylasi to become an unforgettable memory."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Highlights Pillars */}
            <section className="py-20 px-4 sm:px-6 lg:px-8  bg-transparent border-y border-sage/20">
                <div className="max-w-7xl mx-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-center text-ink mb-12">
                        {locale === "az" ? "Bizi Fərqli Edən Nədir?" : "What Makes Us Different?"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {highlights.map((h, index) => (
                            <div
                                key={index}
                                className="bg-cream/90 p-8 rounded-2xl border border-sage/20 shadow-sm flex flex-col gap-4 hover:shadow-md hover:border-sage/40 transition duration-300 group"
                            >
                                <div className="p-3 bg-sage/10 rounded-xl w-fit group-hover:bg-sage/20 transition duration-300">
                                    {h.icon}
                                </div>
                                <h4 className="font-serif text-lg font-bold text-ink">{h.title}</h4>
                                <p className="text-sm text-muted font-medium leading-relaxed font-sans">{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-forest text-cream">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "1400m", label: locale === "az" ? "Yüksəklik" : "Altitude" },
                        { value: "98%", label: locale === "az" ? "Təmiz Hava İndeksi" : "Clean Air Index" },
                        { value: "24/7", label: locale === "az" ? "Xidmət Rejimi" : "Service Hours" },
                        { value: "3", label: locale === "az" ? "Otaq Kateqoriyası" : "Room Categories" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <span className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-sage">
                                {stat.value}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#EFF5EE]/75">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}
