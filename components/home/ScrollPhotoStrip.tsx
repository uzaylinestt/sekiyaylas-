"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import galleryPhotos from "@/content/gallery-photos.json";

interface GalleryPhoto {
    src: string;
    alt: { az: string; en: string };
}

export default function ScrollPhotoStrip() {
    const locale = useLocale();
    const scrollRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [progress, setProgress] = useState(0);

    const photos: GalleryPhoto[] = galleryPhotos as GalleryPhoto[];
    // Duplicate for seamless loop
    const allPhotos = [...photos, ...photos];

    const startAutoScroll = () => {
        intervalRef.current = setInterval(() => {
            if (!scrollRef.current) return;
            const el = scrollRef.current;
            const maxScroll = el.scrollWidth / 2; // half because duplicated
            if (el.scrollLeft >= maxScroll) {
                el.scrollLeft = 0;
            } else {
                el.scrollLeft += 2;
            }
            // Update progress bar
            setProgress((el.scrollLeft / maxScroll) * 100);
        }, 16); // ~60fps
    };

    const stopAutoScroll = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        startAutoScroll();
        return () => stopAutoScroll();
    }, []);

    return (
        <section className="py-16 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {locale === "az" ? "Bizimlə Tanış Olun" : "Get to Know Us"}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-ink mb-4">
                        {locale === "az" ? "Otelimizə Nəzər Salın" : "Take a Look at Our Hotel"}
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
                {allPhotos.map((photo, idx) => (
                    <div
                        key={idx}
                        className="relative shrink-0 h-[280px] sm:h-[380px] w-[260px] sm:w-[420px] rounded-2xl overflow-hidden border border-sage/20 shadow-md group"
                    >
                        <Image
                            src={photo.src}
                            alt={photo.alt[locale as "az" | "en"] || photo.alt.az}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="420px"
                            unoptimized
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-300" />
                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-cream text-sm font-semibold font-sans">
                                {photo.alt[locale as "az" | "en"] || photo.alt.az}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Progress indicator */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="h-0.5 bg-sage/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-sage rounded-full transition-all duration-100"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
