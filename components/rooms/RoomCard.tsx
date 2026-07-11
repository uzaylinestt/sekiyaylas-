"use client";

import React from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export interface RoomType {
    slug: string;
    name: { az: string; en: string };
    shortDesc: { az: string; en: string };
    description: { az: string; en: string };
    priceRange: { min: number; max: number; currency: string };
    size: string;
    capacity: number;
    features: string[];
    images: string[];
}

interface RoomCardProps {
    room: RoomType;
}

export default function RoomCard({ room }: RoomCardProps) {
    const locale = useLocale();
    const t = useTranslations("Common");

    const name = room.name[locale as keyof typeof room.name] || room.name.az;
    const shortDesc = room.shortDesc[locale as keyof typeof room.shortDesc] || room.shortDesc.az;

    const displayPrice = `${room.priceRange.min}-${room.priceRange.max} ${room.priceRange.currency}`;

    return (
        <div className="group flex flex-col bg-cream/90 rounded-2xl border border-sage/20 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">

            {/* Image container with zoom hover */}
            <div className="relative aspect-video w-full overflow-hidden bg-mist/50">
                <Image
                    src={room.images[0]}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-550 group-hover:scale-[1.03]"
                    unoptimized
                />

                {/* Price tag badge */}
                <div className="absolute top-4 left-4 bg-forest/90 backdrop-blur-md text-cream px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wider">
                    {displayPrice} / {t("per_night")}
                </div>
            </div>

            {/* Card Info */}
            <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-xl font-bold tracking-tight text-ink group-hover:text-forest transition mb-2">
                    {name}
                </h3>

                <p className="text-sm text-muted leading-relaxed font-sans mb-6 line-clamp-2">
                    {shortDesc}
                </p>

                {/* Room Specs features strip */}
                <div className="grid grid-cols-2 gap-4 border-t border-sage/20 pt-4 mt-auto mb-6 text-xs text-muted font-semibold font-sans">
                    <div className="flex items-center gap-1.5">
                        {/* Area icon */}
                        <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <span>{room.size}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        {/* User capacity icon */}
                        <svg className="w-4 h-4 text-sage" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span>{t("people", { count: room.capacity })}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <Link
                        href={`/odalar/${room.slug}`}
                        className="flex items-center justify-center w-full py-3 border-2 border-forest hover:bg-forest hover:text-cream text-forest font-bold text-xs uppercase tracking-wider rounded-xl transition duration-200 cursor-pointer min-h-[44px]"
                    >
                        {t("details")}
                    </Link>
                </div>
            </div>
        </div>
    );
}
