# SKILL: Otel Katalog Sitesi Geliştirme

Bu dosya, bu proje üzerinde çalışan AI ajanının (Antigravity) HER zaman uyması
gereken kuralları içerir. Yeni bir görev/oturum başlasa bile bu kurallar geçerlidir.

## Proje Kimliği

Bu bir **otel katalog/tanıtım sitesi**dir. E-ticaret sitesi DEĞİLDİR.

## Kesin Kurallar (asla ihlal edilmez)

1. **Sipariş/ödeme sistemi YOK.** Hiçbir koşulda sepet, ödeme entegrasyonu
   (Stripe, Payriff, vb.), stok takibi gibi e-ticaret bileşenleri eklenmeyecek.
2. **Rezervasyon formu YOK.** Rezervasyon işlemi sadece şu iki yöntemle yapılır:
   - `tel:` linki (telefonla arama)
   - `https://wa.me/` linki (WhatsApp)
   Tarih seçici, takvim, "rezervasyon yap" form alanı EKLENMEYECEK.
3. **Çoklu dil zorunlu:** Her sayfa hem Azerbaycanca (`/az`) hem İngilizce (`/en`)
   olarak çalışmalı. Yeni bir metin eklenince hem `messages/az.json` hem
   `messages/en.json` güncellenmeli.
4. **İçerik JSON'dan gelir.** Oda bilgisi, fiyat, açıklama gibi içerik
   `content/*.json` dosyalarından okunur, component içine hardcode edilmez.
   Böylece proje sahibi kod bilmeden içerik güncelleyebilir.
5. **Görsel ağırlıklı tasarım.** Her yeni bölüm/sayfa tasarlanırken "bu alanda
   güçlü bir görsel var mı?" sorusu sorulmalı. Manzara/atmosfer fotoğrafları
   öncelikli yer kaplar, metin ikincildir.
6. **Mobil öncelikli (mobile-first).** Türk/Azerbaycan otel müşterilerinin
   büyük kısmı mobilden bakar ve mobilden arar. Tüm CTA butonları mobilde
   kolayca tıklanabilir olmalı (min 44px dokunma alanı).

## Teknik Standartlar

- Next.js App Router + TypeScript + Tailwind CSS + next-intl
- Görseller her zaman `next/image` ile, `alt` metni iki dilde de anlamlı olmalı
- Component'ler küçük ve tek sorumlu tutulur (örn. `RoomCard.tsx` sadece kart gösterir,
  veri çekme işini yapmaz)
- Yeni bir oda eklemek sadece `content/rooms.json`'a obje eklemek + görselleri
  `public/images/rooms/` klasörüne koymakla olmalı, kod değişikliği gerektirmemeli
- Erişilebilirlik: butonlarda anlamlı `aria-label`, görsellerde `alt` metni zorunlu
- Performans: Lighthouse skoru göz önünde bulundurulmalı (özellikle görsel ağırlıklı
  site olduğu için lazy-loading, doğru image format/boyut önemli)

## Yapılacaklar Listesi Yaklaşımı

Antigravity'den her büyük görevde (örn. "anasayfayı kur") önce kısa bir plan
(hangi component'ler, hangi sıra) çıkarması, sonra uygulaması istenmeli. Tek seferde
tüm siteyi "büyük patlama" şeklinde üretmek yerine sayfa sayfa / bölüm bölüm ilerlemek
hem hata ayıklamayı kolaylaştırır hem kontrolü elde tutmayı sağlar.

## Yasaklı Eklentiler / Yönelimler

AI bu önerileri kendiliğinden YAPMAMALI, kullanıcı açıkça istemedikçe:
- Üye girişi / kullanıcı hesabı sistemi
- Blog sistemi
- Online ödeme
- Canlı chat widget'ı (3. parti)
- Karmaşık CMS entegrasyonu (Sanity, Contentful vb.) — basit JSON yeterli
- Gereksiz state-management kütüphaneleri (Redux vb.) — bu boyutta site için gerek yok

## Dosya Güncelleme Önceliği

Bir görev birden fazla dosyayı etkiliyorsa şu sırayla ilerlenir:
1. `content/*.json` (veri modeli netleşir)
2. `messages/az.json`, `messages/en.json` (gerekli metinler eklenir)
3. `components/*` (görsel bileşenler)
4. `app/[locale]/*/page.tsx` (sayfalar bu bileşenleri birleştirir)
