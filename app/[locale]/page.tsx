import React from "react";
import { useTranslations, useLocale } from "next-intl";
import HeroSection from "@/components/home/HeroSection";
import AmenitiesStrip from "@/components/home/AmenitiesStrip";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import ScrollPhotoStrip from "@/components/home/ScrollPhotoStrip";
import ReservationCTA from "@/components/shared/ReservationCTA";

export default function HomePage() {
  const t = useTranslations("Home");
  const locale = useLocale();

  return (
    <div className="flex-1 flex flex-col">

      {/* 1. Hero — tam ekran */}
      <HeroSection />

      {/* 2. ScrollPhotoStrip — Otaqlardan ƏVVƏL gəlir */}
      <ScrollPhotoStrip />

      {/* 3. Öne Çıxan Otaqlar */}
      <FeaturedRooms />

      {/* 4. Menyudan Seçmələr */}
      <FeaturedMenu />

      {/* 5. Öne Çıxan Aktivliklər */}
      <FeaturedActivities />

      {/* 6. Amenities Şeridi */}
      <AmenitiesStrip />

      {/* 7. CTA Bandı */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
        <ReservationCTA />
      </div>

    </div>
  );
}
