import React from "react";
import { useLocale } from "next-intl";

interface SectionHeaderProps {
    az: string;
    en: string;
    subtitle?: boolean;
}

export default function SectionHeader({ az, en, subtitle = true }: SectionHeaderProps) {
    const locale = useLocale();
    const isAz = locale === "az";

    return (
        <div className="text-center max-w-2xl mx-auto mb-16 mt-20">
            {subtitle && (
                <span className="text-xs font-bold uppercase tracking-widest text-cream mb-3 block">
                    {isAz ? "Bizimlə Tanış Olun" : "Get to Know Us"}
                </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                {isAz ? az : en}
            </h2>
            <div className="w-16 h-1 bg-sage mx-auto rounded-full" />
        </div>
    );
}
