import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import RoomCard, { RoomType } from "../rooms/RoomCard";
import roomsData from "@/content/rooms.json";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FeaturedRooms() {
    const t = useTranslations("Home");

    const featuredRooms = (roomsData as RoomType[]).slice(0, 3);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8  bg-transparent">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {t("title") === "Şəki Yaylası" ? "Premium Otaqlar" : "Premium Rooms"}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-ink mb-4">
                        {t("featured_rooms_title")}
                    </h2>
                    <div className="w-16 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
                        {t("featured_rooms_subtitle")}
                    </p>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredRooms.map((room, index) => (
                        <ScrollReveal key={room.slug} delay={index * 100}>
                            <RoomCard room={room} />
                        </ScrollReveal>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/odalar"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 cursor-pointer"
                    >
                        {t("title") === "Şəki Yaylası" ? "Bütün Otaqlar" : "All Rooms"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
