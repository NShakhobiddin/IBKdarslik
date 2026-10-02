/* =========================================================
   data-modules.js — 9 asosiy modul (oddiy tilda)
   Blok turlari: lead, p, plain, tip, ex, warn, ok, verify, list,
   grid, kv, num, steps, cmp, law, table, refs, widget, check
   ========================================================= */
(function (global) {
  'use strict';

  global.MODULES = [
  /* ===================== 1 ===================== */
  {
    id: "asosiy", n: 1, title: "Asosiy tushunchalar va nazorat shakllari", short: "Hudud, chegara, nazorat zonasi va 4 asosiy nazorat shakli",
    icon: "map", c1: "#14b8a6", c2: "#059669", mins: 10, video: "v1",
    kw: "hudud chegara zona nazorat og'zaki so'rov ko'zdan kechiruv ko'rik tanlab olish jarima 227 189 191 193 195",
    refs: ["BK-5", "BK-182", "BK-189", "BK-191", "BK-193", "BK-195", "MJtK-227"],
    steps: [
      { t: "Videodars: bojxona qayerda va qanday ishlaydi", k: "Videodars", i: "video", video: "v1",
        b: [{ p: "Avval 1 daqiqalik videoni ko'ring — keyingi qadamlarda har bir tushunchani alohida, misollar bilan o'rganamiz." }] },
      { t: "Bojxona hududi va bojxona chegarasi", k: "1-tushuncha", i: "map",
        b: [
          { lead: "Bojxona qonunlari **qayerda** amal qilishini bilish — har qanday bojxona ishining boshlanishi." },
          { plain: "**Bojxona hududi** — bu O'zbekistonning butun yeri, suvlari va ularning **ustidagi osmoni**. Ya'ni Toshkent aeroportiga qo'nayotgan samolyot hali yerga tegmasdan ham bojxona hududida bo'ladi.\n**Bojxona chegarasi** — shu hududning sarhadi. Unga **erkin bojxona zonalari** va **erkin omborlarning** chegarasi ham kiradi." },
          { widget: "layers", o: { items: {
            hudud: { t: "Bojxona hududi", d: "Quruqlik + hududiy va ichki suvlar + ular ustidagi havo hududi {ref:BK-5}." },
            chegara: { t: "Bojxona chegarasi", d: "Hudud sarhadlari **va** erkin bojxona zonalari hamda erkin omborlar perimetri. Erkin zona ichi, qonunda boshqacha belgilanmagan bo'lsa, bojxona hududidan tashqarida deb hisoblanadi {ref:BK-5}." },
            zona: { t: "Bojxona nazorati zonasi", d: "Hudud ichidagi **maxsus ajratilgan va belgilangan** joy — masalan, aeroportning bagaj zali, bojxona ko'rigi joylari. Bu yerda harakat faqat bojxona ruxsati bilan {ref:BK-182}." } } } },
          { tip: "Hudud — **yer + suv + osmon**. Chegara — **sarhad + erkin zonalar perimetri**." },
          { law: { ref: "BK-5", q: "“O'zbekiston Respublikasining quruqlikdagi hududi, hududiy va ichki suvlari hamda ular ustidagi havo hududi O'zbekiston Respublikasining bojxona hududini tashkil etadi.”" } }
        ] },
      { t: "Bojxona nazorati zonasi", k: "2-tushuncha", i: "shield",
        b: [
          { plain: "Aeroportda shunday joylar borki, u yerga hamma ham kira olmaydi: bagaj olish zali, bojxona ko'rigi joylari, nazoratdagi yuklar turgan omborlar. Bular — **bojxona nazorati zonasi**. U yerda ishlash, yuk ko'chirish, hatto boshqa idora xodimlarining yurishi ham **faqat bojxona organining ruxsati bilan va uning nazorati ostida** bo'ladi {ref:BK-182}." },
          { grid: [
            { i: "lock", t: "Ruxsat bilan", s: "Kirish, faoliyat, yuk harakati" },
            { i: "eye", t: "Nazorat ostida", s: "Bojxona mansabdor shaxslari kuzatadi" },
            { i: "clock", t: "1 ish kuni", s: "Ruxsat yoki rad etish haqida xabar muddati" },
            { i: "users", t: "Hammaga taalluqli", s: "Boshqa davlat organlari xodimlariga ham" } ] },
          { ex: "Aeroport texnik xodimi bagaj zaliga bojxona ruxsatisiz kirib, yo'lovchi chamadonini konveyerdan olib qo'ydi. Bu — **zona rejimini buzish**. Keyingi qadamda bunga qanday javobgarlik borligini ko'ramiz." },
          { check: { q: "Bojxona nazorati zonasida boshqa davlat organi xodimi ishlashi uchun nima kerak?", o: ["Hech narsa — davlat xodimlariga cheklov yo'q", "Bojxona organining ruxsati va nazorati", "Faqat aeroport ma'muriyatining ruxsati", "Faqat xizmat guvohnomasi"], a: 1, ex: "BK 182-moddaga ko'ra zonadagi faoliyat va harakat — boshqa davlat organlari xodimlari uchun ham — faqat bojxona organining ruxsati bilan va nazorati ostida {ref:BK-182}." } }
        ] },
      { t: "Zona rejimini buzish: jarima", k: "Javobgarlik", i: "gavel",
        b: [
          { num: { v: "1–3 BHM", l: "fuqarolarga jarima\n(mansabdor shaxslarga — 3–5 BHM)" } },
          { kv: [["1 BHM (2026-yil 1-sentabrdan)", "440 000 so'm"], ["Fuqaro: 1–3 BHM", "440 000 – 1 320 000 so'm"], ["Mansabdor shaxs: 3–5 BHM", "1 320 000 – 2 200 000 so'm"]], head: "Hisob-kitob" },
          { warn: "Bojxona organining **ruxsatisiz** zona chegarasi orqali va uning ichida tovar, transport yoki shaxslarni olib o'tish, shuningdek zona rejimini buzuvchi boshqa harakatlar taqiqlanadi {ref:MJtK-227}." },
          { plain: "**Nima uchun mansabdor shaxsga ko'proq?** Chunki u qoidalarni bilishi va boshqalarga namuna bo'lishi kerak. Lavozim — qo'shimcha mas'uliyat." },
          { tip: "BHM o'zgarsa, jarimaning **so'mdagi** miqdori ham o'zgaradi — BHMdagi miqdori esa (1–3, 3–5) o'zgarmaydi." }
        ] },
      { t: "Tanlab olish prinsipi", k: "Asosiy qoida", i: "target",
        b: [
          { lead: "Bojxona har bir yo'lovchini birdek to'liq tekshirmaydi. Bu qonunda yozilgan prinsip." },
          { plain: "**BK 189-modda** bo'yicha bojxona nazorati shakllari **tanlab olish prinsipi** asosida qo'llanadi: Xavflarni boshqarish tizimi (XBT) xavfli deb ko'rsatgan yo'lovchi yoki yuk chuqurroq tekshiriladi, qolganlar tez o'tadi. Xodim qonunga rioyani ta'minlash uchun **yetarli bo'lgan eng yengil shaklni** tanlaydi {ref:BK-189}." },
          { ex: "Shifokor bemorni avval so'raydi, keyin ko'radi, kerak bo'lsagina tahlil buyuradi. Bojxonachi ham shunday: og'zaki so'rov yetarli bo'lsa, chamadonni ochish shart emas." },
          { list: ["Hujjat va ma'lumotlarni tekshirish", "**Og'zaki so'rov** {ref:BK-191}", "Tushuntirish olish", "**Bojxona ko'zdan kechiruvi** {ref:BK-193}", "Markirovkani tekshirish", "**Bojxona ko'rigi** {ref:BK-195}", "**Shaxsiy ko'rik** {ref:BK-196}"], i: "num", head: "Nazorat shakllari (BK 188-modda)" },
          { tip: "Shaklni **vakolatli mansabdor shaxs** tanlaydi va tanlovini asoslay olishi kerak." }
        ] },
      { t: "To'rt asosiy shakl: so'rovdan shaxsiy ko'rikkacha", k: "Interaktiv", i: "layers",
        b: [
          { p: "Shakllarni bosib, ular qanchalik “chuqur” ekanini solishtiring. Har biri keyingisidan yengilroq." },
          { widget: "levels", o: { head: "Nazorat shakllari zinapoyasi", sub: "Aralashuv darajasi oshib boradi", items: [
            { short: "So'rov", n: "Og'zaki so'rov", i: "msg", lvl: 1, d: "Kerakli ma'lumot **og'zaki** olinadi, natija yozma rasmiylashtirilmaydi {ref:BK-191}.", rows: [["Nima tekshiriladi", "Yo'lovchidan ma'lumot"], ["Ochiladimi", "Yo'q", "n"], ["Plomba / muhr", "Buzilmaydi"], ["Kim ishtirok etadi", "Xodim va yo'lovchi"]] },
            { short: "Ko'zdan kech.", n: "Bojxona ko'zdan kechiruvi", i: "scan", lvl: 2, d: "Tovar, bagaj **ochilmasdan**, butligi buzilmasdan tekshiriladi: rentgen-skaner, kinolog iti {ref:BK-193}.", rows: [["Nima tekshiriladi", "Bagaj, tovar — tashqaridan"], ["Ochiladimi", "Yo'q", "n"], ["Plomba / muhr", "Buzilmaydi"], ["Odatiy vosita", "Skaner, it"]] },
            { short: "Ko'rik", n: "Bojxona ko'rigi", i: "box", lvl: 3, d: "Bagaj, qadoq **ochiladi**; plomba, muhr buzilishi, buyum qismlarga ajratilishi mumkin {ref:BK-195}.", rows: [["Nima tekshiriladi", "Bagaj, qadoq — ichi"], ["Ochiladimi", "Ha", "y"], ["Plomba / muhr", "Buzilishi mumkin", "y"], ["Kim ishtirok etadi", "Yo'lovchi; yo'q bo'lsa — 2 xolis"]] },
            { short: "Shaxsiy", n: "Shaxsiy ko'rik", i: "finger", lvl: 4, d: "**Istisno** shakl: inson tanasi va kiyimi tekshiriladi. Yozma qaror, bir jinsli xodim, 2 xolis, bayonnoma {ref:BK-196}.", rows: [["Nima tekshiriladi", "Inson tanasi va kiyimi"], ["Qaror", "Boshliqning yozma qarori", "y"], ["Xolislar", "2 ta, bir jinsli", "y"], ["Hujjat", "Bayonnoma", "y"]] } ] } }
        ] },
      { t: "Ko'zdan kechiruv va ko'rik: farqni adashtirmang", k: "Ko'p xato qilinadi", i: "eye",
        b: [
          { cmp: { a: { t: "Ko'zdan kechiruv", i: "eye", items: ["Ochilmaydi", "Plomba, muhr buzilmaydi", "Qismlarga ajratilmaydi", "Skaner, it, tashqi ko'rish", "BK 193-modda"] }, b: { t: "Ko'rik", i: "box", items: ["Ochiladi", "Plomba, muhr buzilishi mumkin", "Qismlarga ajratilishi mumkin", "Qo'lda, ichini tekshirish", "BK 195-modda"] } } },
          { tip: "Ko'zdan kechiruv — **ko'z** bilan (ochmasdan). Ko'rik — **qo'l** bilan (ochib)." },
          { check: { q: "Chamadon rentgen-skanerdan o'tkazildi, ochilmadi. Bu qaysi shakl?", o: ["Bojxona ko'rigi", "Bojxona ko'zdan kechiruvi", "Shaxsiy ko'rik", "Og'zaki so'rov"], a: 1, ex: "Ochilmasdan, butligi buzilmasdan tekshirish — ko'zdan kechiruv {ref:BK-193}. Chamadon ochilganda esa ko'rik bo'ladi {ref:BK-195}." } }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [
          { list: ["Hudud = yer + suv + osmon; chegara = sarhad + erkin zonalar perimetri {ref:BK-5}", "Nazorat zonasida hamma narsa bojxona **ruxsati va nazorati** bilan {ref:BK-182}", "Zona rejimini buzish: fuqaroga 1–3, mansabdorga 3–5 BHM {ref:MJtK-227}", "Tanlab olish: yetarli bo'lgan **eng yengil** shakl {ref:BK-189}", "So'rov → ko'zdan kechiruv → ko'rik → shaxsiy ko'rik"], style: "ok", head: "Asosiy 5 fikr" },
          { p: "Endi mashq testi bilan bilimingizni mustahkamlang." }
        ] }
    ]
  },

  /* ===================== 2 ===================== */
  {
    id: "shaxsiy-korik", n: 2, title: "Shaxsiy ko'rik", short: "Asoslar, qaror, o'tkazish qoidalari va soddalashtirilgan shakl",
    icon: "finger", c1: "#6366f1", c2: "#7c3aed", mins: 9, video: "v2",
    kw: "shaxsiy ko'rik 196 qaror xolis bir jinsli tibbiyot bayonnoma skaner soddalashtirilgan 700",
    refs: ["BK-196", "VM-700", "MJtK-285", "MJtK-294"],
    steps: [
      { t: "Videodars: shaxsiy ko'rik qadamma-qadam", k: "Videodars", i: "video", video: "v2", b: [{ p: "Videoda shaxsiy ko'rikning to'liq tartibi va uning soddalashtirilgan shakli chizib ko'rsatiladi." }] },
      { t: "Nima uchun bu “istisno” shakl?", k: "Mohiyati", i: "shield",
        b: [
          { lead: "Shaxsiy ko'rik — bojxona nazoratining eng jiddiy shakli, chunki u **inson daxlsizligiga** tegadi." },
          { plain: "Qonun shaxsiy ko'rikni **istisno** deb ataydi: uni faqat boshqa shakllar yetarli bo'lmaganda va **jiddiy asos** bo'lganda qo'llash mumkin. Shuning uchun unga qat'iy qoidalar qo'yilgan: yozma qaror, guvohlar, alohida xona, bayonnoma {ref:BK-196}." },
          { tip: "Shaxsiy ko'rik — **oxirgi chora**, birinchi emas." }
        ] },
      { t: "Qachon o'tkaziladi? (asos)", k: "Asoslar", i: "alert",
        b: [
          { plain: "Asos bitta, lekin aniq: shaxs **qonunbuzarlik predmeti bo'lgan tovarni o'zida yashirgan** va uni **ixtiyoriy topshirmayapti**, deb taxmin qilishga **yetarli asos** bo'lishi kerak {ref:BK-196}." },
          { list: ["Bojxona chegarasidan o'tayotgan shaxs", "Bojxona nazorati zonasida turgan shaxs", "Xalqaro aeroportning tranzit zonasidagi shaxs"], i: "user", head: "Kimga nisbatan" },
          { p: "Amalda bunday asos Xavflarni boshqarish tizimi topshirig'i, tezkor ma'lumot, masofaviy nazorat natijasi yoki skaner ko'rsatkichi orqali paydo bo'lishi mumkin." },
          { ex: "Skaner yo'lovchi kiyimi ostida bir nechta qattiq paket borligini ko'rsatdi, yo'lovchi esa “hech narsa yo'q” deyapti. Bu — shaxsiy ko'rik uchun asos." }
        ] },
      { t: "Ko'rikdan oldin: 4 majburiy qadam", k: "Tartib", i: "listc",
        b: [
          { steps: [
            { t: "Yozma qaror", d: "Bojxona organi **boshlig'i yoki uning o'rnini bosuvchi shaxs** yozma qaror qabul qiladi." },
            { t: "Qarorni e'lon qilish", d: "Qaror shaxsga e'lon qilinadi." },
            { t: "Huquq va majburiyatlarni tushuntirish", d: "Shaxsga uning huquq va majburiyatlari tushuntiriladi." },
            { t: "Ixtiyoriy topshirishni taklif qilish", d: "Yashirgan tovarni **o'z ixtiyori bilan topshirish** taklif etiladi — bu majburiy qadam." } ] },
          { widget: "order", o: { head: "Tartibni tiklang", items: ["Boshliq (yoki o'rnini bosuvchi shaxs) yozma qaror qabul qiladi", "Qaror shaxsga e'lon qilinadi", "Shaxsga huquq va majburiyatlari tushuntiriladi", "Tovarni ixtiyoriy topshirish taklif qilinadi", "Shaxsiy ko'rik o'tkaziladi", "Bayonnoma tuziladi"], done: "Aynan shu tartibda: qaror → e'lon → huquqlar → ixtiyoriy topshirish → ko'rik → bayonnoma." } },
          { tip: "Qarorni **o'rinbosar** emas, **boshliq yoki uning o'rnini bosuvchi shaxs** qabul qiladi." }
        ] },
      { t: "O'tkazish qoidalari", k: "Qoidalar", i: "usercheck",
        b: [
          { grid: [
            { i: "door", t: "Alohida xona", s: "Sanitariya-gigiyena talablariga javob beradigan" },
            { i: "eye", t: "Boshqalar kuzatmaydi", s: "Xonaga begonalar kirishi va kuzatishi istisno" },
            { i: "user", t: "Bir jinsli xodim", s: "Ko'rikdan o'tuvchi bilan bir jinsdagi" },
            { i: "users", t: "2 ta xolis", s: "Ular ham bir jinsdagi" },
            { i: "pill", t: "Tana — tibbiyot xodimi", s: "Kerak bo'lsa maxsus tibbiy vositalar bilan" },
            { i: "shieldc", t: "Sha'n va qadr", s: "Zarur doirada, kamsitmasdan" } ] },
          { plain: "**Voyaga yetmagan** yoki muomalaga layoqatsiz shaxs ko'rigi uning **qonuniy vakillari yoki kuzatib boruvchi shaxslar ishtirokida** o'tkaziladi. Shaxs davlat tilini bilmasa, **tarjimon** ta'minlanadi (shaxsning huquqi {ref:MJtK-294})." },
          { check: { q: "Ayol yo'lovchining shaxsiy ko'rigida xolislar kim bo'lishi kerak?", o: ["Istalgan ikki kishi", "Ikki erkak xodim", "Ko'rikdan o'tuvchi bilan bir jinsdagi ikki xolis", "Xolis shart emas"], a: 2, ex: "Ko'rik bir jinsdagi xodim tomonidan, **bir jinsdagi ikki xolis** ishtirokida o'tkaziladi {ref:BK-196}." } }
        ] },
      { t: "Bayonnoma va shaxsning huquqlari", k: "Rasmiylashtirish", i: "doc",
        b: [
          { plain: "Ko'rik natijasi **bayonnoma** bilan rasmiylashtiriladi. Shaxs bayonnoma bilan tanishish va unga **o'z mulohazalarini yozish** huquqiga ega. Agar shaxs ko'rikdan bosh tortsa, bu haqda **qarorga belgi** qo'yiladi." },
          { list: ["Kim, qachon, qayerda o'tkazdi", "Xolislar ma'lumotlari", "Nima topildi (batafsil)", "Shaxsning mulohazalari", "Imzolar"], i: "check", head: "Bayonnomada nima bo'ladi" },
          { tip: "Bayonnoma yo'q — ko'rik isboti yo'q." }
        ] },
      { t: "Soddalashtirilgan shaxsiy ko'rik", k: "VM 700 (2025)", i: "scan",
        b: [
          { lead: "2025-yil 6-noyabrdagi VM 700-son qarori bilan shaxsiy ko'rikning tez va qulay shakli joriy etilgan." },
          { cmp: { a: { t: "Soddalashtirilgan", i: "scan", items: ["Tana skaneri kabi texnik vosita", "Qaror talab etilmaydi", "Bayonnoma talab etilmaydi", "Tez, kamroq noqulaylik"] }, b: { t: "To'liq shaxsiy ko'rik", i: "finger", items: ["Alohida xona, 2 xolis", "Boshliqning yozma qarori", "Bayonnoma majburiy", "Qonunbuzarlik aniqlansa — shunga o'tiladi"] } } },
          { warn: "Soddalashtirilgan ko'rikda **qonunbuzarlik aniqlansa**, to'liq shaxsiy ko'rik o'tkaziladi va bayonnoma tuziladi {ref:VM-700}." },
          { verify: "Soddalashtirilgan shaklda “ust kiyimni yechmasdan, kiyim ustidan paypaslab tekshirish” usuli ham muallif materiallarida keltirilgan; uning aniq tahririni VM 700 nizomida tekshiring." }
        ] },
      { t: "Agar shaxs qarshilik ko'rsatsa", k: "Vaziyat", i: "stop",
        b: [
          { ex: "Yo'lovchi qarorni eshitib, xonaga kirishdan bosh tortdi va ketishga urindi." },
          { plain: "Qonuniy talabni bajarmaslik yoki qarshilik — **ma'muriy ushlab turish** uchun asos bo'lishi mumkin {ref:MJtK-285}. Ushlab turish **3 soatdan oshmaydi**; sud qarorisiz **48 soatdan ortiq** ushlab turish mumkin emas {ref:KS-2026}." },
          { tip: "Har bir qadamni xotirjam, qonun tilida tushuntiring va hujjatlashtiring." }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["Shaxsiy ko'rik — istisno, faqat yetarli asos bilan {ref:BK-196}", "Qaror → e'lon → huquqlar → ixtiyoriy topshirish", "Bir jinsli xodim + 2 bir jinsli xolis, alohida xona", "Tana a'zolari — faqat tibbiyot xodimi", "Soddalashtirilgan (skaner): qaror va bayonnoma kerak emas {ref:VM-700}"], style: "ok", head: "Eslab qoling" }] }
    ]
  },

  /* ===================== 3 ===================== */
  {
    id: "aeroport", n: 3, title: "Xalqaro aeroportda nazorat", short: "5 xil nazorat, taqiqlar, yashil va qizil yo'lak, masofaviy nazorat",
    icon: "takeoff", c1: "#0ea5e9", c2: "#2563eb", mins: 9, video: "v3",
    kw: "aeroport yashil qizil yo'lak masofaviy nazorat 912 814 suratga olish telefon aviatsiya xavfsizligi",
    refs: ["VM-912", "VM-814", "PF-122"],
    steps: [
      { t: "Videodars: yo'lovchi aeroportda", k: "Videodars", i: "video", video: "v3", b: [{ p: "Kelish va ketish zonalarida yo'lovchi qaysi nazoratlardan o'tishini kuzating." }] },
      { t: "Chegarada 5 xil nazorat", k: "VM 912", i: "shieldc",
        b: [
          { plain: "Davlat chegarasidan o'tayotgan har bir shaxs, transport va tovar **beshta** nazoratdan o'tadi. Ular davlat nazorati organlari hamkorligida bir-biriga xalaqit bermay tashkil etiladi {ref:VM-912}." },
          { grid: [{ i: "flag", t: "Chegara", s: "Pasport, viza" }, { i: "shield", t: "Bojxona", s: "Tovar, pul" }, { i: "pill", t: "Sanitariya-karantin", s: "Yuqumli kasalliklar" }, { i: "leaf", t: "Fitosanitariya", s: "O'simlik mahsulotlari" }, { i: "activity", t: "Veterinariya", s: "Hayvon mahsulotlari" }, { i: "users", t: "Hamkorlik", s: "Bir oqimda" }] }
        ] },
      { t: "O'tkazish punktida nima taqiqlanadi?", k: "Taqiqlar", i: "ban",
        b: [
          { list: ["**Chegara nazorati bo'linmasi boshlig'ining** ruxsatisiz foto- va videosuratga olish", "Mobil aloqa vositalaridan foydalanish", "Nazorat organlari xodimlariga moddiy qimmatliklar taklif qilish", "Xizmat hududiga ruxsatsiz kirish", "Qurol va portlovchi moddalarni ruxsatsiz olib kirish"], style: "bad", head: "VM 912 bo'yicha" },
          { tip: "Suratga olish uchun ruxsatni **chegara nazorati** bo'linmasi boshlig'i beradi." },
          { verify: "Mobil telefonlardan foydalanish taqiqining aniq sharti (masalan, “nazoratga xalaqit bersa”) manbalarda topilmadi — VM 912 matnida tekshiring." }
        ] },
      { t: "Ikki yo'lakli tizim", k: "VM 814", i: "route",
        b: [
          { cmp: { a: { t: "Yashil yo'lak", i: "okc", items: ["Me'yordan oshmagan tovarlar", "Yozma deklaratsiya shart emas", "Og'zaki deklaratsiya", "Tez o'tish"] }, b: { t: "Qizil yo'lak", i: "file", items: ["Yozma deklaratsiya shart bo'lgan tovarlar", "O'z xohishi bilan deklaratsiya qilinayotganlar", "YBD to'ldiriladi", "Bojxona so'rovi va ko'rigi"] } } },
          { plain: "Yo'lovchi yo'lakni **o'zi tanlaydi** va shu tanlovi bilan “mening deklaratsiya qiladigan narsam yo'q” yoki “bor” deb e'lon qiladi. Xalqaro aeroportlarda bu tizim **2018-yil 1-yanvardan** ishlaydi {ref:VM-814}." },
          { warn: "Deklaratsiya qilinishi shart bo'lgan tovar bilan **yashil** yo'lakdan o'tish — deklaratsiya qilmaslik hisoblanadi." }
        ] },
      { t: "O'yin: qaysi yo'lak?", k: "Interaktiv", i: "target",
        b: [{ widget: "corridor", o: { n: 7 } }] },
      { t: "Uchib ketish: masofaviy bojxona nazorati", k: "PF-122 (2022)", i: "eye",
        b: [
          { lead: "Toshkent xalqaro aeroportida ketayotgan yo'lovchilar uchun **2022-yil 1-iyuldan** masofaviy nazorat joriy etilgan {ref:PF-122}." },
          { widget: "flow", o: { head: "Masofaviy nazorat qanday ishlaydi", items: [
            { i: "eye", t: "Monitoring markazi kuzatadi", d: "Videokameralar va reys ma'lumotlari orqali — yo'lovchi bilan yuzma-yuz muloqotsiz." },
            { i: "scan", t: "Qo'l yuki tekshiriladi", d: "Uni **aviatsiya xavfsizligi** xodimlari tekshiradi." },
            { i: "alert", t: "Qonunbuzarlik alomati", d: "Olib chiqilishi cheklangan tovar yoki ortiqcha valyuta aniqlanadi." },
            { i: "user", t: "Bojxona xodimi chaqiriladi", d: "Faqat shu holatda bojxonachi aralashadi va protsessual hujjatlarni rasmiylashtiradi." } ] } },
          { tip: "Umumiy holatda ketayotgan yo'lovchi bojxona xodimi bilan yuzma-yuz uchrashmaydi." },
          { verify: "Ketish zonasidagi aviatsiya xavfsizligi bo'linmalarining DXX tarkibida ekanligi manbalarda tasdiqlanmadi." }
        ] },
      { t: "Bojxonachi qachon aralashadi?", k: "Asoslar", i: "zap",
        b: [
          { list: ["Xavflarni boshqarish tizimi (XBT) ko'rsatmasi bo'lganda", "Tezkor xabar yoki boshqa idoralardan ma'lumot kelganda", "Shaxsning xatti-harakatida qonunbuzarlik alomatlari aniqlanganda"], i: "check" },
          { plain: "Bu — **tanlab olish prinsipi** amalda: bojxona hamma yo'lovchini emas, xavf belgilari bor holatlarni tekshiradi {ref:BK-189}." },
          { verify: "Ushbu uch asosning VM 814 nizomidagi so'zma-so'z tahriri tasdiqlanmagan; faqat XBT asosida tanlab olish tamoyili tasdiqlangan." }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["5 xil nazorat: chegara, bojxona, sanitariya-karantin, fitosanitariya, veterinariya {ref:VM-912}", "Suratga olish — chegara nazorati bo'linmasi boshlig'i ruxsati bilan", "Yashil — og'zaki, qizil — yozma (YBD) {ref:VM-814}", "Ketishda — masofaviy nazorat, Toshkentda 2022-07-01 dan {ref:PF-122}"], style: "ok" }] }
    ]
  },

  /* ===================== 4 ===================== */
  {
    id: "deklaratsiya", n: 4, title: "Yo'lovchi bojxona deklaratsiyasi (YBD)", short: "Kim, qachon va qanday to'ldiradi; telefonlar qoidasi; elektron YBD",
    icon: "file", c1: "#f59e0b", c2: "#ea580c", mins: 8, video: "v4",
    kw: "deklaratsiya ybd 16 yosh elektron mobil ilova telefon imei uzimei 2606 qachon to'ldiriladi",
    refs: ["AV-2606", "VM-463", "VM-66", "VM-244"],
    steps: [
      { t: "Videodars: YBD qachon kerak?", k: "Videodars", i: "video", video: "v4", b: [{ p: "Videoda YBD to'ldirish shart bo'lgan holatlar bitta sxemada chizib ko'rsatiladi." }] },
      { t: "YBD nima va kim to'ldiradi?", k: "Asoslar", i: "file",
        b: [
          { plain: "**Yo'lovchi bojxona deklaratsiyasi (YBD)** — yo'lovchi o'zi olib o'tayotgan tovar va pulni bojxonaga **yozma** (yoki elektron) e'lon qiladigan hujjat. Uni **16 yoshga to'lgan** shaxs to'ldiradi {ref:AV-2606}." },
          { kv: [["Kim to'ldiradi", "16 yoshdan katta shaxs"], ["16 yoshgacha bolaning tovari", "YBDda egasining pasport (ID) raqami yoziladi"], ["Shakllar", "Qog'oz yoki elektron"], ["Yangi shakl", "2606-8 (27.03.2025)"], ["Elektron (mobil ilova)", "2606-10 (28.02.2026)"]] },
          { tip: "YBD — yo'lovchining **o'z bayonoti**. Unda yozilgan har bir ma'lumot uchun u javob beradi." }
        ] },
      { t: "Qachon majburiy?", k: "Holatlar", i: "listc",
        b: [
          { list: ["Bojsiz olib kirish me'yorlaridan **ortiq** tovarlar {ref:VM-244}", "**100 mln so'm** ekvivalentidan ortiq naqd pul — kirishda ham, chiqishda ham {ref:VM-66}", "Olib chiqish me'yoridan (**5 000$**) ortiq tovarlar", "**Kuzatuvsiz** (alohida keladigan) bagaj", "**Taqiq va cheklovlar** ostidagi tovarlar", "**Mobil telefonlar** — me'yordan qat'i nazar {ref:VM-463}"], i: "num" },
          { verify: "Muallif ro'yxatidagi yana bir holat — doimiy yashash joyi o'zgarganda olib o'tiladigan shaxsiy mol-mulk (avtotransportdan tashqari) — amaldagi yo'riqnomada tekshirilsin." }
        ] },
      { t: "Telefonlar: alohida qoida", k: "Muhim", i: "phone",
        b: [
          { num: { v: "Har doim", l: "chet eldan olib kelingan mobil telefon YBDda ko'rsatiladi" } },
          { kv: [["Bojsiz miqdor (havo yo'li)", "har kelishda 2 dona"], ["Deklaratsiya", "baribir majburiy"], ["Istisno", "O'zbekistonda sotib olingan va UZIMEI'da ro'yxatdan o'tgan"]] },
          { ex: "Yo'lovchi Dubaydan bitta yangi telefon olib keldi. Me'yor (2 dona) oshmagan — to'lov yo'q. Lekin telefon **YBDga yoziladi**." },
          { check: { q: "Toshkentda sotib olingan va UZIMEI'da ro'yxatdan o'tgan telefon bilan qaytgan yo'lovchi uni deklaratsiya qiladimi?", o: ["Ha, har doim", "Yo'q — bu istisno", "Faqat 2 tadan ortiq bo'lsa", "Faqat qimmat bo'lsa"], a: 1, ex: "O'zbekistonda sotib olingan va UZIMEI'da ro'yxatdan o'tgan qurilmalar deklaratsiyadan mustasno {ref:AV-2606}." } }
        ] },
      { t: "Yo'riqchi: YBD kerakmi?", k: "Interaktiv", i: "msg",
        b: [{ widget: "ybdWizard" }] },
      { t: "Elektron YBD", k: "Raqamli xizmat", i: "phone",
        b: [
          { plain: "2026-yildan YBDni **mobil ilova** orqali elektron to'ldirish mumkin; my.gov.uz'da **oldindan to'ldirish** xizmati ham bor. Texnik xatolarni bojxona xodimi tuzatishi mumkin (2606-10) {ref:AV-2606}." },
          { verify: "Muallif materiallarida: “elektron deklaratsiya 30 kalendar kun ichida bojxonaga taqdim etilmasa, avtomatik bekor qilinadi”. Bu qoida O'zbekiston rasmiy manbalarida topilmadi — Bojxona qo'mitasidan tasdiqlang." },
          { tip: "Elektron YBDni taqdim etgan shaxs undagi ma'lumotlar uchun javobgar." }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["YBD — 16 yoshdan {ref:AV-2606}", "Me'yordan ortiq tovar, 100 mln so'mdan ortiq pul, kuzatuvsiz bagaj, taqiqlangan/cheklangan tovar — YBD", "Telefon — har doim (UZIMEI istisnosidan tashqari)", "Elektron YBD — mobil ilova va my.gov.uz"], style: "ok" }] }
    ]
  },

  /* ===================== 5 ===================== */
  {
    id: "olib-kirish", n: 5, title: "Olib kirish (import) qoidalari", short: "1 000$ me'yor va 3 kun sharti, alohida me'yorlar, taqiqlar",
    icon: "importi", c1: "#10b981", c2: "#0d9488", mins: 12, video: "v5",
    kw: "import olib kirish 1000 dollar 3 kun alkogol sigaret atir telefon bfq taqiqlangan elektron sigaret dron lazer 244",
    refs: ["VM-244", "VM-463", "VM-154", "ORQ-844", "PF-5286", "PQ-4422"],
    steps: [
      { t: "Videodars: 1 000$ qoidasi", k: "Videodars", i: "video", video: "v5", b: [{ p: "Bojsiz me'yor, 3 kun sharti va to'lov formulasi doskada chizib tushuntiriladi." }] },
      { t: "Bojsiz me'yor: 1 000$", k: "VM 244 (2025)", i: "dollar",
        b: [
          { num: { v: "$1 000", l: "havo transportida bojsiz olib kirish me'yori\n(2025-yil 1-maydan)" } },
          { table: { h: ["Transport", "Bojsiz me'yor"], r: [["Havo", "1 000 $"], ["Temir yo'l, daryo", "500 $"], ["Avtomobil, piyoda", "300 $"], ["Xalqaro kuryer", "oyiga 200 $"]] } },
          { plain: "Bu — **shaxsiy, notijorat** foydalanish uchun tovarlar me'yori. Undan oshmasa — to'lov yo'q va “yashil” yo'lak {ref:VM-244}." }
        ] },
      { t: "3 kun sharti", k: "Muhim shart", i: "cal",
        b: [
          { plain: "Bojsiz me'yordan foydalanish uchun yo'lovchi xorijda **havo yo'lida kamida 3 kalendar kun** (boshqa transportda 2 kun) bo'lgan bo'lishi kerak. Bu shart **2025-yil 20-iyuldan** qat'iy qo'llanadi {ref:VM-244}." },
          { warn: "Shart bajarilmasa, me'yor **umuman qo'llanmaydi** va yagona bojxona to'lovi tovarlarning **to'liq qiymatiga** hisoblanadi." },
          { ex: "Yo'lovchi Istanbulga 2 kunga borib, 700$ lik kiyim olib keldi. 700$ < 1 000$ bo'lsa ham, 3 kun bo'lmagani uchun to'lov **700$ ning hammasiga** hisoblanadi." },
          { ok: "Avvalgi tahrirdagi “yoki oyiga chegarani 3 martadan kam kesib o'tgan bo'lsa” degan muqobil shart **yo'q** — me'yor faqat xorijda bo'lish muddatiga bog'liq.", head: "Tuzatish" },
          { check: { q: "Yo'lovchi xorijda 2 kun bo'lib, 900$ lik tovar olib keldi. YBT qaysi summaga hisoblanadi?", o: ["Hech qanday to'lov yo'q", "Faqat 900$ dan oshgan qismga", "900$ ning hammasiga", "Faqat alkogolga"], a: 2, ex: "3 kun sharti bajarilmagani uchun bojsiz me'yor qo'llanmaydi — to'lov to'liq qiymatga hisoblanadi {ref:VM-244}." } }
        ] },
      { t: "Alohida tovar me'yorlari", k: "Miqdor me'yorlari", i: "listc",
        b: [
          { table: { h: ["Tovar", "Bojsiz me'yor"], r: [["Alkogol (pivo ham)", "2 litr"], ["Sigaret", "200 dona"], ["Sigara", "5 dona"], ["Boshqa tamaki", "100 g"], ["Atir va ifor suvi", "3 dona (jami 300 ml gacha)"], ["Mobil telefon", "2 dona (YBD bilan)"], ["BFQ", "10 nom, jami 3 kg gacha"]] } },
          { warn: "Alkogol va tamaki mahsulotlarini **21 yoshga to'lmagan** shaxslar, shuningdek **xalqaro pochta va kuryer** jo'natmalari orqali olib kirish taqiqlanadi {ref:VM-244}." },
          { widget: "allowance" },
          { verify: "Tamaki me'yorlari (sigaret / sigara / tamaki) muqobilmi yoki jamlanmami, va atir uchun 300 ml jami hajmmi yoki har biri uchunmi — VM 244 matnida aniqlashtiring." }
        ] },
      { t: "Me'yordan oshsa: yagona bojxona to'lovi", k: "Hisob-kitob", i: "calc",
        b: [
          { plain: "Me'yordan **oshgan qismga** yagona bojxona to'lovi (YBT) to'lanadi. U ikki usulda hisoblanadi va **kattasi** olinadi {ref:PQ-4508}:" },
          { steps: [{ t: "Qiymatdan: 30%", d: "Me'yordan ortiq qism qiymatining 30 foizi" }, { t: "Og'irlikdan: 3$ / kg", d: "Shu qism og'irligining har bir kilogrammiga 3$" }, { t: "Kattasini oling", d: "Alkogol va tamaki uchun — ikki baravar" }] },
          { widget: "importCalc", o: { val: 1600, kg: 12 } },
          { ok: "PF-174 farmoniga ko'ra **2027-yil 1-yanvardan** stavka **20%, lekin kamida 2$/kg** bo'ladi {ref:PF-174}. Kalkulyatorda “2027-yildan” yoki “Solishtirish”ni tanlang.", head: "Yangilik" }
        ] },
      { t: "Taqiqlangan tovarlar", k: "Olib kirib bo'lmaydi", i: "ban",
        b: [
          { list: [
            "Elektron sigaretalar va ularning suyuqliklari (nikotinli va nikotinsiz) — 2026-03-01 dan muomalasi to'liq taqiqlangan {ref:ORQ-844}",
            "Etil spirti {ref:VM-213-98}",
            "Pul yutug'ini beradigan o'yin avtomatlari {ref:VM-176}",
            "II toifali pirotexnika vositalari {ref:VM-724}",
            "Portativ lazerli nur tarqatgichlar {ref:VM-50}",
            "3 yildan oshgan, ilgari foydalanilgan induksion pechlar va kameralar {ref:VM-999}",
            "Davlat tuzumiga qarshi, terrorizm va zo'ravonlikni targ'ib qiluvchi, pornografik materiallar {ref:PF-5286}",
            "Polimer (plastik) idishdagi alkogol mahsulotlari {ref:ORQ-844}",
            "Ilgari foydalanilgan generatorlar, transformatorlar, elektr dvigatellar; “D” va undan past energiya toifali maishiy asboblar {ref:PQ-4422}" ], style: "bad" },
          { verify: "Avvalgi tahrirdagi “aksiz markasi bo'lmagan tamaki va alkogol (PF-1789)” bandi: PF-1789 PF-231 (25.11.2025) bilan o'z kuchini yo'qotgan; amaldagi talablarni O'RQ-844 va aksiz yo'riqnomasida tekshiring." }
        ] },
      { t: "Cheklangan: faqat ruxsat bilan", k: "Cheklovlar", i: "key",
        b: [
          { list: ["**Dronlar** — faqat VM alohida ruxsat bergan tashkilotlar; jismoniy shaxs uchun amalda taqiq {ref:VM-658}", "**Portlovchi materiallar** — faqat litsenziyali yuridik shaxslar, IIV ruxsati bilan {ref:VM-213-04}", "**Diniy materiallar** — Din ishlari qo'mitasi ijobiy xulosasi bilan; shaxsiy ehtiyojga har nomdan 3 nusxagacha {ref:VM-180}", "**Qurol va o'q-dorilar** — ruxsatnoma bilan {ref:ORQ-550}", "**Radioelektron vositalar** — ruxsat bilan {ref:VM-801}"], i: "key" }
        ] },
      { t: "O'yin: olib kirish mumkinmi?", k: "Interaktiv", i: "target", b: [{ widget: "banned", o: { n: 8 } }] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["Havo yo'li: 1 000$ me'yor, xorijda kamida 3 kun {ref:VM-244}", "3 kun bo'lmasa — to'lov to'liq qiymatga", "2 l alkogol, 200 sigaret, 5 sigara, 100 g tamaki, 3 atir, 2 telefon, BFQ 10 nom/3 kg", "YBT: hozir 30% / 3$·kg, 2027-yildan 20% / 2$·kg", "E-sigaret, etil spirti, lazer, eski induksion pech — taqiqlangan"], style: "ok" }] }
    ]
  },

  /* ===================== 6 ===================== */
  {
    id: "olib-chiqish", n: 6, title: "Olib chiqish (eksport) qoidalari", short: "5 000$ me'yor, zargarlik, madaniy boyliklar va ruxsatnomalar",
    icon: "exporti", c1: "#3b82f6", c2: "#4f46e5", mins: 8, video: "v6",
    kw: "eksport olib chiqish 5000 dollar zargarlik kumush 200 oltin 65 yombi madaniy boylik 50 yil ruxsatnoma",
    refs: ["PF-5721", "ORQ-678", "VM-131", "VM-290", "VM-801", "ORQ-550"],
    steps: [
      { t: "Videodars: nimani erkin olib chiqish mumkin?", k: "Videodars", i: "video", video: "v6", b: [{ p: "Olib chiqish me'yorlari va taqiqlar bitta doskada." }] },
      { t: "5 000$ gacha — deklaratsiyasiz", k: "Umumiy qoida", i: "dollar",
        b: [
          { num: { v: "$5 000", l: "jismoniy shaxs YBDsiz olib chiqishi mumkin bo'lgan tovarlarning umumiy qiymati" } },
          { plain: "Umumiy qiymati **5 000 AQSh dollari** ekvivalentigacha bo'lgan tovarlar YBDsiz olib chiqiladi. Bunga **eksport boji** solinadigan va **cheklovlar** ostidagi tovarlar kirmaydi." },
          { verify: "5 000$ me'yorining aniq huquqiy asosi (hujjat raqami) manbalarda ko'rsatilmagan; me'yorning o'zi tasdiqlangan." }
        ] },
      { t: "Zargarlik buyumlari", k: "PF-5721", i: "gem",
        b: [
          { kv: [["Kumushdan tayyor buyumlar", "200 g gacha"], ["Oltin va boshqa qimmatbaho metall", "65 g gacha"], ["Shu me'yorlardan ortiq", "YBD bilan"]], head: "YBDsiz olib chiqish" },
          { widget: "jewelry" },
          { verify: "PF-185 (31.10.2023) bilan qiymati 100 mln so'mgacha bo'lgan tayyor zargarlik buyumlarini YBDsiz olib chiqishga ruxsat berilgan. Og'irlik (200/65 g) va qiymat (100 mln) mezonlari birga qanday qo'llanishini amaldagi tahrirda tekshiring." }
        ] },
      { t: "Yombi va tangalar", k: "Qimmatbaho metallar", i: "coins",
        b: [{ plain: "O'zbekistonda ishlab chiqarilgan **o'lchovli yombilar** va Markaziy bankning qimmatbaho metall **tangalari** — MB **sertifikati** bo'lsa, **cheklovsiz** olib chiqiladi. Qiymati belgilangan chegaradan oshsa — **YBD** to'ldiriladi." }, { tip: "Sertifikat — majburiy hujjat. Usiz yombi “oddiy tovar” sifatida baholanadi." }] },
      { t: "Madaniy boyliklar: olib chiqish mumkin emas", k: "Qat'iy taqiq", i: "landmark",
        b: [
          { warn: "**50 yil va undan oldin** yaratilgan, **davlat reyestriga** kiritilgan, **muzey, arxiv va kutubxonalarda** doimiy saqlanayotgan madaniy boyliklarni olib chiqish mumkin emas {ref:ORQ-678}." },
          { plain: "Boshqa madaniy boyliklar uchun **Madaniyat vazirligi sertifikati** kerak {ref:VM-131}. So'nggi 50 yilda yaratilgan xalq amaliy san'ati buyumlari uchun sertifikat talab etilmaydi." },
          { ex: "Yo'lovchi bozordan 1950-yillarda to'qilgan qadimiy gilam sotib olib, olib chiqmoqchi. Gilam 50 yildan eski — Madaniyat vazirligi xulosasisiz olib chiqib bo'lmaydi." }
        ] },
      { t: "Ruxsatnoma talab qilinadiganlar", k: "Cheklovlar", i: "key",
        b: [
          { list: ["Madaniy boyliklar — Madaniyat vazirligi sertifikati {ref:VM-131}", "O'simlik karantini ostidagi mahsulotlar — fitosanitariya hujjatlari {ref:VM-65}", "Yovvoyi hayvonlar va o'simliklar, Qizil kitob turlari {ref:VM-290}", "Radioelektron vositalar va YuChQ {ref:VM-801}", "Fuqarolik va xizmat quroli, o'q-dorilar {ref:ORQ-550}", "Giyohvandlik vositalari, psixotrop moddalar, prekursorlar {ref:VM-330}", "Axborotni kriptografik muhofaza qilish vositalari {ref:PQ-614}"], i: "key" },
          { verify: "Veterinariya nazoratidagi tovarlar (avval “VM 139, 43”) va ekologik xavfli mahsulotlar (avval “VM 43, 75”) bo'yicha hujjat raqamlari tasdiqlanmadi — amaldagi hujjatlarni aniqlang." }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["5 000$ gacha — YBDsiz", "Zargarlik: kumush 200 g, oltin 65 g {ref:PF-5721}", "Yombi/tanga — MB sertifikati bilan", "50 yildan eski va reyestrdagi madaniy boylik — olib chiqib bo'lmaydi {ref:ORQ-678}"], style: "ok" }] }
    ]
  },

  /* ===================== 7 ===================== */
  {
    id: "valyuta", n: 7, title: "Naqd valyuta qoidalari", short: "Olib kirish, olib chiqish, 100 mln so'm chegarasi",
    icon: "cash", c1: "#22c55e", c2: "#059669", mins: 6, video: "v7",
    kw: "valyuta naqd pul dollar so'm 100 mln rezident norezident 66 deklaratsiya",
    refs: ["VM-66", "PF-174"],
    steps: [
      { t: "Videodars: pul va chegara", k: "Videodars", i: "video", video: "v7", b: [{ p: "Uch qoidani eslab qolish uchun 1 daqiqa." }] },
      { t: "Uch asosiy qoida", k: "VM 66", i: "cash",
        b: [
          { grid: [{ i: "importi", v: "Cheklanmaydi", t: "Olib kirish", s: "Istalgan summa" }, { i: "file", v: "> 100 mln", t: "Deklaratsiya", s: "Kirishda ham, chiqishda ham YBD" }, { i: "exporti", v: "≤ 100 mln", t: "Olib chiqish (rezident)", s: "So'm ekvivalentida" }, { i: "user", v: "Norezident", t: "100 mln dan ortiq", s: "Faqat olib kirib deklaratsiya qilgan summasi doirasida" }] },
          { plain: "Naqd pulni **olib kirish cheklanmaydi**. Lekin **100 mln so'm ekvivalentidan ortiq** summa — kirishda ham, chiqishda ham — **YBDda** ko'rsatiladi {ref:VM-66}." },
          { warn: "O'zbekiston **rezidenti** chet elga ko'pi bilan **100 mln so'm** ekvivalentini olib chiqadi. “Deklaratsiya qilsa ko'proq olib chiqish mumkin” degan fikr rezident uchun **noto'g'ri**." }
        ] },
      { t: "Rezident va norezident", k: "Farq", i: "users",
        b: [
          { cmp: { a: { t: "Rezident", i: "home", items: ["O'zbekistonda doimiy yashaydi", "Olib chiqish: 100 mln so'mgacha", "Ortig'i — mumkin emas"] }, b: { t: "Norezident", i: "plane", items: ["Chet elda doimiy yashaydi", "100 mln dan ortig'i: faqat avval olib kirib, deklaratsiya qilgan summa doirasida", "YBD bilan"] } } },
          { ex: "Turist kirishda 15 000$ ni YBDga yozib olib kirgan. Ketishda qolgan 12 000$ ni olib chiqishi mumkin — kirishdagi YBD bu summani tasdiqlaydi." }
        ] },
      { t: "Hisoblab ko'ring", k: "Interaktiv", i: "calc", b: [{ widget: "currency" }] },
      { t: "Kelajakda nima o'zgaradi?", k: "PF-174", i: "trend",
        b: [
          { plain: "PF-174 farmoni bilan naqd pulni **deklaratsiyasiz olib chiqish** chegarasini **10 000 AQSh dollari**ga oshirish bo'yicha **qonun loyihasi** tayyorlanadi (muddat — 2027-yil dekabr) {ref:PF-174}." },
          { warn: "Bu hali **amaldagi qoida emas**. Hozir 100 mln so'm qoidasi amal qiladi.", head: "Adashmang" }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [
          { list: ["Olib kirish — cheklanmaydi", "100 mln so'mdan ortig'i — YBD (kirish/chiqish)", "Rezident — ko'pi bilan 100 mln so'm olib chiqadi", "Norezident — deklaratsiya qilgan summasi doirasida"], style: "ok" },
          { check: { q: "Rezident 150 mln so'mga teng dollarni YBD to'ldirib olib chiqmoqchi. Mumkinmi?", o: ["Ha, YBD to'ldirsa bo'ldi", "Yo'q — rezident uchun chegara 100 mln so'm", "Ha, faqat bank ma'lumotnomasi bilan", "Ha, agar 3 kundan ko'p safarga ketsa"], a: 1, ex: "Rezidentlar ko'pi bilan 100 mln so'm ekvivalentini olib chiqadi; ortig'ini faqat norezidentlar, avval deklaratsiya qilgan summa doirasida {ref:VM-66}." } }
        ] }
    ]
  },

  /* ===================== 8 ===================== */
  {
    id: "maqsad-saqlash", n: 8, title: "Tovar maqsadi, to'lovlar va saqlash", short: "Shaxsiy yoki tijorat, YBT, 30 BHM va vaqtincha saqlash",
    icon: "archive", c1: "#d946ef", c2: "#9333ea", mins: 10, video: "v8",
    kw: "tijorat shaxsiy ehtiyoj 4508 281 yagona bojxona to'lovi 30 foiz 3 dollar 20 foiz 2 dollar 30 bhm saqlash 102",
    refs: ["VM-281", "PQ-4508", "VM-102", "PF-174"],
    steps: [
      { t: "Videodars: shaxsiymi yoki tijoratmi?", k: "Videodars", i: "video", video: "v8", b: [{ p: "To'rt mezon va YBT formulasi chizib ko'rsatiladi." }] },
      { t: "Shaxsiy yoki tijorat?", k: "VM 281", i: "brief",
        b: [
          { cmp: { a: { t: "Shaxsiy (notijorat)", i: "home", items: ["O'zi va oilasi uchun", "Sotish yoki biznes uchun emas", "Bojsiz me'yor va YBT qo'llanadi"] }, b: { t: "Tijorat", i: "brief", items: ["Sotish, ishlab chiqarish, biznes uchun", "Umumiy tartibda rasmiylashtiriladi", "Notarif choralar qo'llanishi mumkin"] } } },
          { grid: [{ i: "box", t: "Xususiyati", s: "Tovar qanday narsa" }, { i: "layers", t: "Miqdori", s: "Bir xil tovar ko'pmi" }, { i: "refresh", t: "Takroriyligi", s: "Qanchalik tez-tez olib kelinadi" }, { i: "plane", t: "Safar holatlari", s: "Kim, qayerdan, nima maqsadda" }], head: "4 mezon {ref:VM-281}" },
          { ex: "Yo'lovchi har hafta Istanbuldan 20 tadan bir xil kurtka olib keladi. Miqdor va takroriylik — **tijorat** belgisi." }
        ] },
      { t: "Hech qachon “shaxsiy” emas", k: "PQ-4508", i: "ban",
        b: [
          { plain: "Ayrim tovarlar har qanday holatda **shaxsiy ehtiyoj uchun emas** deb baholanadi va tegishli rasmiylashtiruvdan o'tadi {ref:PQ-4508}:" },
          { list: ["Ichki yonuv dvigatellari", "Markaziy isitish qozonlari", "Oftobda qorayish uchun solyariylar", "Sartaroshxona kreslolari", "Tibbiyot va jarrohlik mebeli", "Maxsus uskuna va mexanizmlar", "Tibbiyot texnikasi", "Fotolaboratoriya uskunalari", "Namoyish uchun mo'ljallangan modellar", "Pul yoki jeton bilan ishlovchi o'yin avtomatlari"], i: "num" },
          { verify: "Ro'yxatning birinchi 5 bandi tasdiqlangan. Qolgan bandlar va ulardagi istisnolar (maysa o'rgich, maishiy arra, shprits, tonometr, shifoxona koykasi) PQ-4508 amaldagi tahririda tekshirilsin." }
        ] },
      { t: "O'yin: saralang", k: "Interaktiv", i: "target", b: [{ widget: "sorter", o: { n: 8 } }] },
      { t: "YBT: hozir va 2027-yildan", k: "Hisob-kitob", i: "calc",
        b: [
          { table: { h: ["", "Hozir", "2027-01-01 dan"], r: [["Stavka", "30%", "20%"], ["Kamida", "3 $ / kg", "2 $ / kg"], ["Alkogol, tamaki", "ikki baravar", "tekshirilsin"], ["Asos", "PQ-4508", "PF-174, 8-band"]] } },
          { widget: "importCalc", o: { compare: true, val: 1800, kg: 15 } },
          { ok: "**2027-yil 1-iyundan**: notijorat tovar bo'yicha YBT summasi to'lanishi lozim bo'lgan **bojxona yig'imlaridan kam** bo'lsa, yig'imlar **undirilmaydi** {ref:PF-174}.", head: "Yana bir yangilik" },
          { tip: "Ikki usulda hisoblang — **kattasini** oling." }
        ] },
      { t: "Tijorat tovarlari: 30 BHM chegarasi", k: "Rasmiylashtirish", i: "receipt",
        b: [
          { num: { v: "30 BHM", l: "= 13 200 000 so'm (BHM 440 000 so'm bo'yicha)" } },
          { plain: "Bojxona qiymati **30 BHM dan kam** bo'lgan tijorat tovarlariga **notarif choralar** (sertifikat, litsenziya kabi) qo'llanmaydi, bojxona to'lovlari umumiy tartibda hisoblanadi." },
          { kv: [["< 30 BHM", "Bojxona kirim orderi orqali"], ["> 30 BHM", "Bojxona yuk deklaratsiyasi (BYD) orqali"]], head: "Muallif tavsiyasi bo'yicha" },
          { verify: "Kirim orderi va BYD bo'yicha bo'linish manbalarda tasdiqlanmadi; 30 BHM chegarasining o'zi tasdiqlangan." }
        ] },
      { t: "Vaqtincha saqlash", k: "VM 102", i: "store",
        b: [
          { plain: "Me'yordan ortiq tovar to'lov qilinmaguncha yoki rasmiylashtirilguncha **vaqtincha saqlashga** qo'yiladi. To'lov **har 100 kg** (brutto) uchun, **har bir kalendar kun** uchun BHMga nisbatan foizda hisoblanadi {ref:VM-102}." },
          { table: { h: ["Davr", "Har kun, har 100 kg gacha"], r: [["1–5-kunlar", "BHMning 5%"], ["6–15-kunlar", "BHMning 7%"], ["16-kundan", "BHMning 10%"], ["Tez buziladigan (har kun)", "BHMning 15%"]] } },
          { widget: "storageCalc" },
          { verify: "Saqlash muddatlari (oddiy tovar — 30 kun, tez buziladigan — 2 kun) va 5/7/10/15% stavkalari muallif materiallaridan; VM 102 amaldagi tahririda tekshiring." }
        ] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["Maqsad 4 mezon bilan aniqlanadi {ref:VM-281}", "Ayrim tovarlar hech qachon shaxsiy emas {ref:PQ-4508}", "YBT: 30%/3$ → 2027-yildan 20%/2$", "30 BHM = 13,2 mln so'm", "Saqlash — har 100 kg, har kun uchun"], style: "ok" }] }
    ]
  },

  /* ===================== 9 ===================== */
  {
    id: "harakatlar", n: 9, title: "Xodim harakatlari: qadamma-qadam", short: "Huquqbuzarlik aniqlanganda nima qilinadi — tartib va muddatlar",
    icon: "activity", c1: "#f43f5e", c2: "#dc2626", mins: 12, video: "v9",
    kw: "harakatlar huquqbuzar bayonnoma tushuntirish xati advokat tarjimon tilxat ushlab turish 3 soat 48 soat 294 285 288 279 yaaat",
    refs: ["BK-195", "MJtK-294", "JPK-51", "JPK-71", "MJtK-285", "KS-2026", "JPK-135", "MJtK-279", "MJtK-271", "VM-200"],
    steps: [
      { t: "Videodars: huquqbuzarlik aniqlandi — endi nima?", k: "Videodars", i: "video", video: "v9", b: [{ p: "8 qadamlik algoritm va asosiy muddatlar doskada." }] },
      { t: "Birinchi harakat: ko'rik", k: "1-qadam", i: "box",
        b: [
          { cmp: { a: { t: "“Qizil” yo'lak", i: "file", items: ["YBD bo'yicha og'zaki so'rov", "So'ng bojxona ko'rigi (BK 195)", "Yo'lovchi ishtirok etsa — xolis shart emas"] }, b: { t: "“Yashil” yo'lak", i: "okc", items: ["Tanlab olish asosida", "Yo'lovchi yuklarini ko'rik qilish mumkin", "Shubha bo'lsa — keyingi bosqich"] } } },
          { plain: "Ko'rik odatda yo'lovchining o'zi ishtirokida o'tkaziladi. **Ikki xolis** faqat qonunda belgilangan hollarda — masalan, egasi ishtirok etmaganda chaqiriladi {ref:BK-195}." },
          { verify: "“Yashil yo'lakda yo'lovchini og'zaki so'rovdan o'tkazmasdan yuklarini ko'rik qilish mumkin (VM 814)” degan qoidaning aniq tahriri tasdiqlanmadi." }
        ] },
      { t: "Huquqbuzarlik aniqlanganda: 8 qadam", k: "Algoritm", i: "route",
        b: [{ widget: "flow", o: { head: "Qadamma-qadam algoritm", items: [
          { tag: "2.1", t: "Huquqlarni tushuntirish", d: "Aybi va huquqlari (advokat, tarjimon) tushuntiriladi {ref:MJtK-294}." },
          { tag: "2.2", t: "Ushlab turish bayonnomasi", d: "Zarur bo'lsa — ma'muriy ushlab turish, **3 soatgacha** {ref:MJtK-285}." },
          { tag: "2.3", t: "Tovarlarni ko'zdan kechirish", d: "Bayonnoma tuziladi, tovarlar tavsiflanadi, **fotosuratlar** ilova qilinadi {ref:JPK-135}." },
          { tag: "2.4", t: "Huquqbuzarlik bayonnomasi", d: "Ma'muriy huquqbuzarlik to'g'risida bayonnoma {ref:MJtK-279}." },
          { tag: "2.5", t: "Tushuntirish xatlari", d: "Huquqbuzar va xolislardan." },
          { tag: "2.6", t: "Tilxat", d: "Huquqlari tushuntirilgani haqida." },
          { tag: "2.7", t: "Tovarlar saqlovi", d: "Belgilangan tartibda saqlashga topshirish." },
          { tag: "2.8", t: "Axborot tizimiga kiritish", d: "“Bojxona qonunbuzarliklari” YaAATga **bexato** kiritish." } ] } }] },
      { t: "Huquqlarni tushuntirish", k: "2.1", i: "usercheck",
        b: [
          { list: ["Ish materiallari bilan tanishish", "Tushuntirish berish va dalil taqdim etish", "Iltimosnoma bildirish", "Advokat yordamidan foydalanish", "Ona tilida so'zlash, tilni bilmasa — tarjimon", "Qarorga shikoyat qilish"], i: "check", head: "Shaxsning huquqlari {ref:MJtK-294}" },
          { plain: "Jinoyat ishi bo'yicha **advokat majburiy** bo'lgan hollar: **voyaga yetmaganlar**; jismoniy yoki ruhiy nuqsoni tufayli o'zini himoya qila olmaydiganlar; **ish yuritiladigan tilni bilmaydiganlar** {ref:JPK-51}. Tilni bilmasa — **tarjimon** ta'minlanadi va hujjatlar uning ishtirokida rasmiylashtiriladi {ref:JPK-71}." },
          { ok: "“Chet el fuqarosi” — advokat majburiyligi uchun **alohida toifa emas**. Chet ellik tilni bilmasa, “tilni bilmaydiganlar” bandiga kiradi.", head: "Tuzatish" }
        ] },
      { t: "Ma'muriy ushlab turish: 3 soat", k: "2.2", i: "timer",
        b: [
          { num: { v: "3 soat", l: "ma'muriy ushlab turishning eng ko'p muddati" } },
          { plain: "Muddat qonunbuzarlik **aniqlangan paytdan emas**, shaxs **bayonnoma tuzish uchun olib kelingan paytdan** hisoblanadi (mast shaxs uchun — hushyor tortgan paytdan) {ref:MJtK-285}." },
          { warn: "**Konstitutsiyaviy sud 2026-yil 22-sentabrda** MJtK 288-moddasining 2-qismini Konstitutsiyaga zid deb topdi (25.09.2026 dan kuchga kirgan). Endi chegara rejimini buzganlarni ham **sud qarorisiz 48 soatdan ortiq** ushlab turish mumkin emas {ref:KS-2026}.", head: "Yangi — 2026-yil sentabr" },
          { check: { q: "Ma'muriy ushlab turish muddati qachondan hisoblanadi?", o: ["Huquqbuzarlik aniqlangan paytdan", "Shaxs bayonnoma tuzish uchun olib kelingan paytdan", "Samolyot qo'ngan paytdan", "Boshliq qaror chiqargan paytdan"], a: 1, ex: "Muddat (3 soatgacha) shaxs bayonnoma tuzish uchun olib kelingan paytdan hisoblanadi {ref:MJtK-285}." } }
        ] },
      { t: "Ko'zdan kechirish va bayonnomalar", k: "2.3–2.4", i: "doc",
        b: [
          { plain: "Tovarlar xolislar ishtirokida ko'zdan kechiriladi va **ko'zdan kechirish bayonnomasi** tuziladi: huquqbuzar ma'lumotlari, tovarlarning nomi, soni, belgilari {ref:JPK-135}. So'ng **ma'muriy huquqbuzarlik to'g'risida bayonnoma** rasmiylashtiriladi {ref:MJtK-279}." },
          { tip: "**Fotosuratlar** albatta ilova qilinadi. Ayrim harakatlarni videoga yozib olish ham amaldagi JPKda nazarda tutilgan." },
          { verify: "Xolislar ishtiroki va fotosuratlarni ilova qilish majburiyatining JPKdagi aniq tahririni tekshiring." }
        ] },
      { t: "Tushuntirish xatlari va tilxat", k: "2.5–2.6", i: "pen",
        b: [
          { list: ["Huquqbuzar va xolislardan tushuntirish xatlari olinadi: shaxsiy ma'lumotlar va ko'rsatmalar", "Fuqaroga me'yor doirasidagi tovarlari qaytarilsa — bu tushuntirish xatida va alohida ro'yxatda (nomi, soni) qayd etiladi", "Huquqbuzar ko'rsatmani o'z qo'li bilan yozmoqchi bo'lsa — ruxsat beriladi", "Turli bosqichlarda boshqa xolislar ishtirok etsa — ulardan ham xat olinadi", "Huquqlari tushuntirilgani haqida **tilxat** olinadi {ref:MJtK-294}"], i: "check" },
          { plain: "**MJtK 271-modda, 11-band:** tadbirkorlik subyekti **birinchi marta** huquqbuzarlik qilib, oqibatini **30 kun ichida ixtiyoriy bartaraf etsa** yoki zararni qoplasa — ish yuritilmaydi {ref:MJtK-271}." },
          { ok: "Avvalgi tahrirda bu band “bojxona rasmiylashtiruviga ruxsat haqida tilxat” deb noto'g'ri talqin qilingan edi.", head: "Tuzatish" }
        ] },
      { t: "Saqlov va axborot tizimi", k: "2.7–2.8", i: "db",
        b: [
          { plain: "Olib qo'yilgan tovarlar saqlashga topshiriladi. **Ashyoviy dalillarni** saqlash — Adliya vazirligida ro'yxatga olingan 2174-son yo'riqnoma bo'yicha; **davlat daromadiga o'tkaziladigan** mol-mulk — VM 200 nizomi bo'yicha {ref:VM-200}." },
          { plain: "Har bir holat **“Bojxona qonunbuzarliklari”** yagona avtomatlashtirilgan axborot tizimiga (YaAAT) **bexato** kiritiladi." },
          { verify: "Muallif materiallarida YaAATga kiritish muddati — **aniqlangan vaqtdan 24 soat ichida**. Bu muddat ochiq manbalarda tasdiqlanmadi (ichki tartib bo'lishi mumkin)." }
        ] },
      { t: "Tartibni tiklang", k: "Interaktiv", i: "listc",
        b: [{ widget: "order", o: { head: "8 qadamni tartib bilan bosing", items: ["Huquqlarni tushuntirish", "Ushlab turish bayonnomasi (zarur bo'lsa)", "Tovarlarni ko'zdan kechirish bayonnomasi", "Huquqbuzarlik to'g'risida bayonnoma", "Tushuntirish xatlari", "Tilxat olish", "Tovarlar saqlovi", "YaAATga kiritish"], done: "To'g'ri! Bu ketma-ketlik hujjatlarning to'liq va qonuniy bo'lishini ta'minlaydi." } }] },
      { t: "Xulosa", k: "Yakun", i: "okc",
        b: [{ list: ["Qizil yo'lak: YBD bo'yicha so'rov → ko'rik (BK 195)", "Huquqlar: advokat, tarjimon, shikoyat {ref:MJtK-294}", "Ushlab turish: 3 soatgacha; sudsiz 48 soatdan ortiq — yo'q {ref:KS-2026}", "Bayonnomalar + fotosuratlar", "Tilxat, saqlov, YaAAT"], style: "ok" }] }
    ]
  }
  ];

  /* ---------------- Games & wizard data ---------------- */
  global.GAMES = {
    corridor: {
      head: "Qaysi yo'lak?", sub: "Yo'lovchi uchun to'g'ri yo'lakni tanlang", icon: "route",
      choices: [{ k: "g", t: "Yashil", c: "#059669", i: "okc" }, { k: "r", t: "Qizil", c: "#dc2626", i: "file" }],
      cards: [
        { t: "Kiyim-kechak va 1 litr vino, jami 600$. Xorijda 7 kun bo'lgan.", i: "luggage", a: "g", ex: "Qiymat ham, alkogol ham me'yor doirasida, 3 kun sharti bajarilgan." },
        { t: "Fotoapparat 1 400$. Xorijda 5 kun bo'lgan.", i: "box", a: "r", ex: "1 400$ > 1 000$ — me'yordan ortiq qism yozma deklaratsiya qilinadi." },
        { t: "Chet eldan bitta yangi smartfon (UZIMEI'da ro'yxatdan o'tmagan).", i: "phone", a: "r", ex: "Telefon me'yor doirasida bo'lsa ham **har doim** YBDga yoziladi." },
        { t: "Naqd 120 mln so'mga teng dollar.", i: "cash", a: "r", ex: "100 mln so'mdan ortiq naqd pul YBDda ko'rsatiladi." },
        { t: "400 dona (2 blok) sigaret.", i: "ban", a: "r", ex: "Me'yor — 200 dona. Ortig'i deklaratsiya qilinadi." },
        { t: "Ikki kunlik safardan 700$ lik tovar.", i: "cal", a: "r", ex: "3 kun sharti bajarilmagan — me'yor qo'llanmaydi, to'lov to'liq qiymatga hisoblanadi." },
        { t: "Naqd 50 mln so'mga teng yevro va shaxsiy buyumlar.", i: "wallet", a: "g", ex: "Summa 100 mln so'mdan oshmaydi, tovarlar shaxsiy." },
        { t: "Alohida jo'natilgan (kuzatuvsiz) bagaj bor.", i: "luggage", a: "r", ex: "Kuzatuvsiz bagaj deklaratsiya qilinadi." },
        { t: "Elektron sigareta suyuqligi bilan.", i: "ban", a: "r", ex: "Taqiq va cheklov ostidagi tovar — yashil yo'lakdan olib o'tish qonunbuzarlik." },
        { t: "3 dona atir (jami 250 ml) va sovg'alar, jami 900$; xorijda 10 kun.", i: "gem", a: "g", ex: "Atir me'yorda (3 dona, 300 ml gacha), qiymat 1 000$ dan kam." }
      ], endNote: "Esda tuting: telefon, 100 mln so'mdan ortiq pul, kuzatuvsiz bagaj va taqiqlangan tovar — har doim “qizil”."
    },
    banned: {
      head: "Olib kirish mumkinmi?", sub: "Har bir tovar uchun to'g'ri javobni tanlang", icon: "ban",
      choices: [{ k: "ok", t: "Mumkin", c: "#059669", i: "okc" }, { k: "ban", t: "Taqiq", c: "#dc2626", i: "ban" }, { k: "perm", t: "Ruxsat bilan", c: "#d97706", i: "key" }],
      cards: [
        { t: "Elektron sigareta va suyuqligi", i: "ban", a: "ban", ex: "O'RQ-844, 37-modda; 2026-03-01 dan muomalasi to'liq taqiqlangan {ref:ORQ-844}." },
        { t: "Portativ lazer ko'rsatkich", i: "zap", a: "ban", ex: "VM 50 bilan 2013-yildan taqiqlangan {ref:VM-50}." },
        { t: "1 litr vino (yo'lovchi 30 yoshda)", i: "wine", a: "ok", ex: "2 litrgacha alkogol bojsiz me'yorda." },
        { t: "Pul yutuqli o'yin avtomati", i: "coins", a: "ban", ex: "VM 176 {ref:VM-176}." },
        { t: "II toifali pirotexnika", i: "flame", a: "ban", ex: "VM 724 bilan muomalasi to'liq taqiqlangan {ref:VM-724}." },
        { t: "Etil spirti", i: "alert", a: "ban", ex: "VM 213 (1998) {ref:VM-213-98}." },
        { t: "Shaxsiy foydalanish uchun 2 nusxa diniy kitob", i: "book", a: "ok", ex: "Shaxsiy ehtiyojga har nomdan 3 nusxagacha mumkin {ref:VM-180}." },
        { t: "Ov quroli", i: "target", a: "perm", ex: "Qurol faqat ruxsatnoma bilan {ref:ORQ-550}." },
        { t: "Shifrlash (kriptografik) qurilmasi", i: "key", a: "perm", ex: "PQ-614: ruxsatnoma, vakolatli organ — DXX {ref:PQ-614}." },
        { t: "4 yil ishlatilgan induksion pech", i: "zap", a: "ban", ex: "3 yildan oshgan, ishlatilgan induksion pechlar olib kirilmaydi {ref:VM-999}." },
        { t: "Ishlatilgan elektr generatori", i: "zap", a: "ban", ex: "PQ-4422 {ref:PQ-4422}." },
        { t: "Plastik butilkadagi aroq", i: "wine", a: "ban", ex: "Polimer idishdagi alkogol — O'RQ-844 {ref:ORQ-844}." },
        { t: "Yuqori chastotali radiostansiya", i: "radio", a: "perm", ex: "Radioelektron vositalar — ruxsat bilan {ref:VM-801}." },
        { t: "Psixotrop modda saqlovchi dori (katta miqdor)", i: "pill", a: "perm", ex: "Giyohvandlik vositalari va psixotrop moddalar — ruxsatnoma bilan {ref:VM-330}." }
      ], endNote: "Taqiq — umuman olib kirib bo'lmaydi; “ruxsat bilan” — tegishli hujjat bo'lsa mumkin."
    },
    sorter: {
      head: "Shaxsiy yoki tijorat?", sub: "Tovar maqsadini aniqlang", icon: "brief",
      choices: [{ k: "p", t: "Shaxsiy", c: "#059669", i: "home" }, { k: "c", t: "Tijorat", c: "#7c3aed", i: "brief" }],
      cards: [
        { t: "Ichki yonuv dvigateli", i: "zap", a: "c", ex: "PQ-4508 ro'yxatida — hech qachon shaxsiy emas {ref:PQ-4508}." },
        { t: "Markaziy isitish qozoni", i: "flame", a: "c", ex: "PQ-4508 ro'yxatida {ref:PQ-4508}." },
        { t: "Solyariy (oftobda qorayish apparati)", i: "sun", a: "c", ex: "PQ-4508 ro'yxatida {ref:PQ-4508}." },
        { t: "Sartaroshxona kreslosi", i: "user", a: "c", ex: "PQ-4508 ro'yxatida {ref:PQ-4508}." },
        { t: "Jarrohlik stoli (tibbiy mebel)", i: "pill", a: "c", ex: "PQ-4508 ro'yxatida {ref:PQ-4508}." },
        { t: "Shaxsiy noutbuk, 1 dona", i: "cpu", a: "p", ex: "Bitta, shaxsiy foydalanishdagi buyum." },
        { t: "20 ta bir xil kurtka", i: "layers", a: "c", ex: "Miqdor mezoni — bir xil tovar ko'p {ref:VM-281}." },
        { t: "Bolalar uchun 2 ta o'yinchoq", i: "star", a: "p", ex: "Oilaviy ehtiyoj." },
        { t: "Har hafta olib kelinadigan bir xil kosmetika partiyasi", i: "refresh", a: "c", ex: "Takroriylik mezoni {ref:VM-281}." },
        { t: "Oilaga sovg'a: 3 ta ko'ylak", i: "gem", a: "p", ex: "Oz miqdor, oilaviy sovg'a." }
      ], endNote: "Mezonlar: xususiyati, miqdori, takroriyligi, safar holatlari."
    },
    ybd: {
      head: "YBD kerakmi?", sub: "Yo'lovchi vaziyatini savollar bilan tekshiring", icon: "file", start: "q1",
      nodes: {
        q1: { q: "Taqiqlangan yoki cheklangan (ruxsatnoma talab qilinadigan) tovar bormi?", yes: "rBan", no: "q2" },
        q2: { q: "Tovarlarning umumiy qiymati **1 000$** dan oshadimi?", hint: "Havo transporti me'yori", yes: "rOver", no: "q3" },
        q3: { q: "Yo'lovchi xorijda **3 kalendar kundan kam** bo'lganmi (va tovar olib kelyaptimi)?", yes: "rDays", no: "q4" },
        q4: { q: "Alohida me'yorlardan ortiq narsa bormi? (2 l alkogol, 200 sigaret, 5 sigara, 100 g tamaki, 3 atir...)", yes: "rItems", no: "q5" },
        q5: { q: "Chet eldan olingan, UZIMEI'da ro'yxatdan o'tmagan **mobil telefon** bormi?", yes: "rPhone", no: "q6" },
        q6: { q: "Naqd pul **100 mln so'm** ekvivalentidan oshadimi?", yes: "rCash", no: "q7" },
        q7: { q: "Alohida keladigan (**kuzatuvsiz**) bagaj bormi?", yes: "rBag", no: "rNo" },
        rBan: { r: "bad", t: "YBD majburiy — qizil yo'lak", d: "Taqiq va cheklovlar ostidagi tovarlar yozma deklaratsiya qilinadi; taqiqlangan tovar olib kirilmaydi." },
        rOver: { r: "warn", t: "YBD majburiy — qizil yo'lak", d: "Me'yordan ortiq qism YBDga yoziladi va unga YBT hisoblanadi {ref:VM-244}." },
        rDays: { r: "warn", t: "YBD majburiy", d: "3 kun sharti bajarilmagan — me'yor qo'llanmaydi, YBT to'liq qiymatga hisoblanadi {ref:VM-244}." },
        rItems: { r: "warn", t: "YBD majburiy", d: "Alohida me'yordan ortiq miqdor deklaratsiya qilinadi." },
        rPhone: { r: "warn", t: "YBD majburiy", d: "Mobil telefonlar me'yordan qat'i nazar deklaratsiya qilinadi {ref:AV-2606}." },
        rCash: { r: "warn", t: "YBD majburiy", d: "100 mln so'mdan ortiq naqd pul YBDda ko'rsatiladi {ref:VM-66}." },
        rBag: { r: "warn", t: "YBD majburiy", d: "Kuzatuvsiz bagaj deklaratsiya qilinadi." },
        rNo: { r: "ok", t: "YBD shart emas — yashil yo'lak", d: "Og'zaki deklaratsiya yetarli. Bojxona baribir tanlab olish asosida tekshirishi mumkin {ref:BK-189}." }
      }
    }
  };
})(window);
