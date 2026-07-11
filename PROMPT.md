# PROMPT.md — Otel Sitesi Proje Başlangıç Talimatı

Bu dosyayı, projeye Antigravity ile başlarken ilk mesaj olarak (veya proje
context'ine ekleyerek) kullan. SKILL.md ve MIMARI.md dosyalarını da aynı
klasöre koy, çünkü bu prompt onlara referans veriyor.

---

## Antigravity'ye Verilecek İlk Mesaj

```
Bir otel için katalog tarzı (e-ticaret olmayan, sadece tanıtım amaçlı) bir web
sitesi geliştireceğiz. Bu projede sen mimar ve geliştirici rolündesin, ben
ürün sahibiyim — kod bilgim temel düzeyde, küçük düzeltmeler yapabilirim ama
projeyi büyük ölçüde sana emanet ediyorum.

ÖNCE şu iki dosyayı oku ve projenin geri kalanında bu kurallara sadık kal:
- SKILL.md (kesin kurallar, asla ihlal edilmeyecek sınırlar)
- MIMARI.md (teknoloji, klasör yapısı, veri modeli, sayfa haritası)

KISACA PROJE:
- Otel katalog/tanıtım sitesi. Sipariş, ödeme, rezervasyon formu YOK.
- Rezervasyon sadece telefon araması (tel:) ve WhatsApp linki üzerinden.
- Diller: Azerbaycanca (varsayılan) + İngilizce, next-intl ile.
- Sayfalar: Anasayfa, Odalar (liste+detay), Galeri, Hakkımızda, İletişim.
- Tasarım: sıcak/lüks/sade, manzara ve atmosfer fotoğrafları ön planda.

TEKNOLOJİ: Next.js (App Router) + TypeScript + Tailwind CSS + next-intl.
İçerik content/*.json dosyalarından okunacak, kod bilmeden oda eklenebilsin.

YAPMANI İSTEDİĞİM İLK ADIM (sadece bunu yap, devamını sonra konuşuruz):
1. Next.js projesini kur (TypeScript + Tailwind + App Router).
2. next-intl ile az/en routing yapısını kur (middleware, i18n config).
3. Klasör iskeletini MIMARI.md'deki yapıya göre oluştur (boş component
   dosyaları + content/rooms.json ve hotel-info.json için örnek/placeholder veri).
4. tailwind.config.ts içinde UI_PROMPT.md'deki renk paleti ve font ailelerini
   tema olarak tanımla.
5. Bana ne yaptığını kısa bir özetle anlat, sonraki adım için onay iste.

Tek seferde her şeyi üretmeye çalışma. Adım adım ilerle, her adımdan sonra
durup bana göster.
```

---

## Sonraki Adımlarda Kullanılacak Mini-Promptlar

Proje ilerledikçe bu hazır promptları sırayla kullanabilirsin:

### 2. Adım — Header/Footer ve genel layout
```
SKILL.md ve MIMARI.md kurallarına bağlı kalarak Header ve Footer
component'lerini oluştur. UI_PROMPT.md'deki "Menü (Header)" bölümündeki
yapıya uy: logo solda, menü ortada/sağda (Anasayfa, Odalar, Galeri,
Hakkımızda, İletişim), en sağda dil değiştirici + "Ara" butonu. Mobilde
hamburger menü olsun. Telefon numarasını content/hotel-info.json'dan oku.
```

### 3. Adım — Anasayfa Hero + bölümler
```
UI_PROMPT.md'deki "Anasayfa Bölüm Sırası" listesine göre app/[locale]/page.tsx
sayfasını kur. Önce sadece Hero bölümünü yap (tam ekran manzara görseli,
overlay, başlık, iki CTA buton), bana göster, onaylarsam devam edelim.
Görsel olarak şimdilik public/images/hero/ klasörüne placeholder bir görsel
koy, ben gerçek fotoğrafı sonra değiştireceğim.
```

### 4. Adım — Oda kataloğu
```
content/rooms.json içine MIMARI.md'deki veri modeline uygun 3 örnek oda
ekle (gerçek fotoğraf yok, placeholder kullan). Sonra RoomCard component'ini
ve app/[locale]/odalar/page.tsx liste sayfasını oluştur. Kart tasarımı için
UI_PROMPT.md'deki "Oda Kartı" bölümüne uy.
```

### 5. Adım — Oda detay sayfası
```
app/[locale]/odalar/[slug]/page.tsx sayfasını oluştur. UI_PROMPT.md'deki
"Oda Detay Sayfası" bölümüne uy: galeri + lightbox, sticky bilgi kutusu,
Rezervasyon İçin Ara + WhatsApp butonları (form YOK, sadece bu iki link).
```

### 6. Adım — Galeri, Hakkımızda, İletişim sayfaları
```
Sırasıyla galeri, hakkımızda ve iletişim sayfalarını oluştur. İletişim
sayfasında form OLMAYACAK — sadece telefon, WhatsApp, adres ve harita embed
(Google Maps iframe) olacak.
```

### 7. Adım — Çeviri kontrolü
```
messages/az.json ve messages/en.json dosyalarını kontrol et, eksik anahtar
var mı bak, varsa tamamla. Tüm sayfalarda hardcode edilmiş metin kalmadığından
emin ol.
```

### 8. Adım — Deploy hazırlığı
```
Projeyi Vercel'e deploy etmeye hazır hale getir: next.config.js'i kontrol et,
gereksiz console.log'ları temizle, README.md içine "domain'i nasıl bağlarım"
adımlarını yaz (DNS ayarları, Vercel custom domain ekleme).
```

---

## Genel Tavsiye

- Her adımdan sonra siteyi tarayıcıda kontrol et (`npm run dev`), küçük
  metin/renk değişiklikleri için Antigravity'ye doğrudan "şu rengi şuna çevir"
  gibi net, küçük promptlar ver — bunlar senin "hafif kod düzeltmeleri"
  yapabileceğin yerler.
- Gerçek fotoğrafları en başta hazırlamasan da olur, placeholder ile devam
  edip en sona bırakabilirsin, ama görsel ağırlıklı bir site olduğu için
  gerçek/kaliteli fotoğraflar sitenin başarısının en büyük parçası olacak.
- Telefon numaranı ve WhatsApp numaranı `content/hotel-info.json` içine en
  başta doğru gir, çünkü bütün CTA butonları oradan besleniyor.
