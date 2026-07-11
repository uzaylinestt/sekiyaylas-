---
activation: always
---

# Otel Kataloq Saytı — Master Layihə Qaydaları v2

Sən bu layihənin baş mühəndisi və memarsən. Aşağıdakı qaydalar HƏR sessiyada,
HƏR tapşırıqda, HƏR zaman aktivdir. Heç bir qayda istifadəçinin icazəsi olmadan pozula bilməz.

---

## 1. LAYİHƏ KİMLİYİ

Bu **otel kataloq/tanıtım saytıdır**. E-ticarət saytı DEYİL.

**Saytda nə YOXdur — heç vaxt əlavə edilməyəcək:**
- Sifariş / ödəniş sistemi
- Rezervasyon formu, tarix seçici, təqvim
- İstifadəçi girişi / hesab sistemi
- Ayrıca qalereya səhifəsi (`/galeri` yoxdur)
- Blog, canlı chat, mürəkkəb CMS, Redux

**Rezervasyon yalnız belə işləyir:**
- `tel:+994XXXXXXXXX` — telefon zəngi
- `https://wa.me/994XXXXXXXXX` — WhatsApp

---

## 2. SAYT HARİTƏSİ

```
/                   → Ana səhifə
/odalar             → Otaq siyahısı
/odalar/[slug]      → Otaq detal
/menu               → Restoran menyusu
/eylence            → Aktivlik siyahısı
/eylence/[slug]     → Aktivlik detal
/haqqimizda         → Otel haqqında
/elaqe              → Əlaqə

QALEREYa SƏHİFƏSİ YOXDUR. Fotolar yalnız ana səhifədə scroll şeridi kimi göstərilir.
Hər səhifə /az və /en altında mövcuddur (next-intl middleware).
```

---

## 3. QOVLUQ STRUKTURU

```
otel-sitesi/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── odalar/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── menu/
│   │   │   └── page.tsx
│   │   ├── eylence/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── haqqimizda/
│   │   │   └── page.tsx
│   │   └── elaqe/
│   │       └── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedRooms.tsx
│   │   ├── FeaturedActivities.tsx
│   │   ├── FeaturedMenu.tsx
│   │   ├── ScrollPhotoStrip.tsx   ← ana səhifə foto scroll şeridi
│   │   └── AmenitiesStrip.tsx
│   ├── rooms/
│   │   ├── RoomCard.tsx
│   │   └── RoomGallery.tsx
│   ├── menu/
│   │   ├── MenuItemCard.tsx
│   │   └── MenuFilter.tsx
│   ├── activities/
│   │   ├── ActivityCard.tsx
│   │   └── ActivityFilter.tsx
│   └── shared/
│       ├── ReservationCTA.tsx
│       └── ImageLightbox.tsx
├── content/
│   ├── rooms.json
│   ├── menu.json
│   ├── activities.json
│   ├── gallery-photos.json     ← ana səhifə scroll şeridi üçün foto siyahısı
│   └── hotel-info.json
├── messages/
│   ├── az.json
│   └── en.json
├── public/
│   └── images/
│       ├── hero/
│       ├── rooms/
│       ├── menu/
│       ├── activities/
│       └── gallery/            ← scroll şeridindəki fotolar buradadır
├── types/
│   ├── room.ts
│   ├── menu.ts
│   └── activity.ts
├── i18n.ts
├── middleware.ts
├── tailwind.config.ts
└── next.config.js
```

---

## 4. VERİ MODELLƏRİ

### content/rooms.json
```json
[
  {
    "slug": "deluxe-bag-menzere",
    "name": { "az": "Deluxe Dağ Mənzərəli Otaq", "en": "Deluxe Mountain View Room" },
    "shortDesc": { "az": "Dağ mənzərəsi ilə sakit otaq.", "en": "Peaceful room with mountain view." },
    "priceRange": { "min": 150, "max": 200, "currency": "AZN" },
    "size": "32 m²",
    "capacity": 2,
    "features": ["mountain-view", "balcony", "king-bed", "free-wifi"],
    "images": ["/images/rooms/deluxe-1.jpg", "/images/rooms/deluxe-2.jpg"]
  }
]
```

### content/menu.json
```json
{
  "categories": {
    "az": ["Meze", "Şorbalar", "Əsas Yeməklər", "Dəniz Məhsulları", "Şirniyyat"],
    "en": ["Starters", "Soups", "Main Courses", "Seafood", "Desserts"]
  },
  "items": [
    {
      "slug": "lula-kebab",
      "category": { "az": "Əsas Yeməklər", "en": "Main Courses" },
      "name": { "az": "Lula Kabab", "en": "Lula Kebab" },
      "description": { "az": "Kömür üzərində əl ilə yoğrulmuş quzu əti.", "en": "Hand-minced lamb grilled over charcoal." },
      "price": { "amount": 32, "currency": "AZN" },
      "tags": ["popular", "grill"],
      "image": "/images/menu/lula-kebab.jpg"
    }
  ]
}
```

