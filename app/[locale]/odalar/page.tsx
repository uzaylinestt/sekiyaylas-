import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import RoomCard, { RoomType } from "@/components/rooms/RoomCard";
import roomsData from "@/content/rooms.json";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Rooms" });
    return {
        title: t("title"),
        description: t("subtitle"),
    };
}

export default function RoomsPage() {
    const t = useTranslations("Rooms");

    const allRooms = roomsData as RoomType[];

    return (
        <main className="flex-1  bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Block */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-bark mb-3 block">
                        {t("title") === "Otaqlar və Suitlər" ? "Premium Yaşayış" : "Premium Accommodation"}
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-ink mb-4">
                        {t("title")}
                    </h1>
                    <div className="w-20 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-muted font-medium leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Rooms Listing Grid */}
                {allRooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allRooms.map((room) => (
                            <RoomCard key={room.slug} room={room} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-muted font-semibold italic">{t("no_rooms")}</p>
                    </div>
                )}

            </div>
        </main>
    );
}
