# Şəki Yaylası — Otel Katalog Sitesi

Şəki Yaylası otelinin tanıtım ve katalog web sitesi. Ziyaretçiler odaları inceleyip fiyat bantlarını görebilir, rezervasyon için doğrudan telefon veya WhatsApp üzerinden iletişim kurabilir.

---

## Teknoloji Stack'i

| Katman | Teknoloji |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Dil | TypeScript |
| Stil | Tailwind CSS v4 |
| Çoklu Dil | next-intl (`/az` ve `/en`) |
| İçerik | Yerel JSON dosyaları (`/content`) |
| Görseller | next/image + Unsplash CDN |
| Deploy | Vercel |

---

## Yerel Geliştirme Ortamı

### Gereksinimler
- Node.js 18+ (LTS önerilir)

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Site `http://localhost:3000` adresinde açılır ve otomatik olarak `/az` diline yönlendirilir.

---

## Kendi Bilgilerinizi Ekleyin

### 1. Otel İletişim Bilgileri
`content/hotel-info.json` dosyasını açın ve şu alanları güncelleyin:

```json
{
  "name": "Şəki Yaylası",
  "phone": "+994 (XX) XXX-XX-XX",          ← Gerçek telefon numaranız
  "phoneRaw": "+994XXXXXXXXXX",             ← Başına + koyarak boşuksuz yazın
  "email": "info@sizin-email.az",           ← Gerçek e-posta adresiniz
  "address": {
    "az": "Şəki rayonu, Kiş kəndi, ...",   ← Tam Azerice adres
    "en": "Sheki region, Kish village, ..."  ← Tam İngilizce adres
  },
  "mapEmbedUrl": "https://maps.google.com/..." ← Google Maps embed URL (aşağıda açıklanıyor)
}
```

#### Google Maps Embed URL'si Nasıl Alınır?
1. [Google Maps](https://maps.google.com) açın
2. Otel konumunu bulun, üzerine sağ tıklayın → **"Bu yeri paylaş"**
3. **Yerleştir** sekmesine geçin → `<iframe>` kodunun içindeki `src="..."` değerini kopyalayın
4. `content/hotel-info.json` içindeki `mapEmbedUrl` değerini yapıştırın

### 2. Oda Bilgileri
`content/rooms.json` dosyasını açın. Her oda şu yapıya sahiptir:

```json
{
  "slug": "benzersiz-oda-adi",       ← URL'de kullanılır (Türkçe karakter kullanmayın)
  "name": {
    "az": "Azerice Oda Adı",
    "en": "English Room Name"
  },
  "shortDesc": { "az": "...", "en": "..." },
  "description": { "az": "...", "en": "..." },
  "priceRange": { "min": 100, "max": 150, "currency": "AZN" },
  "size": "30 m²",
  "capacity": 2,
  "features": ["sea-view", "balcony", "free-wifi"],
  "images": [
    "https://...resim-linki-1.jpg",
    "https://...resim-linki-2.jpg"
  ]
}
```

**Yeni oda eklemek:** Sadece bu JSON nesnesini diziye ekleyin — kod değişikliği gerekmez.

#### Desteklenen `features` (Özellikler):
`sea-view`, `forest-view`, `balcony`, `king-bed`, `double-bed`, `free-wifi`, `living-room`, `two-bedrooms`, `kitchenette`

### 3. Oda Görselleri
Görselleri iki şekilde ekleyebilirsiniz:
- **CDN linki:** Unsplash veya kendi CDN'inizden HTTPS bağlantısı
- **Yerel görseller:** `public/images/rooms/` klasörüne koyun, `images` alanına `/images/rooms/resim.jpg` yazın

---

## Vercel'e Deploy Etme (Adım Adım)

### 1. GitHub'a Yükleyin
```bash
git init
git add .
git commit -m "İlk sürüm: Şəki Yaylası web sitesi"
git remote add origin https://github.com/KULLANICI_ADINIZ/sekiyaylasi.git
git push -u origin main
```

### 2. Vercel Hesabı Açın
[vercel.com](https://vercel.com) → **"Sign Up"** → GitHub hesabınızla giriş yapın.

### 3. Yeni Proje Ekleyin
1. Vercel Dashboard → **"Add New Project"** tuşuna basın
2. GitHub repo'nuzu seçin → **"Import"**
3. Framework olarak **Next.js** otomatik algılanacak — ekstra ayar gerekmez
4. **"Deploy"** tuşuna basın → ~2 dakika içinde site yayında!

### 4. Custom Domain Bağlama
1. Vercel Dashboard → Projeniz → **"Settings"** → **"Domains"**
2. **"Add"** → Alan adınızı yazın (örn. `sekiyaylasi.az`)
3. Vercel size iki DNS kaydı verecek (genellikle `A` ve `CNAME`)
4. Alan adınızı aldığınız firmada (GoDaddy, Namecheap, vb.) DNS yönetim paneline gidin
5. Vercel'in verdiği kayıtları ekleyin
6. 5-30 dakika içinde aktif olur

#### Azerbaycan `.az` Uzantısı İçin
- `icann.az` veya yerel kayıt kuruluşunuz üzerinden `.az` alan adı alabilirsiniz
- DNS yönetimi aynı prosedürle yapılır

---

## Proje Klasör Yapısı

```
sekiyaylasi/
├── app/[locale]/           ← Sayfalar (az/en otomatik yönlendirme)
│   ├── page.tsx            ← Anasayfa
│   ├── odalar/page.tsx     ← Oda listesi
│   ├── odalar/[slug]/      ← Oda detayı
│   ├── galeri/page.tsx     ← Fotoğraf galerisi
│   ├── hakkimizda/page.tsx ← Hakkımızda
│   └── iletisim/page.tsx   ← İletişim (form yok, sadece tel/WA)
├── components/             ← Yeniden kullanılabilir bileşenler
├── content/
│   ├── rooms.json          ← Oda verisi ← BURASI DEĞİŞTİRİLİR
│   └── hotel-info.json     ← Otel bilgileri ← BURASI DEĞİŞTİRİLİR
├── messages/
│   ├── az.json             ← Azerice UI metinleri
│   └── en.json             ← İngilizce UI metinleri
└── public/images/          ← Yerel görseller
```

---

## Önemli Kısıtlamalar (SKILL.md)

- ❌ Sepet, ödeme, kredi kartı sistemi YOKTUR ve eklenmeyecektir
- ❌ Rezervasyon formu, tarih seçici YOKTUR
- ✅ Rezervasyon sadece `tel:` ve `wa.me/` linkleri üzerinden yapılır
- ✅ Tüm içerik JSON dosyalarından gelir (kod bilmeden düzenlenebilir)
- ✅ Her sayfa `/az` ve `/en` dilinde çalışır

---

## Destek

Herhangi bir sorun için geliştirici ile iletişime geçin.
