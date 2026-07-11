import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import hotelInfo from "@/content/hotel-info.json";

export default function Footer() {
    const t = useTranslations("Navigation");
    const locale = useLocale();

    const navItems = [
        { name: t("home"), path: "/" },
        { name: t("rooms"), path: "/odalar" },
        { name: t("menu"), path: "/menu" },
        { name: t("activities"), path: "/eylence" },
        { name: t("about"), path: "/haqqimizda" },
        { name: t("contact"), path: "/elaqe" },
    ];

    const addressResolved =
        hotelInfo.address[locale as keyof typeof hotelInfo.address] ||
        hotelInfo.address.az;

    return (
        <footer className="bg-forest border-t border-sage/20 text-sage font-sans">

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="flex flex-col group cursor-pointer">
                        <span className="font-serif text-2xl font-black tracking-tight text-cream group-hover:text-sage transition duration-200">
                            {hotelInfo.name}
                        </span>
                        <span className="text-[9px] tracking-[0.28em] font-semibold text-sage/70 uppercase leading-none">
                            Yayla Resort
                        </span>
                    </Link>
                    <p className="text-sage/70 text-sm max-w-sm leading-relaxed mt-2">
                        {locale === "az"
                            ? "Şəkinin füsunkar Kiş kəndində, meşələrin qucağında yerləşən lüks və təbii istirahət məkanı."
                            : "A luxurious mountain resort in the historic Kish village of Sheki, surrounded by natural forest landscapes."}
                    </p>
                    {/* Social media */}
                    <div className="flex gap-3 mt-2">
                        <a
                            href={hotelInfo.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-10 h-10 rounded-full border border-sage/30 hover:border-sage bg-white/5 hover:bg-sage/20 flex items-center justify-center transition duration-300"
                        >
                            <svg className="w-4 h-4 fill-current text-sage" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z" />
                            </svg>
                        </a>
                        <a
                            href={hotelInfo.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="w-10 h-10 rounded-full border border-sage/30 hover:border-sage bg-white/5 hover:bg-sage/20 flex items-center justify-center transition duration-300"
                        >
                            <svg className="w-4 h-4 fill-current text-sage" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </a>
                        {/* WhatsApp */}
                        <a
                            href={hotelInfo.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="WhatsApp"
                            className="w-10 h-10 rounded-full border border-sage/30 hover:border-sage bg-white/5 hover:bg-sage/20 flex items-center justify-center transition duration-300"
                        >
                            <svg className="w-4 h-4 fill-current text-sage" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.398 1.451 5.234 1.452 5.482.002 9.944-4.461 9.947-9.948.002-2.658-1.03-5.157-2.905-7.03C17.05 1.751 14.555.72 11.902.72 6.42.72 1.958 5.183 1.955 10.67c-.001 1.87.498 3.697 1.446 5.31L2.385 21.05l5.262-1.896zm12.062-7.29c-.33-.165-1.951-.963-2.251-1.073-.3-.11-.52-.165-.74.165-.22.33-.85 1.073-1.04 1.293-.19.22-.38.247-.71.082-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.954-1.83-2.284-.19-.33-.02-.508.145-.672.15-.148.33-.33.495-.495.165-.165.22-.275.33-.458.11-.183.055-.343-.027-.508-.08-.165-.74-1.786-1.013-2.446-.267-.643-.561-.557-.74-.557-.19 0-.41-.023-.63-.023-.22 0-.58.083-.88.413-.3.33-1.15 1.127-1.15 2.748 0 1.62 1.18 3.19 1.34 3.41.16.22 2.32 3.54 5.62 4.97 1.97.85 2.75.95 3.73.8l.9-.533c.33-.195.33-.8-.01-.965" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-serif text-cream text-base font-bold tracking-wider mb-6">
                        {locale === "az" ? "Sürətli Keçidlər" : "Quick Links"}
                    </h4>
                    <nav className="flex flex-col gap-3 text-sm">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="text-sage/70 hover:text-cream transition duration-150 cursor-pointer w-fit"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-4">
                    <h4 className="font-serif text-cream text-base font-bold tracking-wider">
                        {locale === "az" ? "Bizimlə Əlaqə" : "Contact Us"}
                    </h4>
                    <div className="flex flex-col gap-3 text-sm text-sage/70">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-sage shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{addressResolved}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-sage shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href={`tel:${hotelInfo.phoneRaw}`} className="hover:text-cream transition duration-150">
                                {hotelInfo.phone}
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-sage shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href={`mailto:${hotelInfo.email}`} className="hover:text-cream transition duration-150">
                                {hotelInfo.email}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-sage/20 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-sage/50">
                    <p>
                        &copy; {new Date().getFullYear()} {hotelInfo.name}.{" "}
                        {locale === "az" ? "Bütün hüquqlar qorunur." : "All rights reserved."}
                    </p>
                    <span>{locale === "az" ? "Yayla mövsümü 2026" : "Yayla Season 2026"}</span>
                </div>
            </div>
        </footer>
    );
}
