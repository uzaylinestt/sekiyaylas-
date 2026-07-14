"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "./LanguageSwitcher";
import hotelInfo from "@/content/hotel-info.json";

export default function Header() {
    const t = useTranslations("Navigation");
    const commonT = useTranslations("Common");
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // GEMINI.md sitemap — added Media for Faz 3
    const navItems = [
        { name: t("home"), path: "/" },
        { name: t("rooms"), path: "/odalar" },
        { name: t("menu"), path: "/menu" },
        { name: t("activities"), path: "/eylence" },
        { name: t("media"), path: "/media" },
        { name: t("about"), path: "/haqqimizda" },
        { name: t("contact"), path: "/elaqe" },
    ];

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    return (
        <header
            className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
                ? "bg-forest/95 backdrop-blur-md shadow-lg"
                : "bg-forest/90 backdrop-blur-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="group flex flex-col cursor-pointer">
                    <span className="font-serif text-2xl font-black tracking-tight text-cream group-hover:text-sage transition duration-200">
                        {hotelInfo.name}
                    </span>
                    <span className="text-[9px] tracking-[0.28em] font-semibold text-sage/80 uppercase leading-none">
                        Yayla Resort
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-7">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`text-sm font-semibold tracking-wide transition duration-200 cursor-pointer ${isActive(item.path)
                                ? "text-cream border-b-2 border-sage pb-0.5"
                                : "text-sage/80 hover:text-cream"
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Right — Phone Icon + Lang Switcher */}
                <div className="hidden lg:flex items-center gap-2">
                    {/* Small phone icon (2A & 2B) */}
                    <a
                        href={`tel:${hotelInfo.phoneRaw}`}
                        className="text-cream hover:text-sage transition duration-200 cursor-pointer w-[44px] h-[44px] flex items-center justify-center group"
                        title={hotelInfo.phone}
                        aria-label="Call Us"
                    >
                        <svg className="w-5 h-5 fill-current shrink-0 group-hover:scale-110 transition duration-200" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H4c-.8 0-1.5.7-1.5 1.5 0 9.7 7.8 17.5 17.5 17.5.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5z" />
                        </svg>
                    </a>
                    <LanguageSwitcher />
                </div>

                {/* Mobile — Phone Icon + Lang Switcher + Hamburger */}
                <div className="flex items-center gap-1 lg:hidden">
                    {/* Small phone icon (2A & 2B) */}
                    <a
                        href={`tel:${hotelInfo.phoneRaw}`}
                        className="text-cream hover:text-sage transition duration-200 cursor-pointer w-[44px] h-[44px] flex items-center justify-center group"
                        title={hotelInfo.phone}
                        aria-label="Call Us"
                    >
                        <svg className="w-5 h-5 fill-current shrink-0 group-hover:scale-110 transition duration-200" viewBox="0 0 24 24">
                            <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.8-.7-1.5-1.5-1.5H4c-.8 0-1.5.7-1.5 1.5 0 9.7 7.8 17.5 17.5 17.5.8 0 1.5-.7 1.5-1.5v-3.5c0-.8-.7-1.5-1.5-1.5z" />
                        </svg>
                    </a>
                    <LanguageSwitcher />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-lg text-cream hover:bg-white/10 active:bg-white/20 transition duration-150 w-[44px] h-[44px] flex items-center justify-center cursor-pointer ml-1"
                        aria-label="Menu"
                        aria-expanded={isOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Full-screen Overlay */}
            {isOpen && (
                <div className="lg:hidden bg-forest border-t border-sage/20 shadow-2xl">
                    <div className="px-6 pt-4 pb-8 flex flex-col gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`py-4 px-4 font-bold text-lg tracking-wide rounded-xl transition duration-150 cursor-pointer ${isActive(item.path)
                                    ? "bg-white/10 text-cream border-l-4 border-sage"
                                    : "text-sage hover:text-cream hover:bg-white/5"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
