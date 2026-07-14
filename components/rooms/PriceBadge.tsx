import React from "react";
import { useTranslations } from "next-intl";

interface PriceBadgeProps {
    min: number;
    max: number;
    currency: string;
}

export default function PriceBadge({ min, max, currency }: PriceBadgeProps) {
    const t = useTranslations("Common");

    return (
        <div className="inline-flex items-baseline gap-1 bg-cream border border-sage/20 rounded-xl px-5 py-3 text-ink shadow-xs w-full justify-center">
            <span className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-cream">
                {min} - {max} {currency}
            </span>
            <span className="text-xs sm:text-sm text-muted font-bold uppercase tracking-wider font-sans">
                / {t("per_night")}
            </span>
        </div>
    );
}
