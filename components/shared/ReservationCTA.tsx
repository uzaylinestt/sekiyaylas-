import React from "react";
import { useTranslations, useLocale } from "next-intl";
import hotelInfo from "@/content/hotel-info.json";

interface ReservationCTAProps {
    roomName?: string;
}

export default function ReservationCTA({ roomName }: ReservationCTAProps) {
    const t = useTranslations("Home");
    const locale = useLocale();

    const waMessage = roomName
        ? (locale === "az"
            ? `Salam, Şəki Yaylasında "${roomName}" otağı haqqında rezervasiya etmək istəyirəm.`
            : `Hello, I would like to make a reservation for the "${roomName}" room at Sheki Yaylasi.`)
        : (locale === "az"
            ? "Salam, Şəki Yaylasında rezervasiya etmək istəyirəm."
            : "Hello, I would like to make a reservation at Sheki Yaylasi.");

    const waLink = `https://wa.me/${hotelInfo.phoneRaw.replace(/[+\s()-]/g, "")}?text=${encodeURIComponent(waMessage)}`;

    return (
        <section className="bg-forest py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-3xl">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-moss/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-sage/15 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Label */}
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sage mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                    {locale === "az" ? "Rezervasyon" : "Reservation"}
                    <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                </span>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-cream mb-4 leading-tight">
                    {t("cta_title")}
                </h2>

                {/* Subtitle */}
                <p className="text-sage/80 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                    {t("cta_subtitle")}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {/* Phone */}
                    <a
                        href={`tel:${hotelInfo.phoneRaw}`}
                        className="flex items-center justify-center gap-2.5 px-6 py-3 bg-bark hover:bg-moss text-cream font-bold text-xs tracking-wider uppercase rounded-xl transition duration-300 hover:-translate-y-0.5 shadow-lg min-h-[44px] cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H4c-.8 0-1.5.7-1.5 1.5 0 9.7 7.8 17.5 17.5 17.5.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5z" />
                        </svg>
                        <span>{hotelInfo.phone}</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2.5 px-6 py-3 bg-white/10 hover:bg-white/20 text-cream border border-white/25 backdrop-blur-sm font-bold text-xs tracking-wider uppercase rounded-xl transition duration-300 hover:-translate-y-0.5 min-h-[44px] cursor-pointer"
                    >
                        <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.398 1.451 5.234 1.452 5.482.002 9.944-4.461 9.947-9.948.002-2.658-1.03-5.157-2.905-7.03C17.05 1.751 14.555.72 11.902.72 6.42.72 1.958 5.183 1.955 10.67c-.001 1.87.498 3.697 1.446 5.31L2.385 21.05l5.262-1.896zm12.062-7.29c-.33-.165-1.951-.963-2.251-1.073-.3-.11-.52-.165-.74.165-.22.33-.85 1.073-1.04 1.293-.19.22-.38.247-.71.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.954-1.83-2.284-.19-.33-.02-.508.145-.672.15-.148.33-.33.495-.495.165-.165.22-.275.33-.458.11-.183.055-.343-.027-.508-.08-.165-.74-1.786-1.013-2.446-.267-.643-.561-.557-.74-.557-.19 0-.41-.023-.63-.023-.22 0-.58.083-.88.413-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.18 3.19 1.34 3.41.16.22 2.32 3.54 5.62 4.97 1.97.85 2.75.95 3.73.8l.9-.533c.33-.195.33-.8-.01-.965" />
                        </svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
