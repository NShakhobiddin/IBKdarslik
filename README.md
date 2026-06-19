# Bojxona Qo'llanmasi

Bojxona rasmiylashtiruvi bo'yicha interaktiv qo'llanma — yagona, mustaqil
(self-contained) HTML sahifa sifatida tayyorlangan.

## Ishga tushirish

Maxsus o'rnatish talab qilinmaydi. `index.html` faylini brauzerda oching:

```bash
# Variant 1: to'g'ridan-to'g'ri oching
open index.html        # macOS
xdg-open index.html    # Linux

# Variant 2: lokal server orqali
python3 -m http.server 8000
# keyin brauzerda: http://localhost:8000
```

> Eslatma: sahifa interaktiv bo'lib, ko'rinishi uchun JavaScript yoqilgan bo'lishi kerak.

## Tarkibi

- `index.html` — qo'llanmaning to'liq sahifasi (Claude Design eksporti, self-contained bundle).
- `Bojxona Qo'llanmasi.html` — xuddi shu sahifaning nom bilan belgilangan nusxasi.

## Manba

Ushbu sahifa `Bojxona Qo'llanmasi.dc.html` Claude Design loyihasidan eksport qilingan
mustaqil (standalone) HTML bundle asosida joylashtirilgan.
