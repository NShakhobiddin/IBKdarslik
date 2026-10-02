/* =========================================================
   data-questions.js — savollar banki
   { id, m (modul), q, o: [4 variant], a (to'g'ri indeks), ex, ref }
   Faqat tasdiqlangan faktlar asosida (data-laws.js ga qarang).
   ========================================================= */
(function (global) {
  'use strict';
  const Q = [];
  function add(m, list) { list.forEach(function (x, i) { Q.push({ id: m + '-' + (i + 1), m: m, q: x[0], o: x[1], a: x[2], ex: x[3], ref: x[4] }); }); }

  add('asosiy', [
    ["O'zbekiston Respublikasining bojxona hududi nimalardan iborat?", ["Faqat quruqlik hududi", "Quruqlik, hududiy va ichki suvlar hamda ular ustidagi havo hududi", "Faqat chegara o'tkazish punktlari", "Faqat aeroport va vokzallar"], 1, "BK 5-modda: quruqlik + hududiy va ichki suvlar + ular ustidagi havo hududi.", "BK-5"],
    ["Bojxona chegarasiga hudud sarhadlaridan tashqari yana nima kiradi?", ["Viloyatlar chegaralari", "Erkin bojxona zonalari va erkin omborlar perimetri", "Aeroportning parkovkasi", "Hech narsa"], 1, "Bojxona chegarasi — hudud sarhadlari hamda erkin bojxona zonalari va erkin omborlar perimetri.", "BK-5"],
    ["Bojxona nazorati zonasida faoliyat va harakat qanday amalga oshiriladi?", ["Erkin, cheklovsiz", "Faqat bojxona organining ruxsati bilan va uning nazorati ostida", "Faqat aeroport ma'muriyati ruxsati bilan", "Faqat kunduzi"], 1, "BK 182-modda: zonadagi faoliyat va harakat bojxona ruxsati va nazorati ostida.", "BK-182"],
    ["MJtK 227-moddasi bo'yicha zona rejimini buzgan fuqaroga qancha jarima solinadi?", ["BHMning 1–3 baravari", "BHMning 3–5 baravari", "BHMning 5–10 baravari", "Faqat ogohlantirish"], 0, "Fuqarolarga 1–3 BHM, mansabdor shaxslarga 3–5 BHM.", "MJtK-227"],
    ["Zona rejimini buzgan mansabdor shaxsga qancha jarima solinadi?", ["1–3 BHM", "3–5 BHM", "10–15 BHM", "20 BHM"], 1, "Mansabdor shaxslarga BHMning 3–5 baravari.", "MJtK-227"],
    ["2026-yil 1-sentabrdan 1 BHM qancha?", ["375 000 so'm", "412 000 so'm", "440 000 so'm", "500 000 so'm"], 2, "PF-115 bilan 2026-09-01 dan 1 BHM = 440 000 so'm.", "PF-115"],
    ["Bojxona nazorati shakllarini qo'llashda qaysi prinsip amal qiladi?", ["Hammani to'liq tekshirish", "Tanlab olish prinsipi", "Navbat prinsipi", "Tasodifiy tanlov"], 1, "BK 189: tanlab olish prinsipi, xavflarni boshqarish tizimi asosida.", "BK-189"],
    ["Og'zaki so'rov natijasi qanday rasmiylashtiriladi?", ["Bayonnoma bilan", "Dalolatnoma bilan", "Yozma rasmiylashtirilmaydi", "Video bilan"], 2, "BK 191: ma'lumot og'zaki olinadi, yozma rasmiylashtirilmaydi.", "BK-191"],
    ["Bojxona ko'zdan kechiruvining asosiy belgisi qaysi?", ["Bagaj ochiladi", "Plomba buziladi", "Ochilmaydi, butligi buzilmaydi", "Shaxs yechintiriladi"], 2, "BK 193: qadoq ochilmaydi, plomba buzilmaydi, qismlarga ajratilmaydi.", "BK-193"],
    ["Bojxona ko'rigida identifikatsiya vositalari (plomba, muhr) bilan nima bo'lishi mumkin?", ["Hech qachon buzilmaydi", "Buzilishi mumkin", "Faqat sud ruxsati bilan buziladi", "Faqat shaxsiy ko'rikda buziladi"], 1, "BK 195: ko'rikda plomba, muhr va boshqa identifikatsiya vositalari buzilishi mumkin.", "BK-195"],
    ["Chamadon rentgen-skanerdan o'tkazildi, lekin ochilmadi. Bu qaysi nazorat shakli?", ["Ko'rik", "Ko'zdan kechiruv", "Shaxsiy ko'rik", "Og'zaki so'rov"], 1, "Ochmasdan, butligini buzmasdan tekshirish — ko'zdan kechiruv.", "BK-193"],
    ["Bojxona nazorati shakllarining ro'yxati Bojxona kodeksining qaysi moddasida berilgan?", ["5-modda", "182-modda", "188-modda", "196-modda"], 2, "Nazorat shakllari ro'yxati — BK 188; ularni qo'llash — BK 189.", "BK-188"]
  ]);

  add('shaxsiy-korik', [
    ["Bojxona kodeksi shaxsiy ko'rikni qanday shakl deb ataydi?", ["Odatiy", "Istisno", "Majburiy", "Tavsiyaviy"], 1, "Shaxsiy ko'rik — bojxona nazoratining istisno shakli.", "BK-196"],
    ["Shaxsiy ko'rik o'tkazish haqida kim yozma qaror qabul qiladi?", ["Navbatchi inspektor", "Bojxona organi boshlig'i yoki uning o'rnini bosuvchi shaxs", "Prokuror", "Aeroport ma'muriyati"], 1, "Qarorni boshliq yoki uning o'rnini bosuvchi shaxs qabul qiladi.", "BK-196"],
    ["Shaxsiy ko'rikda nechta xolis ishtirok etadi?", ["Bitta", "Ikkita, ko'rikdan o'tuvchi bilan bir jinsli", "Uchta, istalgan jinsdagi", "Xolis shart emas"], 1, "Bir jinsdagi ikki xolis ishtirokida.", "BK-196"],
    ["Inson tana a'zolarini kim tekshiradi?", ["Bojxona inspektori", "Xolislar", "Faqat tibbiyot xodimi", "Aviatsiya xavfsizligi xodimi"], 2, "Tana a'zolarini faqat tibbiyot xodimi tekshiradi.", "BK-196"],
    ["Ko'rikdan oldin shaxsga nima taklif qilinishi shart?", ["Advokat yollash", "Yashirgan tovarni ixtiyoriy topshirish", "Jarima to'lash", "Reysni o'zgartirish"], 1, "Qaror e'lon qilinib, huquqlar tushuntiriladi va ixtiyoriy topshirish taklif qilinadi.", "BK-196"],
    ["Shaxsiy ko'rik natijasi qanday hujjat bilan rasmiylashtiriladi?", ["Tilxat", "Bayonnoma", "Ma'lumotnoma", "Og'zaki"], 1, "Natija bayonnoma bilan rasmiylashtiriladi.", "BK-196"],
    ["Voyaga yetmagan shaxsning shaxsiy ko'rigi qanday o'tkaziladi?", ["Umuman o'tkazilmaydi", "Qonuniy vakillari yoki kuzatib boruvchi shaxslar ishtirokida", "Faqat sud qarori bilan", "Faqat telefon orqali ruxsat bilan"], 1, "Qonuniy vakillari yoki kuzatib boruvchi shaxslar ishtirokida.", "BK-196"],
    ["Soddalashtirilgan shaxsiy ko'rik qaysi hujjat bilan tartibga solingan?", ["VM 244", "VM 700 (06.11.2025)", "VM 66", "VM 912"], 1, "VM 700: bojxona nazorati shakllarini qo'llash tartibi.", "VM-700"],
    ["Soddalashtirilgan shaxsiy ko'rikda nima talab etilmaydi?", ["Texnik vosita", "Qaror ham, bayonnoma ham", "Bojxona xodimi", "Yo'lovchining roziligi"], 1, "Tana skaneri orqali; qaror va bayonnoma talab etilmaydi.", "VM-700"],
    ["Soddalashtirilgan ko'rikda qonunbuzarlik aniqlansa nima qilinadi?", ["Yo'lovchi qo'yib yuboriladi", "To'liq shaxsiy ko'rik o'tkaziladi va bayonnoma tuziladi", "Faqat ogohlantiriladi", "Ish sudga yuboriladi"], 1, "Buzilish aniqlansa — to'liq shaxsiy ko'rik va bayonnoma.", "VM-700"],
    ["Shaxs shaxsiy ko'rikdan bosh tortsa, bu qayerda qayd etiladi?", ["Pasportida", "Qarorga belgi qo'yiladi", "Hech qayerda", "Aviachiptada"], 1, "Bosh tortilsa, bu haqda qarorga belgi qo'yiladi.", "BK-196"]
  ]);

  add('aeroport', [
    ["VM 912 bo'yicha o'tkazish punktida nechta turdagi nazorat amalga oshiriladi?", ["2", "3", "5", "7"], 2, "Chegara, bojxona, sanitariya-karantin, fitosanitariya va veterinariya.", "VM-912"],
    ["O'tkazish punktida foto-video olishga kim ruxsat beradi?", ["Har qanday bojxona xodimi", "Chegara nazorati bo'linmasi boshlig'i", "Aeroport direktori", "Ruxsat kerak emas"], 1, "VM 912: chegara nazorati bo'linmasi boshlig'ining ruxsati bilan.", "VM-912"],
    ["“Yashil” yo'lak kimlar uchun?", ["Yozma deklaratsiya shart bo'lgan tovarlar uchun", "Me'yordan oshmagan, og'zaki deklaratsiya qilinadigan tovarlar uchun", "Faqat diplomatlar uchun", "Faqat tranzit yo'lovchilar uchun"], 1, "Yashil — og'zaki deklaratsiya, me'yordan oshmagan tovarlar.", "VM-814"],
    ["“Qizil” yo'lakdan o'tgan yo'lovchi nima to'ldiradi?", ["Hech narsa", "Yo'lovchi bojxona deklaratsiyasi (YBD)", "Bojxona yuk deklaratsiyasi", "Viza anketasi"], 1, "Qizil yo'lakda YBD to'ldiriladi.", "VM-814"],
    ["Ikki yo'lakli tizim qaysi hujjat bilan tartibga solinadi?", ["VM 814", "VM 66", "PQ-4508", "VM 102"], 0, "VM 814 (11.10.2017) — ikki yo'lakli va masofaviy nazorat nizomi.", "VM-814"],
    ["Xalqaro aeroportlarda ikki yo'lakli tizim qachondan qo'llanadi?", ["2016-yil 1-apreldan", "2018-yil 1-yanvardan", "2020-yil 1-yanvardan", "2022-yil 1-iyuldan"], 1, "Xalqaro aeroportlarda 2018-01-01 dan.", "VM-814"],
    ["Toshkent xalqaro aeroportida masofaviy bojxona nazorati qaysi muddatgacha joriy etilishi belgilangan?", ["2021-yil 1-yanvar", "2022-yil 1-iyul", "2023-yil oxiri", "2025-yil 1-may"], 1, "PF-122: Toshkent aeroportida 2022-yil 1-iyulgacha.", "PF-122"],
    ["Masofaviy nazoratda ketayotgan yo'lovchining qo'l yukini kim tekshiradi?", ["Bojxona inspektori", "Aviatsiya xavfsizligi xodimlari", "Chegara qo'shinlari", "Aviakompaniya xodimi"], 1, "Qo'l yukini aviatsiya xavfsizligi xodimlari tekshiradi.", "PF-122"],
    ["Masofaviy nazoratda bojxona xodimi qachon chaqiriladi?", ["Har bir yo'lovchi uchun", "Cheklangan tovar yoki ortiqcha valyuta aniqlanganda", "Faqat chet elliklar uchun", "Hech qachon"], 1, "Faqat qonunbuzarlik alomati aniqlanganda.", "PF-122"],
    ["Yozma deklaratsiya shart bo'lgan tovar bilan “yashil” yo'lakdan o'tish nimani anglatadi?", ["Hech narsani", "Deklaratsiya qilmaslik", "Tezkor o'tish huquqini", "Avtomatik to'lovni"], 1, "Yo'lak tanlovi — deklaratsiya; shart bo'lgan tovar bilan yashil yo'lak deklaratsiya qilmaslikdir.", "VM-814"]
  ]);

  add('deklaratsiya', [
    ["YBDni necha yoshga to'lgan shaxs to'ldiradi?", ["14", "16", "18", "21"], 1, "16 yoshga to'lgan shaxslar.", "AV-2606"],
    ["16 yoshgacha bo'lgan bolaga tegishli tovarlar YBDda qanday ko'rsatiladi?", ["Ko'rsatilmaydi", "“Tovar nomi” ustunida egasining pasport (ID) raqami bilan", "Alohida bolalar deklaratsiyasida", "Faqat og'zaki"], 1, "2606-10: egasining pasport (ID-karta) raqami ko'rsatiladi.", "AV-2606"],
    ["Chet eldan olib kelingan mobil telefon qachon deklaratsiya qilinadi?", ["Faqat 2 tadan ko'p bo'lsa", "Me'yordan qat'i nazar, har doim", "Faqat 1 000$ dan qimmat bo'lsa", "Hech qachon"], 1, "Mobil qurilmalar me'yordan qat'i nazar deklaratsiya qilinadi.", "AV-2606"],
    ["Qaysi telefon deklaratsiyadan mustasno?", ["Eski telefon", "O'zbekistonda sotib olingan va UZIMEI'da ro'yxatdan o'tgan", "Sovg'a qilingan telefon", "Ishlamaydigan telefon"], 1, "O'zbekistonda sotib olingan va UZIMEI'da ro'yxatdan o'tgan qurilmalar.", "AV-2606"],
    ["Naqd pul qanday miqdordan oshsa YBD to'ldiriladi?", ["10 mln so'm", "50 mln so'm", "100 mln so'm ekvivalenti", "1 mlrd so'm"], 2, "100 mln so'm ekvivalentidan ortiq summa — kirishda ham, chiqishda ham.", "VM-66"],
    ["Kuzatuvsiz (alohida keladigan) bagaj bo'yicha nima talab qilinadi?", ["Hech narsa", "Deklaratsiya qilinadi", "Faqat aviakompaniyaga xabar", "Faqat fotosurat"], 1, "Kuzatuvsiz bagaj YBDga yoziladi.", "AV-2606"],
    ["YBD yo'riqnomasi Adliya vazirligida qaysi raqam bilan ro'yxatga olingan?", ["2174", "2606", "2856", "3566"], 1, "2014-yil 5-avgustda 2606-son bilan.", "AV-2606"],
    ["YBDni mobil ilova orqali elektron to'ldirish qaysi o'zgartirish bilan joriy etilgan?", ["2606-8 (27.03.2025)", "2606-10 (28.02.2026)", "VM 700", "PF-174"], 1, "2606-10 (28.02.2026): mobil ilova orqali elektron YBD.", "AV-2606"],
    ["Havo yo'li bilan har kelishda nechta mobil telefon bojxona to'lovisiz olib kiriladi?", ["1", "2", "3", "5"], 1, "VM 463 (VM 563 tahririda): 2 dona — lekin baribir deklaratsiya qilinadi.", "VM-463"],
    ["Yo'lovchi xorijda 2 kun bo'lib, 500$ lik tovar olib keldi. YBD kerakmi?", ["Yo'q, 1 000$ dan kam", "Ha — 3 kun sharti bajarilmagan, me'yor qo'llanmaydi", "Faqat telefon bo'lsa", "Faqat alkogol bo'lsa"], 1, "3 kun sharti bajarilmasa, bojsiz me'yor qo'llanmaydi va to'lov to'liq qiymatga hisoblanadi — deklaratsiya kerak.", "VM-244"]
  ]);

  add('olib-kirish', [
    ["Havo transportida shaxsiy tovarlarni bojsiz olib kirish me'yori qancha?", ["300$", "500$", "1 000$", "2 000$"], 2, "VM 244: havo transportida 1 000 AQSh dollari.", "VM-244"],
    ["Avtomobil va piyoda o'tkazish punktlarida bojsiz me'yor qancha?", ["200$", "300$", "500$", "1 000$"], 1, "Avtomobil/piyoda — 300$.", "VM-244"],
    ["Temir yo'l va daryo transportida bojsiz me'yor qancha?", ["300$", "500$", "1 000$", "1 500$"], 1, "Temir yo'l va daryo — 500$.", "VM-244"],
    ["Xalqaro kuryerlik jo'natmalari uchun bojsiz me'yor qanday?", ["Oyiga 200$", "Chorakda 1 000$", "Yiliga 2 000$", "Cheklanmagan"], 0, "Kuryer jo'natmalari — oyiga 200$.", "VM-244"],
    ["Havo yo'li bilan qaytgan yo'lovchi bojsiz me'yordan foydalanishi uchun xorijda kamida necha kun bo'lishi kerak?", ["1 kun", "2 kun", "3 kalendar kun", "7 kun"], 2, "Havo transportida — kamida 3 kalendar kun.", "VM-244"],
    ["3 kun sharti bajarilmasa, yagona bojxona to'lovi qanday hisoblanadi?", ["Hisoblanmaydi", "Faqat 1 000$ dan oshgan qismga", "Tovarlarning to'liq qiymatiga", "Faqat 50% ga"], 2, "Me'yor qo'llanmaydi — to'lov to'liq qiymatga.", "VM-244"],
    ["Bojsiz olib kiriladigan alkogol mahsulotlari (pivo ham) me'yori qancha?", ["1 litr", "2 litr", "3 litr", "5 litr"], 1, "Alkogol, shu jumladan pivo — 2 litrgacha.", "VM-244"],
    ["Sigaralar bo'yicha bojsiz me'yor qancha?", ["5 dona", "10 dona", "50 dona", "100 dona"], 0, "Sigara — 5 dona.", "VM-244"],
    ["Atir va ifor suvlari bo'yicha bojsiz me'yor qanday?", ["1 dona", "3 donagacha, jami 300 ml gacha", "5 dona, jami 1 litr", "Cheklanmagan"], 1, "3 donagacha, umumiy hajmi 300 ml dan oshmasligi kerak.", "VM-244"],
    ["Alkogol va tamaki mahsulotlarini kimlar olib kirishi taqiqlangan?", ["18 yoshga to'lmaganlar", "21 yoshga to'lmaganlar", "Faqat chet elliklar", "Taqiq yo'q"], 1, "21 yoshga to'lmagan shaxslar; shuningdek pochta va kuryer orqali.", "VM-244"],
    ["2026-yil apreldan BFQ (biologik faol qo'shimchalar) me'yori qanday?", ["5 nom, 1 kg", "10 nomgacha, jami 3 kg gacha", "20 nom, 5 kg", "Taqiqlangan"], 1, "VM 154 (09.04.2026): 10 nomgacha, har turidan bitta qadoq, jami 3 kg.", "VM-154"],
    ["Elektron sigaretalar va ularning suyuqliklari bo'yicha qanday qoida amal qiladi?", ["Me'yor doirasida mumkin", "Olib kirish taqiqlangan", "Faqat nikotinsizlari mumkin", "Faqat YBD bilan mumkin"], 1, "O'RQ-844, 37-modda; 2026-03-01 dan muomalasi to'liq taqiqlangan.", "ORQ-844"],
    ["Portativ lazerli nur tarqatgichlarni olib kirish qaysi hujjat bilan taqiqlangan?", ["VM 50", "VM 176", "VM 999", "PQ-4422"], 0, "VM 50 (20.02.2013).", "VM-50"],
    ["Qanday induksion pechlarni olib kirish taqiqlangan?", ["Barcha yangi pechlar", "Ishlab chiqarilganiga 3 yildan oshgan, ilgari foydalanilgan pechlar", "Faqat sanoat pechlari", "Taqiq yo'q"], 1, "VM 999: 3 yildan oshgan, ilgari foydalanilgan induksion pechlar va kameralar.", "VM-999"],
    ["Hozirgi tartibda yagona bojxona to'lovi stavkasi qanday?", ["10%, kamida 1$/kg", "20%, kamida 2$/kg", "30%, kamida 3$/kg", "50%, kamida 5$/kg"], 2, "PQ-4508: 30%, lekin har kg uchun kamida 3$ (2027-yildan — 20% / 2$).", "PQ-4508"],
    ["Diniy materiallarni shaxsiy ehtiyoj uchun har bir nomdan nechtagacha olib kirish mumkin?", ["1 nusxa", "3 nusxagacha", "10 nusxa", "Cheklanmagan"], 1, "VM 180: shaxsiy ehtiyojga har nomdan 3 nusxagacha.", "VM-180"],
    ["PQ-4422 bo'yicha qaysi maishiy elektr asboblarini olib kirish taqiqlangan?", ["“A” toifali", "“D” va undan past energiya samaradorligi toifali", "Barcha import asboblar", "Faqat yangi asboblar"], 1, "Energiya samaradorligi “D” va undan past toifali maishiy asboblar.", "PQ-4422"],
    ["Bojsiz me'yorlar (1 000$ va boshqalar) qaysi hujjat bilan belgilangan?", ["VM 244 (19.04.2025)", "VM 66", "VM 814", "PF-174"], 0, "VM 244, 2025-05-01 dan.", "VM-244"]
  ]);

  add('olib-chiqish', [
    ["Jismoniy shaxs umumiy qiymati qanchagacha bo'lgan tovarlarni YBDsiz olib chiqishi mumkin?", ["1 000$", "3 000$", "5 000$", "10 000$"], 2, "5 000 AQSh dollari ekvivalentigacha (eksport boji va cheklovlar ostidagi tovarlardan tashqari).", null],
    ["Kumushdan tayyor zargarlik buyumlarini YBDsiz olib chiqish me'yori?", ["65 g", "100 g", "200 g", "500 g"], 2, "Kumush — 200 g gacha.", "PF-5721"],
    ["Oltindan tayyor zargarlik buyumlarini YBDsiz olib chiqish me'yori?", ["65 g", "100 g", "150 g", "200 g"], 0, "Oltin va boshqa qimmatbaho metall — 65 g gacha.", "PF-5721"],
    ["Necha yil va undan oldin yaratilgan madaniy boyliklarni (reyestrdagi, muzey/arxivdagi) olib chiqish mumkin emas?", ["20 yil", "30 yil", "50 yil", "100 yil"], 2, "678-I qonun, 8-modda: 50 yil va undan oldin.", "ORQ-678"],
    ["Madaniy boyliklarni olib chiqish huquqini beruvchi sertifikatni kim beradi?", ["Bojxona qo'mitasi", "Madaniyat vazirligi", "Ichki ishlar vazirligi", "Fanlar akademiyasi"], 1, "VM 131: sertifikatni Madaniyat vazirligi beradi.", "VM-131"],
    ["O'lchovli yombi va tangalarni olib chiqish uchun qanday hujjat kerak?", ["Hech narsa", "Markaziy bank sertifikati", "Notarial ruxsat", "Soliq ma'lumotnomasi"], 1, "MB sertifikati bilan cheklovsiz; chegaradan oshsa — YBD.", null],
    ["Ov qurolini olib o'tish qaysi hujjat bilan tartibga solinadi?", ["O'RQ-550 “Qurol to'g'risida”", "VM 66", "PQ-4508", "VM 244"], 0, "O'RQ-550: ruxsatnoma bilan.", "ORQ-550"],
    ["Kriptografik muhofaza vositalari bo'yicha vakolatli organ qaysi?", ["Bojxona qo'mitasi", "Davlat xavfsizlik xizmati", "Raqamli texnologiyalar vazirligi", "Markaziy bank"], 1, "PQ-614: vakolatli organ — DXX.", "PQ-614"],
    ["Qizil kitobga kiritilgan o'simlik va hayvonlarni olib chiqish qanday?", ["Erkin", "Faqat ruxsatnoma bilan", "Faqat YBD bilan", "Faqat pochta orqali"], 1, "VM 290: ruxsatnoma bilan.", "VM-290"]
  ]);

  add('valyuta', [
    ["Naqd valyutani O'zbekistonga olib kirish qanday tartibga solinadi?", ["10 000$ gacha", "100 mln so'mgacha", "Cheklanmaydi", "Taqiqlangan"], 2, "Olib kirish cheklanmaydi; 100 mln so'mdan ortig'i deklaratsiya qilinadi.", "VM-66"],
    ["Naqd pul qanday summadan oshsa YBDda ko'rsatiladi?", ["10 mln so'm", "70 mln so'm", "100 mln so'm ekvivalenti", "500 mln so'm"], 2, "100 mln so'm ekvivalentidan ortiq — kirishda ham, chiqishda ham.", "VM-66"],
    ["O'zbekiston rezidenti ko'pi bilan qancha naqd pulni olib chiqishi mumkin?", ["10 000$", "50 mln so'm", "100 mln so'm ekvivalenti", "Cheklanmagan"], 2, "Rezidentlar — ko'pi bilan 100 mln so'm ekvivalenti.", "VM-66"],
    ["Norezident 100 mln so'mdan ortiq summani qachon olib chiqa oladi?", ["Hech qachon", "Ilgari olib kirib, deklaratsiyada ko'rsatgan summa doirasida", "Bank kafolati bilan", "Har doim"], 1, "Faqat avval olib kirib, deklaratsiya qilgan summa doirasida.", "VM-66"],
    ["Naqd valyutani olib kirish va olib chiqish qoidalari qaysi hujjatda?", ["VM 66 (30.01.2018)", "VM 244", "VM 814", "PQ-4508"], 0, "VM 66, 2023-yil tahririda.", "VM-66"],
    ["PF-174 bo'yicha 10 000$ gacha naqd pulni deklaratsiyasiz olib chiqish qoidasi hozir qanday holatda?", ["Amalda", "Qonun loyihasi topshirig'i (2027-yil dekabr) — hali amalda emas", "Bekor qilingan", "Faqat norezidentlar uchun amalda"], 1, "Bu — yo'l xaritasidagi qonun loyihasi topshirig'i.", "PF-174"],
    ["Rezident 150 mln so'mga teng valyutani YBD to'ldirib olib chiqmoqchi. To'g'ri javob?", ["Mumkin", "Mumkin emas — rezident uchun chegara 100 mln so'm", "Faqat bankdan ma'lumotnoma bilan", "Faqat 3 kundan uzoq safar bo'lsa"], 1, "Rezident uchun chegara 100 mln so'm; deklaratsiya bu chegarani oshirmaydi.", "VM-66"]
  ]);

  add('maqsad-saqlash', [
    ["Tovarni olib o'tish maqsadi (shaxsiy/tijorat) qaysi mezonlarga qarab aniqlanadi?", ["Faqat narxiga", "Xususiyati, miqdori, takroriyligi, safar holatlari", "Faqat og'irligiga", "Yo'lovchining yoshiga"], 1, "VM 281: tovar xususiyati, miqdori, olib o'tish takroriyligi va safar holatlari.", "VM-281"],
    ["Ichki yonuv dvigateli qanday baholanadi?", ["Har doim shaxsiy", "Hech qachon shaxsiy ehtiyoj uchun emas", "1 tasi shaxsiy", "Faqat yangi bo'lsa tijorat"], 1, "PQ-4508 ro'yxatida — shaxsiy ehtiyojga kirmaydi.", "PQ-4508"],
    ["Quyidagilardan qaysi biri PQ-4508 ro'yxatida (shaxsiy ehtiyojga kirmaydigan)?", ["Noutbuk", "Solyariy", "Kiyim", "Telefon"], 1, "Solyariylar ro'yxatda.", "PQ-4508"],
    ["Hozirgi tartibda alkogol va tamaki uchun yagona bojxona to'lovi qanday?", ["Umumiy stavkada", "Ikki baravar miqdorda", "Undirilmaydi", "Uch baravar"], 1, "Alkogol va tamaki mahsulotlariga YBT ikki baravar.", "PQ-4508"],
    ["2027-yil 1-yanvardan YBT stavkasi qanday?", ["30%, kamida 3$/kg", "25%, kamida 2,5$/kg", "20%, kamida 2$/kg", "15%, kamida 1$/kg"], 2, "PF-174, 8-band: 20%, lekin har kg uchun kamida 2$.", "PF-174"],
    ["2027-yil 1-iyundan jismoniy shaxslar uchun qanday yangilik joriy etiladi?", ["Bojsiz me'yor 2 000$ ga oshadi", "YBT bojxona yig'imidan kam bo'lsa, yig'imlar undirilmaydi", "YBT bekor qilinadi", "Telefonlar deklaratsiya qilinmaydi"], 1, "PF-174, 3-band “g”.", "PF-174"],
    ["30 BHM (2026-yil 1-sentabrdagi BHM bo'yicha) qancha?", ["12 360 000 so'm", "13 200 000 so'm", "15 000 000 so'm", "11 250 000 so'm"], 1, "30 × 440 000 = 13 200 000 so'm.", "PF-115"],
    ["Bojxona qiymati 30 BHMdan kam bo'lgan tijorat tovarlariga nima qo'llanmaydi?", ["Bojxona to'lovlari", "Notarif tartibga solish choralari", "Bojxona nazorati", "Deklaratsiya"], 1, "Notarif choralar qo'llanmaydi, to'lovlar umumiy tartibda.", "VM-244"],
    ["Vaqtincha saqlash haqi qanday hisoblanadi?", ["Bir martalik", "Har 100 kg (brutto) uchun, har bir kalendar kun uchun", "Faqat tovar qiymatidan", "Faqat 1 kg dan"], 1, "VM 102: har 100 kg uchun, har bir to'liq yoki to'liq bo'lmagan kun uchun.", "VM-102"],
    ["Hozirgi tartibda me'yordan ortiq qism 800$, og'irligi 10 kg. YBT qancha?", ["30$", "80$", "240$", "800$"], 2, "max(30% × 800 = 240$; 3$ × 10 kg = 30$) = 240$.", "PQ-4508"],
    ["Me'yordan ortiq qism 100$, og'irligi 20 kg (hozirgi tartib). YBT qancha?", ["30$", "60$", "100$", "20$"], 1, "max(30% × 100 = 30$; 3$ × 20 kg = 60$) = 60$ — kattasi olinadi.", "PQ-4508"]
  ]);

  add('harakatlar', [
    ["Ma'muriy ushlab turishning eng ko'p muddati qancha?", ["1 soat", "3 soat", "24 soat", "72 soat"], 1, "MJtK 288: 3 soatdan oshmaydi.", "MJtK-285"],
    ["Ma'muriy ushlab turish muddati qachondan hisoblanadi?", ["Huquqbuzarlik aniqlangan paytdan", "Shaxs bayonnoma tuzish uchun olib kelingan paytdan", "Reys qo'ngan paytdan", "Qaror e'lon qilingan kundan"], 1, "Bayonnoma tuzish uchun olib kelingan paytdan.", "MJtK-285"],
    ["Konstitutsiyaviy sudning 2026-yil 22-sentabrdagi qaroridan keyin sud qarorisiz ko'pi bilan qancha ushlab turish mumkin?", ["3 sutka", "10 sutka", "48 soat", "Cheklanmagan"], 2, "MJtK 288-m. 2-qismi Konstitutsiyaga zid deb topildi: sudsiz 48 soatdan ortiq mumkin emas.", "KS-2026"],
    ["Ma'muriy javobgarlikka tortilayotgan shaxsning huquqlari qaysi moddada?", ["MJtK 227", "MJtK 271", "MJtK 294", "JPK 141"], 2, "MJtK 294: tanishish, tushuntirish, advokat, tarjimon, shikoyat.", "MJtK-294"],
    ["JPK 51 bo'yicha qaysi holatda himoyachi ishtiroki majburiy?", ["Har qanday chet el fuqarosi uchun", "Ish yuritiladigan tilni bilmaydigan shaxs uchun", "Faqat ayollar uchun", "Faqat mansabdor shaxslar uchun"], 1, "Tilni bilmaydiganlar, voyaga yetmaganlar va boshqalar; “chet el fuqarosi” alohida toifa emas.", "JPK-51"],
    ["Tarjimon ishtiroki JPKning qaysi moddalarida tartibga solingan?", ["51–52", "71–72", "135–137", "279–281"], 1, "JPK 71 — tarjimon, 72 — uning huquq va majburiyatlari.", "JPK-71"],
    ["Ko'zdan kechirish bayonnomasi JPKning qaysi moddasida?", ["JPK 135", "JPK 139", "JPK 141", "JPK 51"], 2, "JPK 141 — ko'zdan kechirish bayonnomasi.", "JPK-135"],
    ["MJtK 271-moddasi 11-bandi nimani nazarda tutadi?", ["Bojxona rasmiylashtiruviga ruxsat", "Tadbirkor birinchi marta huquqbuzarlik qilib, 30 kunda ixtiyoriy bartaraf etsa — ish yuritilmaydi", "Jarimani ikki baravar oshirish", "Tovarni musodara qilish"], 1, "Ish yuritishni istisno qiluvchi holat.", "MJtK-271"],
    ["“Qizil” yo'lakda yo'lovchi ishtirokida o'tkaziladigan bojxona ko'rigida xolislar shartmi?", ["Ha, har doim 2 ta", "Yo'q — yo'lovchi ishtirok etsa shart emas", "Ha, 3 ta", "Faqat kechasi"], 1, "Xolislar faqat qonunda belgilangan hollarda, masalan, egasi ishtirok etmaganda.", "BK-195"],
    ["Ma'muriy huquqbuzarlik to'g'risidagi bayonnoma MJtKning qaysi moddalarida tartibga solingan?", ["227", "279–281", "285–288", "294"], 1, "MJtK 279–281.", "MJtK-279"],
    ["VM 200 qaysi mol-mulk bilan bog'liq?", ["Yo'lovchilarning shaxsiy bagaji", "Davlat daromadiga o'tkaziladigan mol-mulkni olib qo'yish, sotish yoki yo'q qilish", "Aeroport jihozlari", "Bojxona xodimlari formasi"], 1, "VM 200 (15.07.2009) nizomi.", "VM-200"]
  ]);

  add('pf174', [
    ["PF-174 farmoni qachon imzolangan?", ["2025-yil 25-mart", "2026-yil 27-avgust", "2026-yil 1-sentabr", "2027-yil 1-yanvar"], 1, "2026-yil 27-avgust; 01.09.2026 da e'lon qilingan.", "PF-174"],
    ["PF-174 bilan tasdiqlangan strategiya nomi?", ["“Raqamli bojxona — 2027”", "“Yangi O'zbekiston bojxonasi — 2030”", "“Intellektual chegara — 2035”", "“Bojxona 4.0”"], 1, "2026–2030-yillarga mo'ljallangan “Yangi O'zbekiston bojxonasi — 2030”.", "PF-174"],
    ["2030-yilga qadar inson omilisiz rasmiylashtiruv ko'lami qanchaga yetkazilishi kerak?", ["30%", "45%", "60%", "90%"], 2, "60 foizga.", "PF-174"],
    ["Bojxona tushumlarining YaIMdagi ulushi maqsadi qancha?", ["3,5%", "4,1%", "4,4%", "5%"], 2, "4,4 foizga yetkazish.", "PF-174"],
    ["Rasmiylashtiruv vaqti bo'yicha maqsad qanday?", ["10% qisqartirish", "Ikki barobar qisqartirish (import ~2 soat, eksport ~30 daqiqa)", "O'zgarmaydi", "Uch barobar uzaytirish"], 1, "Ikki barobar qisqartirish; Strategiyada import 2 soat, eksport 30 daqiqa.", "PF-174"],
    ["Strategiyada nechta ustuvor yo'nalish belgilangan?", ["3", "4", "5", "7"], 2, "5 ta: qulaylik, SI, ma'murchilik, kadr-komplayens, xalqaro hamkorlik.", "PF-174"],
    ["2027-yil 1-yanvardan yagona bojxona to'lovi stavkasi qanday?", ["30%, kamida 3$/kg", "20%, kamida 2$/kg", "10%, kamida 1$/kg", "25%, kamida 2$/kg"], 1, "Farmon 8-band.", "PF-174"],
    ["2027-yil 1-iyundan jismoniy shaxslar notijorat tovari bo'yicha qanday qoida joriy etiladi?", ["YBT ikki baravar", "YBT bojxona yig'imlaridan kam bo'lsa, yig'imlar undirilmaydi", "Bojsiz me'yor bekor qilinadi", "YBD bekor qilinadi"], 1, "Farmon 3-band “g”.", "PF-174"],
    ["2026-yil 1-oktabrdan eksportda qaysi yig'imlar 30% kamayadi?", ["Faqat bojxona boji", "Rasmiylashtiruv, fitosanitariya sertifikati, fumigatsiya va kelib chiqish sertifikati yig'imlari", "QQS", "Aksiz"], 1, "Farmon 3-band “b”.", "PF-174"],
    ["“AI-tahlil” qachondan joriy etiladi?", ["2026-yil 1-oktabr", "2027-yil 1-yanvar", "2028-yil 1-yanvar", "2030-yil"], 2, "Farmon 5-band: 2028-yil 1-yanvardan.", "PF-174"],
    ["“AI-tahlil”ning mohiyati nima?", ["Yo'lovchilarni yuzidan tanish", "Chiqarilgandan keyingi tafovut bo'yicha tadbirkorni avtomatik xabardor qilib, tekshiruvdan oldin ixtiyoriy tuzatish", "Jarimani avtomatik oshirish", "Xodimlarni baholash"], 1, "Tekshiruvdan oldingi ixtiyoriy tuzatish shakli.", "PF-174"],
    ["Avtomatik BYD uchun XBT aniqlagan qo'shimcha to'lov BHMning necha baravarigacha bo'lishi kerak?", ["5", "10", "20", "30"], 1, "Farmon 7-band: BHMning 10 baravarigacha.", "PF-174"],
    ["Avtomatik rasmiylashtirish uchun shartlar qanday bajarilishi kerak?", ["Kamida bittasi", "Ikkitasi", "Hammasi bir vaqtda", "Xodim xohishiga ko'ra"], 2, "4 shart bir vaqtda bajarilganda.", "PF-174"],
    ["Importchilarga soliq va bojxona sayyor tekshiruvlarini birgalikda o'tkazish qachondan?", ["2026-yil 1-oktabr", "2027-yil 1-aprel", "2027-yil 1-iyun", "2028-yil 1-yanvar"], 1, "Farmon 6-band “b”.", "PF-174"],
    ["Qayta ishlash muddati o'tgan tovar 30 kun ichida olib chiqilmasa nima bo'ladi?", ["Hech narsa", "Bojxona to'lovlari so'zsiz undiriladi", "Tovar qaytariladi", "Muddat avtomatik uzayadi"], 1, "Farmon 6-band “a”.", "PF-174"],
    ["Raqamli texnologiyalar markazi qaysi tuzilma negizida tashkil etiladi?", ["Bojxona instituti", "AKT va kiberxavfsizlikni ta'minlash boshqarmasi", "Milliy kinologiya markazi", "Bojxona rasmiylashtiruvi markazi"], 1, "Farmon 10-band.", "PF-174"],
    ["“Bojxona-servis” davlat muassasasi qanday qayta tashkil etiladi?", ["Tugatiladi", "Xorijiy investitsiya jalb qilingan holda MCHJ sifatida", "Vazirlikka qo'shiladi", "Aksiyadorlik bankiga aylantiriladi"], 1, "Farmon 11-band.", "PF-174"],
    ["Raqamli texnologiyalar markazini moliyalash manbalaridan biri — bojxona hamrohligi yig'imlarining necha foizi?", ["10%", "30%", "50%", "100%"], 3, "Farmon 13-band “d”: 100 foizi.", "PF-174"],
    ["Muddatsiz berilgan bojxona boji imtiyozlari qachongacha amal qiladi?", ["2027-yil 1-yanvar", "2028-yil 1-yanvar", "2029-yil 1-yanvar", "2030-yil 31-dekabr"], 2, "Farmon 9-band “b”.", "PF-174"],
    ["Strategiyani amalga oshirish uchun shaxsan mas'ul kim?", ["Bosh vazir", "Bojxona qo'mitasi raisi", "Iqtisodiyot va moliya vaziri", "Adliya vaziri"], 1, "Farmon 18-band: BQ raisi (A.Yu. Mavlonov).", "PF-174"],
    ["Farmon ijrosini nazorat qilish kimga yuklangan?", ["Bosh prokurorga", "Bosh vazir o'rinbosari J.A. Qo'chqorovga", "BQ raisiga", "Markaziy bank raisiga"], 1, "Farmon 21-band.", "PF-174"],
    ["Strategiya monitoring guruhi qancha muddatda tuziladi?", ["1 hafta", "1 oy", "3 oy", "1 yil"], 1, "Farmon 16-band: bir oy muddatda.", "PF-174"],
    ["Strategiyani 2026–2030-yillarda moliyalashtirishning jami hajmi qancha?", ["109 mlrd so'm", "1 716 mlrd so'm", "76,2 trln so'm", "1 mlrd AQSh dollari"], 1, "Davlat budjeti 109 + BQ jamg'armalari 1 529 + RTM 78 = 1 716 mlrd so'm.", "PF-174"],
    ["2025-yilda Davlat budjetiga bojxona to'lovlari tushumi qancha bo'lgan?", ["42,5 trln so'm", "76,2 trln so'm", "100 trln so'm", "1,7 trln so'm"], 1, "76,2 trln so'm, 2024-yilga nisbatan +21%.", "PF-174"],
    ["Nechta aviakompaniyadan yo'lovchilar va bagaj haqida oldindan axborot olinadi?", ["8", "18", "41", "79"], 2, "41 ta xalqaro va milliy aviakompaniya.", "PF-174"],
    ["Post-nazoratda kelib chiqish sertifikati xatosi topilsa, tarif preferensiyasini tiklash huquqi necha yil davomida beriladi?", ["1 yil", "2 yil", "3 yil", "5 yil"], 2, "Farmon 4-band “d”: uch yil davomida.", "PF-174"],
    ["2027-yil 1-yanvardan bojxona qiymatini nazorat qilishda nima taqiqlanadi?", ["Dastlabki qaror", "Qat'iy bojxona qiymatini belgilash", "Diller narxlaridan foydalanish", "Post-nazorat"], 1, "Farmon 3-band “v”.", "PF-174"],
    ["PF-174 3-ilovasiga ko'ra bojxona omborida 90 kun ichida talab qilib olinmagan tovarlar nima bo'ladi?", ["Yo'q qilinadi", "Sud qarori bilan davlat egaligiga o'tadi", "Egasiga pochta orqali yuboriladi", "Auksionda xodimlarga sotiladi"], 1, "PF-57 13-bandi yangi tahriri.", "PF-174"],
    ["PF-174 bo'yicha avtoturargoh va logistika infratuzilmasi qaysi viloyatlarda tashkil etiladi?", ["Samarqand, Buxoro, Xorazm", "Andijon, Surxondaryo, Toshkent", "Navoiy, Jizzax, Sirdaryo", "Namangan, Farg'ona, Qashqadaryo"], 1, "Farmon 15-band.", "PF-174"],
    ["2026-yil 1-sentabrdan bekor qilingan talablardan biri qaysi?", ["YBDni to'ldirish", "Shartnomasiz invoys asosida eksportda 50% tushumni oldindan ta'minlash", "Bojxona yig'imi", "Chegara nazorati"], 1, "Farmon 3-band “a”.", "PF-174"]
  ]);

  global.QUESTIONS = Q;
})(window);
