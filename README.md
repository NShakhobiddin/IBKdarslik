# Bojxona xodimi qo'llanmasi — Toshkent-AERO IBK

"Toshkent-AERO" ixtisoslashtirilgan bojxona kompleksi xodimlari uchun interaktiv o'quv qo'llanma.
Telefon va Telegram bot (Mini App) uchun moslashtirilgan. Muallif: **Shakhobiddin Normamatov**.

## Nimalar bor

| Bo'lim | Tarkibi |
|---|---|
| 10 ta modul | Nazorat shakllari, shaxsiy ko'rik, aeroport, YBD, olib kirish, olib chiqish, valyuta, tovar maqsadi va to'lovlar, xodim harakatlari, **PF-174 (27.08.2026)** |
| 95 ta qadam | Har biri: "Oddiy tilda" izoh, hayotiy misol, "Eslab qoling", qonun chiplari, o'z-o'zini tekshirish savoli |
| 10 ta videodars | Doskada qalam bilan chizib tushuntirish: pauza, sahnalar bo'yicha o'tish, tezlik, subtitr, to'liq ekran |
| Interaktiv vidjetlar | YBT kalkulyatori (hozir va 2027-yildan), saqlash to'lovi, valyuta, zargarlik, "YBD kerakmi?", yo'lak o'yini, taqiq/ruxsat, shaxsiy/tijorat, qadamlarni tartiblash, muddatlar xaritasi |
| Testlar | Har modul oxirida mashq testi; PF-174 bo'limi testi (20 savol, 100 ball); **yakuniy test — 25 savol, 30 daqiqa, 100 ball** |
| Baholash | 86–100 a'lo (5), 71–85 yaxshi (4), 56–70 qoniqarli (3), 0–55 qoniqarsiz (2) |
| Ma'lumotnoma | Qonunlar kutubxonasi (52 havola, lex.uz bilan), atamalar lug'ati, butun qo'llanma bo'yicha qidiruv |

Huquqiy ma'lumotlar holati: **2026-yil 2-oktabr**. Rasmiy matnda tasdiqlanmagan bandlar
qo'llanmada "Tekshirish tavsiya etiladi" belgisi bilan ajratilgan va testga kiritilmagan.

## Telegram botga ulash

Sayt GitHub Pages orqali HTTPS'da ochilishi kerak (Settings → Pages → Deploy from a branch → `main` / `(root)`).
Manzil: `https://nshakhobiddin.github.io/ibkdarslik/`

1. Telegram'da **@BotFather** → `/mybots` → botingizni tanlang.
2. **Bot Settings → Menu Button → Configure menu button** → yuqoridagi manzilni kiriting, nomi: `Qo'llanma`.
3. Ixtiyoriy: `/newapp` bilan Mini App yarating — shunda `https://t.me/<bot>/<app>` havolasi paydo bo'ladi.
   - Havola orqali to'g'ridan-to'g'ri modul ochish: `?startapp=m_pf174` (yoki `m_asosiy`, `m_valyuta` …), test uchun `?startapp=exam`.

Ilova Telegram ichida o'zi:
- to'liq ekranga ochiladi (mobil, Bot API 8.0+), pastga surib yopilishini o'chiradi;
- Telegram mavzusiga (yorug'/tungi) va xavfsiz hududlarga moslashadi;
- Telegram'ning "Orqaga" tugmasi bilan ishlaydi, haptik javob beradi;
- yakuniy test paytida tasodifan yopilishdan himoya qiladi;
- progressni Telegram bulutida saqlaydi (boshqa qurilmada ham davom etadi).

## Lokal ishga tushirish

```bash
python3 -m http.server 8000
# brauzerda: http://localhost:8000
```

## Tuzilishi

```
index.html                  — ilova qobig'i
assets/css/app.css          — dizayn tizimi (yorug'/tungi, animatsiyalar)
assets/js/core.js           — ikonkalar, DOM yordamchilari, saqlash, Telegram ko'prigi
assets/js/app.js            — ekranlar, router, intro, darslar, testlar, sertifikat
assets/js/player.js         — "qalamda chizish" videodars dvigateli
assets/js/widgets.js        — interaktiv vidjetlar va kalkulyatorlar
assets/js/data-laws.js      — qonun havolalari, lug'at, kalkulyator raqamlari (RULES)
assets/js/data-modules.js   — 9 ta asosiy modul va o'yinlar ma'lumoti
assets/js/data-pf174.js     — PF-174 bo'limi
assets/js/data-videos.js    — videodarslar ssenariysi
assets/js/data-questions.js — savollar banki (129 ta)
```

**Raqam o'zgarsa** (masalan, BHM yoki stavka): faqat `assets/js/data-laws.js` dagi `RULES` va
tegishli matnlarni yangilang — kalkulyatorlar avtomatik moslashadi.
