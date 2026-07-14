import React from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import MediaGrid from "@/components/media/MediaGrid";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Media" });
    return {
        title: t("title"),
        description: t("subtitle"),
    };
}

export default function MediaPage() {
    const t = useTranslations("Media");

    return (
        <main className="flex-1  bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        {t("title")}
                    </h1>
                    <div className="w-20 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-cream/80 font-medium leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <MediaGrid />
            </div>
        </main>
    );
}
