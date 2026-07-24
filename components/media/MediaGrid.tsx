"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import ImageLightbox from "@/components/shared/ImageLightbox";
import galleryData from "@/content/gallery-photos.json";

interface GalleryPhoto {
    src: string;
    alt: { az: string; en: string };
    category: string;
}

export default function MediaGrid() {
    const t = useTranslations("Media");
    const locale = useLocale();
    const photos = galleryData as GalleryPhoto[];

    const categoriesList = [
        "all",
        ...Array.from(new Set(photos.map((p) => p.category))),
    ];

    const [activeCategory, setActiveCategory] = useState("all");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Filter photos
    const filteredPhotos = photos.filter(
        (photo) => activeCategory === "all" || photo.category === activeCategory
    );

    // Flat array of strings for the lightbox
    const lightboxImages = filteredPhotos.map((p) => p.src);

    return (
        <section className="py-12">

            {/* Filter buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categoriesList.map((catKey) => {
                    const btnLabel = t(catKey);
                    const isActive = activeCategory === catKey;

                    return (
                        <button
                            key={catKey}
                            onClick={() => setActiveCategory(catKey)}
                            className={`px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide rounded-xl border transition duration-200 cursor-pointer ${isActive
                                    ? "bg-forest border-forest text-cream shadow-xs"
                                    : "bg-cream/90 border-sage/30 text-ink hover:border-sage/60 hover: bg-transparent"
                                }`}
                        >
                            {btnLabel}
                        </button>
                    );
                })}
            </div>

            {/* Masonry-Style Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredPhotos.map((photo, index) => (
                    <div
                        key={index}
                        className="break-inside-avoid bg-cream/90 border border-sage/20 rounded-2xl overflow-hidden hover:shadow-lg hover:border-sage/40 transition duration-300 group cursor-pointer flex flex-col"
                        onClick={() => setLightboxIndex(index)}
                    >
                        <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-bark/10 to-forest/15 overflow-hidden">
                            <Image
                                src={photo.src}
                                alt={photo.alt[locale as "az" | "en"]}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition duration-500"
                                 
                            />
                        </div>
                        <div className="p-4 flex flex-col">
                            <p className="text-sm font-semibold text-ink leading-snug">
                                {photo.alt[locale as "az" | "en"]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <ImageLightbox
                    images={lightboxImages}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                />
            )}
        </section>
    );
}
