/* =========================================================
   data-pf174.js — PF-174 (27.08.2026) bo'yicha maxsus bo'lim
   Manba: Farmonning rasmiy matni (QMMB, 01.09.2026,
   06/26/174/0881-son) va uning 1–3-ilovalari.
   ========================================================= */
(function (global) {
  'use strict';
  const M = {
    id: "pf174", n: 10, isNew: true,
    title: "PF-174: “Yangi O'zbekiston bojxonasi — 2030”",
    short: "Prezidentning 2026-yil 27-avgustdagi farmoni — maqsadlar, muddatlar va yangiliklar qadamma-qadam",
    icon: "rocket", c1: "#7c3aed", c2: "#2563eb", mins: 25, video: "v10",
    kw: "pf-174 174 farmon strategiya 2030 yagona bojxona to'lovi 20 foiz 2 dollar ai-tahlil avtomatik rasmiylashtirish raqamli texnologiyalar markazi safe customs yo'l xaritasi",
    refs: ["PF-174", "PQ-4508", "VM-200", "VM-66"],
    steps: [
      { t: "Videodars: farmon 2 daqiqada", k: "Videodars", i: "video", video: "v10",
        b: [{ p: "Avval farmonning “katta rasmi”ni ko'ring: maqsadlar, 5 yo'nalish va eng muhim sanalar. Keyingi qadamlarda har birini alohida ochamiz." }] },

      { t: "Hujjat pasporti", k: "Tanishuv", i: "doc",
        b: [
          { kv: [["Turi", "Prezident Farmoni"], ["Raqami va sanasi", "PF-174, 2026-yil 27-avgust"], ["E'lon qilingan", "01.09.2026, QMMB 06/26/174/0881"], ["Tuzilishi", "7 bo'lim, 21 band, 3 ilova"], ["Shaxsan mas'ul", "Bojxona qo'mitasi raisi A.Yu. Mavlonov"], ["Ijroni nazorat qiladi", "Bosh vazir o'rinbosari J.A. Qo'chqorov"]], head: "Asosiy rekvizitlar" },
          { plain: "Farmonning to'liq nomi: **“Davlat bojxona xizmati organlari faoliyatini takomillashtirish va bojxona ma'murchiligida zamonaviy yondashuvlarni joriy etish chora-tadbirlari to'g'risida”**.\nMaqsad — bojxonani zamonaviy axborot texnologiyalari orqali **“Intellektual bojxona”**ga aylantirish va uni **ochiqlik, shaffoflik, ishonchlilik** tamoyillari asosida **korrupsiyadan xoli** tizimga aylantirish {ref:PF-174}." },
          { grid: [{ i: "target", t: "1-ilova", s: "“Yangi O'zbekiston bojxonasi — 2030” strategiyasi va uning chora-tadbirlar dasturi" }, { i: "route", t: "2-ilova", s: "Yo'l xaritasi — 56 ta aniq chora" }, { i: "doc", t: "3-ilova", s: "33 ta hujjatga o'zgartirish va qo'shimcha" }, { i: "listc", t: "Farmon matni", s: "Maqsadlar, aniq sanali yangiliklar, ijro" }], head: "Hujjat nimalardan iborat" },
          { tip: "Farmonni o'qishning oson yo'li: **maqsad → strategiya → sanali choralar → ijro**. Biz ham shu tartibda boramiz." }
        ] },

      { t: "Asosiy maqsadlar (2030-yilgacha)", k: "Maqsadlar", i: "target",
        b: [
          { widget: "gauges", o: { head: "2030-yil uchun maqsadli raqamlar", sub: "Farmonning I bo'limi va Strategiya ko'rsatkichlari", items: [{ v: 60, suf: "%", l: "inson omilisiz rasmiylashtiruv" }, { v: 4.4, dec: 1, suf: "%", l: "bojxona tushumlari YaIMda" }, { v: 2, suf: "×", l: "tezroq rasmiylashtiruv" }] } },
          { list: ["Tadbirkorlik uchun bojxona tartiblarini **soddalashtirish** va byurokratik to'siqlarni olib tashlash", "Raqamli texnologiyalar orqali **inson omilisiz** rasmiylashtiruv ko'lamini **60%** ga yetkazish", "Bojxona tushumlarining YaIMdagi ulushini **4,4%** ga yetkazish", "Rasmiylashtiruv vaqtini **ikki barobar** qisqartirish (import — o'rtacha **2 soat**, eksport — **30 daqiqa**)", "Xizmat sifatini oshirish va tadbirkorlarning bojxonaga **ishonchini** mustahkamlash"], i: "num", head: "Farmonning 1-bandi" },
          { table: { h: ["Ko'rsatkich", "Hozir", "2027", "2030"], r: [["Inson omilisiz rasmiylashtiruv", "20%", "30%", "60%"], ["Tushumlar YaIMda", "4,1%", "4,3%", "4,4%"], ["Import, o'rtacha", "4 s 10 daq", "3 s 30 daq", "2 soat"], ["Eksport, o'rtacha", "2 s 20 daq", "1 s 30 daq", "30 daq"]] } },
          { plain: "**“Inson omilisiz”** — deklaratsiyani tizim o'zi tekshirib, xodim aralashuvisiz rasmiylashtiradi. Bu tezlik va korrupsiya xavfini kamaytirish uchun eng muhim ko'rsatkich." }
        ] },

      { t: "Strategiya: 5 ustuvor yo'nalish", k: "Strategiya", i: "layers",
        b: [
          { lead: "“Yangi O'zbekiston bojxonasi — 2030” — 2026–2030-yillar uchun ikkinchi darajali strategik hujjat. Bosh g'oya: bojxonani **sun'iy intellektdan foydalanadigan, raqamli va shaffof, mintaqadagi yetakchi tashkilotga** aylantirish." },
          { steps: [
            { n: "a", t: "Qulay shart-sharoitlar", d: "Jismoniy va yuridik shaxslar uchun TIF tartiblarini soddalashtirish. Maqsad: VIOlar soni **500** ta, bojxona qiymatida asosiy usul ulushi **89%**." },
            { n: "b", t: "Sun'iy intellekt va raqamlashtirish", d: "Zamonaviy axborot tizimlari. Maqsad: “Yagona darcha” orqali **49** ta elektron xizmat." },
            { n: "v", t: "Bojxona ma'murchiligi", d: "Fiskal vazifalar, infratuzilma va texnika. Maqsad: XBT orqali qo'shimcha **2 trln so'm**, **100** ta dastlabki qaror." },
            { n: "g", t: "Kadrlar va komplayens", d: "Xorijiy mutaxassislar bilan **25** ta kurs, **7** nafar “master-trener”, kinologlar." },
            { n: "d", t: "Xalqaro hamkorlik", d: "**18** davlat bilan onlayn axborot almashinuvi, VIOni **7** davlat tan olishi, **800 ming $** grant." } ] },
          { tip: "5 yo'nalishni eslash uchun: **Qulaylik · Raqam · Ma'murchilik · Kadr · Hamkorlik**." }
        ] },

      { t: "Joriy holat raqamlarda", k: "Tahlil", i: "chart",
        b: [
          { widget: "gauges", o: { head: "Strategiya yozilgandagi holat", items: [{ v: 76.2, dec: 1, l: "trln so'm tushum (2025, +21%)" }, { v: 79, suf: "%", l: "deklaratsiyalar sariq/yashil yo'lakda" }, { v: 41, l: "aviakompaniya bilan oldindan axborot" }] } },
          { list: ["4 ta yirik post yonida bojxona terminallari — yuk oqimi **2 baravar** oshdi", "Rentgen uskunalaridan foydalanish samaradorligi **3 barobar** oshdi", "Masofaviy rasmiylashtiruv — o'rtacha vaqt **3 baravar** qisqardi", "Deklaratsiyalar: **79%** soddalashtirilgan, **10%** avtomatik, **11%** to'liq nazorat (“qizil”)", "Jahon banki LPI (2024): bojxona samaradorligi bo'yicha **140-o'rindan 74-o'ringa**"], i: "trend", head: "Erishilganlar" },
          { list: ["BMT tadqiqoti (2025): savdoni yengillashtirish **92,4%**, lekin institutsional hamkorlik **66,6%**", "XVJ (2025): korporativ boshqaruv, xavflarni boshqarish, post-audit, korrupsiyaga qarshi siyosatni kuchaytirish kerak", "SI loyihalari kuchli, lekin tarqoq — **SI laboratoriyasi** tavsiya etilgan", "Axborot tizimlari ko'p, integratsiya past; ayrim postlar infratuzilmasi talabga javob bermaydi"], i: "alert", head: "Hal qilinishi kerak bo'lgan muammolar", style: "bad" },
          { verify: "Hujjatning o'zida ayrim raqamlar bir-biriga mos kelmaydi (masalan, avtomatik rasmiylashtiruv joriy ulushi bir joyda 10%, boshqa joyda 20%). Qo'llanmada matndagi asosiy (Farmon va Strategiya bobidagi) raqamlar berildi." }
        ] },

      { t: "Tamoyillar va “ishonch indeksi”", k: "Yondashuv", i: "shieldc",
        b: [
          { grid: [{ i: "user", t: "Inson manfaati" }, { i: "link", t: "Uyg'unlik" }, { i: "trend", t: "Iqtisodiy samaradorlik" }, { i: "wallet", t: "Moliyaviy barqarorlik" }, { i: "usercheck", t: "Hisobdorlik" }, { i: "eye", t: "Shaffoflik" }, { i: "refresh", t: "Uzluksiz rejalashtirish" }, { i: "scale", t: "Imkoniyatlar tengligi" }], head: "Strategiyaning 8 tamoyili" },
          { widget: "levels", o: { head: "Kimga qanday nazorat?", sub: "Ishonch indeksi va xavf profiliga qarab", meter: "Nazorat darajasi", items: [
            { short: "Ishonchli", n: "Ishonchli ishtirokchilar", i: "shieldc", lvl: 1, d: "Maksimal soddalashtirish, **avtomatik** rasmiylashtiruv, ustuvor xizmat, keyinchalik (post) nazorat.", rows: [["Rasmiylashtiruv", "Avtomatik"], ["Nazorat vaqti", "Keyin (post-clearance)"]] },
            { short: "Umumiy", n: "Umumiy toifa", i: "users", lvl: 2, d: "Raqamli xizmatlar, **XBT asosida standart nazorat**, profilaktik maslahat.", rows: [["Rasmiylashtiruv", "Standart"], ["Nazorat", "Xavfga asoslangan"]] },
            { short: "Yuqori xavf", n: "Yuqori xavfli ishtirokchilar", i: "alert", lvl: 4, d: "**SI va katta ma'lumotlar** asosida kuchaytirilgan nazorat.", rows: [["Rasmiylashtiruv", "Kuchaytirilgan"], ["Vosita", "SI, big data"]] } ] } },
          { plain: "Strategiyada **jismoniy shaxslar (yo'lovchilar va fuqarolar)** alohida segment: ular uchun xizmatlarni soddalashtirish va raqamlashtirish, chegarada tezkorlik va qonunga **ixtiyoriy rioya** madaniyatini shakllantirish ko'zda tutilgan." }
        ] },

      { t: "2026-yil 1-sentabrdan bekor qilingan talablar", k: "Tadbirkorlar", i: "x",
        b: [
          { lead: "Farmon kuchga kirishi bilan tadbirkorlar uchun 5 ta talab olib tashlandi (Farmon 3-band “a”)." },
          { list: [
            "Shartnomasiz, **invoys** asosida importda xorijiy hamkorga **oldindan to'lov** o'tkazish cheklovi",
            "Shartnomasiz, invoys asosida eksportda **50% tushumni oldindan** ta'minlash talabi",
            "Eksport **milliy valyutada** bo'lsa — oldindan to'lov yoki kafolat (akkreditiv, bank kafolati, sug'urta polisi) talabi",
            "Sinov uchun **namuna yetarli bo'lmaganda** sanitariya-epidemiologik xulosa rasmiylashtirish (vakolatli organ xat beradi)",
            "Rasmiylashtiruvda biologik aktiv va yangi kimyoviy moddalar, oziq-ovqat qo'shimchalari, polimer, parfyumeriya-kosmetika uchun **ruxsatnoma** va dori/tibbiy jihozlar **guvohnomasini** taqdim etish — endi bular muvofiqlikni baholash va SEX vaqtida tekshiriladi" ], i: "num" },
          { ex: "Avval tadbirkor shartnomasiz invoys bo'yicha eksport qilsa, pulning yarmini oldindan olishi shart edi. Endi bu talab yo'q — savdo tezlashadi." }
        ] },

      { t: "2026-yil oktabr va 2027-yil yanvar", k: "Sanali yangiliklar", i: "cal",
        b: [
          { kv: [["Past xavfli, QQS guvohnomasi faol importchilar", "QQSni **o'zaro hisobga olish**"], ["Eksportda: rasmiylashtiruv, fitosanitariya, fumigatsiya, kelib chiqish sertifikati", "Yig'imlar **30% kamayadi**"]], head: "2026-yil 1-oktabrdan" },
          { kv: [["Past xavfli importchilar tovari qiymati", "Erkin muomalaga chiqarilgandan **keyin** nazorat"], ["“Qat'iy” bojxona qiymati belgilash", "**Taqiqlanadi**"], ["Bojxona qiymati bo'yicha", "**Dastlabki qaror** amaliyoti"], ["Qiymat nazoratida", "Rasmiy diller va distribyutor narxlari"]], head: "2027-yil 1-yanvardan (bojxona qiymati)" },
          { plain: "**Bojxona qiymati** — boj va soliqlar hisoblanadigan asosiy summa. Endi xodim “o'zi xohlagan” qat'iy qiymatni qo'ya olmaydi; past xavfli tadbirkorning tovari tez chiqariladi va qiymati keyin tekshiriladi." }
        ] },

      { t: "2027-yil 1-iyundan: 9+1 yengillik", k: "Sanali yangiliklar", i: "sparkles",
        b: [
          { ok: "Jismoniy shaxs notijorat tovari uchun **yagona bojxona to'lovi** to'lanishi lozim bo'lgan **bojxona yig'imlaridan kam** bo'lsa — yig'imlar **undirilmaydi** (Farmon 3-band “g”) {ref:PF-174}.", head: "Yo'lovchilar uchun" },
          { list: [
            "Kelib chiqish sertifikati va hujjatlar o'rtasidagi **kichik tafovutlar** sertifikatni rad etishga asos bo'lmaydi",
            "Eksportda **ekologik sertifikat** — faqat eksportyorning **ixtiyoriy** murojaati bilan",
            "Ortiqcha to'langan to'lovlarni qaytarish — **markazlashgan, elektron**",
            "**Reeksportda** ilgari to'langan boj va soliqlar BYDni qayta rasmiylashtirish orqali qaytariladi",
            "1 yil ichida to'g'ri kelib chiqish sertifikati berilsa — **eng ko'p qulaylik yoki erkin savdo rejimi** tiklanadi",
            "Post-nazoratda sertifikat xatosi topilsa — **3 yil** ichida tarif preferensiyasini tiklash huquqi",
            "**Tranzit deklaratsiyasini** transport chegaraga yetib kelguncha taqdim etish",
            "**Dastlabki BYD** = ruxsat hujjatlari uchun ariza; past xavfli tovarga hujjatlar **oldindan** beriladi, chegarada **tezlashtirilgan** chiqarish",
            "Vakolatli iqtisodiy operatorlarga eksport debitor qarzi uchun **moliyaviy jarimalar qo'llanmaydi**" ], i: "num", head: "Farmon 4-bandi" },
          { tip: "**1-iyun 2027** — yo'lovchi uchun “kichik summalarda yig'im yo'q” degan sana." }
        ] },

      { t: "Raqamli xizmatlar va mobil ilovalar", k: "Raqamlashtirish", i: "phone",
        b: [
          { list: ["**“Customs fine”** ilovasi — jismoniy shaxs jarima qarori bilan tanishadi, imtiyozli to'lash muddatini biladi va to'laydi (2027-yil iyun)", "**“Bojxona to'lovlarini qaytarish”** interaktiv xizmati (2027-yil iyun)", "**“Feedback”** moduli: tadbirkorlar bahosi asosida boshqarmalar, postlar va **xodimlar reytingi** (2027-yil iyul)", "**AI-chatbot**, interaktiv video qo'llanmalar, “step-by-step” gid, avtomatik SMS/email (2028-yil mart)", "Tadbirkorlar uchun barcha xizmat va to'lovlar **bitta mobil ilovada** (2028-yil 1-yanvargacha)"], i: "phone" },
          { warn: "“Feedback” reytingi — xodimning har bir muloqoti endi **baholanadi**. Xushmuomalalik va aniq tushuntirish — kasbiy talab.", head: "Xodim uchun ahamiyati" }
        ] },

      { t: "AI-tahlil va qayta ishlash rejimi", k: "Ma'murchilik", i: "cpu",
        b: [
          { plain: "**AI-tahlil (2028-yil 1-yanvardan):** tovar chiqarilgandan keyin tafovut topilsa, tizim tadbirkorga **avtomatik xabar** beradi va u xatoni **tekshiruvdan oldin, ixtiyoriy** tuzatadi (Farmon 5-band)." },
          { kv: [["Qayta ishlash muddati o'tib, 30 kun ichida olib chiqilmasa", "To'lovlar **so'zsiz** undiriladi"], ["Amalda qayta ishlanmagan yoki faqat qadoqlash, saralash kabi sodda operatsiya", "Har kun uchun **MB asosiy stavkasi** miqdorida foiz"], ["Importchilar uchun soliq va bojxona sayyor tekshiruvlari", "**Birgalikda** (2027-yil 1-apreldan)"]], head: "2027-yildan (Farmon 6-band)" },
          { ex: "Tadbirkor tovarni “qayta ishlash” rejimida bojsiz olib kirdi, lekin faqat qayta qadoqlab sotdi. Endi u to'lovlar ustiga har kun uchun foiz ham to'laydi — rejimni suiiste'mol qilish foydasiz bo'ladi." }
        ] },

      { t: "Avtomatik rasmiylashtirish: 4 shart", k: "Inson omilisiz", i: "zap",
        b: [
          { lead: "2027-yil 1-yanvardan past xavfli tadbirkorlar uchun (Post Clearance shartlari bilan) BYD **avtomatik** rasmiylashtiriladi — JBT xavflarni boshqarish tavsiyalari asosida (Farmon 7-band)." },
          { widget: "checklist", o: { head: "Avtomatik rasmiylashtiriladimi?", sub: "Har bir shartni belgilang", icon: "zap", items: ["Tovarlar **bir shartnoma** doirasida bir necha bor olib kelinmoqda", "XBT aniqlagan qo'shimcha to'lov **BHMning 10 baravarigacha**", "Bojxona shaxsiy g'azna hisobvarag'ida **yetarli mablag'** bor", "Deklarant qo'shimcha to'lovni tizim **avtomatik undirishiga rozi**"], yes: { t: "BYD avtomatik rasmiylashtiriladi", d: "To'rt shart bir vaqtda bajarildi — xodim aralashuvisiz." }, no: { t: "Avtomatik emas", d: "Barcha 4 shart **bir vaqtda** bajarilishi kerak." } } },
          { list: ["Erkin savdo bitimi a'zosi bo'lgan davlatlar bilan axborot almashinuvida **tafovut bo'lmasa** va BYDda eksportyor deklaratsiyasi rekvizitlari ko'rsatilsa — avtomatik", "Deklarant rozi bo'lsa, BYD xodim aralashuvisiz rasmiylashtirilishi mumkin — bunda **bosh ta'minot** taqdim etish majburiy"], i: "check", head: "Yana ikki holat" },
          { tip: "10 BHM = 4 400 000 so'm (BHM 440 000 so'm bo'yicha)." }
        ] },

      { t: "Yagona bojxona to'lovi: 20% va 2$/kg", k: "To'lovlar", i: "percent",
        b: [
          { num: { v: "20% · 2$", l: "2027-yil 1-yanvardan YBT stavkasi: bojxona qiymatining 20 foizi, lekin har kg uchun kamida 2 AQSh dollari (Farmon 8-band)" } },
          { cmp: { a: { t: "2027-yildan", i: "trend", items: ["20% bojxona qiymatidan", "Kamida 2 $ / kg", "PQ-4508 3-bandi yangi tahrirda"] }, b: { t: "Hozir (2026)", i: "clock", items: ["30% bojxona qiymatidan", "Kamida 3 $ / kg", "Alkogol, tamaki — ikki baravar"] } } },
          { widget: "importCalc", o: { compare: true, val: 2000, kg: 20 } },
          { list: ["Amaldagi boj imtiyozlari (ozod etish, nol stavka) — **muddati tugaguncha saqlanadi**", "**Muddatsiz** berilgan boj imtiyozlari — **2029-yil 1-yanvar**gacha amal qiladi", "JST bo'yicha idoralararo komissiyaning vaqtinchalik tarif vakolatlari — **2028-yil 1-yanvar**gacha"], i: "info", head: "Imtiyozlar (Farmon 9-band)" },
          { verify: "2027-yildan alkogol va tamaki uchun “ikki baravar” qoida qanday qo'llanishi Farmonda alohida aytilmagan — PQ-4508 yangi tahririda tekshiring." }
        ] },

      { t: "Raqamli texnologiyalar markazi va “Safe Customs”", k: "Infratuzilma", i: "building",
        b: [
          { plain: "Bojxona qo'mitasining AKT va kiberxavfsizlik boshqarmasi negizida **alohida yuridik shaxs** — **Raqamli texnologiyalar markazi** tashkil etiladi. Vazifasi: SI va raqamli texnologiyalarni joriy etish, kiberxavfsizlik, axborot tizimlarini ishlab chiqish, idoralar va xorijiy bojxonalar bilan integratsiya (Farmon 10–14-band)." },
          { list: ["Respublika budjeti", "Bojxona qo'mitasining budjetdan tashqari mablag'lari", "Xalqaro moliya institutlari grantlari", "Xorijiy avtotransport kirish/tranzit yig'imining **10%**", "Bojxona hamrohligi yig'imlarining **100%**", "Fitosanitariya va veterinariya obyektlari yig'imlarining belgilangan qismi", "Qonun taqiqlamagan boshqa manbalar"], i: "num", head: "Markazni moliyalash manbalari" },
          { kv: [["“Bojxona-servis” DM", "MCHJga aylantiriladi (xorijiy investitsiya bilan)"], ["“Safe Customs”", "Yagona raqamli axborot ekotizimi (VM 2 oyda NHH qabul qiladi)"], ["Avtoturargoh va logistika (2026–2028)", "Andijon, Surxondaryo, Toshkent viloyatlari"], ["Yer maydonlari", "Xonobod — 5 ga, Ayritom — 27 ga, S. Najimov — 20 ga"]] }
        ] },

      { t: "Aeroportga qanday texnika va SI keladi?", k: "Texnika", i: "scan",
        b: [
          { grid: [{ i: "scan", v: "7 ta", t: "Body scanner", s: "18 mlrd so'm (hozir 21 ta)" }, { i: "luggage", v: "44 ta", t: "Qo'l yuki interaskopi", s: "61,6 mlrd so'm (hozir 201 ta)" }, { i: "bot", v: "SI robot", t: "Info-robot va kiosklar", s: "Aeroportlarda, 2026–2027" }, { i: "eye", v: "Smart CCTV", t: "Yuzni tanish, ANPR", s: "2030-yil dekabrgacha" }] },
          { list: ["Chegara postlarida yo'lovchilarga **deklaratsiya to'ldirish** tartibini tushuntiruvchi SI interaktiv robotlar (2026–2030)", "Chegaradan o'tuvchi fuqarolar uchun **SI asosidagi raqamli xavf-profil** modeli", "**41** ta aviakompaniyadan yo'lovchilar va bagaj haqida oldindan axborot", "**Mass-spektrometriya** — sintetik narkotiklar va fentanil analoglarini aniqlash (2027–2029)", "Mobil (avtomobildagi) laboratoriya (2027-yil dekabr)", "Xalqaro yo'lovchi poyezdlarida barcha fuqarolar **XBT** orqali (2027-yil oktabr)"], i: "check" },
          { tip: "Robot va kiosklar loyihasi “Uzbekistan Airports” AJ ishtirokida amalga oshiriladi — bu bevosita Toshkent aeroporti xodimlariga taalluqli." }
        ] },

      { t: "Kadrlar, rag'batlantirish va komplayens", k: "Xodimlar", i: "usercheck",
        b: [
          { list: ["Xorijiy mutaxassislar bilan **25** ta o'quv kursi; **7** “master-trener”", "Bojxona instituti — JBT **mintaqaviy o'quv markazi**ga (2027-yil dekabr); **Yangi Toshkentga** ko'chiriladi", "**26-yanvar** — bojxona xodimlari kuni (VM farmoyishi)", "Yangi ko'krak nishonlari; bojxona xodimlari **“To'maris”** nishoniga ham taqdim etiladi", "Ish vaqtidan tashqari ko'rik yig'imining **10%** — operatsiyada ishtirok etgan xodimga (2027-yil iyun)", "Chegara postlarida **3 va 4 smenali** xizmat", "QS top-300 universitetlari bitiruvchilari uchun **stajirovka** (3 oydan 1 yilgacha)"], i: "cap", head: "Kadrlar" },
          { list: ["**ISO 37001:2025** (korrupsiyaga qarshi boshqaruv) — 2027-yil dekabr", "Qarorlarni **QR-kod** orqali tekshirish, **“Digital log”** — 2029-yil noyabr", "**“Integrity monitoring”** — yuqori korrupsion xavfli lavozimlardagi xodimlar turmush tarzi tahlili", "Xodim va tadbirkor o'rtasidagi bevosita muloqotni kamaytirish"], i: "shieldc", head: "Komplayens" },
          { warn: "Komplayens — “qog'ozdagi talab” emas: turmush tarzi tahlili va raqamli izlar (Digital log) xodimning har bir qarorini kuzatiladigan qiladi.", head: "Muhim" }
        ] },

      { t: "Xalqaro hamkorlik", k: "Hamkorlik", i: "globe",
        b: [
          { list: ["Armaniston, Tailand, Indoneziya bilan bitimlar (2027-yil iyul)", "**“Yagona to'xtash”** (one-stop border post) — Rishton, Vodil, Oqqiya, Chashma, Xonobod", "CAREC CATS, WCO TRS dasturlari", "JBTning **CLiKC!** onlayn darslarini o'zbek tiliga tarjima", "VIOlarni o'zaro tan olish bitimlarini ko'paytirish (7 davlatgacha)"], i: "globe" },
          { p: "Bu yo'nalish natijasida yuk va yo'lovchi ma'lumotlari chegaradan **oldinroq** keladi — bojxonachi xavfni oldindan baholaydi." }
        ] },

      { t: "Yo'l xaritasi: 56 ta chora", k: "2-ilova", i: "route",
        b: [
          { kv: [["I. Qulay shart-sharoitlar", "1–17-bandlar"], ["II. Bojxona ma'murchiligi", "18–25-bandlar"], ["III. Infratuzilma va SI", "26–44-bandlar"], ["IV. Kadrlar va komplayens", "45–49-bandlar"], ["V. Hamkorlik va muloqot", "50–56-bandlar"]], head: "Tuzilishi" },
          { list: [
            "**7-band** — jismoniy shaxs tovari bo'yicha YBT yig'imdan kam bo'lsa, yig'im olinmaydi (qonun, 2027-yil iyun)",
            "**8-band** — chegarada to'lov xavflari bo'yicha bojxona ko'rigini bekor qilish, xavfsizlik uchun istisnolar (VM, 2027-yil iyun)",
            "**11-band** — tadbirkor birinchi marta huquqbuzarlik qilib, to'lovni ixtiyoriy to'lasa, ish bojxonaning o'zida tugatilib, tovar qaytariladi (2027-yil noyabr)",
            "**12-band** — naqd valyutani olib chiqish me'yori **10 000$**, faqat oshganda deklaratsiya (qonun loyihasi, 2027-yil dekabr)",
            "**16-band** — AI-chatbot, step-by-step gid, bepul seminarlar (2028-yil mart)",
            "**37 va 42-bandlar** — aeroport va postlarda SI robotlar, kiosklar",
            "**53-band** — “Feedback” va xodimlar reytingi; **56-band** — “Customs Open Dialogue” har oy" ], i: "check", head: "Yo'lovchi va xodim uchun eng muhimlari" },
          { warn: "10 000$ qoidasi — hozircha **qonun loyihasi topshirig'i**. Amalda hali 100 mln so'm qoidasi ishlaydi {ref:VM-66}.", head: "Adashmang" }
        ] },

      { t: "3-ilova: 33 hujjatga o'zgartirishlar", k: "O'zgartirishlar", i: "doc",
        b: [
          { table: { h: ["Hujjat", "Nima o'zgardi"], r: [
            ["PQ-4508", "YBT: **20%, kamida 2$/kg** (2027-01-01 dan)"],
            ["VM 200", "Tez buziladiganlar qatoriga **chorva va parranda**; sotuvdan tushum **IMEI ro'yxatga olish** xarajati chegirilib **3 kunda** o'tkaziladi"],
            ["PF-57", "Bojxona omborida **90 kun** talab qilinmagan tovar — **sud qarori bilan** davlat egaligiga"],
            ["PQ-122", "“Toshkent-AERO” ixtisoslashtirilgan bojxona kompleksi tuzilmada saqlanadi; maxsus rentgen-nazorat qurilmalariga tibbiy rentgen tartiblari qo'llanmaydi"],
            ["PQ-422", "Bojxona xodimlari **“To'maris”** ko'krak nishoniga ham taqdim etiladi"],
            ["VM 160", "**Qat'iy minimal** bojxona qiymatlaridan foydalanish taqiqlanadi"],
            ["VM 279", "Bo'lib to'lash: 51–100 ish o'rni — **60**, 101–200 — **90**, 200+ — **120** kun"],
            ["PQ-3351, VM 163", "Shartnomasiz, **invoys** asosida eksport — milliy valyutada ham"] ] } },
          { plain: "3-ilovaning mantig'i: farmondagi yangi qoidalar boshqa hujjatlarda ham **bir xil** ishlashi uchun eski matnlar moslashtirildi; ko'plab bojxona imtiyozlari **“ro'yxat asosida, o'xshashi yo'q tovarlar”** bilan toraytirildi." }
        ] },

      { t: "Ijro: kim, nima va qachon?", k: "Ijro", i: "clock",
        b: [
          { steps: [
            { n: "1 oy", t: "Monitoring guruhi", d: "Bojxona qo'mitasi rahbariyati boshchiligida Strategiya monitoring guruhi va mexanizmi." },
            { n: "2 oy", t: "“Bojxona-servis” MCHJ va “Safe Customs”", d: "Vazirlar Mahkamasi tegishli normativ hujjatni qabul qiladi." },
            { n: "3 oy", t: "Qonun loyihalari va takliflar", d: "Imtiyozlar to'g'risidagi qonun loyihasi, RTM qarori loyihasi, yer ajratish, qonunchilikka o'zgartish takliflari." },
            { n: "Har oy", t: "Hisobot", d: "Vazirlik va idoralar Bojxona qo'mitasiga ijro bo'yicha ma'lumot beradi." },
            { n: "Har yil", t: "Ko'rsatkichlar hisoboti", d: "Natija ko'rsatkichlari — 20-martgacha, ta'sir ko'rsatkichlari — 10-aprelgacha." },
            { n: "2028", t: "Oraliq baholash", d: "Zaruratga ko'ra; Strategiya tugagach — yakuniy baholash." } ] },
          { table: { h: ["Manba (mlrd so'm)", "2026–2030"], r: [["Davlat budjeti", "109"], ["Bojxona qo'mitasi budjetdan tashqari jamg'armalari", "1 529"], ["Raqamli texnologiyalar markazi", "78"], ["**Jami**", "**1 716**"]] } }
        ] },

      { t: "Aeroport xodimi uchun: nima o'zgaradi?", k: "Amaliyot", i: "takeoff",
        b: [
          { list: [
            "**2027-01-01** dan YBT hisoblashda **20% / 2$·kg** formulasini qo'llang {ref:PQ-4508}",
            "**2027-06-01** dan: YBT bojxona yig'imidan kam bo'lsa — yig'im olinmaydi",
            "Naqd valyuta: hozir **100 mln so'm** qoidasi; 10 000$ — faqat loyiha {ref:VM-66}",
            "Yangi **body scanner** va qo'l yuki interaskoplari; SI robotlar va kiosklar yo'lovchiga YBD to'ldirishni tushuntiradi",
            "Yo'lovchilar haqida **oldindan axborot** (41 aviakompaniya) va SI xavf-profili — tanlab olish aniqroq bo'ladi",
            "Musodara qilingan telefon sotilsa, **IMEI** xarajati chegiriladi; tushum 3 kunda o'tkaziladi {ref:VM-200}",
            "“Feedback” reytingi va “Integrity monitoring” — xizmat sifati va halollik kuzatiladi",
            "“Toshkent-AERO” IBK maqomi yangi tuzilmada **saqlanadi**" ], i: "check", style: "ok" },
          { check: { q: "2027-yil fevralida yo'lovchi me'yordan 1 000$ ortiq, 10 kg tovar olib keldi. YBT qancha?", o: ["300$ (30%)", "200$ (20%)", "30$ (3$ × 10 kg)", "20$ (2$ × 10 kg)"], a: 1, ex: "2027-01-01 dan: max(20% × 1 000$ = 200$; 2$ × 10 kg = 20$) = **200$** {ref:PF-174}." } }
        ] },

      { t: "Muddatlar xaritasi", k: "Interaktiv", i: "cal",
        b: [{ widget: "timeline", o: { head: "PF-174: sanalar bo'yicha", sub: "Sanani bosing — tafsilot ochiladi. Yashil belgi — kuchga kirgan.", items: [
          { iso: "2026-08-27", d: "27.08.2026", t: "Farmon imzolandi", more: "01.09.2026 da QMMBda e'lon qilindi (06/26/174/0881)." },
          { iso: "2026-09-01", d: "01.09.2026", t: "5 ta talab bekor qilindi", more: "Invoys bo'yicha import/eksportdagi oldindan to'lov talablari, milliy valyutadagi eksport kafolati, namuna yetarli bo'lmaganda SEX, ayrim ruxsatnomalarni rasmiylashtiruvda taqdim etish." },
          { iso: "2026-10-01", d: "01.10.2026", t: "QQSni o'zaro hisob; eksport yig'imlari −30%", more: "Past xavfli importchilar uchun QQS o'zaro hisobi; eksportda rasmiylashtiruv, fitosanitariya, fumigatsiya, kelib chiqish sertifikati yig'imlari 30% kamayadi." },
          { iso: "2026-12-01", d: "2026-yil dekabr", t: "Raqamli texnologiyalar markazi (VM qarori)", more: "Shuningdek: 5 000$ gacha tijorat tovarlarini olib chiqishning shaffof tartibi." },
          { iso: "2027-01-01", d: "01.01.2027", t: "YBT 20% / 2$·kg; avtomatik BYD; qiymat nazorati", more: "Qat'iy qiymat taqiqi, dastlabki qaror, post-nazorat; qayta ishlash rejimi bo'yicha so'zsiz undirish va foiz." },
          { iso: "2027-04-01", d: "01.04.2027", t: "Soliq va bojxona tekshiruvlari birgalikda" },
          { iso: "2027-06-01", d: "01.06.2027", t: "YBT < yig'im bo'lsa, yig'im olinmaydi; 9 yengillik", more: "“Customs fine” ilovasi, to'lovlarni qaytarish xizmati ham shu oyda." },
          { iso: "2027-07-01", d: "2027-yil iyul", t: "“Feedback” va xodimlar reytingi" },
          { iso: "2027-10-01", d: "2027-yil oktabr", t: "Poyezd yo'lovchilari XBT orqali" },
          { iso: "2027-12-01", d: "2027-yil dekabr", t: "10 000$ valyuta (qonun loyihasi), ISO 37001:2025" },
          { iso: "2028-01-01", d: "01.01.2028", t: "AI-tahlil; tadbirkorlar uchun yagona mobil ilova" },
          { iso: "2029-01-01", d: "01.01.2029", t: "Muddatsiz boj imtiyozlari tugaydi" },
          { iso: "2029-11-01", d: "2029-yil noyabr", t: "QR-kod, Digital log, Integrity monitoring" },
          { iso: "2030-12-31", d: "2030", t: "Maqsad: 60% avtomatik, 4,4% YaIM, import 2 soat / eksport 30 daqiqa" } ] } }] },

      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [
          { list: ["PF-174 — 27.08.2026; strategiya “Yangi O'zbekiston bojxonasi — 2030”", "Maqsad: 60% inson omilisiz, 4,4% YaIM, 2 barobar tez", "5 yo'nalish: qulaylik, SI, ma'murchilik, kadr, hamkorlik", "YBT: 2027-01-01 dan 20% / 2$·kg; 2027-06-01 dan kichik summalarda yig'im yo'q", "Avtomatik BYD — 4 shart bir vaqtda", "10 000$ valyuta — hozircha loyiha"], style: "ok", head: "Eslab qoling" },
          { p: "Endi **bo'lim testi**: 20 ta savol, 100 ballik baholash." }
        ] }
    ]
  };
  global.MODULES = (global.MODULES || []).concat([M]);
})(window);
