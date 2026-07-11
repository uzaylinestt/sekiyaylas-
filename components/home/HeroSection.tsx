import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HeroSection() {
    const t = useTranslations("Home");

    return (
        <section className="relative h-[100vh] w-full flex items-center justify-center bg-ink text-cream overflow-hidden">
            {/* Background Image */}
            <Image
                src="/images/hero/arxa.fonn.jpg"
                alt="Şəki Yaylası Dağ Mənzərəsi"
                fill
                priority
                className="object-cover object-center scale-[1.03] transition-transform duration-[8000ms] ease-out"
                sizes="100vw"
            />

            {/* Dark overlay — forest gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-forest/40 z-10" />

            {/* Hero Content */}
            <div className="relative z-20 text-center max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-sage">
                        {t("title") === "Şəki Yaylası" ? "Dağlarda Möhtəşəm Qaçış" : "Grand Mountain Retreat"}
                    </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.05] drop-shadow-lg text-cream">
                    {t("title")}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-xl text-cream/80 max-w-2xl mx-auto font-sans leading-relaxed mb-10 drop-shadow-sm">
                    {t("subtitle")}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/odalar"
                        className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-bark hover:bg-moss text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 hover:-translate-y-0.5 shadow-lg active:translate-y-0 min-h-[44px] cursor-pointer"
                    >
                        {t("cta_rooms")}
                    </Link>
                    <Link
                        href="/elaqe"
                        className="flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-cream border border-white/30 backdrop-blur-md font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 hover:-translate-y-0.5 min-h-[44px] cursor-pointer"
                    >
                        {t("cta_contact")}
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
                <div className="flex flex-col items-center gap-1">
                    <span className="text-cream/40 text-[10px] font-bold uppercase tracking-widest">
                        {t("title") === "Şəki Yaylası" ? "Kəşf et" : "Scroll"}
                    </span>
                    <svg className="w-5 h-5 text-cream/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