### content/activities.json
```json
{
  "categories": {
    "az": ["Açıq Hava", "Mədəniyyət", "Axşam", "Sağlamlıq"],
    "en": ["Outdoor", "Culture", "Evening", "Wellness"]
  },
  "items": [
    {
      "slug": "atcilik",
      "category": { "az": "Açıq Hava", "en": "Outdoor" },
      "name": { "az": "At Çapma Turu", "en": "Horse Riding Tour" },
      "shortDesc": { "az": "Dağ yolları boyunca at çapma.", "en": "Horse riding through mountain trails." },
      "description": { "az": "Tam açıqlama...", "en": "Full description..." },
      "duration": { "az": "2 saat", "en": "2 hours" },
      "price": { "amount": 60, "currency": "AZN", "per": "person" },
      "schedule": { "az": "Hər gün 09:00 və 16:00", "en": "Daily at 09:00 and 16:00" },
      "capacity": 8,
      "difficulty": "easy",
      "tags": ["outdoor", "popular", "family"],
      "image": "/images/activities/atcilik.jpg",
      "includes": {
        "az": ["Helmet", "Peşəkar bələdçi", "Sığorta", "Su"],
        "en": ["Helmet", "Professional guide", "Insurance", "Water"]
      }
    }
  ]
}
```

### content/gallery-photos.json
```json
[
  { "src": "/images/gallery/photo-1.jpg", "alt": { "az": "Otel bağçası", "en": "Hotel garden" } },
  { "src": "/images/gallery/photo-2.jpg", "alt": { "az": "Hovuz sahəsi", "en": "Pool area" } },
  { "src": "/images/gallery/photo-3.jpg", "alt": { "az": "Dağ mənzərəsi", "en": "Mountain view" } },
  { "src": "/images/gallery/photo-4.jpg", "alt": { "az": "Restoran", "en": "Restaurant" } },
  { "src": "/images/gallery/photo-5.jpg", "alt": { "az": "Otaq interyeri", "en": "Room interior" } },
  { "src": "/images/gallery/photo-6.jpg", "alt": { "az": "Axşam mənzərəsi", "en": "Evening view" } }
]
```
**Yeni foto əlavə etmək = bu JSON-a bir sətir əlavə et + şəkli `public/images/gallery/` qovluğuna koy. Kod dəyişikliyi lazım deyil.**

### content/hotel-info.json
```json
{
  "name": { "az": "Otel Adı", "en": "Hotel Name" },
  "phone": "+994XXXXXXXXX",
  "whatsapp": "994XXXXXXXXX",
  "address": { "az": "Ünvan, Azərbaycan", "en": "Address, Azerbaijan" },
  "email": "info@hotel.az",
  "social": {
    "instagram": "https://instagram.com/...",
    "facebook": "https://facebook.com/..."
  },
  "mapEmbedUrl": "https://maps.google.com/embed?..."
}
```
**Telefon/ünvan dəyişdirmək = yalnız bu faylı aç, dəyişdir. Başqa heç bir fayla toxunma.**

---

## 5. DİZAYN SİSTEMİ

### Rəng palitri — TƏBİƏTƏ UYĞUN YAŞıl tonlar
```
forest:   #2D4A2D   → əsas tünd yaşıl (header, footer, vurğu elementlər)
sage:     #7A9E7E   → orta yaşıl (ikincil elementlər, borderlər)
mist:     #EFF5EE   → çox açıq yaşıl-ağ (səhifə arka planı — BEYaz DEYİL)
moss:     #4A6741   → orta-tünd yaşıl (hover, aktiv vəziyyətlər)
bark:     #5C4A2A   → torpaq tonu (accent, CTA butonlar)
cream:    #FAFAF7   → çox açıq krem (kartların içi)
ink:      #1A2E1A   → tünd yaşıl-qara (əsas mətn)
muted:    #6B8F6E   → solğun yaşıl (ikincil mətn)
```

**tailwind.config.ts-də bu adlarla custom rəng kimi əlavə et. Heç bir yerdə hex kod
birbaşa yazılmasın — həmişə `bg-forest`, `text-sage`, `border-mist` kimi class adları.**

### Tipografiya
- **Başlıqlar:** Playfair Display — serif, zarif, təbiət-lüks hissi
- **Gövdə:** Inter — sade, oxunaqlı

### Layout qaydaları
- Səhifə arka planı: `bg-mist` — açıq yaşıl-ağ, **heç vaxt saf ağ `#FFFFFF` olmayacaq**
- Kartlar: `bg-cream` + `border-sage/30` — incə yaşıl kənar
- CTA butonlar: `bg-bark text-cream` (əsas) + `border-forest text-forest` (outline)
- Bol boşluq — hər bölmə arasında en az 80px padding
- Sticky header: scroll-da `bg-forest/95 backdrop-blur` → tam tünd yaşıl

---

