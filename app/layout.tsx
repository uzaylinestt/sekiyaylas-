import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://sekiyaylasi.az"),
    title: {
        default: "Şəki Yaylası — Lüks Dağ Otel",
        template: "%s | Şəki Yaylası",
    },
    description:
        "Şəki Yaylası — Füsunkar dağ mənzərəsindəki lüks istirahət. Rezervasyon üçün bizimlə əlaqə saxlayın.",
    openGraph: {
        type: "website",
        locale: "az_AZ",
        alternateLocale: "en_US",
        siteName: "Şəki Yaylası",
    },
};

// Root layout: redirects are handled by middleware to /[locale]
// This file is required by Next.js but the actual layout lives in app/[locale]/layout.tsx
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
