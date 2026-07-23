(function(){
    "use strict";
    const ZODIACS = [
      { id:"rat", nameEn:"Rat", nameRu:"Крыса", nameEs:"Rata", nameHi:"चूहा", namePt:"Rato", nameVi:"Chuột", nameTr:"Fare", nameId:"Tikus", nameUz:"Sichqon", nameKk:"Тышқан", nameFr:"Rat", nameDe:"Ratte", nameLo:"ໜູ", nameIt:"Topo", nameAr:"الجرذ", nameFa:"موش", element:"water", triangle:0 },
      { id:"ox", nameEn:"Ox", nameRu:"Бык", nameEs:"Buey", nameHi:"बैल", namePt:"Boi", nameVi:"Trâu", nameTr:"Öküz", nameId:"Kerbau", nameUz:"Ho'kiz", nameKk:"Өгіз", nameFr:"Buffle", nameDe:"Büffel", nameLo:"ງົວ", nameIt:"Bue", nameAr:"الثور", nameFa:"گاو", element:"earth", triangle:1 },
      { id:"tiger", nameEn:"Tiger", nameRu:"Тигр", nameEs:"Tigre", nameHi:"बाघ", namePt:"Tigre", nameVi:"Hổ", nameTr:"Kaplan", nameId:"Harimau", nameUz:"Yo'lbars", nameKk:"Жолбарыс", nameFr:"Tigre", nameDe:"Tiger", nameLo:"ເສືອ", nameIt:"Tigre", nameAr:"النمر", nameFa:"ببر", element:"wood", triangle:2 },
      { id:"rabbit", nameEn:"Rabbit", nameRu:"Кролик", nameEs:"Conejo", nameHi:"खरगोश", namePt:"Coelho", nameVi:"Thỏ", nameTr:"Tavşan", nameId:"Kelinci", nameUz:"Quyon", nameKk:"Қоян", nameFr:"Lapin", nameDe:"Hase", nameLo:"ກະຕ່າຍ", nameIt:"Coniglio", nameAr:"الأرنب", nameFa:"خرگوش", element:"wood", triangle:3 },
      { id:"dragon", nameEn:"Dragon", nameRu:"Дракон", nameEs:"Dragón", nameHi:"ड्रैगन", namePt:"Dragão", nameVi:"Rồng", nameTr:"Ejderha", nameId:"Naga", nameUz:"Ajdaho", nameKk:"Айдаһар", nameFr:"Dragon", nameDe:"Drache", nameLo:"ມັງກອນ", nameIt:"Drago", nameAr:"التنين", nameFa:"اژدها", element:"fire", triangle:0 },
      { id:"snake", nameEn:"Snake", nameRu:"Змея", nameEs:"Serpiente", nameHi:"साँप", namePt:"Serpente", nameVi:"Rắn", nameTr:"Yılan", nameId:"Ular", nameUz:"Ilon", nameKk:"Жылан", nameFr:"Serpent", nameDe:"Schlange", nameLo:"ງູ", nameIt:"Serpente", nameAr:"الأفعى", nameFa:"مار", element:"fire", triangle:1 },
      { id:"horse", nameEn:"Horse", nameRu:"Лошадь", nameEs:"Caballo", nameHi:"घोड़ा", namePt:"Cavalo", nameVi:"Ngựa", nameTr:"At", nameId:"Kuda", nameUz:"Ot", nameKk:"Жылқы", nameFr:"Cheval", nameDe:"Pferd", nameLo:"ມ້າ", nameIt:"Cavallo", nameAr:"الحصان", nameFa:"اسب", element:"fire", triangle:2 },
      { id:"goat", nameEn:"Goat", nameRu:"Коза", nameEs:"Cabra", nameHi:"बकरी", namePt:"Cabra", nameVi:"Dê", nameTr:"Keçi", nameId:"Kambing", nameUz:"Echki", nameKk:"Ешкі", nameFr:"Chèvre", nameDe:"Ziege", nameLo:"ແບ້", nameIt:"Capra", nameAr:"الماعز", nameFa:"بز", element:"earth", triangle:3 },
      { id:"monkey", nameEn:"Monkey", nameRu:"Обезьяна", nameEs:"Mono", nameHi:"बंदर", namePt:"Macaco", nameVi:"Khỉ", nameTr:"Maymun", nameId:"Monyet", nameUz:"Maymun", nameKk:"Мешін", nameFr:"Singe", nameDe:"Affe", nameLo:"ລິງ", nameIt:"Scimmia", nameAr:"القرد", nameFa:"میمون", element:"metal", triangle:0 },
      { id:"rooster", nameEn:"Rooster", nameRu:"Петух", nameEs:"Gallo", nameHi:"मुर्गा", namePt:"Galo", nameVi:"Gà", nameTr:"Horoz", nameId:"Ayam Jantan", nameUz:"Xo'roz", nameKk:"Тауық", nameFr:"Coq", nameDe:"Hahn", nameLo:"ໄກ່", nameIt:"Gallo", nameAr:"الديك", nameFa:"خروس", element:"metal", triangle:1 },
      { id:"dog", nameEn:"Dog", nameRu:"Собака", nameEs:"Perro", nameHi:"कुत्ता", namePt:"Cachorro", nameVi:"Chó", nameTr:"Köpek", nameId:"Anjing", nameUz:"It", nameKk:"Ит", nameFr:"Chien", nameDe:"Hund", nameLo:"ໝາ", nameIt:"Cane", nameAr:"الكلب", nameFa:"سگ", element:"earth", triangle:2 },
      { id:"pig", nameEn:"Pig", nameRu:"Свинья", nameEs:"Cerdo", nameHi:"सुअर", namePt:"Porco", nameVi:"Lợn", nameTr:"Domuz", nameId:"Babi", nameUz:"Cho'chqa", nameKk:"Доңыз", nameFr:"Cochon", nameDe:"Schwein", nameLo:"ໝູ", nameIt:"Maiale", nameAr:"الخنزير", nameFa:"خوک", element:"water", triangle:3 }
    ];
    const ELEMENT_NAMES = {
      water: { en: 'Water', ru: 'Вода', es: 'Agua', hi: 'जल', pt: 'Água', vi: 'Thủy', tr: 'Su', id: 'Air', uz: 'Suv', kk: 'Су', fr: 'Eau', de: 'Wasser', lo: 'ນ້ຳ', it: 'Acqua', ar: 'الماء', fa: 'آب' },
      earth: { en: 'Earth', ru: 'Земля', es: 'Tierra', hi: 'पृथ्वी', pt: 'Terra', vi: 'Thổ', tr: 'Toprak', id: 'Tanah', uz: 'Tuproq', kk: 'Жер', fr: 'Terre', de: 'Erde', lo: 'ດິນ', it: 'Terra', ar: 'التراب', fa: 'خاک' },
      wood: { en: 'Wood', ru: 'Дерево', es: 'Madera', hi: 'काष्ठ', pt: 'Madeira', vi: 'Mộc', tr: 'Ahşap', id: 'Kayu', uz: 'Yog\'och', kk: 'Ағаш', fr: 'Bois', de: 'Holz', lo: 'ໄມ້', it: 'Legno', ar: 'الخشب', fa: 'چوب' },
      fire: { en: 'Fire', ru: 'Огонь', es: 'Fuego', hi: 'अग्नि', pt: 'Fogo', vi: 'Hỏa', tr: 'Ateş', id: 'Api', uz: 'Olov', kk: 'От', fr: 'Feu', de: 'Feuer', lo: 'ໄຟ', it: 'Fuoco', ar: 'النار', fa: 'آتش' },
      metal: { en: 'Metal', ru: 'Металл', es: 'Metal', hi: 'धातु', pt: 'Metal', vi: 'Kim', tr: 'Metal', id: 'Logam', uz: 'Metall', kk: 'Металл', fr: 'Métal', de: 'Metall', lo: 'ໂລຫະ', it: 'Metallo', ar: 'المعدن', fa: 'فلز' }
    };
    const ARCHETYPES = [
      { id:"strategist", nameEn:"Strategist", nameRu:"Стратег", nameEs:"Estratega", nameHi:"रणनीतिकार", namePt:"Estrategista", nameVi:"Nhà Chiến Lược", nameTr:"Stratejist", nameId:"Ahli Strategi", nameUz:"Strateg", nameKk:"Стратег", nameFr:"Stratège", nameDe:"Stratege", nameLo:"ນັກຍຸດທະສາດ", nameIt:"Stratega", nameAr:"الاستراتيجي", nameFa:"استراتژیست", descEn:"Analytical, future-oriented planner", descRu:"Аналитик, планирует наперёд", descEs:"Planificador analítico", descHi:"विश्लेषणात्मक, भविष्य-उन्मुख योजनाकार", descPt:"Planejador analítico e voltado para o futuro", descVi:"Nhà hoạch định phân tích, hướng tới tương lai", descTr:"Analitik, geleceğe yönelik planlayıcı", descId:"Perencana analitis yang berorientasi masa depan", descUz:"Tahliliy, kelajakka yo'naltirilgan rejalashtiruvchi", descKk:"Талдамалы, болашаққа бағытталған жоспарлаушы", descFr:"Planificateur analytique, tourné vers l'avenir", descDe:"Analytischer, zukunftsorientierter Planer", descLo:"ນັກວາງແຜນທີ່ວິເຄາະ ແລະ ມອງອະນາຄົດ", descIt:"Pianificatore analitico e orientato al futuro", descAr:"مخطط تحليلي يتطلع نحو المستقبل", descFa:"برنامه‌ریز تحلیلی و آینده‌نگر" },
      { id:"diplomat", nameEn:"Diplomat", nameRu:"Дипломат", nameEs:"Diplomático", nameHi:"राजनयिक", namePt:"Diplomata", nameVi:"Nhà Ngoại Giao", nameTr:"Diplomat", nameId:"Diplomat", nameUz:"Diplomat", nameKk:"Дипломат", nameFr:"Diplomate", nameDe:"Diplomat", nameLo:"ນັກການທູດ", nameIt:"Diplomatico", nameAr:"الدبلوماسي", nameFa:"دیپلمات", descEn:"Seeks harmony, empathetic", descRu:"Ищет гармонию, эмпатичен", descEs:"Busca armonía, empático", descHi:"सद्भाव चाहता है, सहानुभूतिपूर्ण", descPt:"Busca harmonia, empático", descVi:"Tìm kiếm sự hài hòa, giàu lòng thấu cảm", descTr:"Uyum arayan, empatik", descId:"Mencari harmoni, empatik", descUz:"Uyg'unlikni izlovchi, hamdard", descKk:"Үйлесімділік іздейтін, эмпатиялы", descFr:"En quête d'harmonie, empathique", descDe:"Sucht Harmonie, einfühlsam", descLo:"ສະແຫວງຫາຄວາມກົມກຽວ, ມີເມດຕາ", descIt:"Cerca l'armonia, empatico", descAr:"يسعى للانسجام، متعاطف", descFa:"به‌دنبال هماهنگی، همدل" },
      { id:"explorer", nameEn:"Explorer", nameRu:"Искатель", nameEs:"Explorador", nameHi:"अन्वेषक", namePt:"Explorador", nameVi:"Nhà Thám Hiểm", nameTr:"Kaşif", nameId:"Penjelajah", nameUz:"Kashfiyotchi", nameKk:"Зерттеуші", nameFr:"Explorateur", nameDe:"Entdecker", nameLo:"ນັກສຳຫຼວດ", nameIt:"Esploratore", nameAr:"المستكشف", nameFa:"کاوشگر", descEn:"Spontaneous, loves novelty", descRu:"Спонтанный, любит новизну", descEs:"Espontáneo, ama la novedad", descHi:"सहज, नवीनता पसंद करता है", descPt:"Espontâneo, ama a novidade", descVi:"Tự phát, yêu thích sự mới mẻ", descTr:"Kendiliğinden, yeniliği sever", descId:"Spontan, menyukai hal baru", descUz:"O'zboshimcha, yangilikni sevadigan", descKk:"Өз бетінше, жаңалықты жақсы көретін", descFr:"Spontané, aime la nouveauté", descDe:"Spontan, liebt das Neue", descLo:"ເປັນເອງ, ມັກສິ່ງໃໝ່", descIt:"Spontaneo, ama la novità", descAr:"عفوي، يعشق التجديد", descFa:"خودجوش، عاشق تازگی" },
      { id:"guardian", nameEn:"Guardian", nameRu:"Хранитель", nameEs:"Guardián", nameHi:"संरक्षक", namePt:"Guardião", nameVi:"Người Bảo Hộ", nameTr:"Koruyucu", nameId:"Penjaga", nameUz:"Homiy", nameKk:"Қорғаушы", nameFr:"Gardien", nameDe:"Beschützer", nameLo:"ຜູ້ພິທັກ", nameIt:"Guardiano", nameAr:"الحارس", nameFa:"نگهبان", descEn:"Protective, loyal", descRu:"Заботливый, верный", descEs:"Protector, leal", descHi:"सुरक्षात्मक, वफादार", descPt:"Protetor, leal", descVi:"Bảo vệ, trung thành", descTr:"Koruyucu, sadık", descId:"Protektif, setia", descUz:"Himoyachi, sodiq", descKk:"Қорғаушы, адал", descFr:"Protecteur, loyal", descDe:"Beschützend, loyal", descLo:"ປົກປ້ອງ, ຊື່ສັດ", descIt:"Protettivo, leale", descAr:"حمائي ووفيّ", descFa:"حمایت‌گر و وفادار" },
      { id:"innovator", nameEn:"Innovator", nameRu:"Новатор", nameEs:"Innovador", nameHi:"अन्वेषक", namePt:"Inovador", nameVi:"Nhà Cải Tiến", nameTr:"Yenilikçi", nameId:"Inovator", nameUz:"Innovator", nameKk:"Жаңашыл", nameFr:"Innovateur", nameDe:"Innovator", nameLo:"ນັກປະດິດ", nameIt:"Innovatore", nameAr:"المبتكر", nameFa:"نوآور", descEn:"Creative, non-conformist", descRu:"Креативный, нестандартный", descEs:"Creativo, inconformista", descHi:"रचनात्मक, गैर-अनुरूपतावादी", descPt:"Criativo, inconformista", descVi:"Sáng tạo, không theo khuôn mẫu", descTr:"Yaratıcı, kurallara uymayan", descId:"Kreatif, tidak konformis", descUz:"Ijodkor, andozaga bo'ysunmaydigan", descKk:"Шығармашыл, стандартқа сыймайтын", descFr:"Créatif, non conformiste", descDe:"Kreativ, unkonventionell", descLo:"ສ້າງສັນ, ບໍ່ຕິດຮູບແບບ", descIt:"Creativo, anticonformista", descAr:"مبدع وغير تقليدي", descFa:"خلاق و غیرمتعارف" },
      { id:"stabilizer", nameEn:"Stabilizer", nameRu:"Стабилизатор", nameEs:"Estabilizador", nameHi:"स्थिरकर्ता", namePt:"Estabilizador", nameVi:"Người Ổn Định", nameTr:"Dengeleyici", nameId:"Penstabil", nameUz:"Barqarorlashtiruvchi", nameKk:"Тұрақтандырушы", nameFr:"Stabilisateur", nameDe:"Stabilisator", nameLo:"ຜູ້ຮັກສາສະຖຽນລະພາບ", nameIt:"Stabilizzatore", nameAr:"الموازن", nameFa:"تثبیت‌کننده", descEn:"Practical, detail-oriented", descRu:"Практичный, внимательный", descEs:"Práctico, detallista", descHi:"व्यावहारिक, विस्तार-उन्मुख", descPt:"Prático, atento aos detalhes", descVi:"Thực tế, chú trọng chi tiết", descTr:"Pratik, detaylara önem veren", descId:"Praktis, teliti pada detail", descUz:"Amaliyotchi, mayda-chuydaga e'tiborli", descKk:"Практикалық, ұсақ-түйекке мұқият", descFr:"Pratique, soucieux du détail", descDe:"Praktisch, detailorientiert", descLo:"ພາກປະຕິບັດ, ເອົາໃຈໃສ່ລາຍລະອຽດ", descIt:"Pratico, attento ai dettagli", descAr:"عملي ومهتم بالتفاصيل", descFa:"عملی و ریزبین" },
      { id:"visionary", nameEn:"Visionary", nameRu:"Визионер", nameEs:"Visionario", nameHi:"दूरदर्शी", namePt:"Visionário", nameVi:"Nhà Tiên Phong", nameTr:"Vizyoner", nameId:"Visioner", nameUz:"Vizioner", nameKk:"Көрегенді", nameFr:"Visionnaire", nameDe:"Visionär", nameLo:"ນັກວິໄສທັດ", nameIt:"Visionario", nameAr:"صاحب الرؤية", nameFa:"آینده‌نگر", descEn:"Big picture, inspirational", descRu:"Видит общую картину", descEs:"Visionario, inspirador", descHi:"बड़ी तस्वीर, प्रेरणादायक", descPt:"Visão de conjunto, inspirador", descVi:"Nhìn xa trông rộng, truyền cảm hứng", descTr:"Büyük resmi görür, ilham verici", descId:"Berpikir besar, menginspirasi", descUz:"Katta rasmni ko'radigan, ilhomlantiruvchi", descKk:"Үлкен суретті көретін, шабыттандырушы", descFr:"Vision d'ensemble, inspirant", descDe:"Blick fürs Ganze, inspirierend", descLo:"ເຫັນພາບລວມ, ໃຫ້ແຮງບັນດານໃຈ", descIt:"Visione d'insieme, fonte d'ispirazione", descAr:"ينظر للصورة الكاملة، ملهم", descFa:"دید کلان، الهام‌بخش" },
      { id:"connector", nameEn:"Connector", nameRu:"Связной", nameEs:"Conector", nameHi:"संयोजक", namePt:"Conector", nameVi:"Người Kết Nối", nameTr:"Bağlayıcı", nameId:"Penghubung", nameUz:"Bog'lovchi", nameKk:"Байланыстырушы", nameFr:"Connecteur", nameDe:"Verbinder", nameLo:"ຜູ້ເຊື່ອມຕໍ່", nameIt:"Connettore", nameAr:"الرابط الاجتماعي", nameFa:"ارتباط‌ساز", descEn:"Social, builds networks", descRu:"Общительный, создаёт связи", descEs:"Social, construye redes", descHi:"सामाजिक, नेटवर्क बनाता है", descPt:"Sociável, constrói redes", descVi:"Hòa đồng, xây dựng mạng lưới quan hệ", descTr:"Sosyal, ağ kurar", descId:"Sosial, membangun jaringan", descUz:"Ijtimoiy, aloqalar tarmog'ini quruvchi", descKk:"Қоғамдық, желі құрушы", descFr:"Sociable, tisse des réseaux", descDe:"Gesellig, knüpft Netzwerke", descLo:"ເຂົ້າສັງຄົມ, ສ້າງເຄືອຂ່າຍ", descIt:"Socievole, crea reti di relazioni", descAr:"اجتماعي، يبني شبكات العلاقات", descFa:"اجتماعی، شبکه‌ساز" }
    ];
    const zodiacToArchetype = { rat:0, ox:5, tiger:2, rabbit:1, dragon:4, snake:6, horse:3, goat:7, monkey:0, rooster:5, dog:1, pig:7 };
    const QUESTIONS = [
      { textEn:"When facing a difficult decision, you typically:", textRu:"Когда перед вами сложный выбор, вы обычно:", textEs:"Ante una decisión difícil, normalmente:", textHi:"जब एक कठिन निर्णय का सामना करना पड़ता है, तो आप आमतौर पर:",
        textPt:"Ao enfrentar uma decisão difícil, você normalmente:", textVi:"Khi đối mặt với một quyết định khó khăn, bạn thường:", textTr:"Zor bir kararla karşılaştığınızda genellikle:", textId:"Saat menghadapi keputusan sulit, Anda biasanya:", textUz:"Qiyin qarorga duch kelganingizda, odatda siz:", textKk:"Қиын шешім қабылдау керек болғанда, әдетте сіз:", textFr:"Face à une décision difficile, vous avez tendance à :", textDe:"Bei einer schwierigen Entscheidung tendieren Sie normalerweise dazu:", textLo:"ເມື່ອປະເຊີນກັບການຕັດສິນໃຈທີ່ຍາກ, ໂດຍທົ່ວໄປທ່ານ:", textIt:"Di fronte a una decisione difficile, di solito:", textAr:"عندما تواجه قرارًا صعبًا، عادةً:", textFa:"هنگام روبه‌رو شدن با یک تصمیم دشوار، معمولاً:",
        optionsEn:["Analyze pros and cons","Trust your gut","Consult friends","Avoid deciding"],
        optionsRu:["Анализирую за и против","Доверяю интуиции","Советуюсь с друзьями","Избегаю решения"],
        optionsEs:["Analizo pros y contras","Confío en mi instinto","Consulto amigos","Evito decidir"],
        optionsHi:["फायदे और नुकसान का विश्लेषण करें","अपने अंतर्ज्ञान पर भरोसा करें","दोस्तों से सलाह लें","निर्णय लेने से बचें"],
        optionsPt:["Analisa prós e contras","Confia no seu instinto","Consulta amigos","Evita decidir"],
        optionsVi:["Phân tích ưu và nhược điểm","Tin vào trực giác","Hỏi ý kiến bạn bè","Tránh né việc quyết định"],
        optionsTr:["Artıları ve eksileri analiz edersiniz","İçgüdünüze güvenirsiniz","Arkadaşlarınıza danışırsınız","Karar vermekten kaçınırsınız"],
        optionsId:["Menganalisis untung dan rugi","Mempercayai insting Anda","Berkonsultasi dengan teman","Menghindari untuk memutuskan"],
        optionsUz:["Ijobiy va salbiy tomonlarni tahlil qilasiz","O'z ichki hissiyotingizga ishonasiz","Do'stlaringiz bilan maslahatlashasiz","Qaror qabul qilishdan qochasiz"],
        optionsKk:["Артықшылықтары мен кемшіліктерін талдайсыз","Ішкі сезіміңізге сенесіз","Достарыңызбен ақылдасасыз","Шешім қабылдаудан аулақ боласыз"],
        optionsFr:["Analyser le pour et le contre","Faire confiance à votre instinct","Consulter des amis","Éviter de décider"],
        optionsDe:["Vor- und Nachteile abzuwägen","Ihrem Bauchgefühl zu vertrauen","Freunde um Rat zu fragen","Die Entscheidung zu vermeiden"],
        optionsLo:["ວິເຄາະຂໍ້ດີ ແລະ ຂໍ້ເສຍ","ເຊື່ອໃນສັນຊາດຕະຍານຂອງທ່ານ","ປຶກສາໝູ່ເພື່ອນ","ຫຼີກລ່ຽງການຕັດສິນໃຈ"],
        optionsIt:["Analizzo pro e contro","Mi fido dell'istinto","Chiedo consiglio agli amici","Evito di decidere"],
        optionsAr:["أحلّل الإيجابيات والسلبيات","أثق بحدسي","أستشير الأصدقاء","أتجنّب اتخاذ القرار"],
        optionsFa:["مزایا و معایب را تحلیل می‌کنم","به شهودم اعتماد می‌کنم","با دوستانم مشورت می‌کنم","از تصمیم‌گیری اجتناب می‌کنم"],
        weights:[[0,0,2,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[2,0,0,0,0,0,0,0,0,0,0,0]] },
      { textEn:"How do you react to sudden changes?", textRu:"Как вы реагируете на внезапные изменения?", textEs:"¿Cómo reaccionas ante cambios repentinos?", textHi:"अचानक परिवर्तनों पर आप कैसे प्रतिक्रिया करते हैं?",
        textPt:"Como você reage a mudanças repentinas?", textVi:"Bạn phản ứng thế nào trước những thay đổi đột ngột?", textTr:"Ani değişikliklere nasıl tepki verirsiniz?", textId:"Bagaimana Anda bereaksi terhadap perubahan mendadak?", textUz:"To'satdan o'zgarishlarga qanday munosabat bildirasiz?", textKk:"Кенеттен болған өзгерістерге қалай қарайсыз?", textFr:"Comment réagissez-vous aux changements soudains ?", textDe:"Wie reagieren Sie auf plötzliche Veränderungen?", textLo:"ທ່ານມີປະຕິກິລິຍາແນວໃດຕໍ່ການປ່ຽນແປງກະທັນຫັນ?", textIt:"Come reagisci ai cambiamenti improvvisi?", textAr:"كيف تتفاعل مع التغيرات المفاجئة؟", textFa:"در برابر تغییرات ناگهانی چگونه واکنش نشان می‌دهید؟",
        optionsEn:["Embrace them","Get stressed but adapt","Prefer structure","Go with the flow"],
        optionsRu:["Принимаю с энтузиазмом","Стресс, но адаптируюсь","Предпочитаю структуру","Плыву по течению"],
        optionsEs:["Los acepto","Me estreso pero me adapto","Prefiero estructura","Me dejo llevar"],
        optionsHi:["उन्हें गले लगाओ","तनावग्रस्त हो जाओ लेकिन अनुकूलन करो","संरचना पसंद करो","प्रवाह के साथ चलो"],
        optionsPt:["Abraça-as","Fica estressado mas se adapta","Prefere estrutura","Vai com o fluxo"],
        optionsVi:["Đón nhận chúng","Căng thẳng nhưng vẫn thích nghi","Thích sự ổn định, có cấu trúc","Thuận theo dòng chảy"],
        optionsTr:["Onları kucaklarsınız","Strese girer ama uyum sağlarsınız","Yapıyı tercih edersiniz","Akışına bırakırsınız"],
        optionsId:["Menerimanya dengan senang hati","Stres tapi beradaptasi","Lebih suka struktur","Mengikuti alur"],
        optionsUz:["Ularni quvonch bilan qabul qilasiz","Stress his qilasiz, lekin moslashasiz","Tartibni afzal ko'rasiz","Oqim bilan ketasiz"],
        optionsKk:["Оларды қуана қабылдайсыз","Стресс сезінесіз, бірақ бейімделесіз","Тәртіпті жақсы көресіз","Ағыспен кетесіз"],
        optionsFr:["Vous les accueillez","Vous êtes stressé mais vous vous adaptez","Vous préférez la structure","Vous vous laissez porter"],
        optionsDe:["Sie begrüßen sie","Sie sind gestresst, passen sich aber an","Sie bevorzugen Struktur","Sie lassen sich treiben"],
        optionsLo:["ຍອມຮັບມັນ","ຄຽດແຕ່ປັບຕົວ","ມັກຄວາມເປັນລະບຽບ","ໄຫຼໄປຕາມສະຖານະການ"],
        optionsIt:["Li accolgo con entusiasmo","Mi stresso ma mi adatto","Preferisco la struttura","Mi lascio trasportare"],
        optionsAr:["أتقبّلها بحماس","أشعر بالتوتر لكنني أتكيّف","أفضّل التنظيم","أنساق مع التيار"],
        optionsFa:["با آغوش باز می‌پذیرم","استرس می‌گیرم اما سازگار می‌شوم","نظم و ساختار را ترجیح می‌دهم","با جریان پیش می‌روم"],
        weights:[[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,2,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"In a team project, you usually:", textRu:"В командном проекте вы обычно:", textEs:"En un proyecto de equipo, normalmente:", textHi:"एक टीम प्रोजेक्ट में, आप आमतौर पर:",
        textPt:"Em um projeto em equipe, você geralmente:", textVi:"Trong một dự án nhóm, bạn thường:", textTr:"Bir ekip projesinde genellikle:", textId:"Dalam proyek tim, Anda biasanya:", textUz:"Jamoaviy loyihada, odatda siz:", textKk:"Топтық жобада, әдетте сіз:", textFr:"Dans un projet d'équipe, vous avez tendance à :", textDe:"Bei einem Teamprojekt übernehmen Sie meist:", textLo:"ໃນໂຄງການເປັນທີມ, ໂດຍທົ່ວໄປທ່ານ:", textIt:"In un progetto di gruppo, di solito:", textAr:"في مشروع جماعي، عادةً:", textFa:"در یک پروژهٔ گروهی، معمولاً:",
        optionsEn:["Take the lead","Support others","Generate ideas","Mediate"],
        optionsRu:["Беру на себя лидерство","Поддерживаю других","Генерирую идеи","Выступаю посредником"],
        optionsEs:["Tomo el liderazgo","Apoyo a otros","Genero ideas","Medio"],
        optionsHi:["नेतृत्व लें","दूसरों का समर्थन करें","विचार उत्पन्न करें","मध्यस्थता करें"],
        optionsPt:["Assume a liderança","Apoia os outros","Gera ideias","Faz a mediação"],
        optionsVi:["Đứng ra dẫn dắt","Hỗ trợ người khác","Đưa ra ý tưởng","Làm người hòa giải"],
        optionsTr:["Liderliği üstlenirsiniz","Diğerlerini desteklersiniz","Fikir üretirsiniz","Arabuluculuk yaparsınız"],
        optionsId:["Mengambil peran pemimpin","Mendukung orang lain","Menghasilkan ide","Menjadi penengah"],
        optionsUz:["Yetakchilikni o'z zimmangizga olasiz","Boshqalarni qo'llab-quvvatlaysiz","G'oyalar yaratasiz","Yarashtiruvchi bo'lasiz"],
        optionsKk:["Жетекшілікті өз мойныңызға аласыз","Басқаларды қолдайсыз","Идеялар тудырасыз","Дауласушыларды татуластырасыз"],
        optionsFr:["Prendre les rênes","Soutenir les autres","Générer des idées","Faire la médiation"],
        optionsDe:["Die Führung","Unterstützung anderer","Die Ideenfindung","Die Vermittlerrolle"],
        optionsLo:["ຮັບບົດບາດເປັນຜູ້ນຳ","ສະໜັບສະໜູນຄົນອື່ນ","ສ້າງໄອເດຍ","ເປັນຜູ້ໄກ່ເກ່ຍ"],
        optionsIt:["Prendo il comando","Sostengo gli altri","Genero idee","Faccio da mediatore"],
        optionsAr:["أتولّى القيادة","أدعم الآخرين","أولّد الأفكار","أتوسّط بين الأطراف"],
        optionsFa:["رهبری را بر عهده می‌گیرم","از دیگران حمایت می‌کنم","ایده تولید می‌کنم","میانجی‌گری می‌کنم"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"Your ideal weekend is:", textRu:"Ваши идеальные выходные:", textEs:"Tu fin de semana ideal es:", textHi:"आपका आदर्श सप्ताहांत है:",
        textPt:"Seu fim de semana ideal é:", textVi:"Cuối tuần lý tưởng của bạn là:", textTr:"İdeal hafta sonunuz:", textId:"Akhir pekan ideal Anda adalah:", textUz:"Sizning ideal dam olish kuningiz:", textKk:"Сіздің тамаша демалыс күніңіз:", textFr:"Votre week-end idéal est :", textDe:"Ihr ideales Wochenende ist:", textLo:"ທ້າຍອາທິດທີ່ເໝາະສົມຂອງທ່ານແມ່ນ:", textIt:"Il tuo weekend ideale è:", textAr:"عطلة نهاية الأسبوع المثالية بالنسبة لك هي:", textFa:"آخر هفتهٔ ایده‌آل شما این‌گونه است:",
        optionsEn:["Adventure","Relaxing at home","Socializing","Personal project"],
        optionsRu:["Приключения","Отдых дома","Общение с друзьями","Личный проект"],
        optionsEs:["Aventura","Relajarme en casa","Socializar","Proyecto personal"],
        optionsHi:["साहसिक कार्य","घर पर आराम करना","मेलजोल","व्यक्तिगत परियोजना"],
        optionsPt:["Aventura","Relaxar em casa","Socializar","Projeto pessoal"],
        optionsVi:["Phiêu lưu","Thư giãn ở nhà","Giao lưu bạn bè","Dự án cá nhân"],
        optionsTr:["Macera","Evde dinlenmek","Sosyalleşmek","Kişisel proje"],
        optionsId:["Petualangan","Bersantai di rumah","Bersosialisasi","Proyek pribadi"],
        optionsUz:["Sarguzasht","Uyda dam olish","Muloqot qilish","Shaxsiy loyiha"],
        optionsKk:["Шытырман оқиға","Үйде демалу","Қарым-қатынас жасау","Жеке жоба"],
        optionsFr:["Aventure","Se détendre à la maison","Socialiser","Projet personnel"],
        optionsDe:["Abenteuer","Zuhause entspannen","Geselligkeit","Persönliches Projekt"],
        optionsLo:["ການຜະຈົນໄພ","ພັກຜ່ອນຢູ່ເຮືອນ","ພົບປະສັງສັນ","ໂຄງການສ່ວນຕົວ"],
        optionsIt:["Avventura","Relax a casa","Stare con gli amici","Un progetto personale"],
        optionsAr:["المغامرة","الاسترخاء في المنزل","التواصل الاجتماعي","مشروع شخصي"],
        optionsFa:["ماجراجویی","استراحت در خانه","معاشرت با دیگران","پروژه‌ای شخصی"],
        weights:[[0,0,2,0,0,0,2,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0],[0,2,0,0,0,2,0,0,0,0,0,0]] },
      { textEn:"When someone criticizes you, you:", textRu:"Когда вас критикуют, вы:", textEs:"Cuando te critican, tú:", textHi:"जब कोई आपकी आलोचना करता है, तो आप:",
        textPt:"Quando alguém te critica, você:", textVi:"Khi ai đó chỉ trích bạn, bạn:", textTr:"Biri sizi eleştirdiğinde:", textId:"Ketika seseorang mengkritik Anda, Anda:", textUz:"Kimdir sizni tanqid qilganda, siz:", textKk:"Біреу сізді сынағанда, сіз:", textFr:"Quand quelqu'un vous critique, vous :", textDe:"Wenn Sie jemand kritisiert, Sie:", textLo:"ເມື່ອມີຄົນຕິຊົມທ່ານ, ທ່ານ:", textIt:"Quando qualcuno ti critica, tu:", textAr:"عندما ينتقدك أحدهم، فإنك:", textFa:"وقتی کسی از شما انتقاد می‌کند:",
        optionsEn:["Analyze if it's fair","Feel hurt but learn","Defend yourself","Ignore it"],
        optionsRu:["Анализирую справедливость","Обижаюсь, но учусь","Защищаюсь","Игнорирую"],
        optionsEs:["Analizo si es justo","Me duele pero aprendo","Me defiendo","Lo ignoro"],
        optionsHi:["विश्लेषण करें कि क्या यह उचित है","आहत महसूस करें लेकिन सीखें","अपना बचाव करें","अनदेखा करें"],
        optionsPt:["Analisa se é justo","Se magoa mas aprende","Se defende","Ignora"],
        optionsVi:["Phân tích xem có công bằng không","Cảm thấy tổn thương nhưng rút kinh nghiệm","Tự bảo vệ mình","Phớt lờ nó"],
        optionsTr:["Adil olup olmadığını değerlendirirsiniz","İncinirsiniz ama ders çıkarırsınız","Kendinizi savunursunuz","Görmezden gelirsiniz"],
        optionsId:["Menganalisis apakah itu adil","Merasa terluka tapi belajar","Membela diri","Mengabaikannya"],
        optionsUz:["Uning adolatli ekanligini tahlil qilasiz","Xafa bo'lasiz, lekin saboq olasiz","O'zingizni himoya qilasiz","E'tiborsiz qoldirasiz"],
        optionsKk:["Оның әділ екенін талдайсыз","Ренжисіз, бірақ сабақ аласыз","Өзіңізді қорғайсыз","Елемейсіз"],
        optionsFr:["Analysez si c'est juste","Vous sentez blessé mais apprenez","Vous défendez","Ignorez"],
        optionsDe:["Prüfen, ob es fair ist","Fühlen sich verletzt, lernen aber daraus","Verteidigen sich","Ignorieren es"],
        optionsLo:["ວິເຄາະວ່າມັນຍຸຕິທຳບໍ","ຮູ້ສຶກເຈັບປວດແຕ່ຮຽນຮູ້","ປົກປ້ອງຕົນເອງ","ບໍ່ສົນໃຈ"],
        optionsIt:["Valuto se è giusta","Mi sento ferito ma imparo","Mi difendo","La ignoro"],
        optionsAr:["أحلّل ما إذا كان الانتقاد منصفًا","أشعر بالانزعاج لكنني أتعلّم","أدافع عن نفسي","أتجاهله"],
        optionsFa:["بررسی می‌کنم که آیا منصفانه است","دلخور می‌شوم اما درس می‌گیرم","از خودم دفاع می‌کنم","نادیده می‌گیرم"],
        weights:[[0,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[0,0,2,0,0,0,2,0,0,0,0,0],[2,0,0,0,0,0,0,0,0,2,0,0]] },
      { textEn:"Your communication style is:", textRu:"Ваш стиль общения:", textEs:"Tu estilo de comunicación es:", textHi:"आपकी संचार शैली है:",
        textPt:"Seu estilo de comunicação é:", textVi:"Phong cách giao tiếp của bạn là:", textTr:"İletişim tarzınız:", textId:"Gaya komunikasi Anda adalah:", textUz:"Sizning muloqot uslubingiz:", textKk:"Сіздің қарым-қатынас стиліңіз:", textFr:"Votre style de communication est :", textDe:"Ihr Kommunikationsstil ist:", textLo:"ຮູບແບບການສື່ສານຂອງທ່ານແມ່ນ:", textIt:"Il tuo stile di comunicazione è:", textAr:"أسلوبك في التواصل هو:", textFa:"سبک ارتباطی شما این‌گونه است:",
        optionsEn:["Direct","Warm","Humorous","Reserved"],
        optionsRu:["Прямой","Тёплый","С юмором","Сдержанный"],
        optionsEs:["Directo","Cálido","Humorístico","Reservado"],
        optionsHi:["प्रत्यक्ष","गर्मजोशी","हास्यपूर्ण","आरक्षित"],
        optionsPt:["Direto","Caloroso","Bem-humorado","Reservado"],
        optionsVi:["Thẳng thắn","Ấm áp","Hài hước","Kín đáo"],
        optionsTr:["Doğrudan","Sıcak","Esprili","Çekingen"],
        optionsId:["Langsung","Hangat","Humoris","Tertutup"],
        optionsUz:["To'g'ridan-to'g'ri","Iliq","Hazilkash","Yopiq"],
        optionsKk:["Тікелей","Жылы","Әзілқой","Тұйық"],
        optionsFr:["Direct","Chaleureux","Humoristique","Réservé"],
        optionsDe:["Direkt","Warmherzig","Humorvoll","Zurückhaltend"],
        optionsLo:["ກົງໄປກົງມາ","ອົບອຸ່ນ","ມີອາລົມຂັນ","ສະຫງວນ"],
        optionsIt:["Diretto","Caloroso","Scherzoso","Riservato"],
        optionsAr:["مباشر","دافئ","فكاهي","متحفّظ"],
        optionsFa:["مستقیم","گرم","بامزه","کم‌حرف"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[0,0,0,0,0,0,0,0,2,0,2,0],[2,0,0,0,0,2,0,0,0,0,0,0]] },
      { textEn:"What drives you most?", textRu:"Что вами движет больше всего?", textEs:"¿Qué te motiva más?", textHi:"आपको सबसे अधिक क्या प्रेरित करता है?",
        textPt:"O que mais te motiva?", textVi:"Điều gì thúc đẩy bạn nhiều nhất?", textTr:"Sizi en çok ne motive eder?", textId:"Apa yang paling memotivasi Anda?", textUz:"Sizni eng ko'p nima undaydi?", textKk:"Сізді ең көп не итермелейді?", textFr:"Qu'est-ce qui vous motive le plus ?", textDe:"Was motiviert Sie am meisten?", textLo:"ສິ່ງໃດກະຕຸ້ນທ່ານຫຼາຍທີ່ສຸດ?", textIt:"Cosa ti motiva di più?", textAr:"ما الذي يحفّزك أكثر؟", textFa:"چه چیزی بیشترین انگیزه را به شما می‌دهد؟",
        optionsEn:["Success","Security","Freedom","Helping others"],
        optionsRu:["Успех","Безопасность","Свобода","Помощь другим"],
        optionsEs:["Éxito","Seguridad","Libertad","Ayudar a otros"],
        optionsHi:["सफलता","सुरक्षा","स्वतंत्रता","दूसरों की मदद करना"],
        optionsPt:["Sucesso","Segurança","Liberdade","Ajudar os outros"],
        optionsVi:["Thành công","An toàn","Tự do","Giúp đỡ người khác"],
        optionsTr:["Başarı","Güvenlik","Özgürlük","Başkalarına yardım etmek"],
        optionsId:["Kesuksesan","Keamanan","Kebebasan","Membantu orang lain"],
        optionsUz:["Muvaffaqiyat","Xavfsizlik","Erkinlik","Boshqalarga yordam berish"],
        optionsKk:["Табыс","Қауіпсіздік","Еркіндік","Басқаларға көмектесу"],
        optionsFr:["Le succès","La sécurité","La liberté","Aider les autres"],
        optionsDe:["Erfolg","Sicherheit","Freiheit","Anderen zu helfen"],
        optionsLo:["ຄວາມສຳເລັດ","ຄວາມປອດໄພ","ອິດສະຫຼະ","ການຊ່ວຍເຫຼືອຄົນອື່ນ"],
        optionsIt:["Il successo","La sicurezza","La libertà","Aiutare gli altri"],
        optionsAr:["النجاح","الأمان","الحرية","مساعدة الآخرين"],
        optionsFa:["موفقیت","امنیت","آزادی","کمک به دیگران"],
        weights:[[0,0,0,0,2,0,0,0,0,0,0,0],[2,0,0,0,0,0,0,2,0,0,0,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,2,0]] },
      { textEn:"In a conflict, you tend to:", textRu:"В конфликте вы склонны:", textEs:"En un conflicto, tiendes a:", textHi:"एक संघर्ष में, आप की प्रवृत्ति होती है:",
        textPt:"Em um conflito, você tende a:", textVi:"Trong một cuộc xung đột, bạn có xu hướng:", textTr:"Bir çatışmada genellikle:", textId:"Dalam konflik, Anda cenderung:", textUz:"Ziddiyatda, siz odatda:", textKk:"Жанжалда, сіз әдетте:", textFr:"Dans un conflit, vous avez tendance à :", textDe:"In einem Konflikt neigen Sie dazu:", textLo:"ໃນຄວາມຂັດແຍ້ງ, ທ່ານມັກຈະ:", textIt:"In un conflitto, tendi a:", textAr:"في النزاع، تميل إلى:", textFa:"در یک تعارض، معمولاً تمایل دارید:",
        optionsEn:["Confront directly","Seek compromise","Avoid the issue","Use humor"],
        optionsRu:["Прямо конфронтировать","Искать компромисс","Избегать","Использовать юмор"],
        optionsEs:["Confrontar directamente","Buscar compromiso","Evitar el problema","Usar humor"],
        optionsHi:["सीधे सामना करें","समझौता चाहें","मुद्दे से बचें","हास्य का प्रयोग करें"],
        optionsPt:["Confrontar diretamente","Buscar um meio-termo","Evitar o problema","Usar humor"],
        optionsVi:["Đối đầu trực tiếp","Tìm kiếm sự thỏa hiệp","Tránh né vấn đề","Dùng sự hài hước"],
        optionsTr:["Doğrudan yüzleşirsiniz","Uzlaşma ararsınız","Konudan kaçınırsınız","Mizah kullanırsınız"],
        optionsId:["Menghadapi secara langsung","Mencari kompromi","Menghindari masalah","Menggunakan humor"],
        optionsUz:["To'g'ridan-to'g'ri qarshi turasiz","Murosani izlaysiz","Muammodan qochasiz","Hazil ishlatasiz"],
        optionsKk:["Тікелей қарсы тұрасыз","Ымыраны іздейсіз","Мәселеден аулақ боласыз","Әзіл қолданасыз"],
        optionsFr:["Confronter directement","Chercher un compromis","Éviter le problème","Utiliser l'humour"],
        optionsDe:["Direkt zu konfrontieren","Einen Kompromiss zu suchen","Das Thema zu meiden","Humor einzusetzen"],
        optionsLo:["ປະເຊີນໜ້າໂດຍກົງ","ຊອກຫາທາງປະນີປະນອມ","ຫຼີກລ່ຽງບັນຫາ","ໃຊ້ອາລົມຂັນ"],
        optionsIt:["Affrontarlo direttamente","Cercare un compromesso","Evitare il problema","Usare l'umorismo"],
        optionsAr:["المواجهة المباشرة","البحث عن حل وسط","تجنّب المشكلة","استخدام الفكاهة"],
        optionsFa:["مستقیم روبه‌رو می‌شوید","به‌دنبال مصالحه هستید","از موضوع اجتناب می‌کنید","از شوخ‌طبعی استفاده می‌کنید"],
        weights:[[0,0,2,0,0,0,0,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2],[2,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0]] },
      { textEn:"How do you recharge energy?", textRu:"Как вы восстанавливаете энергию?", textEs:"¿Cómo recargas energía?", textHi:"आप ऊर्जा कैसे पुनः प्राप्त करते हैं?",
        textPt:"Como você recarrega energia?", textVi:"Bạn nạp lại năng lượng bằng cách nào?", textTr:"Enerjinizi nasıl yenilersiniz?", textId:"Bagaimana Anda mengisi ulang energi?", textUz:"Energiyangizni qanday tiklaysiz?", textKk:"Энергияңызды қалай толтырасыз?", textFr:"Comment rechargez-vous votre énergie ?", textDe:"Wie tanken Sie neue Energie?", textLo:"ທ່ານຟື້ນຟູພະລັງງານແນວໃດ?", textIt:"Come ricarichi le energie?", textAr:"كيف تستعيد طاقتك؟", textFa:"چگونه انرژی خود را بازیابی می‌کنید؟",
        optionsEn:["Being alone","Socializing","Physical activity","Creative hobbies"],
        optionsRu:["В одиночестве","Общаясь с людьми","Физическая активность","Творчество"],
        optionsEs:["Estando solo","Socializando","Actividad física","Pasatiempos creativos"],
        optionsHi:["अकेले रहना","मेलजोल","शारीरिक गतिविधि","रचनात्मक शौक"],
        optionsPt:["Ficando sozinho","Socializando","Atividade física","Hobbies criativos"],
        optionsVi:["Ở một mình","Giao lưu bạn bè","Hoạt động thể chất","Sở thích sáng tạo"],
        optionsTr:["Yalnız kalarak","Sosyalleşerek","Fiziksel aktiviteyle","Yaratıcı hobilerle"],
        optionsId:["Menyendiri","Bersosialisasi","Aktivitas fisik","Hobi kreatif"],
        optionsUz:["Yolg'iz qolib","Muloqot qilib","Jismoniy faoliyat bilan","Ijodiy mashg'ulotlar bilan"],
        optionsKk:["Жалғыз қалып","Қарым-қатынас жасап","Дене белсенділігімен","Шығармашылық хоббилермен"],
        optionsFr:["En étant seul","En socialisant","Par une activité physique","Par des loisirs créatifs"],
        optionsDe:["Alleinsein","Geselligkeit","Körperliche Aktivität","Kreative Hobbys"],
        optionsLo:["ຢູ່ຄົນດຽວ","ພົບປະສັງສັນ","ກິດຈະກຳທາງກາຍະພາບ","ງານອະດິເລກທີ່ສ້າງສັນ"],
        optionsIt:["Stando da solo","Stando con altre persone","Con attività fisica","Con hobby creativi"],
        optionsAr:["بالبقاء وحيدًا","بالتواصل الاجتماعي","بالنشاط البدني","بالهوايات الإبداعية"],
        optionsFa:["با تنها بودن","با معاشرت","با فعالیت بدنی","با سرگرمی‌های خلاقانه"],
        weights:[[2,0,0,0,0,2,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,2,0,2,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] },
      { textEn:"Your approach to rules is:", textRu:"Ваше отношение к правилам:", textEs:"Tu actitud hacia las reglas es:", textHi:"नियमों के प्रति आपका दृष्टिकोण है:",
        textPt:"Sua abordagem às regras é:", textVi:"Cách bạn tiếp cận các quy tắc là:", textTr:"Kurallara yaklaşımınız:", textId:"Pendekatan Anda terhadap aturan adalah:", textUz:"Qoidalarga munosabatingiz:", textKk:"Ережелерге деген көзқарасыңыз:", textFr:"Votre approche des règles est :", textDe:"Ihr Umgang mit Regeln ist:", textLo:"ວິທີການຂອງທ່ານຕໍ່ກົດລະບຽບແມ່ນ:", textIt:"Il tuo approccio alle regole è:", textAr:"موقفك تجاه القواعد هو:", textFa:"رویکرد شما نسبت به قوانین این‌گونه است:",
        optionsEn:["Follow strictly","Bend when needed","Question authority","Ignore if limiting"],
        optionsRu:["Строго соблюдаю","Обхожу при необходимости","Подвергаю сомнению","Игнорирую, если мешают"],
        optionsEs:["Sigo estrictamente","Las doblo si es necesario","Cuestiono la autoridad","Ignoro si limitan"],
        optionsHi:["सख्ती से पालन करें","आवश्यकता पड़ने पर मोड़ें","प्राधिकरण पर सवाल उठाएं","सीमित होने पर अनदेखा करें"],
        optionsPt:["Segue rigorosamente","Flexibiliza quando necessário","Questiona a autoridade","Ignora se limitante"],
        optionsVi:["Tuân thủ nghiêm ngặt","Linh hoạt khi cần","Đặt câu hỏi với quyền lực","Bỏ qua nếu quá gò bó"],
        optionsTr:["Sıkı sıkıya uyarsınız","Gerektiğinde esneteceksiniz","Otoriteyi sorgularsınız","Kısıtlayıcıysa görmezden gelirsiniz"],
        optionsId:["Mengikuti dengan ketat","Melenturkannya bila diperlukan","Mempertanyakan otoritas","Mengabaikan jika membatasi"],
        optionsUz:["Qat'iy rioya qilasiz","Kerak bo'lganda moslashtirasiz","Hokimiyatga savol berasiz","Cheklovchi bo'lsa e'tiborsiz qoldirasiz"],
        optionsKk:["Қатаң сақтайсыз","Қажет болғанда бейімдейсіз","Билікке сұрақ қоясыз","Шектеуші болса елемейсіз"],
        optionsFr:["Les suivre strictement","Les assouplir si nécessaire","Remettre en question l'autorité","Les ignorer si elles sont trop limitantes"],
        optionsDe:["Streng befolgen","Bei Bedarf flexibel handhaben","Autorität hinterfragen","Ignorieren, wenn einschränkend"],
        optionsLo:["ປະຕິບັດຕາມຢ່າງເຂັ້ມງວດ","ປັບປ່ຽນເມື່ອຈຳເປັນ","ຕັ້ງຄຳຖາມຕໍ່ອຳນາດ","ບໍ່ສົນໃຈຖ້າມັນຈຳກັດເກີນໄປ"],
        optionsIt:["Le seguo rigorosamente","Le piego quando serve","Metto in discussione l'autorità","Le ignoro se limitano"],
        optionsAr:["أتّبعها بصرامة","أطوّعها عند الحاجة","أشكّك في السلطة","أتجاهلها إن كانت مقيّدة"],
        optionsFa:["دقیقاً رعایت می‌کنم","در صورت نیاز کمی انعطاف نشان می‌دهم","زیر سؤال می‌برم","اگر محدودکننده باشد نادیده می‌گیرم"],
        weights:[[2,0,0,0,0,0,0,0,0,2,0,0],[0,0,0,0,0,0,0,0,2,0,0,0],[0,0,2,0,0,0,2,0,0,0,0,0],[0,0,0,2,0,0,0,0,0,0,0,2]] }
    ];
    const LANGS = ['en','ru','hi','es','pt','vi','tr','id','uz','kk','fr','de','lo','it','ar','fa'];
    const LANG_NAMES = { en:'English', ru:'Русский', hi:'हिन्दी', es:'Español', pt:'Português', vi:'Tiếng Việt', tr:'Türkçe', id:'Indonesia', uz:'Oʻzbek', kk:'Қазақша', fr:'Français', de:'Deutsch', lo:'ລາວ', it:'Italiano', ar:'العربية', fa:'فارسی' };
    const SAMPLE_PDF = { en: 'astroscan_career_sample_en.pdf', ru: 'astroscan_career_sample_ru.pdf', es: 'astroscan_career_sample_en.pdf', hi: 'astroscan_career_sample_en.pdf', pt: 'astroscan_career_sample_en.pdf', vi: 'astroscan_career_sample_en.pdf', tr: 'astroscan_career_sample_en.pdf', id: 'astroscan_career_sample_en.pdf', uz: 'astroscan_career_sample_en.pdf', kk: 'astroscan_career_sample_en.pdf', fr: 'astroscan_career_sample_en.pdf', de: 'astroscan_career_sample_en.pdf', lo: 'astroscan_career_sample_en.pdf', it: 'astroscan_career_sample_en.pdf', ar: 'astroscan_career_sample_en.pdf', fa: 'astroscan_career_sample_en.pdf' };
    let currentLang = 'en';
    function showToast(message, duration) {
      duration = duration || 3000;
      let container = document.querySelector('.toast-container');
      if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(container);
      }
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'polite');
      toast.textContent = message;
      container.appendChild(toast);
      requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('visible')));
      setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }
    const translations = {
      en: {
        ctaFooter: '⚡ GET FULL REPORT IN TELEGRAM',
        next: 'Next',
        result: 'See result',
        compatCheck: 'Check compatibility',
        share: 'Share',
        love: 'Love',
        friendship: 'Friendship',
        work: 'Work',
        greatHarmony: 'Great harmony!',
        goodPotential: 'Good potential, work on communication',
        challenging: 'Challenging but growth possible',
        dynamicCTATitle: 'Want a personalized report?',
        dynamicCTAText: 'We use Swiss Ephemeris to calculate your full natal chart. Get a detailed PDF report in our Telegram bot! Not sure yet? You can check sample PDF reports first and see for yourself.',
        dynamicCTABtn: '⚡ GET MY FULL AUDIT',
        samplePdfLink: 'View sample PDF report',
        selectPartner: 'Select partner sign',
        techTitle: '📡 Technology &amp; Astrological Traditions',
        techDesc: '<strong>AstroScan uses the Western tropical zodiac</strong> and professional Swiss Ephemeris v2.10. But how does your chart look in other systems?',
        westernVedic: '🌍 Western vs. Vedic (Jyotish)',
        westernVedicDesc: 'Western astrology focuses on the tropical zodiac (seasons), while Vedic astrology uses the sidereal zodiac (fixed stars). The difference is about 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Spend XTR for lifetime access to audits. 200 Stars ≈ $2.80 USD.',
        forPros: '🧑‍🏫 For Professionals',
        forProsDesc: 'Generate white‑label reports in 2 minutes.',
        chooseAnalysis: '⚡ Choose Analysis',
        natal: '🌌 Natal',
        natalDesc: 'Sun, Moon, Rising',
        compat: '💞 Compat',
        compatDesc: 'Synastry',
        career: '💰 Career',
        careerDesc: 'Career &amp; Finance',
        child: '🧸 Child',
        childDesc: 'Child\'s Chart',
        faqTitle: '❓ FAQ',
        faqMoonQ: '🌙 Why does my Moon sign feel different from my personality?',
        faqMoonA: 'The Moon represents your subconscious — inner reactions and emotions that may not align with your conscious self. Your Moon sign complements your surface personality, revealing a deeper layer of your psyche.',
        faqMathQ: '🧮 Is astrology math or magic?',
        faqMathA: 'Planetary positions are calculated with high scientific precision using Swiss Ephemeris. The interpretation is a symbolic model that helps you understand yourself better.',
        faqZodiacQ: '🤔 How does the test determine my sign without my birth date?',
        faqZodiacA: 'We use 10 questions about your behavior in different life situations. Your answers are compared to unique psychological patterns of the 12 Chinese zodiac signs. This creates your "behavioral code" — no personal data needed.',
        faqCompatQ: '💑 How accurate is Chinese zodiac compatibility analysis?',
        faqCompatA: 'Our algorithm combines traditional Chinese compatibility triangles with the natural elements of the signs. For deeper synastry analysis (based on birth dates), use our Telegram bot.',
        faqWesternVedicQ: '🔭 What is the difference between Western and Vedic astrology?',
        faqWesternVedicA: 'Western astrology uses the tropical zodiac (based on seasons), while Vedic (Jyotish) uses the sidereal zodiac (fixed stars). The difference is about 24°. In our bot, you can get a full natal chart in the Western tradition.',
        faqFreeQ: '🆓 Is this truly free and reliable?',
        faqFreeA: 'Yes! The test, result, and basic compatibility are completely free and require no registration. We do not store any personal data on our servers — all information remains locally in your browser.',
        mercuryTracker: '📡 Mercury Retrograde Tracker',
        mercuryDesc: 'How strongly do you feel Mercury retrograde today? (0–10)',
        save: 'Save',
        copyLink: 'Copy link and share your result!',
        zcResultPrefix: 'You were born in the Year of the ',
        zcElementLabel: 'Element',
        zcCta: 'Want a full personality breakdown? Take the free archetype test above ↑'
      },
      ru: {
        ctaFooter: '⚡ ПОЛУЧИТЬ ПОЛНЫЙ РАЗБОР В TELEGRAM',
        next: 'Далее',
        result: 'Узнать результат',
        compatCheck: 'Проверить совместимость',
        share: 'Поделиться',
        love: 'Любовь',
        friendship: 'Дружба',
        work: 'Работа',
        greatHarmony: 'Отличная гармония!',
        goodPotential: 'Хороший потенциал, работайте над общением',
        challenging: 'Сложно, но возможен рост',
        dynamicCTATitle: 'Хотите персонализированный отчёт?',
        dynamicCTAText: 'Мы используем Швейцарские эфемериды для расчёта вашей полной натальной карты. Получите подробный PDF-отчёт в нашем Telegram-боте! Не уверены? Сначала можете посмотреть примеры отчётов и убедиться сами.',
        dynamicCTABtn: '⚡ ПОЛУЧИТЬ ПОЛНЫЙ АУДИТ',
        samplePdfLink: 'Посмотреть пример PDF-отчёта',
        selectPartner: 'Выберите знак партнёра',
        techTitle: '📡 Технологии и астрологические традиции',
        techDesc: '<strong>AstroScan использует западный тропический зодиак</strong> и профессиональные швейцарские эфемериды Swiss Ephemeris v2.10. Но как ваша карта выглядит в других системах?',
        westernVedic: '🌍 Западная vs. Ведическая (Джйотиш)',
        westernVedicDesc: 'Западная астрология опирается на тропический зодиак (привязанный к временам года), тогда как ведическая использует сидерический зодиак (фиксированные звёзды). Разница составляет около 24° (Айанамша).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Потратьте XTR на пожизненный доступ к аудитам. 200 Звёзд ≈ 250-300 руб.',
        forPros: '🧑‍🏫 Для астрологов',
        forProsDesc: 'Генерируйте white‑label отчёты за 2 минуты.',
        chooseAnalysis: '⚡ Выберите анализ',
        natal: '🌌 Натальная',
        natalDesc: 'Солнце, Луна, Асцендент',
        compat: '💞 Совместимость',
        compatDesc: 'Синастрия',
        career: '💰 Карьера',
        careerDesc: 'Карьера и финансы',
        child: '🧸 Детская',
        childDesc: 'Детская карта',
        faqTitle: '❓ Часто задаваемые вопросы',
        faqMoonQ: '🌙 Почему мой лунный знак иногда кажется непохожим на меня?',
        faqMoonA: 'Луна отражает наше подсознание — внутренние реакции и эмоции, которые не всегда совпадают с тем, как мы осознаём себя. Ваш лунный знак дополняет сознательную личность, показывая более глубокий срез вашего «я».',
        faqMathQ: '🧮 Астрология — это математика или магия?',
        faqMathA: 'Позиции планет вычисляются с высокой научной точностью на основе астрономических таблиц (Swiss Ephemeris). Интерпретация — это символическая модель, помогающая лучше понять себя.',
        faqZodiacQ: '🤔 Как тест определяет мой знак без даты рождения?',
        faqZodiacA: 'Мы используем 10 вопросов о вашем поведении в разных жизненных ситуациях. Ответы сравниваются с уникальными психологическими паттернами 12 знаков китайского зодиака. Это ваш «поведенческий код», для которого не нужны личные данные.',
        faqCompatQ: '💑 Насколько точен анализ совместимости по восточному календарю?',
        faqCompatA: 'Наш алгоритм учитывает как традиционные «треугольники совместимости» китайской астрологии, так и взаимодействие природных стихий знаков. Для углублённого анализа синастрии (по датам рождения) воспользуйтесь нашим Telegram-ботом.',
        faqWesternVedicQ: '🔭 Чем отличается западная астрология от ведической?',
        faqWesternVedicA: 'Западная система опирается на тропический зодиак (привязанный к временам года), а ведическая (Джйотиш) — на сидерический (точное положение звёзд). Разница между ними составляет около 24°. В нашем боте можно получить натальную карту по западной системе, а также сравнить её с другими подходами на уровне описаний.',
        faqFreeQ: '🆓 Это действительно бесплатно и надёжно?',
        faqFreeA: 'Да! Тест, результат и базовая совместимость полностью бесплатны и не требуют регистрации. Мы не храним ваши персональные данные на серверах — вся информация остаётся локально в вашем браузере.',
        mercuryTracker: '📡 Трекер ретроградного Меркурия',
        mercuryDesc: 'Насколько сильно вы ощущаете влияние ретроградного Меркурия сегодня? (0–10)',
        save: 'Сохранить',
        copyLink: 'Скопируйте ссылку и поделитесь результатом!',
        zcResultPrefix: 'Вы родились в год ',
        zcElementLabel: 'Элемент',
        zcCta: 'Хотите полный разбор личности? Пройдите бесплатный тест на архетип выше ↑'
      },
      hi: {
        ctaFooter: '⚡ टेलीग्राम में पूरी रिपोर्ट प्राप्त करें',
        next: 'अगला',
        result: 'परिणाम देखें',
        compatCheck: 'अनुकूलता जांचें',
        share: 'शेयर करें',
        love: 'प्रेम',
        friendship: 'मित्रता',
        work: 'कार्य',
        greatHarmony: 'बहुत अच्छा सामंजस्य!',
        goodPotential: 'अच्छी संभावना, संचार पर काम करें',
        challenging: 'चुनौतीपूर्ण लेकिन विकास संभव',
        dynamicCTATitle: 'एक व्यक्तिगत रिपोर्ट चाहिए?',
        dynamicCTAText: 'हम आपकी पूरी जन्म कुंडली की गणना करने के लिए स्विस एफेमेरिस का उपयोग करते हैं। हमारे टेलीग्राम बॉट में एक विस्तृत पीडीएफ रिपोर्ट प्राप्त करें! अभी तय नहीं कर पाए? पहले नमूना रिपोर्ट देख लें और खुद देखकर तय करें।',
        dynamicCTABtn: '⚡ मेरा पूरा ऑडिट प्राप्त करें',
        samplePdfLink: 'नमूना पीडीएफ रिपोर्ट देखें',
        selectPartner: 'साथी का चिन्ह चुनें',
        techTitle: '📡 प्रौद्योगिकी और ज्योतिषीय परंपराएं',
        techDesc: '<strong>AstroScan पश्चिमी उष्णकटिबंधीय राशि चक्र</strong> और पेशेवर स्विस एफेमेरिस v2.10 का उपयोग करता है। लेकिन अन्य प्रणालियों में आपका चार्ट कैसा दिखता है?',
        westernVedic: '🌍 पश्चिमी बनाम वैदिक (ज्योतिष)',
        westernVedicDesc: 'पश्चिमी ज्योतिष उष्णकटिबंधीय राशि चक्र (मौसम) पर केंद्रित है, जबकि वैदिक ज्योतिष नाक्षत्र राशि चक्र (स्थिर तारे) का उपयोग करता है। अंतर लगभग 24° (अयनांश) है।',
        starsTitle: '⭐️ टेलीग्राम स्टार्स',
        starsDesc: 'ऑडिट तक आजीवन पहुंच के लिए XTR खर्च करें। 200 स्टार्स ≈ $2.80 USD।',
        forPros: '🧑‍🏫 पेशेवरों के लिए',
        forProsDesc: '2 मिनट में व्हाइट-लेबल रिपोर्ट तैयार करें।',
        chooseAnalysis: '⚡ विश्लेषण चुनें',
        natal: '🌌 जन्म कुंडली',
        natalDesc: 'सूर्य, चंद्रमा, लग्न',
        compat: '💞 अनुकूलता',
        compatDesc: 'सिनेस्ट्री',
        career: '💰 करियर',
        careerDesc: 'करियर और वित्त',
        child: '🧸 बच्चा',
        childDesc: 'बच्चे की कुंडली',
        faqTitle: '❓ सामान्य प्रश्न',
        faqMoonQ: '🌙 मेरा चंद्र राशिफल मेरे व्यक्तित्व से अलग क्यों लगता है?',
        faqMoonA: 'चंद्रमा आपके अवचेतन मन को दर्शाता है - आंतरिक प्रतिक्रियाएं और भावनाएं, जो हमेशा आपके सचेत व्यक्तित्व से मेल नहीं खातीं। आपका चंद्र राशिफल आपके व्यक्तित्व की गहरी परतों को उजागर करता है।',
        faqMathQ: '🧮 क्या ज्योतिष गणित है या जादू?',
        faqMathA: 'ग्रहों की स्थिति की गणना स्विस एफेमेरिस जैसे वैज्ञानिक उपकरणों से की जाती है। व्याख्या एक प्रतीकात्मक मॉडल है जो आत्म-समझ में मदद करती है।',
        faqZodiacQ: '🤔 बिना जन्मतिथि के यह टेस्ट मेरी राशि कैसे जान लेता है?',
        faqZodiacA: 'हम आपके व्यवहार पर 10 प्रश्न पूछते हैं। आपके उत्तरों की तुलना 12 चीनी राशियों के अद्वितीय मनोवैज्ञानिक पैटर्न से की जाती है। यह आपका "व्यवहार कोड" है, जिसके लिए किसी व्यक्तिगत डेटा की आवश्यकता नहीं है।',
        faqCompatQ: '💑 चीनी राशिफल के अनुसार अनुकूलता विश्लेषण कितना सटीक है?',
        faqCompatA: 'हमारा एल्गोरिदम चीनी ज्योतिष के पारंपरिक "अनुकूलता त्रिकोण" और राशियों के प्राकृतिक तत्वों दोनों का उपयोग करता है। अधिक गहन विश्लेषण के लिए, हमारे टेलीग्राम बॉट का उपयोग करें।',
        faqWesternVedicQ: '🔭 पश्चिमी और वैदिक ज्योतिष में क्या अंतर है?',
        faqWesternVedicA: 'पश्चिमी ज्योतिष उष्णकटिबंधीय राशि चक्र (मौसम आधारित) का उपयोग करता है, जबकि वैदिक (ज्योतिष) नाक्षत्र राशि चक्र (स्थिर तारों) का। इसमें लगभग 24° का अंतर होता है। हमारे बॉट में आप पश्चिमी परंपरा में जन्म कुंडली प्राप्त कर सकते हैं।',
        faqFreeQ: '🆓 क्या यह वास्तव में मुफ़्त और विश्वसनीय है?',
        faqFreeA: 'हाँ! यह परीक्षण, परिणाम और बुनियादी अनुकूलता पूरी तरह से मुफ़्त है और इसके लिए किसी पंजीकरण की आवश्यकता नहीं है। हम आपका कोई भी व्यक्तिगत डेटा अपने सर्वर पर संग्रहीत नहीं करते हैं - सारी जानकारी आपके ब्राउज़र में स्थानीय रूप से रहती है।',
        mercuryTracker: '📡 बुध वक्री ट्रैकर',
        mercuryDesc: 'आज आप बुध के वक्री होने का कितना प्रभाव महसूस कर रहे हैं? (0–10)',
        save: 'सहेजें',
        copyLink: 'लिंक कॉपी करें और अपना परिणाम साझा करें!',
        zcResultPrefix: 'आपका जन्म वर्ष है ',
        zcElementLabel: 'तत्व',
        zcCta: 'पूरा व्यक्तित्व विश्लेषण चाहते हैं? ऊपर मुफ़्त आर्कटाइप टेस्ट लें ↑'
      },
      es: {
        ctaFooter: '⚡ OBTÉN INFORME COMPLETO EN TELEGRAM',
        next: 'Siguiente',
        result: 'Ver resultado',
        compatCheck: 'Ver compatibilidad',
        share: 'Compartir',
        love: 'Amor',
        friendship: 'Amistad',
        work: 'Trabajo',
        greatHarmony: '¡Gran armonía!',
        goodPotential: 'Buen potencial, trabaja en la comunicación',
        challenging: 'Difícil pero posible crecimiento',
        dynamicCTATitle: '¿Quieres un informe personalizado?',
        dynamicCTAText: 'Usamos Swiss Ephemeris para calcular tu carta natal completa. ¡Obtén un informe PDF detallado en nuestro bot de Telegram! ¿No estás seguro? Primero puedes ver ejemplos de informes y comprobarlo tú mismo.',
        dynamicCTABtn: '⚡ OBTENER MI AUDITORÍA COMPLETA',
        samplePdfLink: 'Ver ejemplo de informe PDF',
        selectPartner: 'Elige el signo de tu pareja',
        techTitle: '📡 Tecnología y Tradiciones Astrológicas',
        techDesc: '<strong>AstroScan utiliza el zodíaco tropical occidental</strong> y las efemérides suizas profesionales Swiss Ephemeris v2.10. Pero, ¿cómo se ve tu carta en otros sistemas?',
        westernVedic: '🌍 Occidental vs. Védica (Jyotish)',
        westernVedicDesc: 'La astrología occidental se basa en el zodíaco tropical (estaciones), mientras que la védica utiliza el zodíaco sideral (estrellas fijas). La diferencia es de unos 24° (Ayanamsha).',
        starsTitle: '⭐️ Estrellas de Telegram',
        starsDesc: 'Gasta XTR para acceso de por vida a auditorías. 200 Estrellas ≈ $2.80 USD.',
        forPros: '🧑‍🏫 Para Profesionales',
        forProsDesc: 'Genera informes white‑label en 2 minutos.',
        chooseAnalysis: '⚡ Elige Análisis',
        natal: '🌌 Natal',
        natalDesc: 'Sol, Luna, Ascendente',
        compat: '💞 Compatibilidad',
        compatDesc: 'Sinastría',
        career: '💰 Carrera',
        careerDesc: 'Carrera y Finanzas',
        child: '🧸 Infantil',
        childDesc: 'Carta Infantil',
        faqTitle: '❓ Preguntas Frecuentes',
        faqMoonQ: '🌙 ¿Por qué mi signo lunar se siente diferente a mi personalidad?',
        faqMoonA: 'La Luna representa tu subconsciente: reacciones y emociones internas que pueden no alinearse con tu yo consciente. Tu signo lunar complementa tu personalidad superficial, revelando una capa más profunda.',
        faqMathQ: '🧮 ¿Es la astrología matemática o magia?',
        faqMathA: 'Las posiciones planetarias se calculan con precisión científica utilizando Swiss Ephemeris. La interpretación es un modelo simbólico que te ayuda a comprenderte mejor.',
        faqZodiacQ: '🤔 ¿Cómo determina el test mi signo sin mi fecha de nacimiento?',
        faqZodiacA: 'Usamos 10 preguntas sobre tu comportamiento en diferentes situaciones. Tus respuestas se comparan con patrones psicológicos únicos de los 12 signos del zodíaco chino. Esto crea tu "código de comportamiento", sin necesidad de datos personales.',
        faqCompatQ: '💑 ¿Qué tan preciso es el análisis de compatibilidad del zodíaco chino?',
        faqCompatA: 'Nuestro algoritmo combina triángulos de compatibilidad chinos tradicionales con los elementos naturales de los signos. Para un análisis de sinastría más profundo (basado en fechas de nacimiento), usa nuestro bot de Telegram.',
        faqWesternVedicQ: '🔭 ¿Cuál es la diferencia entre la astrología occidental y la védica?',
        faqWesternVedicA: 'La astrología occidental utiliza el zodíaco tropical (basado en estaciones), mientras que la védica (Jyotish) utiliza el zodíaco sideral (estrellas fijas). La diferencia es de unos 24°. En nuestro bot, puedes obtener una carta natal en la tradición occidental.',
        faqFreeQ: '🆓 ¿Es esto realmente gratis y fiable?',
        faqFreeA: '¡Sí! El test, el resultado y la compatibilidad básica son completamente gratis y no requieren registro. No almacenamos ningún dato personal en nuestros servidores; todo permanece localmente en tu navegador.',
        mercuryTracker: '📡 Rastreador de Mercurio retrógrado',
        mercuryDesc: '¿Cuánto sientes la influencia de Mercurio retrógrado hoy? (0–10)',
        save: 'Guardar',
        copyLink: '¡Copia el enlace y comparte tu resultado!',
        zcResultPrefix: 'Naciste en el Año del ',
        zcElementLabel: 'Elemento',
        zcCta: '¿Quieres un análisis completo de personalidad? Haz el test de arquetipo gratis arriba ↑'
      },
      pt: {
        ctaFooter: '⚡ RECEBER RELATÓRIO COMPLETO NO TELEGRAM',
        next: 'Próxima',
        result: 'Ver resultado',
        compatCheck: 'Verificar compatibilidade',
        share: 'Compartilhar',
        love: 'Amor',
        friendship: 'Amizade',
        work: 'Trabalho',
        greatHarmony: 'Ótima harmonia!',
        goodPotential: 'Bom potencial, trabalhe na comunicação',
        challenging: 'Desafiador, mas o crescimento é possível',
        dynamicCTATitle: 'Quer um relatório personalizado?',
        dynamicCTAText: 'Usamos o Swiss Ephemeris para calcular seu mapa natal completo. Receba um relatório em PDF detalhado no nosso bot do Telegram! Ainda não tem certeza? Você pode conferir exemplos de relatórios em PDF primeiro e ver por si mesmo.',
        dynamicCTABtn: '⚡ RECEBER MINHA AUDITORIA COMPLETA',
        samplePdfLink: 'Ver exemplo de relatório em PDF',
        selectPartner: 'Selecione o signo do parceiro',
        techTitle: '📡 Tecnologia &amp; Tradições Astrológicas',
        techDesc: '<strong>O AstroScan usa o zodíaco tropical ocidental</strong> e o profissional Swiss Ephemeris v2.10. Mas como fica seu mapa em outros sistemas?',
        westernVedic: '🌍 Ocidental vs. Védica (Jyotish)',
        westernVedicDesc: 'A astrologia ocidental foca no zodíaco tropical (estações), enquanto a védica usa o zodíaco sideral (estrelas fixas). A diferença é de cerca de 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Gaste XTR para acesso vitalício às auditorias. 200 Stars ≈ US$ 2,80.',
        forPros: '🧑‍🏫 Para Profissionais',
        forProsDesc: 'Gere relatórios white-label em 2 minutos.',
        chooseAnalysis: '⚡ Escolha a Análise',
        natal: '🌌 Natal',
        natalDesc: 'Sol, Lua, Ascendente',
        compat: '💞 Compatibilidade',
        compatDesc: 'Sinastria',
        career: '💰 Carreira',
        careerDesc: 'Carreira e Finanças',
        child: '🧸 Infantil',
        childDesc: 'Mapa Infantil',
        faqTitle: '❓ Perguntas Frequentes',
        faqMoonQ: '🌙 Por que meu signo lunar parece diferente da minha personalidade?',
        faqMoonA: 'A Lua representa seu subconsciente — reações e emoções internas que podem não estar alinhadas com o seu eu consciente. Seu signo lunar complementa sua personalidade superficial, revelando uma camada mais profunda da sua psique.',
        faqMathQ: '🧮 Astrologia é matemática ou magia?',
        faqMathA: 'As posições planetárias são calculadas com alta precisão científica usando o Swiss Ephemeris. A interpretação é um modelo simbólico que ajuda você a se entender melhor.',
        faqZodiacQ: '🤔 Como o teste determina meu signo sem minha data de nascimento?',
        faqZodiacA: 'Usamos 10 perguntas sobre seu comportamento em diferentes situações da vida. Suas respostas são comparadas com padrões psicológicos únicos dos 12 signos do zodíaco chinês. Isso cria seu "código comportamental" — sem necessidade de dados pessoais.',
        faqCompatQ: '💑 Quão precisa é a análise de compatibilidade do zodíaco chinês?',
        faqCompatA: 'Nosso algoritmo combina triângulos tradicionais de compatibilidade chineses com os elementos naturais dos signos. Para uma análise de sinastria mais profunda (baseada em datas de nascimento), use nosso bot do Telegram.',
        faqWesternVedicQ: '🔭 Qual é a diferença entre a astrologia ocidental e a védica?',
        faqWesternVedicA: 'A astrologia ocidental usa o zodíaco tropical (baseado nas estações), enquanto a védica (Jyotish) usa o zodíaco sideral (estrelas fixas). A diferença é de cerca de 24°. No nosso bot, você pode obter um mapa natal completo na tradição ocidental.',
        faqFreeQ: '🆓 Isso é realmente gratuito e confiável?',
        faqFreeA: 'Sim! O teste, o resultado e a compatibilidade básica são totalmente gratuitos e não exigem cadastro. Não armazenamos nenhum dado pessoal em nossos servidores — todas as informações permanecem localmente no seu navegador.',
        mercuryTracker: '📡 Rastreador de Mercúrio Retrógrado',
        mercuryDesc: 'O quanto você sente a influência de Mercúrio retrógrado hoje? (0–10)',
        save: 'Salvar',
        copyLink: 'Copie o link e compartilhe seu resultado!',
        zcResultPrefix: 'Você nasceu no Ano do ',
        zcElementLabel: 'Elemento',
        zcCta: 'Quer uma análise completa de personalidade? Faça o teste de arquétipo gratuito acima ↑'
      },
      vi: {
        ctaFooter: '⚡ NHẬN BÁO CÁO ĐẦY ĐỦ TRÊN TELEGRAM',
        next: 'Tiếp theo',
        result: 'Xem kết quả',
        compatCheck: 'Kiểm tra độ hợp',
        share: 'Chia sẻ',
        love: 'Tình yêu',
        friendship: 'Tình bạn',
        work: 'Công việc',
        greatHarmony: 'Rất hòa hợp!',
        goodPotential: 'Tiềm năng tốt, hãy cải thiện giao tiếp',
        challenging: 'Khó khăn nhưng vẫn có thể phát triển',
        dynamicCTATitle: 'Bạn muốn một báo cáo được cá nhân hóa?',
        dynamicCTAText: 'Chúng tôi sử dụng Swiss Ephemeris để tính toán lá số tử vi đầy đủ của bạn. Nhận báo cáo PDF chi tiết trong bot Telegram của chúng tôi! Chưa chắc chắn? Bạn có thể xem trước các mẫu báo cáo PDF để tự kiểm chứng.',
        dynamicCTABtn: '⚡ NHẬN BÁO CÁO ĐẦY ĐỦ CỦA TÔI',
        samplePdfLink: 'Xem mẫu báo cáo PDF',
        selectPartner: 'Chọn con giáp của đối phương',
        techTitle: '📡 Công Nghệ &amp; Các Truyền Thống Chiêm Tinh',
        techDesc: '<strong>AstroScan sử dụng hoàng đạo nhiệt đới phương Tây</strong> và Swiss Ephemeris v2.10 chuyên nghiệp. Nhưng lá số của bạn trông như thế nào trong các hệ thống khác?',
        westernVedic: '🌍 Phương Tây so với Vệ Đà (Jyotish)',
        westernVedicDesc: 'Chiêm tinh phương Tây tập trung vào hoàng đạo nhiệt đới (theo mùa), trong khi chiêm tinh Vệ Đà sử dụng hoàng đạo chí tuyến (các vì sao cố định). Sự khác biệt là khoảng 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Dùng XTR để có quyền truy cập trọn đời vào các báo cáo. 200 Stars ≈ 2,80 USD.',
        forPros: '🧑‍🏫 Dành cho Chuyên gia',
        forProsDesc: 'Tạo báo cáo white-label chỉ trong 2 phút.',
        chooseAnalysis: '⚡ Chọn Phân Tích',
        natal: '🌌 Lá số',
        natalDesc: 'Mặt Trời, Mặt Trăng, Cung Mọc',
        compat: '💞 Độ hợp',
        compatDesc: 'Sinastry',
        career: '💰 Sự nghiệp',
        careerDesc: 'Sự nghiệp &amp; Tài chính',
        child: '🧸 Trẻ em',
        childDesc: 'Lá số của trẻ',
        faqTitle: '❓ Câu Hỏi Thường Gặp',
        faqMoonQ: '🌙 Tại sao cung Mặt Trăng của tôi lại có vẻ khác với tính cách của tôi?',
        faqMoonA: 'Mặt Trăng đại diện cho tiềm thức của bạn — những phản ứng và cảm xúc bên trong có thể không khớp với con người có ý thức của bạn. Cung Mặt Trăng bổ sung cho tính cách bề ngoài, tiết lộ một lớp sâu hơn trong tâm hồn bạn.',
        faqMathQ: '🧮 Chiêm tinh học là toán học hay ma thuật?',
        faqMathA: 'Vị trí các hành tinh được tính toán với độ chính xác khoa học cao bằng Swiss Ephemeris. Việc giải nghĩa là một mô hình biểu tượng giúp bạn hiểu bản thân tốt hơn.',
        faqZodiacQ: '🤔 Bài test xác định con giáp của tôi như thế nào mà không cần ngày sinh?',
        faqZodiacA: 'Chúng tôi sử dụng 10 câu hỏi về hành vi của bạn trong các tình huống khác nhau của cuộc sống. Câu trả lời của bạn được so sánh với các mẫu tâm lý riêng biệt của 12 con giáp Trung Hoa. Điều này tạo ra "mã hành vi" của bạn — không cần dữ liệu cá nhân.',
        faqCompatQ: '💑 Phân tích độ hợp theo con giáp Trung Hoa chính xác đến mức nào?',
        faqCompatA: 'Thuật toán của chúng tôi kết hợp tam hợp truyền thống của Trung Hoa với ngũ hành tự nhiên của các con giáp. Để có phân tích sinastry (hợp số) sâu hơn (dựa trên ngày sinh), hãy sử dụng bot Telegram của chúng tôi.',
        faqWesternVedicQ: '🔭 Sự khác biệt giữa chiêm tinh phương Tây và Vệ Đà là gì?',
        faqWesternVedicA: 'Chiêm tinh phương Tây sử dụng hoàng đạo nhiệt đới (dựa trên mùa), trong khi Vệ Đà (Jyotish) sử dụng hoàng đạo chí tuyến (các vì sao cố định). Sự khác biệt là khoảng 24°. Trong bot của chúng tôi, bạn có thể nhận được lá số đầy đủ theo truyền thống phương Tây.',
        faqFreeQ: '🆓 Điều này có thực sự miễn phí và đáng tin cậy không?',
        faqFreeA: 'Có chứ! Bài test, kết quả và độ hợp cơ bản hoàn toàn miễn phí và không yêu cầu đăng ký. Chúng tôi không lưu trữ bất kỳ dữ liệu cá nhân nào trên máy chủ của mình — mọi thông tin đều ở lại cục bộ trên trình duyệt của bạn.',
        mercuryTracker: '📡 Theo Dõi Sao Thủy Nghịch Hành',
        mercuryDesc: 'Hôm nay bạn cảm nhận ảnh hưởng của Sao Thủy nghịch hành mạnh đến mức nào? (0–10)',
        save: 'Lưu',
        copyLink: 'Sao chép liên kết và chia sẻ kết quả của bạn!',
        zcResultPrefix: 'Bạn sinh vào năm ',
        zcElementLabel: 'Ngũ hành',
        zcCta: 'Muốn có bản phân tích tính cách đầy đủ? Hãy làm bài trắc nghiệm nguyên mẫu miễn phí ở trên ↑'
      },
      tr: {
        ctaFooter: '⚡ TELEGRAM\'DA TAM RAPORU ALIN',
        next: 'İleri',
        result: 'Sonucu gör',
        compatCheck: 'Uyumluluğu kontrol et',
        share: 'Paylaş',
        love: 'Aşk',
        friendship: 'Arkadaşlık',
        work: 'İş',
        greatHarmony: 'Muhteşem uyum!',
        goodPotential: 'İyi potansiyel, iletişim üzerinde çalışın',
        challenging: 'Zorlayıcı ama gelişim mümkün',
        dynamicCTATitle: 'Kişiselleştirilmiş bir rapor mu istiyorsunuz?',
        dynamicCTAText: 'Tam doğum haritanızı hesaplamak için Swiss Ephemeris kullanıyoruz. Telegram botumuzda ayrıntılı bir PDF rapor alın! Henüz emin değil misiniz? Önce örnek PDF raporlarına göz atıp kendiniz görebilirsiniz.',
        dynamicCTABtn: '⚡ TAM ANALİZİMİ AL',
        samplePdfLink: 'Örnek PDF raporunu görüntüle',
        selectPartner: 'Partner burcunu seçin',
        techTitle: '📡 Teknoloji &amp; Astrolojik Gelenekler',
        techDesc: '<strong>AstroScan Batı tropikal burçlarını</strong> ve profesyonel Swiss Ephemeris v2.10\'u kullanır. Peki haritanız diğer sistemlerde nasıl görünüyor?',
        westernVedic: '🌍 Batı vs. Vedik (Jyotish)',
        westernVedicDesc: 'Batı astrolojisi tropikal burçlara (mevsimlere) odaklanırken, Vedik astroloji sabit yıldızlara dayalı sideral burçları kullanır. Aradaki fark yaklaşık 24°\'dir (Ayanamsha).',
        starsTitle: '⭐️ Telegram Yıldızları',
        starsDesc: 'Analizlere ömür boyu erişim için XTR harcayın. 200 Yıldız ≈ 2,80 USD.',
        forPros: '🧑‍🏫 Profesyoneller İçin',
        forProsDesc: '2 dakikada white-label raporlar oluşturun.',
        chooseAnalysis: '⚡ Analiz Seçin',
        natal: '🌌 Doğum Haritası',
        natalDesc: 'Güneş, Ay, Yükselen',
        compat: '💞 Uyumluluk',
        compatDesc: 'Sinastri',
        career: '💰 Kariyer',
        careerDesc: 'Kariyer ve Finans',
        child: '🧸 Çocuk',
        childDesc: 'Çocuğun Haritası',
        faqTitle: '❓ Sıkça Sorulan Sorular',
        faqMoonQ: '🌙 Ay burcum neden kişiliğimden farklı hissettiriyor?',
        faqMoonA: 'Ay, bilinçaltınızı temsil eder — bilinçli benliğinizle uyuşmayabilecek iç tepkiler ve duygular. Ay burcunuz yüzeysel kişiliğinizi tamamlayarak psişenizin daha derin bir katmanını ortaya çıkarır.',
        faqMathQ: '🧮 Astroloji matematik mi yoksa büyü mü?',
        faqMathA: 'Gezegen konumları Swiss Ephemeris kullanılarak yüksek bilimsel hassasiyetle hesaplanır. Yorumlama ise kendinizi daha iyi anlamanıza yardımcı olan sembolik bir modeldir.',
        faqZodiacQ: '🤔 Test, doğum tarihim olmadan burcumu nasıl belirliyor?',
        faqZodiacA: 'Farklı yaşam durumlarındaki davranışlarınızla ilgili 10 soru kullanıyoruz. Yanıtlarınız, 12 Çin burcunun benzersiz psikolojik kalıplarıyla karşılaştırılır. Bu, kişisel veri gerektirmeyen "davranış kodunuzu" oluşturur.',
        faqCompatQ: '💑 Çin burcu uyumluluk analizi ne kadar doğru?',
        faqCompatA: 'Algoritmamız, geleneksel Çin uyumluluk üçgenlerini burçların doğal elementleriyle birleştirir. Daha derin bir sinastri analizi için (doğum tarihine dayalı), Telegram botumuzu kullanın.',
        faqWesternVedicQ: '🔭 Batı ve Vedik astroloji arasındaki fark nedir?',
        faqWesternVedicA: 'Batı astrolojisi tropikal burcu (mevsimlere dayalı) kullanırken, Vedik (Jyotish) sideral burcu (sabit yıldızlar) kullanır. Aradaki fark yaklaşık 24°\'dir. Botumuzda, Batı geleneğinde tam bir doğum haritası alabilirsiniz.',
        faqFreeQ: '🆓 Bu gerçekten ücretsiz ve güvenilir mi?',
        faqFreeA: 'Evet! Test, sonuç ve temel uyumluluk tamamen ücretsizdir ve kayıt gerektirmez. Sunucularımızda hiçbir kişisel veri saklamıyoruz — tüm bilgiler tarayıcınızda yerel olarak kalır.',
        mercuryTracker: '📡 Merkür Retrosu Takipçisi',
        mercuryDesc: 'Bugün Merkür retrosunu ne kadar hissediyorsunuz? (0–10)',
        save: 'Kaydet',
        copyLink: 'Bağlantıyı kopyalayın ve sonucunuzu paylaşın!',
        zcResultPrefix: 'Doğum yılınız: ',
        zcElementLabel: 'Element',
        zcCta: 'Kişiliğinizin tam analizini mi istiyorsunuz? Yukarıdaki ücretsiz arketip testini yapın ↑'
      },
      id: {
        ctaFooter: '⚡ DAPATKAN LAPORAN LENGKAP DI TELEGRAM',
        next: 'Selanjutnya',
        result: 'Lihat hasil',
        compatCheck: 'Cek kecocokan',
        share: 'Bagikan',
        love: 'Cinta',
        friendship: 'Persahabatan',
        work: 'Pekerjaan',
        greatHarmony: 'Harmoni yang luar biasa!',
        goodPotential: 'Potensi bagus, tingkatkan komunikasi',
        challenging: 'Menantang tapi masih bisa berkembang',
        dynamicCTATitle: 'Ingin laporan yang dipersonalisasi?',
        dynamicCTAText: 'Kami menggunakan Swiss Ephemeris untuk menghitung peta kelahiran lengkap Anda. Dapatkan laporan PDF terperinci di bot Telegram kami! Belum yakin? Anda bisa melihat contoh laporan PDF terlebih dahulu dan membuktikannya sendiri.',
        dynamicCTABtn: '⚡ DAPATKAN AUDIT LENGKAP SAYA',
        samplePdfLink: 'Lihat contoh laporan PDF',
        selectPartner: 'Pilih shio pasangan',
        techTitle: '📡 Teknologi &amp; Tradisi Astrologi',
        techDesc: '<strong>AstroScan menggunakan zodiak tropis Barat</strong> dan Swiss Ephemeris v2.10 profesional. Tapi bagaimana peta Anda terlihat di sistem lain?',
        westernVedic: '🌍 Barat vs. Weda (Jyotish)',
        westernVedicDesc: 'Astrologi Barat berfokus pada zodiak tropis (musim), sedangkan astrologi Weda menggunakan zodiak sideris (bintang tetap). Perbedaannya sekitar 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Gunakan XTR untuk akses seumur hidup ke audit. 200 Stars ≈ $2,80 USD.',
        forPros: '🧑‍🏫 Untuk Profesional',
        forProsDesc: 'Buat laporan white-label dalam 2 menit.',
        chooseAnalysis: '⚡ Pilih Analisis',
        natal: '🌌 Natal',
        natalDesc: 'Matahari, Bulan, Rising',
        compat: '💞 Kecocokan',
        compatDesc: 'Sinastri',
        career: '💰 Karier',
        careerDesc: 'Karier &amp; Keuangan',
        child: '🧸 Anak',
        childDesc: 'Peta Kelahiran Anak',
        faqTitle: '❓ Pertanyaan yang Sering Diajukan',
        faqMoonQ: '🌙 Mengapa shio Bulan saya terasa berbeda dari kepribadian saya?',
        faqMoonA: 'Bulan mewakili alam bawah sadar Anda — reaksi dan emosi batin yang mungkin tidak selaras dengan diri sadar Anda. Shio Bulan Anda melengkapi kepribadian permukaan Anda, mengungkapkan lapisan psike Anda yang lebih dalam.',
        faqMathQ: '🧮 Apakah astrologi itu matematika atau sihir?',
        faqMathA: 'Posisi planet dihitung dengan presisi ilmiah tinggi menggunakan Swiss Ephemeris. Interpretasinya adalah model simbolis yang membantu Anda memahami diri sendiri lebih baik.',
        faqZodiacQ: '🤔 Bagaimana tes ini menentukan shio saya tanpa tanggal lahir?',
        faqZodiacA: 'Kami menggunakan 10 pertanyaan tentang perilaku Anda dalam berbagai situasi kehidupan. Jawaban Anda dibandingkan dengan pola psikologis unik dari 12 shio Tionghoa. Ini menciptakan "kode perilaku" Anda — tanpa perlu data pribadi.',
        faqCompatQ: '💑 Seberapa akurat analisis kecocokan shio Tionghoa?',
        faqCompatA: 'Algoritma kami menggabungkan segitiga kecocokan tradisional Tionghoa dengan elemen alami dari masing-masing shio. Untuk analisis sinastri yang lebih mendalam (berdasarkan tanggal lahir), gunakan bot Telegram kami.',
        faqWesternVedicQ: '🔭 Apa perbedaan antara astrologi Barat dan Weda?',
        faqWesternVedicA: 'Astrologi Barat menggunakan zodiak tropis (berdasarkan musim), sedangkan Weda (Jyotish) menggunakan zodiak sideris (bintang tetap). Perbedaannya sekitar 24°. Di bot kami, Anda bisa mendapatkan peta kelahiran lengkap dalam tradisi Barat.',
        faqFreeQ: '🆓 Apakah ini benar-benar gratis dan bisa diandalkan?',
        faqFreeA: 'Ya! Tes, hasil, dan kecocokan dasar sepenuhnya gratis dan tidak memerlukan pendaftaran. Kami tidak menyimpan data pribadi apa pun di server kami — semua informasi tetap berada secara lokal di browser Anda.',
        mercuryTracker: '📡 Pelacak Merkurius Retrograde',
        mercuryDesc: 'Seberapa kuat Anda merasakan Merkurius retrograde hari ini? (0–10)',
        save: 'Simpan',
        copyLink: 'Salin tautan dan bagikan hasil Anda!',
        zcResultPrefix: 'Anda lahir di Tahun ',
        zcElementLabel: 'Elemen',
        zcCta: 'Ingin analisis kepribadian lengkap? Ikuti tes arketip gratis di atas ↑'
      },
      uz: {
        ctaFooter: "⚡ TELEGRAM'DA TO'LIQ HISOBOTNI OLING",
        next: 'Keyingi',
        result: "Natijani ko'rish",
        compatCheck: 'Moslikni tekshirish',
        share: 'Ulashish',
        love: 'Sevgi',
        friendship: "Do'stlik",
        work: 'Ish',
        greatHarmony: "Ajoyib uyg'unlik!",
        goodPotential: 'Yaxshi salohiyat, muloqot ustida ishlang',
        challenging: 'Qiyin, lekin rivojlanish mumkin',
        dynamicCTATitle: 'Shaxsiylashtirilgan hisobot xohlaysizmi?',
        dynamicCTAText: "Sizning to'liq tug'ilish xaritangizni hisoblash uchun Swiss Ephemeris'dan foydalanamiz. Telegram botimizda batafsil PDF hisobot oling! Hali ishonchingiz komil emasmi? Avval namunaviy PDF hisobotlarni ko'rib, o'zingiz baholang.",
        dynamicCTABtn: "⚡ TO'LIQ TAHLILIMNI OLISH",
        samplePdfLink: "Namunaviy PDF hisobotni ko'rish",
        selectPartner: 'Sherik belgisini tanlang',
        techTitle: "📡 Texnologiya va Astrologik An'analar",
        techDesc: "<strong>AstroScan G'arb tropik zodiakidan</strong> va professional Swiss Ephemeris v2.10'dan foydalanadi. Lekin xaritangiz boshqa tizimlarda qanday ko'rinadi?",
        westernVedic: "🌍 G'arb vs. Vedik (Jyotish)",
        westernVedicDesc: "G'arb astrologiyasi tropik zodiakka (fasllarga) e'tibor qaratadi, vedik astrologiya esa sidereal zodiakdan (qo'zg'almas yulduzlar) foydalanadi. Farq taxminan 24° (Ayanamsha).",
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: "Tahlillarga umrbod kirish uchun XTR sarflang. 200 Stars ≈ 2,80 AQSh dollari.",
        forPros: '🧑‍🏫 Mutaxassislar uchun',
        forProsDesc: "White-label hisobotlarni 2 daqiqada yarating.",
        chooseAnalysis: '⚡ Tahlilni tanlang',
        natal: "🌌 Tug'ilish xaritasi",
        natalDesc: "Quyosh, Oy, Ko'tarilish",
        compat: '💞 Moslik',
        compatDesc: 'Sinastriya',
        career: '💰 Karyera',
        careerDesc: 'Karyera va Moliya',
        child: '🧸 Bola',
        childDesc: "Bolaning xaritasi",
        faqTitle: "❓ Tez-tez So'raladigan Savollar",
        faqMoonQ: "🌙 Nega Oy belgim xarakterimdan boshqacha his qilinadi?",
        faqMoonA: "Oy sizning ongsizligingizni ifodalaydi — ongli o'zingiz bilan mos kelmasligi mumkin bo'lgan ichki reaksiyalar va his-tuyg'ular. Oy belgingiz sizning tashqi xarakteringizni to'ldirib, ruhiyatingizning chuqurroq qatlamini ochib beradi.",
        faqMathQ: "🧮 Astrologiya matematikami yoki sehrmi?",
        faqMathA: "Sayyoralarning holati Swiss Ephemeris yordamida yuqori ilmiy aniqlik bilan hisoblanadi. Talqin esa o'zingizni yaxshiroq tushunishga yordam beradigan ramziy modeldir.",
        faqZodiacQ: "🤔 Test tug'ilgan sanamsiz belgimni qanday aniqlaydi?",
        faqZodiacA: "Biz sizning turli hayotiy vaziyatlardagi xatti-harakatingiz haqida 10 ta savoldan foydalanamiz. Javoblaringiz 12 xitoy zodiak belgisining o'ziga xos psixologik naqshlari bilan solishtiriladi. Bu shaxsiy ma'lumot talab qilmaydigan sizning \"xulq-atvor kodingizni\" yaratadi.",
        faqCompatQ: "💑 Xitoy zodiaki moslik tahlili qanchalik aniq?",
        faqCompatA: "Bizning algoritmimiz an'anaviy xitoy moslik uchburchaklarini belgilarning tabiiy elementlari bilan birlashtiradi. Chuqurroq sinastriya tahlili uchun (tug'ilgan sanaga asoslangan) Telegram botimizdan foydalaning.",
        faqWesternVedicQ: "🔭 G'arb va vedik astrologiya o'rtasidagi farq nima?",
        faqWesternVedicA: "G'arb astrologiyasi tropik zodiakdan (fasllarga asoslangan) foydalansa, vedik (Jyotish) sidereal zodiakdan (qo'zg'almas yulduzlar) foydalanadi. Farq taxminan 24°. Bizning botimizda G'arb an'anasida to'liq tug'ilish xaritasini olishingiz mumkin.",
        faqFreeQ: "🆓 Bu haqiqatan ham bepul va ishonchlimi?",
        faqFreeA: "Ha! Test, natija va asosiy moslik butunlay bepul va ro'yxatdan o'tishni talab qilmaydi. Biz serverlarimizda hech qanday shaxsiy ma'lumotni saqlamaymiz — barcha ma'lumotlar brauzeringizda mahalliy ravishda qoladi.",
        mercuryTracker: "📡 Merkuriy Retrogradini Kuzatuvchi",
        mercuryDesc: "Bugun Merkuriy retrogradini qanchalik his qilyapsiz? (0–10)",
        save: 'Saqlash',
        copyLink: "Havolani nusxalab, natijangizni ulashing!",
        zcResultPrefix: "Siz quyidagi yilda tug'ilgansiz: ",
        zcElementLabel: 'Element',
        zcCta: "To'liq shaxsiyat tahlilini xohlaysizmi? Yuqoridagi bepul arxetip testini bajaring ↑"
      },
      kk: {
        ctaFooter: '⚡ TELEGRAM-ДА ТОЛЫҚ ЕСЕП АЛУ',
        next: 'Келесі',
        result: 'Нәтижені көру',
        compatCheck: 'Үйлесімділікті тексеру',
        share: 'Бөлісу',
        love: 'Махаббат',
        friendship: 'Достық',
        work: 'Жұмыс',
        greatHarmony: 'Тамаша үйлесімділік!',
        goodPotential: 'Жақсы әлеует, қарым-қатынасты жақсартыңыз',
        challenging: 'Қиын, бірақ өсу мүмкін',
        dynamicCTATitle: 'Жеке есеп қалайсыз ба?',
        dynamicCTAText: 'Толық туу картаңызды есептеу үшін біз Swiss Ephemeris қолданамыз. Telegram ботымыздан толық PDF есеп алыңыз! Әлі сенімді емессіз бе? Алдымен үлгі PDF есептерді қарап, өзіңіз көре аласыз.',
        dynamicCTABtn: '⚡ ТОЛЫҚ АУДИТ АЛУ',
        samplePdfLink: 'Үлгі PDF есепті қарау',
        selectPartner: 'Серіктес белгісін таңдаңыз',
        techTitle: '📡 Технология және Астрологиялық Дәстүрлер',
        techDesc: '<strong>AstroScan батыс тропикалық зодиагын</strong> және кәсіби Swiss Ephemeris v2.10 қолданады. Бірақ картаңыз басқа жүйелерде қалай көрінеді?',
        westernVedic: '🌍 Батыс vs. Ведалық (Джйотиш)',
        westernVedicDesc: 'Батыс астрологиясы тропикалық зодиакке (мезгілдерге) назар аударады, ал ведалық астрология сидерикалық зодиакты (тұрақты жұлдыздар) қолданады. Айырмашылық шамамен 24° (Аянамша).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Есептерге өмір бойы қолжетімділік үшін XTR жұмсаңыз. 200 Star ≈ 2,80 АҚШ доллары.',
        forPros: '🧑‍🏫 Мамандарға арналған',
        forProsDesc: 'White-label есептерді 2 минутта жасаңыз.',
        chooseAnalysis: '⚡ Талдауды таңдаңыз',
        natal: '🌌 Туу картасы',
        natalDesc: 'Күн, Ай, Асцендент',
        compat: '💞 Үйлесімділік',
        compatDesc: 'Синастрия',
        career: '💰 Мансап',
        careerDesc: 'Мансап және Қаржы',
        child: '🧸 Бала',
        childDesc: 'Баланың картасы',
        faqTitle: '❓ Жиі Қойылатын Сұрақтар',
        faqMoonQ: '🌙 Неге менің Ай белгім мінезімнен өзгеше сезіледі?',
        faqMoonA: 'Ай сіздің бейсаналы санаңызды бейнелейді — саналы «менге» сәйкес келмеуі мүмкін ішкі реакциялар мен эмоцияларды. Ай белгіңіз сыртқы жеке басыңызды толықтырып, психикаңыздың терең қабатын ашады.',
        faqMathQ: '🧮 Астрология математика ма, әлде сиқыр ма?',
        faqMathA: 'Планеталардың орналасуы Swiss Ephemeris көмегімен жоғары ғылыми дәлдікпен есептеледі. Түсіндірме — өзіңізді жақсырақ түсінуге көмектесетін символдық модель.',
        faqZodiacQ: '🤔 Тест туған күнімсіз белгімді қалай анықтайды?',
        faqZodiacA: 'Біз сіздің әртүрлі өмірлік жағдайлардағы мінез-құлқыңыз туралы 10 сұрақ қолданамыз. Жауаптарыңыз 12 қытай зодиак белгісінің бірегей психологиялық үлгілерімен салыстырылады. Бұл жеке деректерсіз сіздің «мінез-құлық кодыңызды» жасайды.',
        faqCompatQ: '💑 Қытай зодиагы бойынша үйлесімділік талдауы қаншалықты дәл?',
        faqCompatA: 'Біздің алгоритмiмiз дәстүрлі қытай үйлесімділік үшбұрыштарын белгілердің табиғи элементтерімен біріктіреді. Тереңірек синастрия талдауы үшін (туған күнге негізделген) Telegram ботымызды қолданыңыз.',
        faqWesternVedicQ: '🔭 Батыс және ведалық астрология арасындағы айырмашылық қандай?',
        faqWesternVedicA: 'Батыс астрологиясы тропикалық зодиакты (мезгілдерге негізделген) қолданса, ведалық (Джйотиш) сидерикалық зодиакты (тұрақты жұлдыздар) қолданады. Айырмашылық шамамен 24°. Біздің ботта батыс дәстүрі бойынша толық туу картасын ала аласыз.',
        faqFreeQ: '🆓 Бұл шынымен тегін және сенімді ме?',
        faqFreeA: 'Иә! Тест, нәтиже және негізгі үйлесімділік толығымен тегін және тіркеуді талап етпейді. Біз серверлерімізде ешқандай жеке деректерді сақтамаймыз — барлық ақпарат браузеріңізде жергілікті түрде қалады.',
        mercuryTracker: '📡 Ретроградты Меркурий Трекері',
        mercuryDesc: 'Бүгін ретроградты Меркурийдің әсерін қаншалықты сезінесіз? (0–10)',
        save: 'Сақтау',
        copyLink: 'Сілтемені көшіріп, нәтижеңізбен бөлісіңіз!',
        zcResultPrefix: 'Сіз мына жылы туылдыңыз: ',
        zcElementLabel: 'Элемент',
        zcCta: 'Толық тұлғалық талдау керек пе? Жоғарыдағы тегін архетип тестінен өтіңіз ↑'
      },
      fr: {
        ctaFooter: '⚡ OBTENEZ LE RAPPORT COMPLET SUR TELEGRAM',
        next: 'Suivant',
        result: 'Voir le résultat',
        compatCheck: 'Vérifier la compatibilité',
        share: 'Partager',
        love: 'Amour',
        friendship: 'Amitié',
        work: 'Travail',
        greatHarmony: 'Excellente harmonie !',
        goodPotential: 'Bon potentiel, travaillez la communication',
        challenging: 'Difficile mais une évolution est possible',
        dynamicCTATitle: 'Vous voulez un rapport personnalisé ?',
        dynamicCTAText: "Nous utilisons Swiss Ephemeris pour calculer votre thème astral complet. Obtenez un rapport PDF détaillé sur notre bot Telegram ! Pas encore convaincu ? Vous pouvez d'abord consulter des exemples de rapports PDF et voir par vous-même.",
        dynamicCTABtn: '⚡ OBTENIR MON AUDIT COMPLET',
        samplePdfLink: 'Voir un exemple de rapport PDF',
        selectPartner: 'Choisissez le signe du partenaire',
        techTitle: '📡 Technologie &amp; Traditions Astrologiques',
        techDesc: "<strong>AstroScan utilise le zodiaque tropical occidental</strong> et le Swiss Ephemeris v2.10 professionnel. Mais à quoi ressemble votre thème dans d'autres systèmes ?",
        westernVedic: '🌍 Occidental vs. Védique (Jyotish)',
        westernVedicDesc: "L'astrologie occidentale se concentre sur le zodiaque tropical (les saisons), tandis que l'astrologie védique utilise le zodiaque sidéral (les étoiles fixes). La différence est d'environ 24° (Ayanamsha).",
        starsTitle: '⭐️ Étoiles Telegram',
        starsDesc: "Dépensez des XTR pour un accès à vie aux audits. 200 Étoiles ≈ 2,80 $ USD.",
        forPros: '🧑‍🏫 Pour les Professionnels',
        forProsDesc: 'Générez des rapports en marque blanche en 2 minutes.',
        chooseAnalysis: '⚡ Choisissez une Analyse',
        natal: '🌌 Natal',
        natalDesc: 'Soleil, Lune, Ascendant',
        compat: '💞 Compatibilité',
        compatDesc: 'Synastrie',
        career: '💰 Carrière',
        careerDesc: 'Carrière &amp; Finances',
        child: '🧸 Enfant',
        childDesc: "Thème de l'Enfant",
        faqTitle: '❓ FAQ',
        faqMoonQ: '🌙 Pourquoi mon signe lunaire semble-t-il différent de ma personnalité ?',
        faqMoonA: "La Lune représente votre subconscient — des réactions et émotions intérieures qui peuvent ne pas correspondre à votre moi conscient. Votre signe lunaire complète votre personnalité de surface, révélant une couche plus profonde de votre psychisme.",
        faqMathQ: "🧮 L'astrologie est-elle une science ou de la magie ?",
        faqMathA: "Les positions planétaires sont calculées avec une grande précision scientifique grâce à Swiss Ephemeris. L'interprétation est un modèle symbolique qui vous aide à mieux vous comprendre.",
        faqZodiacQ: '🤔 Comment le test détermine-t-il mon signe sans ma date de naissance ?',
        faqZodiacA: "Nous utilisons 10 questions sur votre comportement dans différentes situations de la vie. Vos réponses sont comparées aux schémas psychologiques uniques des 12 signes du zodiaque chinois. Cela crée votre « code comportemental » — sans besoin de données personnelles.",
        faqCompatQ: "💑 Quelle est la précision de l'analyse de compatibilité du zodiaque chinois ?",
        faqCompatA: "Notre algorithme combine les triangles de compatibilité chinois traditionnels avec les éléments naturels des signes. Pour une analyse de synastrie plus approfondie (basée sur les dates de naissance), utilisez notre bot Telegram.",
        faqWesternVedicQ: "🔭 Quelle est la différence entre l'astrologie occidentale et védique ?",
        faqWesternVedicA: "L'astrologie occidentale utilise le zodiaque tropical (basé sur les saisons), tandis que la védique (Jyotish) utilise le zodiaque sidéral (étoiles fixes). La différence est d'environ 24°. Sur notre bot, vous pouvez obtenir un thème natal complet dans la tradition occidentale.",
        faqFreeQ: '🆓 Est-ce vraiment gratuit et fiable ?',
        faqFreeA: "Oui ! Le test, le résultat et la compatibilité de base sont entièrement gratuits et ne nécessitent aucune inscription. Nous ne stockons aucune donnée personnelle sur nos serveurs — toutes les informations restent localement dans votre navigateur.",
        mercuryTracker: '📡 Suivi de Mercure Rétrograde',
        mercuryDesc: "À quel point ressentez-vous Mercure rétrograde aujourd'hui ? (0–10)",
        save: 'Enregistrer',
        copyLink: 'Copiez le lien et partagez votre résultat !',
        zcResultPrefix: "Vous êtes né(e) l'année du ",
        zcElementLabel: 'Élément',
        zcCta: "Vous voulez une analyse complète de votre personnalité ? Passez le test d'archétype gratuit ci-dessus ↑"
      },
      de: {
        ctaFooter: '⚡ VOLLSTÄNDIGEN BERICHT IN TELEGRAM ERHALTEN',
        next: 'Weiter',
        result: 'Ergebnis ansehen',
        compatCheck: 'Kompatibilität prüfen',
        share: 'Teilen',
        love: 'Liebe',
        friendship: 'Freundschaft',
        work: 'Arbeit',
        greatHarmony: 'Großartige Harmonie!',
        goodPotential: 'Gutes Potenzial, arbeiten Sie an der Kommunikation',
        challenging: 'Herausfordernd, aber Wachstum ist möglich',
        dynamicCTATitle: 'Möchten Sie einen personalisierten Bericht?',
        dynamicCTAText: 'Wir nutzen Swiss Ephemeris, um Ihr vollständiges Geburtshoroskop zu berechnen. Erhalten Sie einen ausführlichen PDF-Bericht in unserem Telegram-Bot! Noch unsicher? Sie können sich zunächst Beispiel-PDF-Berichte ansehen und sich selbst überzeugen.',
        dynamicCTABtn: '⚡ MEIN VOLLSTÄNDIGES AUDIT ERHALTEN',
        samplePdfLink: 'Beispiel-PDF-Bericht ansehen',
        selectPartner: 'Partner-Sternzeichen auswählen',
        techTitle: '📡 Technologie &amp; Astrologische Traditionen',
        techDesc: '<strong>AstroScan verwendet den westlichen tropischen Tierkreis</strong> und das professionelle Swiss Ephemeris v2.10. Aber wie sieht Ihr Horoskop in anderen Systemen aus?',
        westernVedic: '🌍 Westlich vs. Vedisch (Jyotish)',
        westernVedicDesc: 'Die westliche Astrologie konzentriert sich auf den tropischen Tierkreis (Jahreszeiten), während die vedische Astrologie den siderischen Tierkreis (Fixsterne) verwendet. Der Unterschied beträgt etwa 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Geben Sie XTR für lebenslangen Zugang zu Auswertungen aus. 200 Stars ≈ 2,80 USD.',
        forPros: '🧑‍🏫 Für Profis',
        forProsDesc: 'Erstellen Sie White-Label-Berichte in 2 Minuten.',
        chooseAnalysis: '⚡ Analyse wählen',
        natal: '🌌 Geburtshoroskop',
        natalDesc: 'Sonne, Mond, Aszendent',
        compat: '💞 Kompatibilität',
        compatDesc: 'Synastrie',
        career: '💰 Karriere',
        careerDesc: 'Karriere &amp; Finanzen',
        child: '🧸 Kind',
        childDesc: 'Horoskop des Kindes',
        faqTitle: '❓ Häufig gestellte Fragen',
        faqMoonQ: '🌙 Warum fühlt sich mein Mondzeichen anders an als meine Persönlichkeit?',
        faqMoonA: 'Der Mond repräsentiert Ihr Unterbewusstsein — innere Reaktionen und Emotionen, die möglicherweise nicht mit Ihrem bewussten Selbst übereinstimmen. Ihr Mondzeichen ergänzt Ihre oberflächliche Persönlichkeit und offenbart eine tiefere Ebene Ihrer Psyche.',
        faqMathQ: '🧮 Ist Astrologie Mathematik oder Magie?',
        faqMathA: 'Planetenpositionen werden mit hoher wissenschaftlicher Präzision mithilfe von Swiss Ephemeris berechnet. Die Interpretation ist ein symbolisches Modell, das Ihnen hilft, sich selbst besser zu verstehen.',
        faqZodiacQ: '🤔 Wie bestimmt der Test mein Zeichen ohne mein Geburtsdatum?',
        faqZodiacA: 'Wir verwenden 10 Fragen zu Ihrem Verhalten in verschiedenen Lebenssituationen. Ihre Antworten werden mit einzigartigen psychologischen Mustern der 12 chinesischen Tierkreiszeichen verglichen. Dies erstellt Ihren „Verhaltenscode" — ganz ohne persönliche Daten.',
        faqCompatQ: '💑 Wie genau ist die Kompatibilitätsanalyse des chinesischen Tierkreises?',
        faqCompatA: 'Unser Algorithmus kombiniert traditionelle chinesische Kompatibilitätsdreiecke mit den natürlichen Elementen der Zeichen. Für eine tiefere Synastrie-Analyse (basierend auf Geburtsdaten) nutzen Sie unseren Telegram-Bot.',
        faqWesternVedicQ: '🔭 Was ist der Unterschied zwischen westlicher und vedischer Astrologie?',
        faqWesternVedicA: 'Die westliche Astrologie verwendet den tropischen Tierkreis (basierend auf Jahreszeiten), während die vedische (Jyotish) den siderischen Tierkreis (Fixsterne) verwendet. Der Unterschied beträgt etwa 24°. In unserem Bot können Sie ein vollständiges Geburtshoroskop in der westlichen Tradition erhalten.',
        faqFreeQ: '🆓 Ist das wirklich kostenlos und zuverlässig?',
        faqFreeA: 'Ja! Der Test, das Ergebnis und die grundlegende Kompatibilität sind völlig kostenlos und erfordern keine Registrierung. Wir speichern keine persönlichen Daten auf unseren Servern — alle Informationen bleiben lokal in Ihrem Browser.',
        mercuryTracker: '📡 Merkur-Rückläufig-Tracker',
        mercuryDesc: 'Wie stark spüren Sie heute den Merkur rückläufig? (0–10)',
        save: 'Speichern',
        copyLink: 'Kopieren Sie den Link und teilen Sie Ihr Ergebnis!',
        zcResultPrefix: 'Sie wurden im Jahr des ',
        zcElementLabel: 'Element',
        zcCta: 'Möchten Sie eine vollständige Persönlichkeitsanalyse? Machen Sie oben den kostenlosen Archetyp-Test ↑'
      },
      lo: {
        ctaFooter: '⚡ ຮັບລາຍງານເຕັມຢູ່ TELEGRAM',
        next: 'ຕໍ່ໄປ',
        result: 'ເບິ່ງຜົນລັບ',
        compatCheck: 'ກວດສອບຄວາມເຂົ້າກັນໄດ້',
        share: 'ແບ່ງປັນ',
        love: 'ຄວາມຮັກ',
        friendship: 'ມິດຕະພາບ',
        work: 'ວຽກ',
        greatHarmony: 'ຄວາມກົມກຽວອັນຍິ່ງໃຫຍ່!',
        goodPotential: 'ມີທ່າແຮງດີ, ຄວນປັບປຸງການສື່ສານ',
        challenging: 'ທ້າທາຍແຕ່ຍັງພັດທະນາໄດ້',
        dynamicCTATitle: 'ຢາກໄດ້ລາຍງານສະເພາະຕົວບໍ?',
        dynamicCTAText: 'ພວກເຮົາໃຊ້ Swiss Ephemeris ເພື່ອຄິດໄລ່ຜັງດວງຊະຕາເຕັມຂອງທ່ານ. ຮັບລາຍງານ PDF ລະອຽດຢູ່ໃນ Telegram bot ຂອງພວກເຮົາ! ຍັງບໍ່ແນ່ໃຈບໍ? ທ່ານສາມາດເບິ່ງຕົວຢ່າງລາຍງານ PDF ກ່ອນເພື່ອພິສູດດ້ວຍຕົນເອງ.',
        dynamicCTABtn: '⚡ ຮັບການກວດສອບເຕັມຂອງຂ້ອຍ',
        samplePdfLink: 'ເບິ່ງຕົວຢ່າງລາຍງານ PDF',
        selectPartner: 'ເລືອກນັກສັດຂອງຄູ່',
        techTitle: '📡 ເທັກໂນໂລຊີ ແລະ ປະເພນີດ້ານໂຫລາສາດ',
        techDesc: '<strong>AstroScan ໃຊ້ຈັກກະລາດຕາເວັນຕົກແບບ Tropical</strong> ແລະ Swiss Ephemeris v2.10 ແບບມືອາຊີບ. ແຕ່ຜັງດວງຂອງທ່ານເປັນແນວໃດໃນລະບົບອື່ນ?',
        westernVedic: '🌍 ຕາເວັນຕົກ vs. ເວດ (Jyotish)',
        westernVedicDesc: 'ໂຫລາສາດຕາເວັນຕົກເນັ້ນໃສ່ຈັກກະລາດແບບ Tropical (ລະດູການ), ໃນຂະນະທີ່ໂຫລາສາດເວດໃຊ້ຈັກກະລາດແບບ Sidereal (ດວງດາວຄົງທີ່). ຄວາມແຕກຕ່າງແມ່ນປະມານ 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'ໃຊ້ XTR ເພື່ອເຂົ້າເຖິງການກວດສອບຕະຫຼອດຊີວິດ. 200 Stars ≈ 2.80 ໂດລາສະຫະລັດ.',
        forPros: '🧑‍🏫 ສຳລັບຜູ້ຊ່ຽວຊານ',
        forProsDesc: 'ສ້າງລາຍງານ white-label ພາຍໃນ 2 ນາທີ.',
        chooseAnalysis: '⚡ ເລືອກການວິເຄາະ',
        natal: '🌌 ຜັງດວງຊະຕາ',
        natalDesc: 'ຕາເວັນ, ດວງເດືອນ, ລັກນະ',
        compat: '💞 ຄວາມເຂົ້າກັນໄດ້',
        compatDesc: 'ຊິນາສທຣີ',
        career: '💰 ອາຊີບ',
        careerDesc: 'ອາຊີບ ແລະ ການເງິນ',
        child: '🧸 ເດັກນ້ອຍ',
        childDesc: 'ຜັງດວງເດັກນ້ອຍ',
        faqTitle: '❓ ຄຳຖາມທີ່ພົບເລື້ອຍ',
        faqMoonQ: '🌙 ເປັນຫຍັງນັກສັດດວງເດືອນຂອງຂ້ອຍຮູ້ສຶກແຕກຕ່າງຈາກບຸກຄະລິກຂອງຂ້ອຍ?',
        faqMoonA: 'ດວງເດືອນເປັນຕົວແທນຂອງຈິດໃຕ້ສຳນຶກຂອງທ່ານ — ປະຕິກິລິຍາ ແລະ ອາລົມພາຍໃນທີ່ອາດບໍ່ກົງກັບຕົວຕົນທີ່ມີສະຕິຂອງທ່ານ. ນັກສັດດວງເດືອນຂອງທ່ານເສີມສ້າງບຸກຄະລິກພາຍນອກ, ເປີດເຜີຍຊັ້ນເລິກຂອງຈິດໃຈຂອງທ່ານ.',
        faqMathQ: '🧮 ໂຫລາສາດແມ່ນຄະນິດສາດ ຫຼື ເວດມົນ?',
        faqMathA: 'ຕຳແໜ່ງດາວເຄາະຖືກຄິດໄລ່ດ້ວຍຄວາມແມ່ນຢຳທາງວິທະຍາສາດສູງໂດຍໃຊ້ Swiss Ephemeris. ການຕີຄວາມໝາຍແມ່ນແບບຈຳລອງສັນຍາລັກທີ່ຊ່ວຍໃຫ້ທ່ານເຂົ້າໃຈຕົນເອງດີຂຶ້ນ.',
        faqZodiacQ: '🤔 ແບບທົດສອບກຳນົດນັກສັດຂອງຂ້ອຍໂດຍບໍ່ມີວັນເກີດແນວໃດ?',
        faqZodiacA: 'ພວກເຮົາໃຊ້ 10 ຄຳຖາມກ່ຽວກັບພຶດຕິກຳຂອງທ່ານໃນສະຖານະການຊີວິດຕ່າງໆ. ຄຳຕອບຂອງທ່ານຖືກປຽບທຽບກັບຮູບແບບຈິດຕະສາດສະເພາະຂອງນັກສັດຈີນທັງ 12 ໂຕ. ນີ້ສ້າງ "ລະຫັດພຶດຕິກຳ" ຂອງທ່ານ — ບໍ່ຈຳເປັນຕ້ອງມີຂໍ້ມູນສ່ວນຕົວ.',
        faqCompatQ: '💑 ການວິເຄາະຄວາມເຂົ້າກັນໄດ້ຂອງນັກສັດຈີນແມ່ນຖືກຕ້ອງແນວໃດ?',
        faqCompatA: 'ອັນກໍລິທຶມຂອງພວກເຮົາລວມສາມຫຼ່ຽມຄວາມເຂົ້າກັນໄດ້ແບບດັ້ງເດີມຂອງຈີນເຂົ້າກັບທາດທຳມະຊາດຂອງນັກສັດ. ສຳລັບການວິເຄາະຊິນາສທຣີແບບເລິກກວ່າ (ອີງໃສ່ວັນເກີດ), ໃຫ້ໃຊ້ Telegram bot ຂອງພວກເຮົາ.',
        faqWesternVedicQ: '🔭 ຄວາມແຕກຕ່າງລະຫວ່າງໂຫລາສາດຕາເວັນຕົກ ແລະ ເວດແມ່ນຫຍັງ?',
        faqWesternVedicA: 'ໂຫລາສາດຕາເວັນຕົກໃຊ້ຈັກກະລາດແບບ Tropical (ອີງໃສ່ລະດູການ), ໃນຂະນະທີ່ເວດ (Jyotish) ໃຊ້ຈັກກະລາດແບບ Sidereal (ດວງດາວຄົງທີ່). ຄວາມແຕກຕ່າງແມ່ນປະມານ 24°. ໃນ bot ຂອງພວກເຮົາ, ທ່ານສາມາດຮັບຜັງດວງຊະຕາເຕັມຕາມປະເພນີຕາເວັນຕົກໄດ້.',
        faqFreeQ: '🆓 ອັນນີ້ຟຣີ ແລະ ເຊື່ອຖືໄດ້ແທ້ບໍ?',
        faqFreeA: 'ແມ່ນແລ້ວ! ແບບທົດສອບ, ຜົນລັບ ແລະ ຄວາມເຂົ້າກັນໄດ້ພື້ນຖານແມ່ນຟຣີທັງໝົດ ແລະ ບໍ່ຈຳເປັນຕ້ອງລົງທະບຽນ. ພວກເຮົາບໍ່ເກັບຮັກສາຂໍ້ມູນສ່ວນຕົວໃດໆຢູ່ໃນເຊີບເວີຂອງພວກເຮົາ — ຂໍ້ມູນທັງໝົດຍັງຄົງຢູ່ໃນບຣາວເຊີຂອງທ່ານເທົ່ານັ້ນ.',
        mercuryTracker: '📡 ຕິດຕາມດາວພະຫັດຖອຍຫຼັງ',
        mercuryDesc: 'ມື້ນີ້ທ່ານຮູ້ສຶກເຖິງອິດທິພົນຂອງດາວພະຫັດຖອຍຫຼັງແຮງແນວໃດ? (0–10)',
        save: 'ບັນທຶກ',
        copyLink: 'ສຳເນົາລິ້ງ ແລະ ແບ່ງປັນຜົນລັບຂອງທ່ານ!',
        zcResultPrefix: 'ທ່ານເກີດປີ ',
        zcElementLabel: 'ທາດ',
        zcCta: 'ຢາກໄດ້ການວິເຄາະບຸກຄະລິກເຕັມບໍ? ເຮັດແບບທົດສອບຕົ້ນແບບຟຣີຂ້າງເທິງ ↑'
      },
      it: {
        ctaFooter: '⚡ RICEVI IL REPORT COMPLETO SU TELEGRAM',
        next: 'Avanti',
        result: 'Vedi risultato',
        compatCheck: 'Controlla compatibilità',
        share: 'Condividi',
        love: 'Amore',
        friendship: 'Amicizia',
        work: 'Lavoro',
        greatHarmony: 'Grande armonia!',
        goodPotential: 'Buon potenziale, lavora sulla comunicazione',
        challenging: 'Difficile ma la crescita è possibile',
        dynamicCTATitle: 'Vuoi un report personalizzato?',
        dynamicCTAText: 'Usiamo Swiss Ephemeris per calcolare il tuo tema natale completo. Ricevi un report PDF dettagliato nel nostro bot Telegram! Non sei ancora sicuro? Puoi prima consultare alcuni report di esempio e verificare di persona.',
        dynamicCTABtn: '⚡ OTTIENI LA MIA ANALISI COMPLETA',
        samplePdfLink: 'Vedi un report PDF di esempio',
        selectPartner: 'Scegli il segno del partner',
        techTitle: '📡 Tecnologia e Tradizioni Astrologiche',
        techDesc: '<strong>AstroScan utilizza lo zodiaco tropicale occidentale</strong> e le professionali Swiss Ephemeris v2.10. Ma come appare il tuo tema in altri sistemi?',
        westernVedic: '🌍 Occidentale vs. Vedica (Jyotish)',
        westernVedicDesc: 'L\'astrologia occidentale si basa sullo zodiaco tropicale (le stagioni), mentre quella vedica utilizza lo zodiaco siderale (le stelle fisse). La differenza è di circa 24° (Ayanamsha).',
        starsTitle: '⭐️ Telegram Stars',
        starsDesc: 'Usa gli XTR per un accesso a vita alle analisi. 200 Stelle ≈ 2,80 $.',
        forPros: '🧑‍🏫 Per Professionisti',
        forProsDesc: 'Genera report white‑label in 2 minuti.',
        chooseAnalysis: '⚡ Scegli l\'Analisi',
        natal: '🌌 Natale',
        natalDesc: 'Sole, Luna, Ascendente',
        compat: '💞 Compatibilità',
        compatDesc: 'Sinastria',
        career: '💰 Carriera',
        careerDesc: 'Carriera e Finanze',
        child: '🧸 Bambino',
        childDesc: 'Tema del Bambino',
        faqTitle: '❓ Domande Frequenti',
        faqMoonQ: '🌙 Perché il mio segno lunare sembra diverso dalla mia personalità?',
        faqMoonA: 'La Luna rappresenta il tuo subconscio — reazioni ed emozioni interiori che possono non allinearsi con il tuo io cosciente. Il tuo segno lunare completa la tua personalità superficiale, rivelando uno strato più profondo della tua psiche.',
        faqMathQ: '🧮 L\'astrologia è matematica o magia?',
        faqMathA: 'Le posizioni planetarie vengono calcolate con alta precisione scientifica usando Swiss Ephemeris. L\'interpretazione è un modello simbolico che ti aiuta a comprenderti meglio.',
        faqZodiacQ: '🤔 Come fa il test a determinare il mio segno senza la mia data di nascita?',
        faqZodiacA: 'Utilizziamo 10 domande sul tuo comportamento in diverse situazioni di vita. Le tue risposte vengono confrontate con i modelli psicologici unici dei 12 segni dello zodiaco cinese. Questo crea il tuo "codice comportamentale" — senza bisogno di dati personali.',
        faqCompatQ: '💑 Quanto è accurata l\'analisi di compatibilità dello zodiaco cinese?',
        faqCompatA: 'Il nostro algoritmo combina i tradizionali triangoli di compatibilità cinesi con gli elementi naturali dei segni. Per un\'analisi di sinastria più approfondita (basata sulle date di nascita), usa il nostro bot Telegram.',
        faqWesternVedicQ: '🔭 Qual è la differenza tra astrologia occidentale e vedica?',
        faqWesternVedicA: 'L\'astrologia occidentale utilizza lo zodiaco tropicale (basato sulle stagioni), mentre quella vedica (Jyotish) utilizza lo zodiaco siderale (stelle fisse). La differenza è di circa 24°. Nel nostro bot puoi ottenere un tema natale completo nella tradizione occidentale.',
        faqFreeQ: '🆓 È davvero gratuito e affidabile?',
        faqFreeA: 'Sì! Il test, il risultato e la compatibilità di base sono completamente gratuiti e non richiedono registrazione. Non conserviamo alcun dato personale sui nostri server — tutte le informazioni restano localmente nel tuo browser.',
        mercuryTracker: '📡 Tracker di Mercurio Retrogrado',
        mercuryDesc: 'Quanto senti forte Mercurio retrogrado oggi? (0–10)',
        save: 'Salva',
        copyLink: 'Copia il link e condividi il tuo risultato!',
        zcResultPrefix: 'Sei nato nell\'Anno del ',
        zcElementLabel: 'Elemento',
        zcCta: 'Vuoi un\'analisi completa della personalità? Fai il test gratuito dell\'archetipo qui sopra ↑'
      },
      ar: {
        ctaFooter: '⚡ احصل على التقرير الكامل عبر تيليجرام',
        next: 'التالي',
        result: 'عرض النتيجة',
        compatCheck: 'تحقق من التوافق',
        share: 'مشاركة',
        love: 'الحب',
        friendship: 'الصداقة',
        work: 'العمل',
        greatHarmony: 'انسجام رائع!',
        goodPotential: 'إمكانية جيدة، اعملا على التواصل',
        challenging: 'تحدٍ لكن النمو ممكن',
        dynamicCTATitle: 'هل تريد تقريرًا شخصيًا؟',
        dynamicCTAText: 'نستخدم Swiss Ephemeris لحساب خريطتك الفلكية الكاملة. احصل على تقرير PDF مفصّل عبر بوت تيليجرام الخاص بنا! لست متأكدًا بعد؟ يمكنك أولًا الاطّلاع على نماذج من التقارير والتأكد بنفسك.',
        dynamicCTABtn: '⚡ احصل على تحليلي الكامل',
        samplePdfLink: 'عرض نموذج تقرير PDF',
        selectPartner: 'اختر برج الشريك',
        techTitle: '📡 التقنية والتقاليد الفلكية',
        techDesc: '<strong>يستخدم AstroScan الأبراج المدارية الغربية</strong> وبرنامج Swiss Ephemeris v2.10 الاحترافي. لكن كيف تبدو خريطتك في الأنظمة الأخرى؟',
        westernVedic: '🌍 الغربي مقابل الفيدي (جيوتيش)',
        westernVedicDesc: 'يركّز علم التنجيم الغربي على الأبراج المدارية (المرتبطة بالفصول)، بينما يستخدم التنجيم الفيدي الأبراج النجمية (الثابتة). يبلغ الفرق بينهما نحو 24° (أيانامشا).',
        starsTitle: '⭐️ نجوم تيليجرام (Telegram Stars)',
        starsDesc: 'أنفق XTR للحصول على وصول مدى الحياة إلى التحليلات. 200 نجمة ≈ 2.80 دولار أمريكي.',
        forPros: '🧑‍🏫 للمحترفين',
        forProsDesc: 'أنشئ تقارير بعلامتك الخاصة (white‑label) خلال دقيقتين.',
        chooseAnalysis: '⚡ اختر التحليل',
        natal: '🌌 الميلادية',
        natalDesc: 'الشمس، القمر، الطالع',
        compat: '💞 التوافق',
        compatDesc: 'المقارنة الفلكية (Synastry)',
        career: '💰 المهنة',
        careerDesc: 'المهنة والمال',
        child: '🧸 الطفل',
        childDesc: 'خريطة الطفل',
        faqTitle: '❓ الأسئلة الشائعة',
        faqMoonQ: '🌙 لماذا يبدو برجي القمري مختلفًا عن شخصيتي؟',
        faqMoonA: 'يمثّل القمر عقلك الباطن — ردود الأفعال والمشاعر الداخلية التي قد لا تتماشى مع ذاتك الواعية. يكمّل برجك القمري شخصيتك الظاهرة، كاشفًا عن طبقة أعمق من نفسيتك.',
        faqMathQ: '🧮 هل التنجيم رياضيات أم سحر؟',
        faqMathA: 'تُحسب مواقع الكواكب بدقة علمية عالية باستخدام Swiss Ephemeris. أما التفسير فهو نموذج رمزي يساعدك على فهم نفسك بشكل أفضل.',
        faqZodiacQ: '🤔 كيف يحدّد الاختبار برجي دون معرفة تاريخ ميلادي؟',
        faqZodiacA: 'نستخدم 10 أسئلة حول سلوكك في مواقف حياتية مختلفة. تُقارَن إجاباتك بأنماط نفسية فريدة لأبراج الحيوانات الصينية الاثني عشر. هذا يُنشئ "شفرتك السلوكية" — دون الحاجة لأي بيانات شخصية.',
        faqCompatQ: '💑 ما مدى دقة تحليل التوافق حسب الأبراج الصينية؟',
        faqCompatA: 'تجمع خوارزميتنا بين مثلثات التوافق الصينية التقليدية والعناصر الطبيعية للأبراج. للحصول على تحليل توافق أعمق (بناءً على تواريخ الميلاد)، استخدم بوت تيليجرام الخاص بنا.',
        faqWesternVedicQ: '🔭 ما الفرق بين علم التنجيم الغربي والفيدي؟',
        faqWesternVedicA: 'يستخدم علم التنجيم الغربي الأبراج المدارية (المرتبطة بالفصول)، بينما يستخدم الفيدي (جيوتيش) الأبراج النجمية الثابتة. الفرق بينهما نحو 24°. يمكنك عبر بوتنا الحصول على خريطة ميلادية كاملة وفق التقليد الغربي.',
        faqFreeQ: '🆓 هل هذا مجاني وموثوق فعلًا؟',
        faqFreeA: 'نعم! الاختبار والنتيجة والتوافق الأساسي مجانية بالكامل ولا تتطلب أي تسجيل. نحن لا نخزّن أي بيانات شخصية على خوادمنا — تبقى كل المعلومات محليًا في متصفحك.',
        mercuryTracker: '📡 متتبّع عطارد الرجعي',
        mercuryDesc: 'ما مدى شعورك بتأثير عطارد الرجعي اليوم؟ (0–10)',
        save: 'حفظ',
        copyLink: 'انسخ الرابط وشارك نتيجتك!',
        zcResultPrefix: 'وُلدتَ في سنة ',
        zcElementLabel: 'العنصر',
        zcCta: 'هل تريد تحليلًا كاملاً لشخصيتك؟ أجرِ اختبار النمط الشخصي المجاني أعلاه ↑'
      },
      fa: {
        ctaFooter: '⚡ دریافت گزارش کامل در تلگرام',
        next: 'بعدی',
        result: 'مشاهدهٔ نتیجه',
        compatCheck: 'بررسی سازگاری',
        share: 'اشتراک‌گذاری',
        love: 'عشق',
        friendship: 'دوستی',
        work: 'کار',
        greatHarmony: 'هماهنگی فوق‌العاده!',
        goodPotential: 'پتانسیل خوب، روی ارتباط کار کنید',
        challenging: 'چالش‌برانگیز اما رشد ممکن است',
        dynamicCTATitle: 'گزارشی شخصی‌سازی‌شده می‌خواهید؟',
        dynamicCTAText: 'ما از Swiss Ephemeris برای محاسبهٔ کامل طالع تولد شما استفاده می‌کنیم. گزارش PDF مفصل را در ربات تلگرام ما دریافت کنید! هنوز مطمئن نیستید؟ ابتدا می‌توانید نمونه گزارش‌ها را ببینید و خودتان قضاوت کنید.',
        dynamicCTABtn: '⚡ دریافت تحلیل کامل من',
        samplePdfLink: 'مشاهدهٔ نمونه گزارش PDF',
        selectPartner: 'نشان شریک را انتخاب کنید',
        techTitle: '📡 فناوری و سنت‌های نجومی',
        techDesc: '<strong>AstroScan از زودیاک مداری غربی</strong> و نرم‌افزار حرفه‌ای Swiss Ephemeris نسخهٔ ۲.۱۰ استفاده می‌کند. اما طالع شما در سایر سیستم‌ها چگونه است؟',
        westernVedic: '🌍 غربی در برابر ودایی (جیوتیش)',
        westernVedicDesc: 'طالع‌بینی غربی بر زودیاک مداری (فصل‌ها) تمرکز دارد، در حالی که طالع‌بینی ودایی از زودیاک نجومی (ستارگان ثابت) استفاده می‌کند. تفاوت آن‌ها حدود ۲۴ درجه (آیاناماشا) است.',
        starsTitle: '⭐️ استارز تلگرام',
        starsDesc: 'برای دسترسی دائمی به تحلیل‌ها، از XTR استفاده کنید. ۲۰۰ استار ≈ ۲.۸۰ دلار.',
        forPros: '🧑‍🏫 برای متخصصان',
        forProsDesc: 'در ۲ دقیقه گزارش‌های سفارشی (white‑label) بسازید.',
        chooseAnalysis: '⚡ تحلیل را انتخاب کنید',
        natal: '🌌 طالع تولد',
        natalDesc: 'خورشید، ماه، طالع',
        compat: '💞 سازگاری',
        compatDesc: 'سیناستری',
        career: '💰 شغل',
        careerDesc: 'شغل و مالی',
        child: '🧸 کودک',
        childDesc: 'طالع کودک',
        faqTitle: '❓ سؤالات متداول',
        faqMoonQ: '🌙 چرا نشان ماه من با شخصیتم متفاوت به نظر می‌رسد؟',
        faqMoonA: 'ماه نمایانگر ناخودآگاه شماست — واکنش‌ها و احساسات درونی که ممکن است با خودآگاه شما همخوانی نداشته باشد. نشان ماه شما شخصیت ظاهری‌تان را کامل می‌کند و لایه‌ای عمیق‌تر از روان شما را آشکار می‌سازد.',
        faqMathQ: '🧮 آیا طالع‌بینی ریاضی است یا جادو؟',
        faqMathA: 'موقعیت سیارات با دقت علمی بالا و با استفاده از Swiss Ephemeris محاسبه می‌شود. تفسیر آن یک مدل نمادین است که به شما کمک می‌کند خودتان را بهتر بشناسید.',
        faqZodiacQ: '🤔 این آزمون چگونه بدون تاریخ تولد، نشان زودیاک مرا تعیین می‌کند؟',
        faqZodiacA: 'ما از ۱۰ پرسش دربارهٔ رفتار شما در موقعیت‌های مختلف زندگی استفاده می‌کنیم. پاسخ‌های شما با الگوهای روان‌شناختی منحصربه‌فرد ۱۲ نشان زودیاک چینی مقایسه می‌شود. این کار «کد رفتاری» شما را می‌سازد — بدون نیاز به هیچ داده شخصی.',
        faqCompatQ: '💑 تحلیل سازگاری زودیاک چینی چقدر دقیق است؟',
        faqCompatA: 'الگوریتم ما مثلث‌های سنتی سازگاری چینی را با عناصر طبیعی نشان‌ها ترکیب می‌کند. برای تحلیل عمیق‌تر سیناستری (بر اساس تاریخ تولد)، از ربات تلگرام ما استفاده کنید.',
        faqWesternVedicQ: '🔭 تفاوت طالع‌بینی غربی و ودایی چیست؟',
        faqWesternVedicA: 'طالع‌بینی غربی از زودیاک مداری (بر اساس فصل‌ها) استفاده می‌کند، در حالی که ودایی (جیوتیش) از زودیاک نجومی (ستارگان ثابت) بهره می‌برد. تفاوت آن‌ها حدود ۲۴ درجه است. در ربات ما می‌توانید طالع تولد کامل به سبک غربی دریافت کنید.',
        faqFreeQ: '🆓 آیا این واقعاً رایگان و قابل‌اعتماد است؟',
        faqFreeA: 'بله! آزمون، نتیجه و سازگاری پایه کاملاً رایگان است و نیازی به ثبت‌نام ندارد. ما هیچ داده شخصی را روی سرورهایمان ذخیره نمی‌کنیم — همهٔ اطلاعات به‌صورت محلی در مرورگر شما باقی می‌ماند.',
        mercuryTracker: '📡 ردیاب عطارد رجعی',
        mercuryDesc: 'امروز چقدر تأثیر عطارد رجعی را احساس می‌کنید؟ (۰ تا ۱۰)',
        save: 'ذخیره',
        copyLink: 'لینک را کپی کنید و نتیجه‌تان را به اشتراک بگذارید!',
        zcResultPrefix: 'شما در سال ',
        zcElementLabel: 'عنصر',
        zcCta: 'می‌خواهید تحلیل کامل شخصیت را ببینید؟ آزمون رایگان کهن‌الگو را در بالا انجام دهید ↑'
      },
    };
    function setLang(lang) {
      currentLang = lang;
      document.body.className = document.body.className.replace(/lang-\w+/g,'');
      document.body.classList.add(`lang-${lang}`);
      localStorage.setItem('astroscan_lang', lang);
      const canonicalUrl = lang === 'en' 
          ? 'https://astroscan-lab.github.io/astroscan_bot/' 
          : `https://astroscan-lab.github.io/astroscan_bot/${lang}/`;
      document.querySelector('link[rel="canonical"]').setAttribute('href', canonicalUrl);
      document.documentElement.lang = lang;
      const url = new URL(window.location);
      if (lang === 'en') url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      window.history.replaceState(null, '', url);
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(`lang-${lang}`)?.classList.add('active');
      const t = translations[lang];
      document.getElementById('cta-footer').textContent = t.ctaFooter;
      if (!window.currentQuizState) renderApp();
      else if (window.currentQuizState === 'quiz') renderApp();
      else if (window.currentQuizState === 'result') renderResult();
      renderZodiacCalcResult();
    }
    function detectLang() {
      // Each deployed page is genuinely single-language (baked by build.py from
      // template.html), so data-forced-lang is authoritative — content for any
      // other language doesn't exist in this page's DOM.
      const forced = document.documentElement.getAttribute('data-forced-lang');
      return (forced && LANGS.includes(forced)) ? forced : 'en';
    }
    function buildLangBar() {
      const bar = document.getElementById('lang-bar');
      LANGS.forEach(l => {
        const btn = document.createElement('button');
        btn.id = `lang-${l}`;
        btn.className = 'lang-btn';
        btn.textContent = LANG_NAMES[l];
        btn.dataset.lang = l;
        btn.setAttribute('aria-label', `Switch to ${LANG_NAMES[l]}`);
        btn.onclick = () => {
          window.location.href = l === 'en'
            ? 'https://astroscan-lab.github.io/astroscan_bot/'
            : `https://astroscan-lab.github.io/astroscan_bot/${l}/`;
        };
        bar.appendChild(btn);
      });
      setLang(detectLang());
    }
    let userScores = new Array(12).fill(0);
    let currentQuestion = 0;
    let answers = [];
    let userZodiac = null;
    let userArchetype = null;
    let partnerSign = 'rat';
    let context = 'love';
    function getZodiacName(z) { return z[`name${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || z.nameEn; }
    function getElementName(elementKey) { return (ELEMENT_NAMES[elementKey] && ELEMENT_NAMES[elementKey][currentLang]) || ELEMENT_NAMES[elementKey].en; }
    function zodiacByYear(year) {
      const idx = ((year - 1900) % 12 + 12) % 12;
      return ZODIACS[idx];
    }
    function renderZodiacCalcResult() {
      const input = document.getElementById('zcYearInput');
      const out = document.getElementById('zcResult');
      if (!input || !out) return;
      const year = parseInt(input.value, 10);
      if (!year || year < 1900 || year > 2026) { out.textContent = ''; return; }
      const z = zodiacByYear(year);
      out.textContent = '';
      userZodiac = z.id;
      userArchetype = zodiacToArchetype[userZodiac];
      window.currentQuizState = 'result';
      renderResult();
      showGlobalCTA();
      document.getElementById('appRoot').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function bindZodiacCalculator() {
      const btn = document.getElementById('zcCalcBtn');
      const input = document.getElementById('zcYearInput');
      if (!btn || !input) return;
      btn.addEventListener('click', renderZodiacCalcResult);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') renderZodiacCalcResult(); });
    }
    function getArchetypeName(a) { return a[`name${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || a.nameEn; }
    function getArchetypeDesc(a) { return a[`desc${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || a.descEn; }
    function compatibilityScore(sign1, sign2, ctx) {
      const z1 = ZODIACS.find(z=>z.id===sign1);
      const z2 = ZODIACS.find(z=>z.id===sign2);
      if(!z1||!z2) return 0;
      let triangleBonus = (z1.triangle === z2.triangle) ? 0.6 : (Math.abs(z1.triangle - z2.triangle) === 2 ? 0.2 : 0.4);
      const harmony = { water:["wood"], wood:["fire"], fire:["earth"], earth:["metal"], metal:["water"] };
      let elementBonus = harmony[z1.element]?.includes(z2.element) ? 0.4 : (z1.element===z2.element ? 0.3 : 0.1);
      let base = (triangleBonus + elementBonus) * 100;
      if(ctx==="friendship") base += 5;
      if(ctx==="work") base += (z1.triangle===z2.triangle?10:-5);
      return Math.min(99, Math.max(15, Math.round(base)));
    }
    function finishTest() {
      let maxIdx = userScores.reduce((iMax, x, i, arr)=> x > arr[iMax] ? i : iMax, 0);
      userZodiac = ZODIACS[maxIdx].id;
      userArchetype = zodiacToArchetype[userZodiac];
      window.currentQuizState = 'result';
      renderResult();
      showGlobalCTA();
      showDynamicCTA();
    }
    function showGlobalCTA() { document.getElementById('global-cta-bar').classList.add('visible'); }
    function showDynamicCTA() {
      const t = translations[currentLang];
      const container = document.getElementById('dynamic-cta');
      if (!container) return;
      container.innerHTML = `
        <div class="result-card" style="border-left-color: #fbbf24;">
          <h3 style="color: #fbbf24; margin-bottom: 0.5rem;">${t.dynamicCTATitle}</h3>
          <p style="margin-bottom: 1rem;">${t.dynamicCTAText}</p>
          <a href="https://t.me/ASTROSCAN_BOT" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-block;">${t.dynamicCTABtn}</a>
          <div style="margin-top: 0.75rem;"><a href="https://astroscan-lab.github.io/astroscan_bot/${SAMPLE_PDF[currentLang]}" target="_blank" rel="noopener noreferrer" style="font-size: 0.85rem;">${t.samplePdfLink}</a></div>
        </div>
      `;
    }
    function renderApp() {
      const app = document.getElementById('appRoot');
      if (!userZodiac) {
        if (currentQuestion < QUESTIONS.length) {
          const q = QUESTIONS[currentQuestion];
          const t = translations[currentLang];
          const questionText = q[`text${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || q.textEn;
          const options = q[`options${currentLang.charAt(0).toUpperCase()+currentLang.slice(1)}`] || q.optionsEn;
          const optsHtml = options.map((opt, idx) => `<button class="option-btn" data-opt="${idx}" type="button" role="radio" aria-checked="false">${opt}</button>`).join('');
          app.innerHTML = `
            <div class="card">
              <div class="progress-bar"><div class="progress-fill" style="width:${(currentQuestion/QUESTIONS.length)*100}%"></div></div>
              <div class="question-text" id="questionLabel">${questionText}</div>
              <div class="options" role="radiogroup" aria-labelledby="questionLabel">${optsHtml}</div>
              <button class="btn-primary" id="nextBtn">${currentQuestion === QUESTIONS.length-1 ? t.result : t.next}</button>
            </div>`;
          document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
              document.querySelectorAll('.option-btn').forEach(b => { b.classList.remove('selected'); b.setAttribute('aria-checked', 'false'); });
              btn.classList.add('selected');
              btn.setAttribute('aria-checked', 'true');
              answers[currentQuestion] = parseInt(btn.dataset.opt);
            });
          });
          document.getElementById('nextBtn').addEventListener('click', () => {
            if (answers[currentQuestion] === undefined) return;
            const weights = QUESTIONS[currentQuestion].weights[answers[currentQuestion]];
            for (let i=0; i<12; i++) userScores[i] += weights[i];
            if (currentQuestion + 1 < QUESTIONS.length) { currentQuestion++; renderApp(); }
            else { finishTest(); }
          });
          window.currentQuizState = 'quiz';
        } else { finishTest(); }
      } else { renderResult(); }
    }
    function drawCompatCard(zodiacName, archName, scoreText) {
      return new Promise((resolve) => {
        const W = 1200, H = 630;
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');
        const isRTL = currentLang === 'ar' || currentLang === 'fa';
        if (isRTL) ctx.direction = 'rtl';
        ctx.fillStyle = '#0a0718';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#b76eff';
        ctx.lineWidth = 6;
        ctx.strokeRect(20, 20, W - 40, H - 40);
        ctx.fillStyle = '#b9b0d9';
        ctx.font = '600 30px system-ui, sans-serif';
        ctx.textAlign = isRTL ? 'right' : 'left';
        ctx.fillText('AstroScan', isRTL ? W - 70 : 70, 95);
        ctx.fillStyle = '#f0eaff';
        ctx.font = '700 46px system-ui, sans-serif';
        let title = zodiacName + ' · ' + archName;
        const maxW = W - 140;
        while (ctx.measureText(title).width > maxW && title.length > 4) { title = title.slice(0, -2); }
        ctx.fillText(title, isRTL ? W - 70 : 70, 190);
        ctx.fillStyle = '#b76eff';
        ctx.font = '700 140px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(scoreText, W / 2, 400);
        ctx.fillStyle = '#b9b0d9';
        ctx.font = '400 24px system-ui, sans-serif';
        ctx.textAlign = isRTL ? 'right' : 'left';
        ctx.fillText('astroscan-lab.github.io/astroscan_bot', isRTL ? W - 70 : 70, H - 55);
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      });
    }
    function renderResult() {
      const app = document.getElementById('appRoot');
      const zodiac = ZODIACS.find(z => z.id === userZodiac);
      const arch = ARCHETYPES[userArchetype];
      const t = translations[currentLang];
      const partnerOptions = ZODIACS.map(z => `<option value="${z.id}">${getZodiacName(z)}</option>`).join('');
      const compat = compatibilityScore(userZodiac, partnerSign, context);
      app.innerHTML = `
        <div class="card">
          <h2 style="color: var(--text-light); background: none; -webkit-text-fill-color: currentColor; border-left: 5px solid var(--accent-primary); padding-left: 1.2rem;">${getZodiacName(zodiac)} – ${getArchetypeName(arch)}</h2>
          <p style="margin-bottom: 1rem;">${getArchetypeDesc(arch)}</p>
          <hr style="margin:1rem 0; border-color:var(--border-dim);">
          <label style="display: block; margin-bottom: 0.5rem;">${t.selectPartner}</label>
          <select id="partnerSelect" style="width: 100%; padding: 0.8rem; background: rgba(10,7,24,0.7); border: 1px solid var(--border-dim); border-radius: 2rem; color: var(--text-light);">${partnerOptions}</select>
          <div class="context-tabs">
            <button class="context-tab ${context==='love'?'active':''}" data-ctx="love">${t.love}</button>
            <button class="context-tab ${context==='friendship'?'active':''}" data-ctx="friendship">${t.friendship}</button>
            <button class="context-tab ${context==='work'?'active':''}" data-ctx="work">${t.work}</button>
          </div>
          <div id="compatDisplay" class="text-center" aria-live="polite">
            <div class="compat-score">${compat}%</div>
            <p>${compat>70 ? t.greatHarmony : compat>40 ? t.goodPotential : t.challenging}</p>
          </div>
          <button class="btn-primary" id="checkCompat">${t.compatCheck}</button>
          <div id="dynamic-cta"></div>
          <button class="btn-secondary" id="shareBtn" style="margin-left: 0;">${t.share}</button>
        </div>
        <div class="card">
          <h3>${t.mercuryTracker}</h3>
          <p>${t.mercuryDesc}</p>
          <input type="range" id="mercurySlider" min="0" max="10" value="5" class="tracker-slider">
          <div id="trackerValue">5</div>
          <button id="saveTracker" class="btn-secondary">${t.save}</button>
          <div id="trackerChart"></div>
        </div>`;
      document.getElementById('partnerSelect').value = partnerSign;
      document.getElementById('checkCompat').addEventListener('click', () => {
        partnerSign = document.getElementById('partnerSelect').value;
        const newCompat = compatibilityScore(userZodiac, partnerSign, context);
        document.getElementById('compatDisplay').innerHTML = `<div class="compat-score">${newCompat}%</div><p>${newCompat>70 ? t.greatHarmony : newCompat>40 ? t.goodPotential : t.challenging}</p>`;
      });
      document.querySelectorAll('.context-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          context = tab.dataset.ctx;
          document.querySelectorAll('.context-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const newCompat = compatibilityScore(userZodiac, partnerSign, context);
          document.getElementById('compatDisplay').innerHTML = `<div class="compat-score">${newCompat}%</div><p>${newCompat>70 ? t.greatHarmony : newCompat>40 ? t.goodPotential : t.challenging}</p>`;
        });
      });
      document.getElementById('shareBtn').addEventListener('click', async () => {
        const scoreEl = document.querySelector('#compatDisplay .compat-score');
        const scoreText = scoreEl ? scoreEl.textContent : compat + '%';
        try {
          const blob = await drawCompatCard(getZodiacName(zodiac), getArchetypeName(arch), scoreText);
          const file = new File([blob], 'astroscan-result.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'AstroScan', text: window.location.href });
            return;
          }
          if (navigator.share) { await navigator.share({ title: 'AstroScan Result', url: window.location.href }); return; }
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url; a.download = 'astroscan-result.png';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (e) {
          if (navigator.share) { navigator.share({ title: 'AstroScan Result', url: window.location.href }); }
          else { showToast(t.copyLink); }
        }
      });
      function getTrackerData() {
        try { return JSON.parse(localStorage.getItem('astro_tracker') || '{}'); } catch(e) { localStorage.removeItem('astro_tracker'); return {}; }
      }
      let trackerData = getTrackerData();
      function updateTrackerUI() {
        let today = new Date().toISOString().slice(0,10);
        let val = trackerData[today] || 5;
        document.getElementById('mercurySlider').value = val;
        document.getElementById('trackerValue').innerText = val;
        let chartHtml = '<div class="chart-bars">';
        for(let i=6;i>=0;i--){
          let d = new Date(); d.setDate(d.getDate()-i);
          let key = d.toISOString().slice(0,10);
          let score = trackerData[key] || 0;
          let height = score * 6 + 10;
          chartHtml += `<div class="chart-bar"><div class="bar-fill" style="height:${height}px"></div><div class="bar-label">${key.slice(5)}</div></div>`;
        }
        chartHtml += '</div>';
        document.getElementById('trackerChart').innerHTML = chartHtml;
      }
      document.getElementById('mercurySlider').oninput = (e) => document.getElementById('trackerValue').innerText = e.target.value;
      document.getElementById('saveTracker').onclick = () => {
        let today = new Date().toISOString().slice(0,10);
        trackerData[today] = parseInt(document.getElementById('mercurySlider').value);
        localStorage.setItem('astro_tracker', JSON.stringify(trackerData));
        updateTrackerUI();
      };
      updateTrackerUI();
      showDynamicCTA();
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('fade-up')) entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px', threshold: 0.1 });
    function init() {
      buildLangBar();
      renderApp();
      bindZodiacCalculator();
      const sections = document.querySelectorAll('.card:not(#appRoot .card)');
      sections.forEach(section => {
        if (!section.classList.contains('fade-up')) section.classList.add('fade-up');
        observer.observe(section);
      });
    }
    init();
  })();