## 6. ANA SƏHİFƏ BÖLMƏ SIRASI

```
1. HeroSection          — tam ekran (100vh), otel mənzərəsi, tünd overlay,
                          otel adı (Playfair, ağ, böyük), slogan, 2 CTA buton

2. Qısa Tanıtım         — split layout: sol mətn, sağ şəkil
                          otel haqqında 2-3 cümlə + "Ətraflı" linki

3. Öne Çıxan Otaqlar    — 3 otaq kartı, content/rooms.json-dan ilk 3

4. ScrollPhotoStrip     — ← YENİ: horizontal auto-scroll foto şeridi
                          Texniki: CSS scroll-snap + smooth horizontal scroll
                          Fotolar: content/gallery-photos.json-dan oxunur
                          Effekt: yavaş, avtomatik sürüşür, mouse hover-da dayanır
                          Mobilde: barmaq ilə sürüşdürmək olur (touch-scroll)

5. Öne Çıxan Aktivliklər — 3 aktivlik kartı, content/activities.json-dan ilk 3

6. Amenities Şeridi     — ikon + etiket yatay şerit (WiFi, Hovuz, Hamam, Parkinq...)

7. Menyudan Seçmələr    — 3-4 yemək kartı, content/menu.json-dan "popular" tag-lılar

8. CTA Bandı            — tünd yaşıl (`bg-forest`) zemin, ağ mətn:
                          "Rezervasyon üçün bizimlə əlaqə saxlayın"
                          Telefon butonu + WhatsApp butonu

9. Footer               — logo, ünvan, sürətli linklər, sosyal media, copyright
```

---

## 7. ScrollPhotoStrip KOMPONENTİ — Texniki Tələblər

```tsx
// components/home/ScrollPhotoStrip.tsx
// - content/gallery-photos.json-dan foto siyahısı alır
// - CSS: overflow-x-auto + scroll-smooth + scrollbar-hide
// - Fotolar: next/image, fixed height (400px desktop, 250px mobil), auto width
// - Avtomatik scroll: useEffect + setInterval ilə hər 3 saniyədə 300px sürüşür
// - Hover-da interval.clearInterval — dayanır
// - Touch/swipe dəstəyi: mobil üçün təbii scroll
// - Scroll indicator: alt hissədə incə progress xətti (sage rəngdə)
```

---

## 8. HEADER MENÜ

```
Logo  |  Ana Səhifə · Otaqlar · Menyu · Əyləncə · Haqqımızda · Əlaqə  |  AZ/EN  |  📞 Zəng
```

**Qalereya linki YOXdur** — ayrıca qalereya səhifəsi olmadığı üçün header-da da yeri yoxdur.
Mobil: hamburger → tam ekran overlay (`bg-forest`) → böyük ağ linklər → alt hissədə telefon.

---

## 9. MƏZMUNU DƏYIŞDIRMƏK — Sadə Qaydalar

| Nə dəyişdirmək istəyirsən | Nə etmək lazımdır |
|---|---|
| Yeni oda əlavə et | `content/rooms.json`-a obyekt əlavə et + şəkli `public/images/rooms/`-ə koy |
| Yeni yemək əlavə et | `content/menu.json` → `items` massivinə obyekt əlavə et + şəkl |
| Yeni aktivlik əlavə et | `content/activities.json` → `items`-ə obyekt əlavə et + şəkl |
| Yeni foto scroll şeridə əlavə et | `content/gallery-photos.json`-a bir sətir əlavə et + şəkli `public/images/gallery/`-ə koy |
| Telefon/WhatsApp dəyişdir | Yalnız `content/hotel-info.json` |
| Qiymət dəyişdir | Müvafiq JSON faylında `price` sahəsini dəyişdir |

**Heç bir halda TypeScript/TSX fayllarına toxunmaq lazım deyil.**

---

## 10. TEXNİKİ STANDARTLAR

- **Stack:** Next.js 14+ App Router · TypeScript · Tailwind CSS · next-intl
- **Şəkillər:** Həmişə `next/image` — `width`, `height`, `alt` məcburi
- **Komponentlər:** Kiçik, tək məsuliyyətli
- **Hardcode yasaq:** Heç bir mətn, qiymət, telefon component içinə yazılmır
- **i18n:** Hər yeni UI mətni həm `az.json` həm `en.json`-a əlavə edilir
- **Mobil:** min 44px touch hədəfi, mobile-first Tailwind class sırası

---

## 11. YASAQ SİYAHISI — İstifadəçi açıq istəmədikcə ETMƏ

- Rezervasyon formu əlavə etmə
- Ödəniş inteqrasiyası qoşma
- `/galeri` səhifəsi yarat (qalereya yalnız ana səhifə scroll şeridindədir)
- İstifadəçi girişi sistemi qur
- Blog, canlı chat, 3-cü tərəf widget əlavə et
- Arka planı saf ağ (`#FFFFFF`) et — həmişə `bg-mist` (#EFF5EE) olmalıdır
