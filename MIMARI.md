# Otel Web Sitesi — Mimari Plan

## 1. Site Amacı ve Kapsamı

- **Tip:** Katalog/tanıtım sitesi (e-ticaret değil, sipariş/ödeme yok)
- **Ana fonksiyon:** Ziyaretçi odaları görsel + fiyat bandı olarak inceler, beğenirse
  "Rezervasyon" butonuna basar → **telefon numarasına yönlendirilir** (tel: linki veya
  WhatsApp linki). Sitede form, ödeme, takvim sistemi YOK.
- **Diller:** Azerbaycanca (varsayılan) + İngilizce
- **Vurgu:** Otelin manzarası ve atmosferi ön planda — büyük, kaliteli görseller,
  sade ve "lüks/huzurlu" hissettiren tasarım.

## 2. Teknoloji Seçimi ve Gerekçesi

| Katman | Seçim | Neden |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SEO için SSG/SSR şart, görsel optimizasyonu hazır gelir, Antigravity/Cursor gibi agentic araçlar Next.js'i çok iyi destekler |
| Stil | **Tailwind CSS** | Hızlı, tutarlı, vibe-coding ile uyumlu (AI prompt'larla kolay üretiliyor) |
| Çoklu dil | **next-intl** | Route bazlı dil yönetimi (`/az/...`, `/en/...`), basit JSON çeviri dosyaları |
| İçerik kaynağı | **Yerel JSON dosyaları** (`/content/rooms.json` vb.) | CMS'e gerek yok, sen kendin düzenleyeceksin, basit |
| Görseller | **Next/Image** + `/public/images` | Otomatik sıkıştırma/boyutlandırma, manzara fotoğrafları için kritik |
| Hosting | **Vercel** (ücretsiz plan yeterli) | Next.js ile native uyum, domain bağlama kolay, otomatik deploy |
| Form/iletişim | Yok — sadece `tel:` ve `https://wa.me/` linkleri | Sipariş fonksiyonu istenmiyor |

> Not: Eğer ilerde "tamamen statik, framework'süz" istersen basit HTML/CSS/JS'e
> geçiş de mümkün ama çoklu dil + SEO + görsel optimizasyon için Next.js çok daha az
> baş ağrısı verir. Antigravity bu stack'i sıfırdan kurabilir.

## 3. Sayfa / Sitemap Yapısı

```
/                       → Anasayfa (Hero: otel manzarası, kısa tanıtım, öne çıkan odalar, CTA)
/odalar                 → Oda kataloğu (kartlar: foto, isim, kısa özellik, fiyat bandı)
/odalar/[oda-slug]      → Oda detay (galeri, özellikler, fiyat bandı, "Rezervasyon İçin Ara" CTA)
/galeri                 → Otel geneli foto galerisi (manzara, restoran, lobi, havuz vs.)
/hakkimizda             → Otel hikayesi, konum, olanaklar (amenities)
/iletisim               → Telefon, WhatsApp, adres, harita embed, çalışma saatleri

Her sayfa /az ve /en altında mevcut (next-intl middleware ile otomatik yönlendirme)
```

## 4. Klasör Yapısı (Antigravity'nin kuracağı)

```
otel-sitesi/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Anasayfa
│   │   ├── odalar/
│   │   │   ├── page.tsx             # Oda listesi
│   │   │   └── [slug]/page.tsx      # Oda detay
│   │   ├── galeri/page.tsx
│   │   ├── hakkimizda/page.tsx
│   │   └── iletisim/page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx               # Logo + menü (mobil hamburger dahil)
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── home/
│   │   ├── HeroSection.tsx          # Tam ekran manzara görseli + slogan
│   │   ├── FeaturedRooms.tsx
│   │   └── AmenitiesStrip.tsx       # Wifi, havuz, kahvaltı vb. ikon şeridi
│   ├── rooms/
│   │   ├── RoomCard.tsx             # Katalog kartı
│   │   ├── RoomGallery.tsx          # Detay sayfası galerisi (lightbox)
│   │   └── PriceBadge.tsx           # Fiyat bandı rozeti (örn. "150-200 AZN/gece")
│   └── shared/
│       ├── ReservationCTA.tsx       # "Rezervasyon İçin Bizi Arayın" butonu (tel: + wa.me)
│       └── ImageLightbox.tsx
├── content/
│   ├── rooms.json                   # Tüm oda verisi (az/en içerikli)
│   └── hotel-info.json              # Otel adı, telefon, adres, sosyal medya
├── messages/
│   ├── az.json                      # UI metinleri (buton, menü vs.) Azerice
│   └── en.json                      # UI metinleri İngilizce
├── public/
│   └── images/
│       ├── hero/
│       ├── rooms/
│       └── gallery/
├── i18n.ts
├── middleware.ts
├── tailwind.config.ts
└── next.config.js
```

## 5. Veri Modeli (content/rooms.json örneği)

```json
[
  {
    "slug": "deluxe-sea-view",
    "name": { "az": "Deluxe Dəniz Mənzərəli Otaq", "en": "Deluxe Sea View Room" },
    "shortDesc": { "az": "...", "en": "..." },
    "priceRange": { "min": 150, "max": 200, "currency": "AZN" },
    "size": "32 m²",
    "capacity": 2,
    "features": ["sea-view", "balcony", "king-bed", "free-wifi"],
    "images": ["/images/rooms/deluxe-1.jpg", "/images/rooms/deluxe-2.jpg"]
  }
]
```

Bu yapı sayesinde yeni oda eklemek = JSON'a bir obje eklemek + fotoğrafları
`/public/images/rooms/` klasörüne koymak. Kod bilmesen de yapabilirsin.

## 6. Rezervasyon Akışı (önemli, sipariş YOK)

1. Kullanıcı oda kartına/detayına bakar, fiyat bandını görür
2. "Rezervasyon İçin Arayın" butonuna tıklar
3. Mobilde → direkt `tel:+994XXXXXXXXX` arar
4. İstersen ek olarak WhatsApp butonu → `https://wa.me/994XXXXXXXXX?text=Merhaba,...odası için bilgi almak istiyorum`
5. Form, takvim, ödeme YOK — bu bilinçli bir tasarım kararı, prompt'larda bunu
   AI'ya her seferinde hatırlat ki "rezervasyon formu" eklemeye kalkmasın.

## 7. Tasarım Yönü (UI)

- **Stil:** Sıcak, lüks, "resort" hissi — çok fazla beyaz boşluk, büyük tipografi,
  tam genişlik görseller
- **Renk paleti önerisi:** Kırık beyaz/krem zemin + koyu lacivert veya toprak tonu
  vurgu rengi + altın/bakır detay (otel sitelerinde sık görülen, güven veren kombinasyon)
- **Tipografi:** Başlıklarda zarif bir serif (örn. Playfair Display), gövde metinde
  sade bir sans-serif (örn. Inter)
- **Hero:** Anasayfa açılışında tam ekran (veya en az %85 viewport) manzara fotoğrafı,
  üzerinde otel adı + kısa slogan + "Odalara Göz At" CTA
- **Menü:** Sade, sticky header — Anasayfa / Odalar / Galeri / Hakkımızda / İletişim
  + dil değiştirici + sağda "Ara" butonu (telefon ikonu)

Detaylı UI prompt'u `UI_PROMPT.md` dosyasında ayrı veriyorum.
