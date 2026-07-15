import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import RoomGallery from "@/components/rooms/RoomGallery";
import PriceBadge from "@/components/rooms/PriceBadge";
import ReservationCTA from "@/components/shared/ReservationCTA";
import roomsData from "@/content/rooms.json";
import { RoomType } from "@/components/rooms/RoomCard";

interface Props {
    params: Promise<{
        slug: string;
        locale: string;
    }>;
}

// Generate static params for prerendering room pages
export async function generateStaticParams() {
    const locales = ["az", "en"];
    return (roomsData as RoomType[]).flatMap((room) =>
        locales.map((locale) => ({
            locale,
            slug: room.slug,
        }))
    );
}

// Localized feature mapper
function getFeatureLabel(feature: string, locale: string): string {
    const dictionary: Record<string, Record<string, string>> = {
        "mountain-view": {
            az: "Möhtəşəm dağ mənzərəsi",
            en: "Stunning mountain view",
        },
        "forest-view": {
            az: "Hüzurverici meşə mənzərəsi",
            en: "Peaceful forest view",
        },
        balcony: {
            az: "Şəxsi eyvan (balkon)",
            en: "Private balcony",
        },
        "king-bed": {
            az: "Geniş iki nəfərlik çarpayı (King-size)",
            en: "King-size double bed",
        },
        "double-bed": {
            az: "Rahat iki nəfərlik çarpayı",
            en: "Comfortable double bed",
        },
        "free-wifi": {
            az: "Pulsuz yüksəksürətli Wi-Fi",
            en: "Free high-speed Wi-Fi",
        },
        "living-room": {
            az: "Geniş qonaq otağı sahəsi",
            en: "Spacious living room area",
        },
        "two-bedrooms": {
            az: "İki ayrı yataq otağı",
            en: "Two separate bedrooms",
        },
        kitchenette: {
            az: "Mini mətbəx guşəsi",
            en: "Small kitchenette",
        },
    };

    return dictionary[feature]?.[locale] || feature.replace("-", " ");
}

export default async function RoomDetailPage({ params }: Props) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: "RoomDetail" });
    const commonT = await getTranslations({ locale, namespace: "Common" });

    // Find room matching slug
    const room = (roomsData as RoomType[]).find((r) => r.slug === slug);
    if (!room) {
        notFound();
    }

    const name = room.name[locale as keyof typeof room.name] || room.name.az;
    const description = room.description[locale as keyof typeof room.description] || room.description.az;

    return (
        <main className="flex-1  bg-transparent py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Navigation Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/odalar"
                        className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-moss transition duration-200 group cursor-pointer"
                    >
                        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>{t("back_to_rooms")}</span>
                    </Link>
                </div>

                {/* Dynamic Detail Body Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                    {/* Main Info Column (Left 2 spans) */}
                    <div className="lg:col-span-2 flex flex-col gap-8">

                        {/* Room Title */}
                        <div>
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                                {name}
                            </h1>
                            {/* Size and Capacity Badges */}
                            <div className="flex gap-4 text-xs font-bold text-muted font-sans">
                                <span className="bg-cream/90 px-3.5 py-1.5 rounded-lg border border-sage/20 flex items-center gap-1.5 shadow-xs">
                                    Size: {room.size}
                                </span>
                                <span className="bg-cream/90 px-3.5 py-1.5 rounded-lg border border-sage/20 flex items-center gap-1.5 shadow-xs">
                                    Capacity: {commonT("people", { count: room.capacity })}
                                </span>
                            </div>
                        </div>

                        {/* Gallery Component */}
                        <RoomGallery images={room.images} roomName={name} />

                        {/* Description Text */}
                        <div className="bg-cream/90 p-6 sm:p-8 rounded-2xl border border-sage/20 shadow-xs">
                            <h3 className="font-serif text-xl font-extrabold text-white mb-4">
                                {locale === "az" ? "Otaq Haqqında" : "About the Room"}
                            </h3>
                            <p className="text-muted leading-relaxed font-sans text-sm sm:text-base font-medium">
                                {description}
                            </p>
                        </div>

                        {/* Amenities Checker */}
                        <div className="bg-cream/90 p-6 sm:p-8 rounded-2xl border border-sage/20 shadow-xs">
                            <h3 className="font-serif text-xl font-extrabold text-ink mb-6">
                                {t("amenities")}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {room.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3 text-sm font-bold text-ink font-sans leading-none">
                                        {/* Tick SVG */}
                                        <div className="bg-sage/10 p-1.5 rounded-lg text-forest border border-sage/20">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span>{getFeatureLabel(feature, locale)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sticky Sidebar Booking details (Right 1 span) */}
                    <div className="flex flex-col gap-6 w-full items-center lg:items-stretch">

                        {/* Pricing badge */}
                        <PriceBadge
                            min={room.priceRange.min}
                            max={room.priceRange.max}
                            currency={room.priceRange.currency}
                        />

                        {/* Direct call buttons dialog */}
                        <ReservationCTA roomName={name} />
                    </div>

                </div>

            </div>
        </main>
    );
}
