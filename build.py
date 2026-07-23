import io, re, os
import json as _json
from html.parser import HTMLParser

BASE = "https://astroscan-lab.github.io/astroscan_bot"
ALL_LANGS = ["en", "ru", "es", "hi", "pt", "vi", "tr", "id", "uz", "kk", "fr", "de", "lo", "it", "ar", "fa"]
RTL_LANGS = {"ar", "fa"}

LANGS = {
    "ru": {
        "locale": "ru_RU",
        "title": "AstroScan · Бесплатный тест на знак китайского зодиака",
        "desc": "Бесплатный тест личности определяет знак китайского зодиака и архетип — без даты рождения. Проверьте совместимость онлайн.",
        "og_title": "AstroScan · Узнайте свой знак китайского зодиака без даты рождения — бесплатно",
        "og_desc": "Узнайте свой архетип, знак китайского зодиака и совместимость бесплатно — по характеру, без даты рождения и регистрации.",
        "keywords": "бесплатный тест личности, китайский зодиак без даты рождения, тест на архетип и зодиак, совместимость, западная астрология, ведическая астрология, джйотиш, сравнение астрологии, бесплатный тест, Swiss Ephemeris",
        "product_desc": "Бесплатный онлайн-тест, который определит ваш знак китайского зодиака, поведенческий архетип и совместимость. Без регистрации. Сравнение западной и ведической астрологии. На основе расчётов Swiss Ephemeris.",
        "howto_name": "Как использовать AstroScan",
        "howto_steps": [
            "Ответьте на 10 вопросов о своём поведении.",
            "Получите свой знак китайского зодиака и архетип.",
            "Выберите знак партнёра и контекст (любовь/дружба/работа).",
            "Узнайте процент совместимости и персональные инсайты.",
        ],
    },
    "es": {
        "locale": "es_ES",
        "title": "AstroScan · Test Gratis de tu Signo del Zodíaco Chino",
        "desc": "Test de personalidad gratis revela tu signo del zodíaco chino y arquetipo — sin fecha de nacimiento. Comprueba tu compatibilidad.",
        "og_title": "AstroScan · Descubre tu Signo del Zodíaco Chino Sin Fecha de Nacimiento — Gratis",
        "og_desc": "Descubre tu arquetipo, tu signo del zodíaco chino y tu compatibilidad gratis — según tu carácter, sin fecha de nacimiento ni registro.",
        "keywords": "test de personalidad gratis, zodiaco chino sin fecha de nacimiento, test de arquetipo y zodiaco, compatibilidad, astrología occidental, astrología védica, jyotish, comparación de astrología, test gratis, Swiss Ephemeris",
        "product_desc": "Test online gratuito para descubrir tu signo del zodíaco chino, tu arquetipo de comportamiento y tu compatibilidad. Sin registro. Compara la astrología occidental y védica. Basado en cálculos de Swiss Ephemeris.",
        "howto_name": "Cómo usar AstroScan",
        "howto_steps": [
            "Responde 10 preguntas sobre tu comportamiento.",
            "Recibe tu signo del zodíaco chino y tu arquetipo.",
            "Elige el signo de tu pareja y el contexto (amor/amistad/trabajo).",
            "Consulta el porcentaje de compatibilidad y conocimientos personalizados.",
        ],
    },
    "hi": {
        "locale": "hi_IN",
        "title": "AstroScan · मुफ़्त चीनी राशि चक्र टेस्ट",
        "desc": "मुफ़्त व्यक्तित्व परीक्षण आपका चीनी राशि चक्र और आर्कटाइप बताता है — बिना जन्म तिथि। अनुकूलता जानें।",
        "og_title": "AstroScan · बिना जन्म तिथि के अपना चीनी राशि चक्र जानें — मुफ़्त",
        "og_desc": "अपना आर्कटाइप, चीनी राशि चक्र और अनुकूलता मुफ़्त में जानें — अपने स्वभाव से, बिना जन्म तिथि और पंजीकरण के।",
        "keywords": "मुफ़्त व्यक्तित्व परीक्षण, बिना जन्म तिथि चीनी राशि चक्र, आर्कटाइप और राशि परीक्षण, अनुकूलता, पश्चिमी ज्योतिष, वैदिक ज्योतिष, ज्योतिष तुलना, मुफ़्त परीक्षण, Swiss Ephemeris",
        "product_desc": "अपना चीनी राशि चक्र, व्यवहारिक आर्कटाइप और अनुकूलता जानने के लिए मुफ़्त ऑनलाइन परीक्षण। पंजीकरण की आवश्यकता नहीं। पश्चिमी और वैदिक ज्योतिष की तुलना करें। Swiss Ephemeris गणनाओं पर आधारित।",
        "howto_name": "AstroScan का उपयोग कैसे करें",
        "howto_steps": [
            "अपने व्यवहार के बारे में 10 प्रश्नों के उत्तर दें।",
            "अपना चीनी राशि चक्र और आर्कटाइप प्राप्त करें।",
            "साथी की राशि और संदर्भ चुनें (प्रेम/मित्रता/कार्य)।",
            "अनुकूलता प्रतिशत और व्यक्तिगत जानकारी देखें।",
        ],
    },
    "pt": {
        "locale": "pt_BR",
        "title": "AstroScan · Teste Gratuito de Personalidade e Signo do Zodíaco Chinês",
        "desc": "Teste de personalidade gratuito revela seu signo do zodíaco chinês e arquétipo — sem data de nascimento. Confira a compatibilidade na hora.",
        "og_title": "AstroScan · Descubra seu Signo do Zodíaco Chinês Sem Data de Nascimento — Grátis",
        "og_desc": "Descubra seu arquétipo, signo do zodíaco chinês e compatibilidade de graça — com base no seu comportamento, sem precisar de data de nascimento ou cadastro.",
        "keywords": "teste de personalidade gratuito, zodíaco chinês sem data de nascimento, teste de arquétipo e compatibilidade zodiacal, sem cadastro, teste de arquétipo, compatibilidade, astrologia ocidental, astrologia védica, jyotish, comparação de astrologia, teste grátis, Swiss Ephemeris",
        "product_desc": "Teste online gratuito para descobrir seu signo do zodíaco chinês, arquétipo comportamental e compatibilidade. Sem necessidade de cadastro. Compare a astrologia ocidental e védica. Baseado em cálculos do Swiss Ephemeris.",
        "howto_name": "Como usar o AstroScan",
        "howto_steps": [
            "Responda 10 perguntas sobre seu comportamento.",
            "Receba seu signo do zodíaco chinês e arquétipo.",
            "Escolha o signo do parceiro e o contexto (amor/amizade/trabalho).",
            "Veja a porcentagem de compatibilidade e informações personalizadas.",
        ],
    },
    "vi": {
        "locale": "vi_VN",
        "title": "AstroScan · Bài Trắc Nghiệm Tính Cách Miễn Phí &amp; Cung Hoàng Đạo Trung Hoa",
        "desc": "Bài trắc nghiệm tính cách miễn phí tiết lộ con giáp và nguyên mẫu tính cách của bạn — không cần ngày sinh. Kiểm tra độ hợp ngay lập tức.",
        "og_title": "AstroScan · Tìm Con Giáp Của Bạn Không Cần Ngày Sinh — Miễn Phí",
        "og_desc": "Khám phá nguyên mẫu tính cách, con giáp và độ hợp của bạn miễn phí — dựa trên hành vi, không cần ngày sinh hay đăng ký.",
        "keywords": "trắc nghiệm tính cách miễn phí, con giáp không cần ngày sinh, trắc nghiệm nguyên mẫu và độ hợp con giáp, không cần đăng ký, trắc nghiệm nguyên mẫu, độ hợp, chiêm tinh phương Tây, chiêm tinh Vệ Đà, jyotish, so sánh chiêm tinh, trắc nghiệm miễn phí, Swiss Ephemeris",
        "product_desc": "Bài trắc nghiệm trực tuyến miễn phí giúp bạn khám phá con giáp, nguyên mẫu hành vi và độ hợp. Không cần đăng ký. So sánh chiêm tinh phương Tây và Vệ Đà. Dựa trên các phép tính Swiss Ephemeris.",
        "howto_name": "Cách sử dụng AstroScan",
        "howto_steps": [
            "Trả lời 10 câu hỏi về hành vi của bạn.",
            "Nhận con giáp và nguyên mẫu tính cách của bạn.",
            "Chọn con giáp của đối phương và bối cảnh (tình yêu/tình bạn/công việc).",
            "Xem tỷ lệ phần trăm hợp nhau và những nhận định riêng cho bạn.",
        ],
    },
    "tr": {
        "locale": "tr_TR",
        "title": "AstroScan · Ücretsiz Kişilik Testi ve Çin Burcu",
        "desc": "Ücretsiz kişilik testi, doğum tarihi olmadan Çin burcunuzu ve arketipinizi ortaya çıkarır. Uyumluluğu anında öğrenin.",
        "og_title": "AstroScan · Doğum Tarihi Olmadan Çin Burcunuzu Bulun — Ücretsiz",
        "og_desc": "Arketipinizi, Çin burcunuzu ve uyumluluğunuzu ücretsiz keşfedin — doğum tarihi veya kayıt gerekmeden, sadece davranışlarınıza dayanarak.",
        "keywords": "ücretsiz kişilik testi, doğum tarihi olmadan Çin burcu, arketip ve burç uyumluluk testi, kayıt gerektirmez, arketip testi, uyumluluk, batı astrolojisi, vedik astroloji, jyotish, astroloji karşılaştırması, ücretsiz test, Swiss Ephemeris",
        "product_desc": "Çin burcunuzu, davranışsal arketipinizi ve uyumluluğunuzu keşfetmek için ücretsiz çevrimiçi test. Kayıt gerekmez. Batı ve Vedik astrolojiyi karşılaştırın. Swiss Ephemeris hesaplamalarına dayanır.",
        "howto_name": "AstroScan Nasıl Kullanılır",
        "howto_steps": [
            "Davranışlarınızla ilgili 10 soruyu yanıtlayın.",
            "Çin burcunuzu ve arketipinizi öğrenin.",
            "Partnerinizin burcunu ve bağlamı seçin (aşk/arkadaşlık/iş).",
            "Uyumluluk yüzdesini ve size özel içgörüleri görün.",
        ],
    },
    "id": {
        "locale": "id_ID",
        "title": "AstroScan · Tes Kepribadian Gratis &amp; Shio Tiongkok",
        "desc": "Tes kepribadian gratis mengungkap shio dan arketip Anda — tanpa perlu tanggal lahir. Cek kecocokan secara instan.",
        "og_title": "AstroScan · Temukan Shio Anda Tanpa Tanggal Lahir — Gratis",
        "og_desc": "Temukan arketip, shio, dan kecocokan Anda secara gratis — berdasarkan perilaku Anda, tanpa perlu tanggal lahir atau pendaftaran.",
        "keywords": "tes kepribadian gratis, shio tanpa tanggal lahir, tes arketip dan kecocokan shio, tanpa pendaftaran, tes arketip, kecocokan, astrologi barat, astrologi weda, jyotish, perbandingan astrologi, tes gratis, Swiss Ephemeris",
        "product_desc": "Tes online gratis untuk menemukan shio, arketip perilaku, dan kecocokan Anda. Tidak perlu pendaftaran. Bandingkan astrologi Barat dan Weda. Berdasarkan perhitungan Swiss Ephemeris.",
        "howto_name": "Cara menggunakan AstroScan",
        "howto_steps": [
            "Jawab 10 pertanyaan tentang perilaku Anda.",
            "Dapatkan shio dan arketip Anda.",
            "Pilih shio pasangan dan konteksnya (cinta/persahabatan/kerja).",
            "Lihat persentase kecocokan dan wawasan personal Anda.",
        ],
    },
    "uz": {
        "locale": "uz_UZ",
        "title": "AstroScan · Bepul Shaxsiyat Testi va Xitoy Zodiakal Belgisi",
        "desc": "Bepul shaxsiyat testi tug'ilgan sanasiz sizning xitoy zodiak belgingiz va arxetipingizni aniqlaydi. Moslikni darhol tekshiring.",
        "og_title": "AstroScan · Tug'ilgan Sanasiz Xitoy Zodiak Belgingizni Toping — Bepul",
        "og_desc": "Arxetipingizni, xitoy zodiak belgingizni va moslikni bepul aniqlang — xatti-harakatingiz asosida, tug'ilgan sana yoki ro'yxatdan o'tishsiz.",
        "keywords": "bepul shaxsiyat testi, tug'ilgan sanasiz xitoy zodiaki, arxetip va zodiak moslik testi, ro'yxatdan o'tishsiz, arxetip testi, moslik, g'arb astrologiyasi, vedik astrologiya, jyotish, astrologiya solishtirish, bepul test, Swiss Ephemeris",
        "product_desc": "Xitoy zodiak belgingiz, xulq-atvor arxetipingiz va moslikni aniqlash uchun bepul onlayn test. Ro'yxatdan o'tish talab qilinmaydi. G'arb va vedik astrologiyani solishtiring. Swiss Ephemeris hisob-kitoblariga asoslangan.",
        "howto_name": "AstroScan'dan qanday foydalanish kerak",
        "howto_steps": [
            "Xatti-harakatingiz haqida 10 ta savolga javob bering.",
            "Xitoy zodiak belgingiz va arxetipingizni bilib oling.",
            "Sherigingizning belgisini va kontekstni tanlang (sevgi/do'stlik/ish).",
            "Moslik foizini va sizga xos tavsiyalarni ko'ring.",
        ],
    },
    "kk": {
        "locale": "kk_KZ",
        "title": "AstroScan · Тегін Тұлғалық Тест және Қытай Зодиак Белгісі",
        "desc": "Тегін тұлғалық тест сіздің қытай зодиак белгіңіз бен архетипіңізді анықтайды — туған күнсіз. Үйлесімділікті лезде тексеріңіз.",
        "og_title": "AstroScan · Туған Күнсіз Қытай Зодиак Белгіңізді Табыңыз — Тегін",
        "og_desc": "Архетипіңізді, қытай зодиак белгіңізді және үйлесімділікті тегін біліңіз — мінез-құлқыңызға негізделген, туған күн немесе тіркеу қажет емес.",
        "keywords": "тегін тұлғалық тест, туған күнсіз қытай зодиагы, архетип және зодиак үйлесімділік тесті, тіркеусіз, архетип тесті, үйлесімділік, батыс астрологиясы, ведалық астрология, джйотиш, астрологияны салыстыру, тегін тест, Swiss Ephemeris",
        "product_desc": "Қытай зодиак белгіңізді, мінез-құлық архетипіңізді және үйлесімділікті анықтауға арналған тегін онлайн тест. Тіркеу қажет емес. Батыс және ведалық астрологияны салыстырыңыз. Swiss Ephemeris есептеулеріне негізделген.",
        "howto_name": "AstroScan-ды қалай пайдалану керек",
        "howto_steps": [
            "Мінез-құлқыңыз туралы 10 сұраққа жауап беріңіз.",
            "Қытай зодиак белгіңіз бен архетипіңізді біліңіз.",
            "Серіктестің белгісі мен контекстін таңдаңыз (махаббат/достық/жұмыс).",
            "Үйлесімділік пайызы мен жеке ұсыныстарды көріңіз.",
        ],
    },
    "fr": {
        "locale": "fr_FR",
        "title": "AstroScan · Test de Personnalité Gratuit et Signe du Zodiaque Chinois",
        "desc": "Un test de personnalité gratuit révèle votre signe du zodiaque chinois et votre archétype — sans date de naissance. Vérifiez votre compatibilité instantanément.",
        "og_title": "AstroScan · Découvrez votre Signe du Zodiaque Chinois Sans Date de Naissance — Gratuit",
        "og_desc": "Découvrez gratuitement votre archétype, votre signe du zodiaque chinois et votre compatibilité — selon votre comportement, sans date de naissance ni inscription.",
        "keywords": "test de personnalité gratuit, zodiaque chinois sans date de naissance, test d'archétype et de compatibilité zodiacale, sans inscription, test d'archétype, compatibilité, astrologie occidentale, astrologie védique, jyotish, comparaison d'astrologie, test gratuit, Swiss Ephemeris",
        "product_desc": "Test en ligne gratuit pour découvrir votre signe du zodiaque chinois, votre archétype comportemental et votre compatibilité. Aucune inscription requise. Comparez l'astrologie occidentale et védique. Basé sur les calculs de Swiss Ephemeris.",
        "howto_name": "Comment utiliser AstroScan",
        "howto_steps": [
            "Répondez à 10 questions sur votre comportement.",
            "Recevez votre signe du zodiaque chinois et votre archétype.",
            "Choisissez le signe de votre partenaire et le contexte (amour/amitié/travail).",
            "Consultez le pourcentage de compatibilité et des informations personnalisées.",
        ],
    },
    "de": {
        "locale": "de_DE",
        "title": "AstroScan · Kostenloser Persönlichkeitstest &amp; Chinesisches Sternzeichen",
        "desc": "Der kostenlose Persönlichkeitstest verrät Ihr chinesisches Sternzeichen und Archetyp — ganz ohne Geburtsdatum. Kompatibilität sofort prüfen.",
        "og_title": "AstroScan · Finden Sie Ihr Chinesisches Sternzeichen Ohne Geburtsdatum — Kostenlos",
        "og_desc": "Entdecken Sie kostenlos Ihren Archetyp, Ihr chinesisches Sternzeichen und Ihre Kompatibilität — basierend auf Ihrem Verhalten, ohne Geburtsdatum oder Registrierung.",
        "keywords": "kostenloser Persönlichkeitstest, chinesisches Sternzeichen ohne Geburtsdatum, Archetyp- und Sternzeichen-Kompatibilitätstest, keine Registrierung, Archetyp-Test, Kompatibilität, westliche Astrologie, vedische Astrologie, Jyotish, Astrologie-Vergleich, kostenloser Test, Swiss Ephemeris",
        "product_desc": "Kostenloser Online-Test, um Ihr chinesisches Sternzeichen, Ihren Verhaltensarchetyp und Ihre Kompatibilität zu entdecken. Keine Registrierung erforderlich. Vergleichen Sie westliche und vedische Astrologie. Basiert auf Swiss-Ephemeris-Berechnungen.",
        "howto_name": "So verwenden Sie AstroScan",
        "howto_steps": [
            "Beantworten Sie 10 Fragen zu Ihrem Verhalten.",
            "Erhalten Sie Ihr chinesisches Sternzeichen und Ihren Archetyp.",
            "Wählen Sie das Sternzeichen Ihres Partners und den Kontext (Liebe/Freundschaft/Arbeit).",
            "Sehen Sie den Kompatibilitätsprozentsatz und personalisierte Einblicke.",
        ],
    },
    "lo": {
        "locale": "lo_LA",
        "title": "AstroScan · ແບບທົດສອບບຸກຄະລິກຟຣີ ແລະ ນັກສັດຈີນ",
        "desc": "ແບບທົດສອບບຸກຄະລິກຟຣີເປີດເຜີຍນັກສັດຈີນ ແລະ ຕົ້ນແບບບຸກຄະລິກຂອງທ່ານ — ບໍ່ຕ້ອງໃຊ້ວັນເກີດ. ກວດສອບຄວາມເຂົ້າກັນໄດ້ທັນທີ.",
        "og_title": "AstroScan · ຄົ້ນຫານັກສັດຈີນຂອງທ່ານໂດຍບໍ່ຕ້ອງໃຊ້ວັນເກີດ — ຟຣີ",
        "og_desc": "ຄົ້ນພົບຕົ້ນແບບບຸກຄະລິກ, ນັກສັດຈີນ ແລະ ຄວາມເຂົ້າກັນໄດ້ຂອງທ່ານຟຣີ — ອີງໃສ່ພຶດຕິກຳຂອງທ່ານ, ບໍ່ຕ້ອງໃຊ້ວັນເກີດ ຫຼື ການລົງທະບຽນ.",
        "keywords": "ແບບທົດສອບບຸກຄະລິກຟຣີ, ນັກສັດຈີນໂດຍບໍ່ຕ້ອງໃຊ້ວັນເກີດ, ແບບທົດສອບຕົ້ນແບບແລະຄວາມເຂົ້າກັນໄດ້, ບໍ່ຕ້ອງລົງທະບຽນ, ແບບທົດສອບຕົ້ນແບບ, ຄວາມເຂົ້າກັນໄດ້, ໂຫລາສາດຕາເວັນຕົກ, ໂຫລາສາດເວດ, ໂຈຕິສ, ການປຽບທຽບໂຫລາສາດ, ແບບທົດສອບຟຣີ, Swiss Ephemeris",
        "product_desc": "ແບບທົດສອບອອນລາຍຟຣີເພື່ອຄົ້ນຫານັກສັດຈີນ, ຕົ້ນແບບພຶດຕິກຳ ແລະ ຄວາມເຂົ້າກັນໄດ້ຂອງທ່ານ. ບໍ່ຕ້ອງລົງທະບຽນ. ປຽບທຽບໂຫລາສາດຕາເວັນຕົກ ແລະ ໂຫລາສາດເວດ. ອີງໃສ່ການຄິດໄລ່ Swiss Ephemeris.",
        "howto_name": "ວິທີໃຊ້ AstroScan",
        "howto_steps": [
            "ຕອບ 10 ຄຳຖາມກ່ຽວກັບພຶດຕິກຳຂອງທ່ານ.",
            "ຮັບນັກສັດຈີນ ແລະ ຕົ້ນແບບບຸກຄະລິກຂອງທ່ານ.",
            "ເລືອກນັກສັດຂອງຄູ່ ແລະ ສະພາບການ (ຄວາມຮັກ/ມິດຕະພາບ/ວຽກ).",
            "ເບິ່ງເປີເຊັນຄວາມເຂົ້າກັນໄດ້ ແລະ ຂໍ້ມູນສະເພາະຕົວ.",
        ],
    },
    "it": {
        "locale": "it_IT",
        "title": "AstroScan · Test Gratuito del Segno Zodiacale Cinese",
        "desc": "Il test di personalità gratuito rivela il tuo segno zodiacale cinese e il tuo archetipo — senza data di nascita. Scopri subito la compatibilità.",
        "og_title": "AstroScan · Scopri il Tuo Segno Zodiacale Cinese Senza Data di Nascita — Gratis",
        "og_desc": "Scopri gratuitamente il tuo archetipo, il tuo segno zodiacale cinese e la tua compatibilità — in base al tuo carattere, senza data di nascita né registrazione.",
        "keywords": "test di personalità gratuito, zodiaco cinese senza data di nascita, test di archetipo e compatibilità zodiacale, nessuna registrazione, test di compatibilità, astrologia occidentale, astrologia vedica, jyotish, confronto tra astrologie, test gratuito, Swiss Ephemeris",
        "product_desc": "Test online gratuito per scoprire il tuo segno zodiacale cinese, il tuo archetipo comportamentale e la tua compatibilità. Nessuna registrazione richiesta. Confronta l'astrologia occidentale e quella vedica. Basato sui calcoli di Swiss Ephemeris.",
        "howto_name": "Come usare AstroScan",
        "howto_steps": [
            "Rispondi a 10 domande sul tuo comportamento.",
            "Ricevi il tuo segno zodiacale cinese e il tuo archetipo.",
            "Scegli il segno del partner e il contesto (amore/amicizia/lavoro).",
            "Scopri la percentuale di compatibilità e approfondimenti personalizzati.",
        ],
    },
    "ar": {
        "locale": "ar_AR",
        "title": "AstroScan · اختبار مجاني لبرجك الصيني",
        "desc": "يكشف اختبار الشخصية المجاني برجك الصيني ونمطك الشخصي — دون الحاجة لتاريخ الميلاد. تحقّق من التوافق فورًا.",
        "og_title": "AstroScan · اكتشف برجك الصيني دون تاريخ الميلاد — مجانًا",
        "og_desc": "اكتشف نمطك الشخصي وبرجك الصيني ومدى توافقك مجانًا — بناءً على شخصيتك، دون تاريخ ميلاد أو تسجيل.",
        "keywords": "اختبار شخصية مجاني, برج صيني بدون تاريخ ميلاد, اختبار النمط الشخصي والتوافق, بدون تسجيل, توافق الأبراج, علم التنجيم الغربي, التنجيم الفيدي, جيوتيش, مقارنة الأنظمة الفلكية, اختبار مجاني, Swiss Ephemeris",
        "product_desc": "اختبار مجاني عبر الإنترنت لاكتشاف برجك الصيني ونمطك السلوكي ومدى توافقك. لا حاجة للتسجيل. قارن بين علم التنجيم الغربي والفيدي. يعتمد على حسابات Swiss Ephemeris.",
        "howto_name": "كيفية استخدام AstroScan",
        "howto_steps": [
            "أجب عن 10 أسئلة حول سلوكك.",
            "احصل على برجك الصيني ونمطك الشخصي.",
            "اختر برج الشريك والسياق (الحب/الصداقة/العمل).",
            "اطّلع على نسبة التوافق ورؤى شخصية مخصصة.",
        ],
    },
    "fa": {
        "locale": "fa_IR",
        "title": "AstroScan · آزمون رایگان زودیاک چینی",
        "desc": "آزمون رایگان شخصیت‌شناسی، زودیاک چینی و کهن‌الگوی شما را بدون نیاز به تاریخ تولد آشکار می‌کند. سازگاری را همین حالا بررسی کنید.",
        "og_title": "AstroScan · زودیاک چینی خود را بدون تاریخ تولد بیابید — رایگان",
        "og_desc": "کهن‌الگو، زودیاک چینی و میزان سازگاری خود را رایگان کشف کنید — بر اساس رفتار شما، بدون تاریخ تولد یا ثبت‌نام.",
        "keywords": "آزمون شخصیت رایگان, زودیاک چینی بدون تاریخ تولد, آزمون کهن‌الگو و سازگاری زودیاک, بدون ثبت‌نام, سازگاری, طالع‌بینی غربی, طالع‌بینی ودایی, جیوتیش, مقایسه سنت‌های نجومی, آزمون رایگان, Swiss Ephemeris",
        "product_desc": "آزمون آنلاین رایگان برای کشف زودیاک چینی، کهن‌الگوی رفتاری و سازگاری شما. بدون نیاز به ثبت‌نام. مقایسه طالع‌بینی غربی و ودایی. بر پایه محاسبات Swiss Ephemeris.",
        "howto_name": "نحوه استفاده از AstroScan",
        "howto_steps": [
            "به ۱۰ پرسش دربارهٔ رفتار خود پاسخ دهید.",
            "زودیاک چینی و کهن‌الگوی خود را دریافت کنید.",
            "نشان شریک و زمینه (عشق/دوستی/کار) را انتخاب کنید.",
            "درصد سازگاری و بینش‌های شخصی‌سازی‌شده را ببینید.",
        ],
    },
}

