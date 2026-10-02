/* =========================================================
   data-videos.js — qalamda chizilgan videodarslar ssenariysi
   Har bir sahna: Board.T.<shablon>({...}) yoki custom chizma.
   ========================================================= */
(function (global) {
  'use strict';
  const B = global.Board, T = B.T, C = B.COL; // player.js loads first

  /* tiny sequencer for custom scenes */
  function S(t0) { let t = t0 || 200; return function (el, du, gap) { el.at = t; el.du = du; t += du + (gap == null ? 120 : gap); return el; }; }

  function zonesScene() {
    const a = S(200), els = [];
    els.push(a({ k: 'text', x: 22, y: 38, t: "Bojxona hududi = yer + suv + osmon", s: 26, c: C.ink }, 1500, 80));
    els.push(a({ k: 'path', d: 'M20 210 C90 196 150 222 210 206 S330 196 380 204', c: '#16a34a', w: 4 }, 900, 60));
    els.push(a({ k: 'text', x: 34, y: 236, t: 'quruqlik', s: 20, c: '#15803d' }, 500, 60));
    els.push(a({ k: 'path', d: 'M232 236 c16 -12 46 -12 62 0 c-16 12 -46 12 -62 0z', c: C.sky, w: 3, fill: C.sky, fo: .35 }, 700, 60));
    els.push(a({ k: 'text', x: 300, y: 258, t: 'suv', s: 20, c: C.sky }, 350, 60));
    els.push(a({ k: 'path', d: 'M60 104 c0 -12 18 -14 22 -4 c4 -12 26 -10 26 4 c10 0 10 14 0 14 h-46 c-10 0 -10 -14 -2 -14z', c: C.gray, w: 2.5 }, 700, 40));
    els.push(a({ k: 'icon', n: 'plane', x: 250, y: 74, s: 44, c: C.navy, w: 2 }, 900, 60));
    els.push(a({ k: 'text', x: 128, y: 128, t: 'havo hududi', s: 21, c: C.sky }, 600, 160));
    els.push(a({ k: 'path', d: B.rrect(12, 56, 376, 232, 16), c: C.red, w: 3.5, dash: '10 7' }, 900, 60));
    els.push(a({ k: 'text', x: 236, y: 280, t: 'bojxona chegarasi', s: 20, c: C.red }, 800, 120));
    els.push(a({ k: 'path', d: B.rrect(150, 150, 112, 44, 10), c: C.purple, w: 3, fill: C.purple, fo: .12 }, 700, 60));
    els.push(a({ k: 'text', x: 206, y: 178, t: 'nazorat zonasi', s: 19, c: C.purple, a: 'middle' }, 700, 80));
    return { els: els, cap: [[0, "Bojxona hududi — O'zbekistonning yeri, suvlari va ular ustidagi havo hududi."], [5600, "Hudud sarhadi va erkin zonalar perimetri — bojxona chegarasi. Ichidagi alohida ajratilgan joy — nazorat zonasi."]] };
  }

  function airportScene() {
    const a = S(200), els = [];
    els.push(a({ k: 'text', x: 22, y: 38, t: "Kelish zalida yo'lovchi yo'li", s: 27, c: C.ink }, 1200, 80));
    els.push(a({ k: 'icon', n: 'plane', x: 16, y: 120, s: 40, c: C.navy }, 700, 40));
    els.push(a({ k: 'path', d: B.arrow(62, 140, 102, 140), c: C.gray, w: 2.5 }, 300, 30));
    els.push(a({ k: 'path', d: B.rrect(106, 116, 80, 48, 10), c: C.blue, w: 3 }, 500, 20));
    els.push(a({ k: 'text', x: 146, y: 146, t: 'pasport', s: 19, c: C.blue, a: 'middle' }, 400, 40));
    els.push(a({ k: 'path', d: B.arrow(190, 140, 222, 140), c: C.gray, w: 2.5 }, 300, 30));
    els.push(a({ k: 'path', d: B.rrect(226, 116, 72, 48, 10), c: C.amber, w: 3 }, 500, 20));
    els.push(a({ k: 'text', x: 262, y: 146, t: 'bagaj', s: 19, c: C.amber, a: 'middle' }, 400, 60));
    els.push(a({ k: 'path', d: 'M302 132 C326 120 330 98 338 88', c: C.green, w: 3 }, 450, 0));
    els.push(a({ k: 'path', d: 'M302 150 C326 162 330 184 338 194', c: C.red, w: 3 }, 450, 60));
    els.push(a({ k: 'path', d: B.circ(356, 74, 18), c: C.green, w: 3, fill: C.green, fo: .2 }, 400, 20));
    els.push(a({ k: 'path', d: B.circ(356, 206, 18), c: C.red, w: 3, fill: C.red, fo: .2 }, 400, 60));
    els.push(a({ k: 'text', x: 356, y: 112, t: 'YASHIL', s: 20, c: C.green, a: 'middle' }, 450, 20));
    els.push(a({ k: 'text', x: 356, y: 128, t: "og'zaki", s: 17, c: C.gray, a: 'middle' }, 400, 60));
    els.push(a({ k: 'text', x: 356, y: 244, t: 'QIZIL', s: 20, c: C.red, a: 'middle' }, 450, 20));
    els.push(a({ k: 'text', x: 350, y: 260, t: 'YBD (yozma)', s: 17, c: C.gray, a: 'middle' }, 400, 60));
    els.push(a({ k: 'text', x: 24, y: 238, t: "Yo'lakni yo'lovchi o'zi tanlaydi —", s: 20, c: C.ink }, 1000, 40));
    els.push(a({ k: 'text', x: 24, y: 262, t: 'bu uning deklaratsiyasi.', s: 20, c: C.ink }, 800, 60));
    els.push(a({ k: 'hl', x: 20, y: 246, w: 210, h: 22, c: '#fde047' }, 500, 0));
    return { els: els, cap: [[0, "Yo'lovchi pasport nazoratidan o'tib, bagajini oladi."], [4200, "So'ng yo'lakni tanlaydi: yashil — og'zaki deklaratsiya, qizil — yozma YBD."]] };
  }

  global.VIDEOS = {
    v1: { id: 'v1', title: "Bojxona hududi va nazorat shakllari", build: function () { return [
      T.title({ title: "Bojxona hududi va nazorat shakllari", sub: "1-modul · qisqa videodars", icon: 'map', color: C.teal, cap: "Bugun bojxona qayerda va qanday ishlashini doskada chizib tushuntiramiz." }),
      zonesScene(),
      T.list({ head: "Nazorat zonasi qoidasi", color: C.purple, items: [{ i: 'lock', t: "Faqat bojxona ruxsati bilan" }, { i: 'eye', t: "Bojxona nazorati ostida" }, { i: 'gavel', t: "Buzish: fuqaroga 1–3 BHM", c: C.red }, { i: 'users', t: "Mansabdorga 3–5 BHM", c: C.red }], cap: "Nazorat zonasida faoliyat va harakat faqat bojxona ruxsati bilan. Rejimni buzish — MJtK 227 bo'yicha jarima." }),
      T.flow({ head: "Tanlab olish: eng yengil yetarli shakl", color: C.teal, steps: ["Og'zaki so'rov — yozilmaydi", "Ko'zdan kechiruv — ochmasdan", "Ko'rik — ochib", "Shaxsiy ko'rik — istisno"], cap: "Bojxona hammani to'liq tekshirmaydi: XBT tanlaydi, xodim esa yetarli bo'lgan eng yengil shaklni qo'llaydi." }),
      T.compare({ head: "Adashtirmang!", a: { t: "Ko'zdan kech.", i: 'eye', c: C.green, items: ["Ochilmaydi", "Plomba butun", "Skaner, it"] }, b: { t: "Ko'rik", i: 'box', c: C.orange, items: ["Ochiladi", "Plomba buzilishi mumkin", "Qo'lda tekshiriladi"] }, cap: "Ko'zdan kechiruv — ko'z bilan, ochmasdan. Ko'rik — qo'l bilan, ochib." })
    ]; } },
    v2: { id: 'v2', title: "Shaxsiy ko'rik qadamma-qadam", build: function () { return [
      T.title({ title: "Shaxsiy ko'rik", sub: "Istisno shakl — qat'iy qoidalar", icon: 'finger', color: C.purple, cap: "Shaxsiy ko'rik — bojxona nazoratining eng jiddiy, istisno shakli." }),
      T.warn({ head: "Avval — asos!", text: "Shaxs taqiqlangan tovarni o'zida yashirgan va uni ixtiyoriy topshirmayapti, degan yetarli asos bo'lishi kerak.", icon: 'alert', color: C.purple, cap: "Asossiz shaxsiy ko'rik — qonunbuzarlik. Asos bo'lmasa, yengilroq shakl qo'llanadi." }),
      T.flow({ head: "Ko'rikdan oldin 4 qadam", color: C.purple, steps: ["Boshliqning yozma qarori", "Qarorni e'lon qilish", "Huquqlarni tushuntirish", "Ixtiyoriy topshirishni taklif qilish"], cap: "Qaror, e'lon, huquqlar va ixtiyoriy topshirish taklifi — shundan keyingina ko'rik." }),
      T.grid({ head: "O'tkazish qoidalari", color: C.purple, items: [{ i: 'door', t: "Alohida xona" }, { i: 'user', t: "Bir jinsli xodim" }, { i: 'users', t: "2 bir jinsli xolis" }, { i: 'pill', t: "Tana — tibbiyot xodimi" }, { i: 'eye', t: "Begonalar kuzatmaydi" }, { i: 'doc', t: "Bayonnoma" }], cap: "Alohida xona, bir jinsli xodim va ikki xolis, tana a'zolarini faqat tibbiyot xodimi tekshiradi, natija — bayonnoma." }),
      T.compare({ head: "Soddalashtirilgan ko'rik (VM 700)", a: { t: "Skaner", i: 'scan', c: C.green, items: ["Qaror kerak emas", "Bayonnoma kerak emas", "Tez"] }, b: { t: "To'liq", i: 'finger', c: C.purple, items: ["Buzilish topilsa", "Qaror va 2 xolis", "Bayonnoma"] }, vs: '→', cap: "Tana skaneri bilan soddalashtirilgan ko'rikka qaror va bayonnoma kerak emas. Buzilish topilsa — to'liq shaxsiy ko'rik." })
    ]; } },
    v3: { id: 'v3', title: "Yo'lovchi aeroportda: kelish va ketish", build: function () { return [
      T.title({ title: "Xalqaro aeroportda nazorat", sub: "Kelish va ketish zonalari", icon: 'takeoff', color: C.sky, cap: "Toshkent xalqaro aeroportida yo'lovchi qaysi nazoratlardan o'tishini kuzatamiz." }),
      T.grid({ head: "Chegarada 5 xil nazorat", color: C.sky, items: [{ i: 'flag', t: "Chegara" }, { i: 'shield', t: "Bojxona" }, { i: 'pill', t: "Sanitariya-karantin" }, { i: 'leaf', t: "Fitosanitariya" }, { i: 'activity', t: "Veterinariya" }], cap: "VM 912 bo'yicha: chegara, bojxona, sanitariya-karantin, fitosanitariya va veterinariya nazorati." }),
      airportScene(),
      T.flow({ head: "Ketish: masofaviy nazorat", color: C.blue, steps: ["Kamera va reys ma'lumotlari", "Qo'l yuki: aviatsiya xavfsizligi", "Buzilish → bojxonachi chaqiriladi"], cap: "Ketish zonasida 2022-yil 1-iyuldan masofaviy nazorat: bojxonachi faqat qonunbuzarlik aniqlanganda aralashadi." }),
      T.warn({ head: "O'tkazish punktida taqiqlanadi", text: "Chegara nazorati bo'linmasi boshlig'i ruxsatisiz suratga olish va mobil aloqa vositalaridan foydalanish.", icon: 'camoff', cap: "Suratga olish uchun ruxsatni chegara nazorati bo'linmasi boshlig'i beradi." })
    ]; } },
    v4: { id: 'v4', title: "YBD qachon kerak?", build: function () { return [
      T.title({ title: "Yo'lovchi bojxona deklaratsiyasi", sub: "YBD — qachon va kim to'ldiradi", icon: 'file', color: C.orange, cap: "YBD — yo'lovchining tovar va pul haqidagi yozma bayonoti." }),
      T.big({ head: "Kim to'ldiradi?", value: "16+", label: "16 yoshga to'lgan yo'lovchi", note: "bolaning tovari — egasi pasporti raqami bilan", color: C.orange, cap: "YBDni 16 yoshga to'lgan shaxs to'ldiradi." }),
      T.list({ head: "YBD majburiy, agar…", color: C.orange, size: 18, items: [{ i: 'dollar', t: "Me'yordan ortiq tovar" }, { i: 'cash', t: "100 mln so'mdan ortiq naqd pul" }, { i: 'luggage', t: "Kuzatuvsiz bagaj" }, { i: 'ban', t: "Taqiq yoki cheklovdagi tovar" }, { i: 'phone', t: "Chet eldan olingan telefon" }], cap: "Me'yordan ortiq tovar, 100 mln so'mdan ortiq pul, kuzatuvsiz bagaj, taqiqlangan yoki cheklangan tovar va telefon — YBD." }),
      T.big({ head: "Telefon qoidasi", value: "HAR DOIM", vsize: 52, label: "chet eldan olingan telefon YBDga yoziladi", note: "istisno: O'zbekistonda olingan va UZIMEI'da ro'yxatdan o'tgan", color: C.red, cap: "Telefon me'yor doirasida bo'lsa ham deklaratsiya qilinadi." }),
      T.formula({ head: "Eslab qoling", lines: [{ t: "Ortiqcha tovar + telefon +", s: 24 }, { t: "100 mln + bagaj + taqiq", s: 24 }, { t: "= QIZIL yo'lak, YBD", s: 30, c: C.red, box: true }], cap: "Shulardan biri bo'lsa — qizil yo'lak va YBD." })
    ]; } },
    v5: { id: 'v5', title: "1 000$ qoidasi va yagona bojxona to'lovi", build: function () { return [
      T.title({ title: "Olib kirish: 1 000$ qoidasi", sub: "VM 244 · 2025-yildan", icon: 'importi', color: C.green, cap: "Havo yo'li bilan qaytgan yo'lovchi uchun asosiy qoida." }),
      T.big({ head: "Bojsiz me'yor (havo)", value: "$1 000", label: "shaxsiy, notijorat tovarlar", note: "temir yo'l 500$ · avto/piyoda 300$ · kuryer 200$/oy", color: C.green, cap: "Havo transportida 1 000 dollargacha shaxsiy tovar bojsiz." }),
      T.warn({ head: "3 kun sharti", text: "Xorijda 3 kalendar kundan kam bo'lsa — me'yor qo'llanmaydi, to'lov tovarning to'liq qiymatiga hisoblanadi.", icon: 'cal', color: C.orange, cap: "Ikki kunlik safardan qaytgan yo'lovchi 1 000 dollarlik me'yordan foydalana olmaydi." }),
      T.formula({ head: "YBT formulasi", lines: [{ t: "Ortiqcha = qiymat − 1 000$", s: 24 }, { t: "A = 30% × ortiqcha", s: 24, c: C.blue }, { t: "B = 3$ × kg", s: 24, c: C.blue }, { t: "YBT = kattasi (A, B)", s: 28, c: C.green, box: true }, { t: "2027-yildan: 20% va 2$/kg", s: 22, c: C.purple, hl: '#ddd6fe' }], cap: "Me'yordan oshgan qismga ikki usulda hisoblab, kattasini olamiz. 2027-yildan stavka 20% va 2 dollar/kg." }),
      T.grid({ head: "Olib kirish taqiqlangan", color: C.red, items: [{ i: 'ban', t: "Elektron sigareta" }, { i: 'zap', t: "Lazer ko'rsatkich" }, { i: 'alert', t: "Etil spirti" }, { i: 'flame', t: "II toifa pirotexnika" }, { i: 'zap', t: "Eski induksion pech" }, { i: 'wine', t: "Plastik idishda alkogol" }], cap: "Bu tovarlarni umuman olib kirib bo'lmaydi." })
    ]; } },
    v6: { id: 'v6', title: "Olib chiqish me'yorlari", build: function () { return [
      T.title({ title: "Olib chiqish qoidalari", sub: "Eksport · jismoniy shaxslar", icon: 'exporti', color: C.blue, cap: "Yo'lovchi chet elga nimani erkin olib chiqishi mumkin?" }),
      T.big({ head: "Umumiy qoida", value: "$5 000", label: "gacha tovar — YBDsiz", note: "eksport boji va cheklovlardagi tovarlardan tashqari", color: C.blue, cap: "Umumiy qiymati 5 000 dollargacha tovar YBDsiz olib chiqiladi." }),
      T.formula({ head: "Zargarlik buyumlari", lines: [{ t: "Kumush ≤ 200 g", s: 30, c: C.gray }, { t: "Oltin ≤ 65 g", s: 30, c: C.amber }, { t: "Ortig'i — YBD bilan", s: 26, c: C.red, box: true }], cap: "Tayyor zargarlik: kumush 200 grammgacha, oltin 65 grammgacha deklaratsiyasiz." }),
      T.warn({ head: "Madaniy boyliklar", text: "50 yil va undan eski, reyestrdagi, muzey va arxivdagi madaniy boyliklarni olib chiqish mumkin emas.", icon: 'landmark', cap: "Boshqa madaniy boyliklar uchun Madaniyat vazirligi sertifikati kerak." }),
      T.list({ head: "Faqat ruxsatnoma bilan", color: C.amber, size: 18, items: [{ i: 'leaf', t: "Qizil kitob turlari" }, { i: 'target', t: "Qurol va o'q-dorilar" }, { i: 'radio', t: "Radioelektron vositalar" }, { i: 'pill', t: "Giyohvandlik vositalari" }, { i: 'key', t: "Kriptografik vositalar" }], cap: "Bu tovarlar tegishli ruxsatnoma bilan olib o'tiladi." })
    ]; } },
    v7: { id: 'v7', title: "Naqd pul va chegara", build: function () { return [
      T.title({ title: "Naqd valyuta", sub: "VM 66 · uch qoida", icon: 'cash', color: C.green, cap: "Naqd pul bo'yicha uchta qoidani eslab qolamiz." }),
      T.list({ head: "Uch qoida", color: C.green, items: [{ i: 'importi', t: "Olib kirish — cheklanmaydi" }, { i: 'file', t: "100 mln so'mdan ortig'i — YBD" }, { i: 'exporti', t: "Rezident: ko'pi bilan 100 mln" }], cap: "Olib kirish cheklanmaydi; 100 million so'mdan ortig'i deklaratsiya qilinadi; rezident ko'pi bilan 100 million olib chiqadi." }),
      T.compare({ head: "Rezident va norezident", a: { t: "Rezident", i: 'home', c: C.blue, items: ["100 mln gacha", "Ortig'i — mumkin emas"] }, b: { t: "Norezident", i: 'plane', c: C.purple, items: ["Ortig'i — faqat", "avval deklaratsiya", "qilingan summa"] }, cap: "Norezident ko'proq olib chiqa oladi — lekin faqat kirishda deklaratsiya qilgan summasi doirasida." }),
      T.big({ head: "Kelajakda", value: "$10 000", label: "deklaratsiyasiz olib chiqish — qonun loyihasi", note: "PF-174 · hali amalda emas!", color: C.purple, cap: "PF-174 bo'yicha 10 ming dollar chegarasi tayyorlanmoqda, lekin hozircha 100 million so'm qoidasi amal qiladi." })
    ]; } },
    v8: { id: 'v8', title: "Shaxsiymi yoki tijoratmi?", build: function () { return [
      T.title({ title: "Shaxsiymi yoki tijoratmi?", sub: "Tovar maqsadi va to'lovlar", icon: 'brief', color: C.pink, cap: "Tovar maqsadi to'lov tartibini belgilaydi." }),
      T.grid({ head: "4 mezon (VM 281)", color: C.pink, items: [{ i: 'box', t: "Xususiyati" }, { i: 'layers', t: "Miqdori" }, { i: 'refresh', t: "Takroriyligi" }, { i: 'plane', t: "Safar holatlari" }], cap: "Bir xil tovar ko'p bo'lsa yoki tez-tez olib kelinsa — bu tijorat belgisi." }),
      T.list({ head: "Hech qachon shaxsiy emas", color: C.red, size: 19, items: [{ i: 'zap', t: "Ichki yonuv dvigateli" }, { i: 'flame', t: "Markaziy isitish qozoni" }, { i: 'sun', t: "Solyariy" }, { i: 'user', t: "Sartaroshxona kreslosi" }, { i: 'pill', t: "Tibbiy-jarrohlik mebeli" }], cap: "PQ-4508 ro'yxatidagi tovarlar har doim tijorat deb baholanadi." }),
      T.formula({ head: "YBT: hozir va 2027", lines: [{ t: "Hozir: 30%, kamida 3$/kg", s: 26, c: C.blue }, { t: "Alkogol, tamaki — ×2", s: 22, c: C.gray }, { t: "2027: 20%, kamida 2$/kg", s: 26, c: C.purple, box: true }, { t: "2027-06-01: YBT < yig'im → yig'im yo'q", s: 20, c: C.green }], cap: "2027-yildan stavka pasayadi, kichik summalarda esa bojxona yig'imi olinmaydi." }),
      T.big({ head: "Tijorat: 30 BHM chegarasi", value: "13,2 mln", label: "so'm (30 × 440 000)", note: "kam bo'lsa — notarif choralar qo'llanmaydi", color: C.pink, cap: "Bojxona qiymati 30 BHMdan kam tijorat tovariga notarif choralar qo'llanmaydi." })
    ]; } },
    v9: { id: 'v9', title: "Huquqbuzarlik aniqlandi: 8 qadam", build: function () { return [
      T.title({ title: "Huquqbuzarlik aniqlandi", sub: "Xodim harakatlari algoritmi", icon: 'activity', color: C.red, cap: "Huquqbuzarlik aniqlanganda xodim qat'iy tartibda harakat qiladi." }),
      T.flow({ head: "1–4-qadamlar", color: C.red, steps: ["Huquqlarni tushuntirish", "Ushlab turish bayonnomasi", "Ko'zdan kechirish + foto", "Huquqbuzarlik bayonnomasi"], cap: "Avval huquqlar, zarur bo'lsa ushlab turish, tovarlarni ko'zdan kechirish va bayonnoma." }),
      T.flow({ head: "5–8-qadamlar", color: C.red, steps: ["Tushuntirish xatlari", "Tilxat", "Tovarlar saqlovi", "Axborot tizimiga kiritish"], cap: "So'ng tushuntirish xatlari, tilxat, saqlovga topshirish va YaAATga bexato kiritish." }),
      T.big({ head: "Ma'muriy ushlab turish", value: "3 soat", label: "bayonnoma uchun olib kelingan paytdan", note: "sud qarorisiz 48 soatdan ortiq — mumkin emas", color: C.red, cap: "Ushlab turish 3 soatgacha. Konstitutsiyaviy sud qaroridan keyin sudsiz 48 soatdan ortiq ushlab bo'lmaydi." }),
      T.list({ head: "Shaxsning huquqlari", color: C.blue, size: 19, items: [{ i: 'doc', t: "Ish bilan tanishish" }, { i: 'msg', t: "Tushuntirish berish" }, { i: 'scale', t: "Advokat" }, { i: 'globe', t: "Ona tili, tarjimon" }, { i: 'flag', t: "Shikoyat qilish" }], cap: "MJtK 294: bu huquqlarni xodim tushuntirishi shart." })
    ]; } },
    v10: { id: 'v10', title: "PF-174: farmon 2 daqiqada", build: function () { return [
      T.title({ title: "PF-174: Yangi O'zbekiston bojxonasi — 2030", sub: "Prezident farmoni · 27.08.2026", icon: 'rocket', color: C.purple, cap: "2026-yil 27-avgustdagi PF-174 farmonining asosiy g'oyalari." }),
      T.grid({ head: "2030-yil maqsadlari", color: C.purple, items: [{ i: 'zap', t: "60% inson omilisiz" }, { i: 'chart', t: "4,4% YaIMda" }, { i: 'clock', t: "2× tezroq" }, { i: 'shieldc', t: "Ishonch va halollik" }], cap: "60 foiz avtomatik rasmiylashtiruv, YaIMda 4,4 foiz tushum, ikki barobar tezroq va korrupsiyadan xoli bojxona." }),
      T.list({ head: "5 ustuvor yo'nalish", color: C.blue, size: 18, items: [{ i: 'users', t: "Qulay shart-sharoitlar" }, { i: 'cpu', t: "Sun'iy intellekt va raqam" }, { i: 'scale', t: "Bojxona ma'murchiligi" }, { i: 'cap', t: "Kadrlar va komplayens" }, { i: 'globe', t: "Xalqaro hamkorlik" }], cap: "Strategiya beshta yo'nalishga tayanadi." }),
      T.formula({ head: "Yo'lovchi uchun eng muhimi", lines: [{ t: "2027-01-01: YBT 20%, kamida 2$/kg", s: 22, c: C.purple, box: true }, { t: "2027-06-01: YBT < yig'im → yig'im yo'q", s: 21, c: C.green }, { t: "10 000$ valyuta — hozircha loyiha", s: 21, c: C.red, hl: '#fecaca' }], cap: "Yagona bojxona to'lovi pasayadi; kichik summalarda yig'im olinmaydi; 10 ming dollar qoidasi hali qonun emas." }),
      T.timeline({ head: "Muhim sanalar", color: C.purple, items: [{ d: '01.10.2026', t: "eksport yig'imlari −30%" }, { d: '01.01.2027', t: "YBT 20% · avtomatik BYD" }, { d: '01.06.2027', t: "9 ta yengillik" }, { d: '01.01.2028', t: "AI-tahlil · mobil ilova" }, { d: '2030', t: "60% avtomatik" }], cap: "2026-yil oktabrdan 2030-yilgacha — bosqichma-bosqich." }),
      T.list({ head: "Aeroportga nima keladi?", color: C.teal, size: 18, items: [{ i: 'scan', t: "Body scanner va interaskoplar" }, { i: 'bot', t: "SI robotlar va kiosklar" }, { i: 'phone', t: "“Customs fine” ilovasi" }, { i: 'star', t: "“Feedback” reytingi" }, { i: 'shieldc', t: "Integrity monitoring" }], cap: "Yangi texnika, SI yordamchilari, raqamli xizmatlar va kuchli komplayens." })
    ]; } }
  };
})(window);
