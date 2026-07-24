import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import hotelInfo from "@/content/hotel-info.json";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: {
      template: `%s | ${t("title")}`,
      default: t("title"),
    },
    description: t("subtitle"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} scroll-smooth h-full antialiased`}
    >
      <body className="relative min-h-screen flex flex-col text-ink font-sans bg-mist">
        {/* 1A & 1B — Fixed background image */}
        <div className="fixed inset-0 -z-10 select-none pointer-events-none">
          <Image
            src={hotelInfo.backgroundImage}
            alt="Şəki Yaylası Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            style={{ opacity: hotelInfo.backgroundImageOpacity }}
             
          />
        </div>

        {/* Page Content wrapper */}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="relative z-10 flex-1 flex flex-col transition-opacity duration-300 animate-fade-in-up">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