EN_HOWTO_STEPS = [
    "Answer 10 questions about your behavior.",
    "Receive your Chinese zodiac sign and archetype.",
    "Choose a partner's sign and context (love/friendship/work).",
    "See compatibility percentage and personalized insights.",
]
EN_PRODUCT_DESC = ("Free online test to discover your Chinese zodiac sign, behavioral archetype, "
                   "and compatibility. No registration required. Compare Western and Vedic astrology. "
                   "Based on Swiss Ephemeris calculations.")
EN_HOWTO_NAME = "How to use AstroScan"


def clean_faq_text(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = s.replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'")
    return s.strip()


def extract_faq(html, lang):
    pattern = re.compile(
        r'<details data-lang="%s"[^>]*>\s*<summary[^>]*>(.*?)</summary>\s*<p[^>]*>(.*?)</p>\s*</details>' % lang,
        re.S
    )
    return [(clean_faq_text(q), clean_faq_text(a)) for q, a in pattern.findall(html)]


def faq_mainentity_json(pairs):
    entries = []
    for q, a in pairs:
        entries.append(
            '          {\n'
            '            "@type": "Question",\n'
            '            "name": %s,\n'
            '            "acceptedAnswer": { "@type": "Answer", "text": %s }\n'
            '          }' % (_json.dumps(q, ensure_ascii=False), _json.dumps(a, ensure_ascii=False))
        )
    return '"mainEntity": [\n' + ',\n'.join(entries) + '\n        ]'


VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
             "link", "meta", "param", "source", "track", "wbr"}


