import React from "react";
import { useTranslations, useLocale } from "next-intl";
import hotelInfo from "@/content/hotel-info.json";

export default function ContactPage() {
    const t = useTranslations("Contact");
    const locale = useLocale();

    const displayAddress = hotelInfo.address[locale as keyof typeof hotelInfo.address] || hotelInfo.address.az;

    const waMessage =
        locale === "az"
            ? "Salam, Şəki Yaylası haqqında məlumat almaq istəyirəm."
            : "Hello, I would like to get information about Sheki Yaylasi.";

    const waLink = `https://wa.me/${hotelInfo.whatsapp.replace(/[+\s()-]/g, "")}?text=${encodeURIComponent(waMessage)}`;

    const contactItems = [
        {
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            label: t("address_label"),
            value: displayAddress,
            href: null,
        },
        {
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            label: t("phone_label"),
            value: hotelInfo.phone,
            href: `tel:${hotelInfo.phoneRaw}`,
        },
        {
            icon: (
                <svg className="w-6 h-6 text-forest" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.398 1.451 5.234 1.452 5.482.002 9.944-4.461 9.947-9.948.002-2.658-1.03-5.157-2.905-7.03C17.05 1.751 14.555.72 11.902.72 6.42.72 1.958 5.183 1.955 10.67c-.001 1.87.498 3.697 1.446 5.31L2.385 21.05l5.262-1.896zm12.062-7.29c-.33-.165-1.951-.963-2.251-1.073-.3-.11-.52-.165-.74.165-.22.33-.85 1.073-1.04 1.293-.19.22-.38.247-.71.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.954-1.83-2.284-.19-.33-.02-.508.145-.672.15-.148.33-.33.495-.495.165-.165.22-.275.33-.458.11-.183.055-.343-.027-.508-.08-.165-.74-1.786-1.013-2.446-.267-.643-.561-.557-.74-.557-.19 0-.41-.023-.63-.023-.22 0-.58.083-.88.413-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.18 3.19 1.34 3.41.16.22 2.32 3.54 5.62 4.97 1.97.85 2.75.95 3.73.8l.9-.533c.33-.195.33-.8-.01-.965" />
                </svg>
            ),
            label: t("whatsapp_label"),
            value: "WhatsApp",
            href: waLink,
        },
        {
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            label: t("email_label"),
            value: hotelInfo.email,
            href: `mailto:${hotelInfo.email}`,
        },
        {
            icon: (
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            label: t("hours_label"),
            value: t("hours_value"),
            href: null,
        },
    ];

    return (
        <main className="flex-1  bg-transparent py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Page Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-cream mb-3 block">
                        {locale === "az" ? "Bizimlə Əlaqə" : "Contact Details"}
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
                        {t("title")}
                    </h1>
                    <div className="w-20 h-1 bg-sage mx-auto mb-4 rounded-full" />
                    <p className="text-sm sm:text-base text-cream/80 font-medium leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Layout Grid: Contact Info (Left) + Map (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 flex flex-col gap-4">

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-3 mb-4">
                            <a
                                href={`tel:${hotelInfo.phoneRaw}`}
                                className="flex items-center justify-center gap-3 w-full py-4 bg-bark hover:bg-moss text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 shadow-md min-h-[44px] cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H4c-.8 0-1.5.7-1.5 1.5 0 9.7 7.8 17.5 17.5 17.5.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5z" />
                                </svg>
                                {locale === "az" ? "Zəng Edin" : "Call Now"}
                            </a>
                            <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full py-4 bg-moss hover:bg-forest text-cream font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 shadow-md min-h-[44px] cursor-pointer"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01 18.619.01 24 5.348 24 11.995c-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.73-1.455L0 24zm18.71-13.24c-.33-.165-1.952-.963-2.252-1.073-.3-.11-.52-.165-.74.165-.22.33-.851 1.073-1.04 1.293-.19.22-.381.247-.711.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.953-1.83-2.284-.19-.33-.02-.508.145-.672.15-.148.33-.33.495-.495.165-.165.22-.275.33-.458.11-.183.055-.343-.027-.508-.08-.165-.74-1.786-1.013-2.446-.267-.643-.561-.557-.74-.557-.19 0-.41-.023-.63-.023-.22 0-.58.083-.88.413-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.18 3.19 1.34 3.41.16.22 2.32 3.54 5.62 4.97 1.97.85 2.75.95 3.73.8l.9-.533c.33-.195.33-.8-.01-.965" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>

                        {/* Info cards */}
                        {contactItems.map((item, index) => (
                            <div
                                key={index}
                                className="bg-cream/90 p-5 rounded-2xl border border-sage/20 shadow-sm flex items-start gap-4 hover:border-sage/40 transition duration-250"
                            >
                                <div className="p-2.5 bg-sage/10 rounded-xl border border-sage/20 shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="text-xs font-bold uppercase tracking-widest text-muted font-sans">
                                        {item.label}
                                    </span>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="text-sm font-bold text-forest hover:text-moss transition truncate font-sans cursor-pointer"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <span className="text-sm font-semibold text-[#1A2E1A] font-sans leading-relaxed">
                                            {item.value}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Google Map */}
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <div className="bg-cream/90 rounded-2xl border border-sage/20 overflow-hidden shadow-sm w-full h-[500px] lg:h-[600px]">
                            <iframe
                                src={hotelInfo.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Şəki Yaylası ${locale === "az" ? "Xəritə" : "Map"}`}
                            />
                        </div>
                        <p className="text-xs text-cream/80 font-medium text-center font-sans">
                            {locale === "az"
                                ? "Xəritə Kiş kəndindəki otelin mövqeyini göstərir."
                                : "Map shows the resort's location in Kish village."}
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
