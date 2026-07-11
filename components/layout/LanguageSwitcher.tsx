"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: "az" | "en") => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 border border-sage/30 bg-white/10 p-0.5 rounded-lg">
            <button
                onClick={() => switchLocale("az")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition duration-200 cursor-pointer ${locale === "az"
                        ? "bg-sage text-forest shadow-sm"
                        : "text-sage/70 hover:text-cream"
                    }`}
                aria-label="Azərbaycan dili"
            >
                AZ
            </button>
            <button
                onClick={() => switchLocale("en")}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition duration-200 cursor-pointer ${locale === "en"
                        ? "bg-sage text-forest shadow-sm"
                        : "text-sage/70 hover:text-cream"
                    }`}
                aria-label="English"
            >
                EN
            </button>
        </div>
    );
}