class LangFilter(HTMLParser):
    """Strips every element carrying a data-lang attribute that doesn't match
    target_lang (and its whole subtree), so the output is genuinely single-language
    instead of all 4 languages hidden/shown via CSS+JS."""

    def __init__(self, target_lang):
        super().__init__(convert_charrefs=False)
        self.target_lang = target_lang
        self.out = []
        self.skip_stack = []
        self.depth = 0

    def _skipping(self):
        return len(self.skip_stack) > 0

    def _render_starttag(self, tag, attrs, self_close):
        parts = [f"<{tag}"]
        for k, v in attrs:
            if k == "data-lang":
                continue
            parts.append(f" {k}" if v is None else f' {k}="{v}"')
        parts.append(" />" if self_close else ">")
        self.out.append("".join(parts))

    def handle_starttag(self, tag, attrs):
        lang = dict(attrs).get("data-lang")
        if tag in VOID_TAGS:
            if self._skipping():
                return
            if lang is not None and lang != self.target_lang:
                return
            self._render_starttag(tag, attrs, self_close=False)
            return
        self.depth += 1
        if self._skipping():
            return
        if lang is not None and lang != self.target_lang:
            self.skip_stack.append(self.depth)
            return
        self._render_starttag(tag, attrs, self_close=False)

    def handle_startendtag(self, tag, attrs):
        if self._skipping():
            return
        lang = dict(attrs).get("data-lang")
        if lang is not None and lang != self.target_lang:
            return
        self._render_starttag(tag, attrs, self_close=True)

    def handle_endtag(self, tag):
        if self.skip_stack and self.skip_stack[-1] == self.depth:
            self.skip_stack.pop()
            self.depth -= 1
            return
        self.depth -= 1
        if self._skipping():
            return
        self.out.append(f"</{tag}>")

    def handle_data(self, data):
        if not self._skipping():
            self.out.append(data)

    def handle_entityref(self, name):
        if not self._skipping():
            self.out.append(f"&{name};")

    def handle_charref(self, name):
        if not self._skipping():
            self.out.append(f"&#{name};")

    def handle_comment(self, data):
        if not self._skipping():
            self.out.append(f"<!--{data}-->")

    def handle_decl(self, decl):
        if not self._skipping():
            self.out.append(f"<!{decl}>")

    def filtered(self, html):
        self.feed(html)
        self.close()
        return "".join(self.out)


with io.open("template.html", "r", encoding="utf-8") as f:
    template = f.read()

for lang in ALL_LANGS:
    html = template
    is_en = lang == "en"
    t = LANGS.get(lang)

    dir_attr = ' dir="rtl"' if lang in RTL_LANGS else ''
    html = html.replace('<html lang="en">', '<html lang="%s"%s data-forced-lang="%s">' % (lang, dir_attr, lang), 1)

    if not is_en:
        html = re.sub(r'(<title>)[^<]*(</title>)', lambda m: m.group(1) + t["title"] + m.group(2), html, count=1)
        html = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + t["desc"] + m.group(2), html, count=1)
        html = re.sub(r'(<meta name="keywords" content=")[^"]*(")', lambda m: m.group(1) + t["keywords"] + m.group(2), html, count=1)
        html = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + BASE + "/" + lang + "/" + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:title" content=")[^"]*(")', lambda m: m.group(1) + t["og_title"] + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:description" content=")[^"]*(")', lambda m: m.group(1) + t["og_desc"] + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:url" content=")[^"]*(")', lambda m: m.group(1) + BASE + "/" + lang + "/" + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:locale" content=")[^"]*(")', lambda m: m.group(1) + t["locale"] + m.group(2), html, count=1)

        html = html.replace(
            '"description": "%s",' % EN_PRODUCT_DESC,
            '"description": "%s",' % t["product_desc"],
            1
        )
        html = html.replace('"name": "%s",' % EN_HOWTO_NAME, '"name": "%s",' % t["howto_name"], 1)
        for en_s, loc_s in zip(EN_HOWTO_STEPS, t["howto_steps"]):
            html = html.replace('"text": "%s" }' % en_s, '"text": "%s" }' % loc_s, 1)

        html = html.replace('<body class="lang-en">', '<body class="lang-%s">' % lang, 1)

        # relative asset paths need ../ prefix from a subdirectory
        html = html.replace('href="favicon.ico"', 'href="../favicon.ico"')
        html = html.replace('href="apple-touch-icon.png"', 'href="../apple-touch-icon.png"')
        html = html.replace('src="cover-small.jpg"', 'src="../cover-small.jpg"')
        html = html.replace('srcset="cover-small.webp"', 'srcset="../cover-small.webp"')
        # terms.html/privacy.html exist in every language folder now (no ../ prefix needed)
        html = html.replace('href="icon-192.png"', 'href="../icon-192.png"')
        html = html.replace('href="manifest.json"', 'href="../manifest.json"')
        html = html.replace('href="assets/css/styles.css"', 'href="../assets/css/styles.css"')
        html = html.replace('src="assets/js/main.js"', 'src="../assets/js/main.js"')

    # FAQPage JSON-LD must reflect only this language's Q&A
    faq_pairs = extract_faq(template, lang)
    new_faq_block = faq_mainentity_json(faq_pairs)
    html = re.sub(r'"mainEntity": \[.*?\n        \]', lambda m: new_faq_block, html, count=1, flags=re.S)

    # Strip every other language's markup so the deployed page is single-language
    html = LangFilter(lang).filtered(html)

    out_path = "index.html" if is_en else os.path.join(lang, "index.html")
    if not is_en:
        os.makedirs(lang, exist_ok=True)
    with io.open(out_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("OK", out_path, len(html), "bytes")

print("Done:", ", ".join(ALL_LANGS))

# --- Legal pages (privacy.html, terms.html): same single-language-per-page approach ---
LANG_BAR_NAMES = {"en": "English", "ru": "Русский", "es": "Español", "hi": "हिन्दी",
                  "pt": "Português", "vi": "Tiếng Việt", "tr": "Türkçe", "id": "Indonesia",
                  "uz": "Oʻzbek", "kk": "Қазақша", "fr": "Français", "de": "Deutsch", "lo": "ລາວ",
                  "it": "Italiano", "ar": "العربية", "fa": "فارسی"}

LOCALE_MAP = {"en": "en_US", "ru": "ru_RU", "es": "es_ES", "hi": "hi_IN",
              "pt": "pt_BR", "vi": "vi_VN", "tr": "tr_TR", "id": "id_ID",
              "uz": "uz_UZ", "kk": "kk_KZ", "fr": "fr_FR", "de": "de_DE", "lo": "lo_LA",
              "it": "it_IT", "ar": "ar_AR", "fa": "fa_IR"}

for page in ["privacy", "terms"]:
    with io.open("%s_template.html" % page, "r", encoding="utf-8") as f:
        legal_template = f.read()

    lang_bar_re = re.compile(r'<div class="lang-bar">.*?</div>', re.S)
    script_re = re.compile(r'\s*<script>\s*function setPLang.*?</script>', re.S)

    for lang in ALL_LANGS:
        html = legal_template
        is_en = lang == "en"
        canon = BASE + ("/%s.html" % page if is_en else "/%s/%s.html" % (lang, page))

        dir_attr = ' dir="rtl"' if lang in RTL_LANGS else ''
        html = html.replace('<html lang="en">', '<html lang="%s"%s>' % (lang, dir_attr), 1)
        html = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + canon + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:url" content=")[^"]*(")', lambda m: m.group(1) + canon + m.group(2), html, count=1)
        html = re.sub(r'(<meta property="og:locale" content=")[^"]*(")', lambda m: m.group(1) + LOCALE_MAP[lang] + m.group(2), html, count=1)
        html = html.replace('<body class="lang-en">', '<body class="lang-%s">' % lang, 1)

        lang_bar_links = "\n".join(
            '        <a href="%s">%s</a>' % (
                BASE + ("/%s.html" % page if l == "en" else "/%s/%s.html" % (l, page)),
                LANG_BAR_NAMES[l]
            ) for l in ALL_LANGS
        )
        html = lang_bar_re.sub('<div class="lang-bar">\n%s\n    </div>' % lang_bar_links, html, count=1)
        html = script_re.sub('', html, count=1)

        html = LangFilter(lang).filtered(html)

        out_path = "%s.html" % page if is_en else os.path.join(lang, "%s.html" % page)
        if not is_en:
            os.makedirs(lang, exist_ok=True)
        with io.open(out_path, "w", encoding="utf-8", newline="\n") as f:
            f.write(html)
        print("OK", out_path, len(html), "bytes")

print("Done: privacy, terms")
