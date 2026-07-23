import io, os, json

BASE = "https://astroscan-lab.github.io/astroscan_bot"
LANGS = ["en", "ru", "es", "hi", "pt", "vi", "tr", "id", "uz", "kk", "fr", "de", "lo", "it", "ar", "fa"]
RTL_LANGS = {"ar", "fa"}

NAMES = {
    "rat": {"en": "Rat", "ru": "Крыса", "es": "Rata", "hi": "चूहा", "pt": "Rato", "vi": "Chuột", "tr": "Fare", "id": "Tikus", "uz": "Sichqon", "kk": "Тышқан", "fr": "Rat", "de": "Ratte", "lo": "ໜູ", "it": "Topo", "ar": "الجرذ", "fa": "موش"},
    "ox": {"en": "Ox", "ru": "Бык", "es": "Buey", "hi": "बैल", "pt": "Boi", "vi": "Trâu", "tr": "Öküz", "id": "Kerbau", "uz": "Ho'kiz", "kk": "Өгіз", "fr": "Buffle", "de": "Büffel", "lo": "ງົວ", "it": "Bue", "ar": "الثور", "fa": "گاو"},
    "tiger": {"en": "Tiger", "ru": "Тигр", "es": "Tigre", "hi": "बाघ", "pt": "Tigre", "vi": "Hổ", "tr": "Kaplan", "id": "Harimau", "uz": "Yo'lbars", "kk": "Жолбарыс", "fr": "Tigre", "de": "Tiger", "lo": "ເສືອ", "it": "Tigre", "ar": "النمر", "fa": "ببر"},
    "rabbit": {"en": "Rabbit", "ru": "Кролик", "es": "Conejo", "hi": "खरगोश", "pt": "Coelho", "vi": "Thỏ", "tr": "Tavşan", "id": "Kelinci", "uz": "Quyon", "kk": "Қоян", "fr": "Lapin", "de": "Hase", "lo": "ກະຕ່າຍ", "it": "Coniglio", "ar": "الأرنب", "fa": "خرگوش"},
    "dragon": {"en": "Dragon", "ru": "Дракон", "es": "Dragón", "hi": "ड्रैगन", "pt": "Dragão", "vi": "Rồng", "tr": "Ejderha", "id": "Naga", "uz": "Ajdaho", "kk": "Айдаһар", "fr": "Dragon", "de": "Drache", "lo": "ມັງກອນ", "it": "Drago", "ar": "التنين", "fa": "اژدها"},
    "snake": {"en": "Snake", "ru": "Змея", "es": "Serpiente", "hi": "साँप", "pt": "Serpente", "vi": "Rắn", "tr": "Yılan", "id": "Ular", "uz": "Ilon", "kk": "Жылан", "fr": "Serpent", "de": "Schlange", "lo": "ງູ", "it": "Serpente", "ar": "الأفعى", "fa": "مار"},
    "horse": {"en": "Horse", "ru": "Лошадь", "es": "Caballo", "hi": "घोड़ा", "pt": "Cavalo", "vi": "Ngựa", "tr": "At", "id": "Kuda", "uz": "Ot", "kk": "Жылқы", "fr": "Cheval", "de": "Pferd", "lo": "ມ້າ", "it": "Cavallo", "ar": "الحصان", "fa": "اسب"},
    "goat": {"en": "Goat", "ru": "Коза", "es": "Cabra", "hi": "बकरी", "pt": "Cabra", "vi": "Dê", "tr": "Keçi", "id": "Kambing", "uz": "Echki", "kk": "Ешкі", "fr": "Chèvre", "de": "Ziege", "lo": "ແບ້", "it": "Capra", "ar": "الماعز", "fa": "بز"},
    "monkey": {"en": "Monkey", "ru": "Обезьяна", "es": "Mono", "hi": "बंदर", "pt": "Macaco", "vi": "Khỉ", "tr": "Maymun", "id": "Monyet", "uz": "Maymun", "kk": "Мешін", "fr": "Singe", "de": "Affe", "lo": "ລິງ", "it": "Scimmia", "ar": "القرد", "fa": "میمون"},
    "rooster": {"en": "Rooster", "ru": "Петух", "es": "Gallo", "hi": "मुर्गा", "pt": "Galo", "vi": "Gà", "tr": "Horoz", "id": "Ayam Jantan", "uz": "Xo'roz", "kk": "Тауық", "fr": "Coq", "de": "Hahn", "lo": "ໄກ່", "it": "Gallo", "ar": "الديك", "fa": "خروس"},
    "dog": {"en": "Dog", "ru": "Собака", "es": "Perro", "hi": "कुत्ता", "pt": "Cachorro", "vi": "Chó", "tr": "Köpek", "id": "Anjing", "uz": "It", "kk": "Ит", "fr": "Chien", "de": "Hund", "lo": "ໝາ", "it": "Cane", "ar": "الكلب", "fa": "سگ"},
    "pig": {"en": "Pig", "ru": "Свинья", "es": "Cerdo", "hi": "सुअर", "pt": "Porco", "vi": "Lợn", "tr": "Domuz", "id": "Babi", "uz": "Cho'chqa", "kk": "Доңыз", "fr": "Cochon", "de": "Schwein", "lo": "ໝູ", "it": "Maiale", "ar": "الخنزير", "fa": "خوک"},
}
EMOJI = {"rat": "🐀", "ox": "🐂", "tiger": "🐅", "rabbit": "🐇", "dragon": "🐉", "snake": "🐍",
         "horse": "🐎", "goat": "🐐", "monkey": "🐒", "rooster": "🐓", "dog": "🐕", "pig": "🐖"}
ELEMENT_KEY = {"rat": "water", "ox": "earth", "tiger": "wood", "rabbit": "wood", "dragon": "fire",
               "snake": "fire", "horse": "fire", "goat": "earth", "monkey": "metal", "rooster": "metal",
               "dog": "earth", "pig": "water"}
ELEMENT_NAMES = {
    "water": {"en": "Water", "ru": "Вода", "es": "Agua", "hi": "जल", "pt": "Água", "vi": "Thủy", "tr": "Su", "id": "Air", "uz": "Suv", "kk": "Су", "fr": "Eau", "de": "Wasser", "lo": "ນ້ຳ", "it": "Acqua", "ar": "الماء", "fa": "آب"},
    "earth": {"en": "Earth", "ru": "Земля", "es": "Tierra", "hi": "पृथ्वी", "pt": "Terra", "vi": "Thổ", "tr": "Toprak", "id": "Tanah", "uz": "Tuproq", "kk": "Жер", "fr": "Terre", "de": "Erde", "lo": "ດິນ", "it": "Terra", "ar": "التراب", "fa": "خاک"},
    "wood": {"en": "Wood", "ru": "Дерево", "es": "Madera", "hi": "काष्ठ", "pt": "Madeira", "vi": "Mộc", "tr": "Ahşap", "id": "Kayu", "uz": "Yog'och", "kk": "Ағаш", "fr": "Bois", "de": "Holz", "lo": "ໄມ້", "it": "Legno", "ar": "الخشب", "fa": "چوب"},
    "fire": {"en": "Fire", "ru": "Огонь", "es": "Fuego", "hi": "अग्नि", "pt": "Fogo", "vi": "Hỏa", "tr": "Ateş", "id": "Api", "uz": "Olov", "kk": "От", "fr": "Feu", "de": "Feuer", "lo": "ໄຟ", "it": "Fuoco", "ar": "النار", "fa": "آتش"},
    "metal": {"en": "Metal", "ru": "Металл", "es": "Metal", "hi": "धातु", "pt": "Metal", "vi": "Kim", "tr": "Metal", "id": "Logam", "uz": "Metall", "kk": "Металл", "fr": "Métal", "de": "Metall", "lo": "ໂລຫະ", "it": "Metallo", "ar": "المعدن", "fa": "فلز"},
}
MATCH = {"rat": ["dragon", "monkey"], "ox": ["snake", "rooster"], "tiger": ["horse", "dog"],
         "rabbit": ["goat", "pig"], "dragon": ["rat", "monkey"], "snake": ["ox", "rooster"],
         "horse": ["tiger", "dog"], "goat": ["rabbit", "pig"], "monkey": ["rat", "dragon"],
         "rooster": ["ox", "snake"], "dog": ["tiger", "horse"], "pig": ["rabbit", "goat"]}
CLASH = {"rat": "horse", "ox": "goat", "tiger": "monkey", "rabbit": "rooster", "dragon": "dog",
         "snake": "pig", "horse": "rat", "goat": "ox", "monkey": "tiger", "rooster": "rabbit",
         "dog": "dragon", "pig": "snake"}
YEARS = {
    "rat": "1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020",
    "ox": "1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021",
    "tiger": "1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022",
    "rabbit": "1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023",
    "dragon": "1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024",
    "snake": "1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025",
    "horse": "1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026",
    "goat": "1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015",
    "monkey": "1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016",
    "rooster": "1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017",
    "dog": "1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018",
    "pig": "1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019",
}
TRAITS = {
    "rat": {"en": ["Quick-witted and resourceful", "Sociable and adaptable", "Practical, good at saving", "Can seem opportunistic", "Curious and observant"],
            "ru": ["Сообразительность и находчивость", "Общительность, легко адаптируется", "Практичность, умеет копить", "Может казаться расчётливым", "Любопытство и наблюдательность"],
            "es": ["Ingenioso y de recursos", "Sociable y adaptable", "Práctico, bueno ahorrando", "Puede parecer oportunista", "Curioso y observador"],
            "hi": ["तेज़-तर्रार और साधन-संपन्न", "मिलनसार और अनुकूलनीय", "व्यावहारिक, बचत में माहिर", "अवसरवादी लग सकता है", "जिज्ञासु और चौकस"],
            "pt": ["Perspicaz e cheio de recursos", "Sociável e adaptável", "Prático, bom em economizar", "Pode parecer oportunista", "Curioso e observador"],
            "vi": ["Nhanh nhạy và tháo vát", "Hòa đồng và dễ thích nghi", "Thực tế, giỏi tiết kiệm", "Có thể tỏ ra cơ hội", "Tò mò và quan sát tinh tế"],
            "tr": ["Zeki ve becerikli", "Sosyal ve uyum sağlayabilen", "Pratik, tasarrufta iyi", "Fırsatçı görünebilir", "Meraklı ve gözlemci"],
            "id": ["Cerdik dan banyak akal", "Ramah dan mudah beradaptasi", "Praktis, pandai menabung", "Bisa terlihat oportunis", "Penasaran dan jeli mengamati"],
            "uz": ["Zukko va tadbirkor", "Muloqotchan va moslashuvchan", "Amaliyotchi, tejashda mohir", "Manfaatparast ko'rinishi mumkin", "Qiziquvchan va kuzatuvchan"],
            "kk": ["Тапқыр және айлакер", "Қарым-қатынасқа бейім, бейімделгіш", "Практикалық, үнемдей біледі", "Пайдакүнем болып көрінуі мүмкін", "Қызыға білетін және байқампаз"],
            "fr": ["Vif d'esprit et débrouillard", "Sociable et adaptable", "Pratique, doué pour économiser", "Peut sembler opportuniste", "Curieux et observateur"],
            "de": ["Klug und einfallsreich", "Gesellig und anpassungsfähig", "Praktisch veranlagt, gut im Sparen", "Kann opportunistisch wirken", "Neugierig und aufmerksam"],
            "lo": ["ສະຫຼາດ ແລະ ມີໄຫວພິບ", "ເຂົ້າສັງຄົມເກັ່ງ ແລະ ປັບຕົວໄດ້ດີ", "ພາກປະຕິບັດ, ເກັບອອມເກັ່ງ", "ອາດເບິ່ງຄືວ່າສະແຫວງຫາໂອກາດ", "ຢາກຮູ້ຢາກເຫັນ ແລະ ສັງເກດເກັ່ງ"],
            "it": ["Arguto e pieno di risorse", "Socievole e adattabile", "Pratico, bravo a risparmiare", "Può sembrare opportunista", "Curioso e attento"],
            "ar": ["سريع البديهة وواسع الحيلة", "اجتماعي وسريع التكيّف", "عملي وبارع في الادخار", "قد يبدو انتهازيًا أحيانًا", "فضولي وشديد الملاحظة"],
            "fa": ["زیرک و چاره‌جو", "اجتماعی و سازگار", "عملی و در پس‌انداز ماهر", "گاهی فرصت‌طلب به نظر می‌رسد", "کنجکاو و تیزبین"]},
    "ox": {"en": ["Diligent and dependable", "Patient and methodical", "Strong sense of responsibility", "Can be stubborn", "Calm under pressure"],
           "ru": ["Усердие и надёжность", "Терпеливость, методичность", "Развитое чувство долга", "Может быть упрямым", "Спокойствие под давлением"],
           "es": ["Diligente y confiable", "Paciente y metódico", "Fuerte sentido de la responsabilidad", "Puede ser obstinado", "Calmado bajo presión"],
           "hi": ["मेहनती और भरोसेमंद", "धैर्यवान और व्यवस्थित", "मजबूत जिम्मेदारी की भावना", "ज़िद्दी हो सकता है", "दबाव में शांत"],
           "pt": ["Diligente e confiável", "Paciente e metódico", "Forte senso de responsabilidade", "Pode ser teimoso", "Calmo sob pressão"],
           "vi": ["Chăm chỉ và đáng tin cậy", "Kiên nhẫn và có phương pháp", "Ý thức trách nhiệm cao", "Có thể bướng bỉnh", "Bình tĩnh khi chịu áp lực"],
           "tr": ["Çalışkan ve güvenilir", "Sabırlı ve sistemli", "Güçlü sorumluluk duygusu", "İnatçı olabilir", "Baskı altında sakin"],
           "id": ["Rajin dan dapat diandalkan", "Sabar dan metodis", "Rasa tanggung jawab yang kuat", "Bisa keras kepala", "Tenang di bawah tekanan"],
           "uz": ["Mehnatkash va ishonchli", "Sabrli va tizimli", "Kuchli mas'uliyat hissi", "Qaysar bo'lishi mumkin", "Bosim ostida xotirjam"],
           "kk": ["Еңбекқор және сенімді", "Шыдамды және жүйелі", "Жауапкершілік сезімі күшті", "Қыңыр болуы мүмкін", "Қысымда сабырлы"],
           "fr": ["Assidu et fiable", "Patient et méthodique", "Grand sens des responsabilités", "Peut être têtu", "Calme sous pression"],
           "de": ["Fleißig und verlässlich", "Geduldig und methodisch", "Ausgeprägtes Verantwortungsbewusstsein", "Kann stur sein", "Ruhig unter Druck"],
           "lo": ["ຂະຫຍັນ ແລະ ເຊື່ອຖືໄດ້", "ອົດທົນ ແລະ ມີລະບຽບ", "ມີຄວາມຮັບຜິດຊອບສູງ", "ອາດຫົວແຂງ", "ສະຫງົບເມື່ອຖືກກົດດັນ"],
           "it": ["Diligente e affidabile", "Paziente e metodico", "Forte senso di responsabilità", "Può essere testardo", "Calmo sotto pressione"],
           "ar": ["مجتهد وموثوق", "صبور ومنهجي", "يتحلى بحس مسؤولية قوي", "قد يكون عنيدًا", "هادئ تحت الضغط"],
           "fa": ["سخت‌کوش و قابل‌اعتماد", "صبور و روش‌مند", "دارای حس مسئولیت قوی", "ممکن است لجباز باشد", "در فشار آرام می‌ماند"]},
    "tiger": {"en": ["Brave and confident", "Natural leader, competitive", "Passionate and dynamic", "Can be impulsive", "Independent-minded"],
              "ru": ["Смелость и уверенность", "Врождённый лидер, соревновательность", "Страстность и динамичность", "Может быть импульсивным", "Независимое мышление"],
              "es": ["Valiente y confiado", "Líder nato, competitivo", "Apasionado y dinámico", "Puede ser impulsivo", "De mente independiente"],
              "hi": ["साहसी और आत्मविश्वासी", "स्वाभाविक नेता, प्रतिस्पर्धी", "जोशीला और गतिशील", "आवेगी हो सकता है", "स्वतंत्र विचारधारा"],
              "pt": ["Corajoso e confiante", "Líder nato, competitivo", "Apaixonado e dinâmico", "Pode ser impulsivo", "Mente independente"],
              "vi": ["Dũng cảm và tự tin", "Nhà lãnh đạo bẩm sinh, thích cạnh tranh", "Nhiệt huyết và năng động", "Có thể bốc đồng", "Có tư duy độc lập"],
              "tr": ["Cesur ve özgüvenli", "Doğuştan lider, rekabetçi", "Tutkulu ve dinamik", "Dürtüsel olabilir", "Bağımsız düşünceli"],
              "id": ["Berani dan percaya diri", "Pemimpin alami, kompetitif", "Bersemangat dan dinamis", "Bisa impulsif", "Berpikiran independen"],
              "uz": ["Jasur va o'ziga ishongan", "Tabiiy yetakchi, raqobatchan", "Ishtiyoqli va serharakat", "Shoshqaloq bo'lishi mumkin", "Mustaqil fikrli"],
              "kk": ["Батыл және өзіне сенімді", "Туа біткен көшбасшы, бәсекеге қабілетті", "Құштар және белсенді", "Асығыс болуы мүмкін", "Тәуелсіз ойлы"],
              "fr": ["Courageux et confiant", "Leader-né, compétitif", "Passionné et dynamique", "Peut être impulsif", "Esprit indépendant"],
              "de": ["Mutig und selbstbewusst", "Geborener Anführer, ehrgeizig", "Leidenschaftlich und dynamisch", "Kann impulsiv sein", "Unabhängig denkend"],
              "lo": ["ກ້າຫານ ແລະ ໝັ້ນໃຈ", "ຜູ້ນຳໂດຍທຳມະຊາດ, ມັກແຂ່ງຂັນ", "ມີໄຟ ແລະ ມີພະລັງ", "ອາດຫຸນຫັນພັນແລນ", "ຄິດເປັນເອກະລາດ"],
              "it": ["Coraggioso e sicuro di sé", "Leader nato, competitivo", "Appassionato e dinamico", "Può essere impulsivo", "Di mentalità indipendente"],
              "ar": ["شجاع وواثق من نفسه", "قائد بالفطرة ومحب للتنافس", "متحمس ونشيط", "قد يكون متهورًا", "مستقل التفكير"],
              "fa": ["شجاع و مطمئن به خود", "رهبری ذاتی و رقابت‌جو", "پرشور و پویا", "ممکن است تکانشی باشد", "دارای اندیشه‌ای مستقل"]},
    "rabbit": {"en": ["Gentle and diplomatic", "Sensitive and compassionate", "Values harmony and stability", "Can be overly cautious", "Refined taste"],
               "ru": ["Мягкость и дипломатичность", "Чувствительность, отзывчивость", "Ценит гармонию и стабильность", "Может быть чрезмерно осторожным", "Тонкий вкус"],
               "es": ["Gentil y diplomático", "Sensible y compasivo", "Valora la armonía y la estabilidad", "Puede ser demasiado cauteloso", "Gustos refinados"],
               "hi": ["कोमल और कूटनीतिक", "संवेदनशील और दयालु", "सद्भाव और स्थिरता को महत्व देता है", "अत्यधिक सावधान हो सकता है", "परिष्कृत स्वाद"],
               "pt": ["Gentil e diplomático", "Sensível e compassivo", "Valoriza harmonia e estabilidade", "Pode ser excessivamente cauteloso", "Gosto refinado"],
               "vi": ["Nhẹ nhàng và khéo léo", "Nhạy cảm và giàu lòng trắc ẩn", "Coi trọng sự hài hòa và ổn định", "Có thể quá thận trọng", "Gu thẩm mỹ tinh tế"],
               "tr": ["Nazik ve diplomatik", "Hassas ve şefkatli", "Uyum ve istikrara değer verir", "Aşırı temkinli olabilir", "Zarif bir zevke sahip"],
               "id": ["Lembut dan diplomatis", "Sensitif dan penuh kasih", "Menghargai harmoni dan stabilitas", "Bisa terlalu berhati-hati", "Selera yang halus"],
               "uz": ["Muloyim va diplomatik", "Nozik va mehribon", "Uyg'unlik va barqarorlikni qadrlaydi", "Haddan tashqari ehtiyotkor bo'lishi mumkin", "Nafis didga ega"],
               "kk": ["Момын және дипломатты", "Нәзік және мейірімді", "Үйлесімділік пен тұрақтылықты бағалайды", "Тым сақ болуы мүмкін", "Талғампаз талғамы бар"],
               "fr": ["Doux et diplomate", "Sensible et compatissant", "Attache de l'importance à l'harmonie et à la stabilité", "Peut être trop prudent", "Goût raffiné"],
               "de": ["Sanft und diplomatisch", "Feinfühlig und mitfühlend", "Schätzt Harmonie und Stabilität", "Kann übervorsichtig sein", "Verfeinerter Geschmack"],
               "lo": ["ອ່ອນໂຍນ ແລະ ມີການທູດ", "ອ່ອນໄຫວ ແລະ ມີເມດຕາ", "ໃຫ້ຄຸນຄ່າກັບຄວາມກົມກຽວ ແລະ ຄວາມໝັ້ນຄົງ", "ອາດລະມັດລະວັງເກີນໄປ", "ມີລົດຊາດອັນປານີດ"],
               "it": ["Gentile e diplomatico", "Sensibile e compassionevole", "Apprezza armonia e stabilità", "Può essere eccessivamente cauto", "Gusto raffinato"],
               "ar": ["لطيف ودبلوماسي", "حساس ورؤوف", "يقدّر الانسجام والاستقرار", "قد يكون حذرًا أكثر من اللازم", "ذو ذوق رفيع"],
               "fa": ["ملایم و دیپلمات", "حساس و دلسوز", "به هماهنگی و ثبات ارزش می‌دهد", "ممکن است بیش از حد محتاط باشد", "دارای سلیقه‌ای ظریف"]},
    "dragon": {"en": ["Confident and charismatic", "Ambitious, natural-born leader", "Highly creative and energetic", "Can come across as prideful or stubborn", "Generous toward people they trust"],
               "ru": ["Уверенность и харизма", "Амбициозность, врождённые лидерские качества", "Творческая энергия", "Может казаться гордым или упрямым", "Щедрость к тем, кому доверяет"],
               "es": ["Confianza y carisma", "Ambición, líder nato", "Muy creativo y enérgico", "Puede parecer orgulloso o obstinado", "Generoso con quienes confía"],
               "hi": ["आत्मविश्वासी और आकर्षक", "महत्वाकांक्षी, स्वाभाविक नेता", "अत्यंत रचनात्मक और ऊर्जावान", "घमंडी या ज़िद्दी लग सकता है", "विश्वसनीय लोगों के प्रति उदार"],
               "pt": ["Confiante e carismático", "Ambicioso, líder nato", "Muito criativo e cheio de energia", "Pode parecer orgulhoso ou teimoso", "Generoso com quem confia"],
               "vi": ["Tự tin và có sức hút", "Đầy tham vọng, lãnh đạo bẩm sinh", "Rất sáng tạo và tràn đầy năng lượng", "Có thể tỏ ra kiêu ngạo hoặc bướng bỉnh", "Hào phóng với người mình tin tưởng"],
               "tr": ["Özgüvenli ve karizmatik", "Hırslı, doğuştan lider", "Son derece yaratıcı ve enerjik", "Kibirli veya inatçı görünebilir", "Güvendiği insanlara karşı cömert"],
               "id": ["Percaya diri dan karismatik", "Ambisius, pemimpin alami", "Sangat kreatif dan energik", "Bisa terlihat sombong atau keras kepala", "Murah hati kepada orang yang dipercaya"],
               "uz": ["O'ziga ishongan va jozibali", "Shuhratparast, tabiiy yetakchi", "Juda ijodkor va serharakat", "Mag'rur yoki qaysar ko'rinishi mumkin", "Ishongan odamlariga saxiy"],
               "kk": ["Өзіне сенімді және сүйкімді", "Мақсатшыл, туа біткен көшбасшы", "Өте шығармашыл және қуатты", "Тәкаппар немесе қыңыр болып көрінуі мүмкін", "Сенген адамдарына жомарт"],
               "fr": ["Confiant et charismatique", "Ambitieux, leader-né", "Très créatif et énergique", "Peut paraître fier ou têtu", "Généreux envers les personnes en qui il a confiance"],
               "de": ["Selbstbewusst und charismatisch", "Ehrgeizig, geborener Anführer", "Sehr kreativ und energiegeladen", "Kann stolz oder stur wirken", "Großzügig gegenüber Vertrauenspersonen"],
               "lo": ["ໝັ້ນໃຈ ແລະ ມີເສນ່ຫາ", "ມີຄວາມທະເຍີທະຍານ, ຜູ້ນຳໂດຍທຳມະຊາດ", "ສ້າງສັນສູງ ແລະ ມີພະລັງ", "ອາດເບິ່ງຄືທະນົງຕົວ ຫຼື ຫົວແຂງ", "ໃຈກວ້າງກັບຄົນທີ່ໄວ້ໃຈ"],
               "it": ["Sicuro di sé e carismatico", "Ambizioso, leader nato", "Molto creativo ed energico", "Può apparire orgoglioso o testardo", "Generoso con chi si fida"],
               "ar": ["واثق وكاريزمي", "طموح وقائد بالفطرة", "مبدع ونشيط للغاية", "قد يبدو متكبرًا أو عنيدًا", "كريم مع من يثق بهم"],
               "fa": ["مطمئن به خود و کاریزماتیک", "بلندپرواز و رهبری ذاتی", "بسیار خلاق و پرانرژی", "ممکن است مغرور یا لجباز به نظر برسد", "نسبت به افراد مورد اعتمادش سخاوتمند است"]},
    "snake": {"en": ["Wise and intuitive", "Calm, strategic thinker", "Private and self-reliant", "Can seem secretive", "Elegant and perceptive"],
              "ru": ["Мудрость и интуиция", "Спокойствие, стратегическое мышление", "Скрытность, самодостаточность", "Может казаться таинственным", "Элегантность и проницательность"],
              "es": ["Sabio e intuitivo", "Pensador calmado y estratégico", "Reservado y autosuficiente", "Puede parecer reservado en exceso", "Elegante y perceptivo"],
              "hi": ["बुद्धिमान और सहज ज्ञान वाला", "शांत, रणनीतिक सोच", "निजी और आत्मनिर्भर", "गुप्त लग सकता है", "सुरुचिपूर्ण और सूक्ष्मदर्शी"],
              "pt": ["Sábio e intuitivo", "Calmo, pensador estratégico", "Reservado e independente", "Pode parecer misterioso", "Elegante e perspicaz"],
              "vi": ["Khôn ngoan và nhạy bén trực giác", "Điềm tĩnh, tư duy chiến lược", "Kín đáo và tự lập", "Có thể tỏ ra bí ẩn", "Thanh lịch và tinh tế"],
              "tr": ["Bilge ve sezgisel", "Sakin, stratejik düşünür", "Özel hayatına düşkün ve kendine yeten", "Gizemli görünebilir", "Zarif ve algısı güçlü"],
              "id": ["Bijaksana dan intuitif", "Tenang, pemikir strategis", "Tertutup dan mandiri", "Bisa terlihat misterius", "Elegan dan tajam pengamatannya"],
              "uz": ["Dono va sezgir", "Xotirjam, strategik fikrlaydigan", "Xususiyatini saqlovchi va o'ziga tayanuvchi", "Sirli ko'rinishi mumkin", "Nafis va zukko"],
              "kk": ["Дана және сезімтал", "Байсалды, стратегиялық ойлайды", "Іші тар және өзіне сенімді", "Құпия болып көрінуі мүмкін", "Талғампаз және байқампаз"],
              "fr": ["Sage et intuitif", "Calme, penseur stratégique", "Discret et autonome", "Peut sembler secret", "Élégant et perspicace"],
              "de": ["Weise und intuitiv", "Ruhiger, strategischer Denker", "Zurückhaltend und eigenständig", "Kann verschlossen wirken", "Elegant und scharfsinnig"],
              "lo": ["ສະຫຼາດ ແລະ ມີສັນຊາດຕະຍານ", "ສະຫງົບ, ຄິດແບບຍຸດທະສາດ", "ມັກເປັນສ່ວນຕົວ ແລະ ເພິ່ງຕົນເອງ", "ອາດເບິ່ງຄືລຶກລັບ", "ສະຫງ່າງາມ ແລະ ຮັບຮູ້ໄວ"],
              "it": ["Saggio e intuitivo", "Pensatore calmo e strategico", "Riservato e autosufficiente", "Può sembrare misterioso", "Elegante e perspicace"],
              "ar": ["حكيم وبديهي", "هادئ ومفكر استراتيجي", "يميل للخصوصية والاعتماد على الذات", "قد يبدو غامضًا", "أنيق وثاقب البصيرة"],
              "fa": ["خردمند و شهودی", "آرام و استراتژیست", "خصوصی و متکی به خود", "ممکن است رازآلود به نظر برسد", "برازنده و تیزبین"]},
    "horse": {"en": ["Energetic and freedom-loving", "Sociable and enthusiastic", "Quick decision-maker", "Can be impatient", "Independent spirit"],
              "ru": ["Энергичность, любовь к свободе", "Общительность, энтузиазм", "Быстрые решения", "Может быть нетерпеливым", "Независимый дух"],
              "es": ["Energético y amante de la libertad", "Sociable y entusiasta", "Decide rápido", "Puede ser impaciente", "Espíritu independiente"],
              "hi": ["ऊर्जावान और स्वतंत्रता-प्रिय", "मिलनसार और उत्साही", "त्वरित निर्णय लेने वाला", "अधीर हो सकता है", "स्वतंत्र भावना"],
              "pt": ["Energético e amante da liberdade", "Sociável e entusiasmado", "Toma decisões rápidas", "Pode ser impaciente", "Espírito independente"],
              "vi": ["Tràn đầy năng lượng và yêu tự do", "Hòa đồng và nhiệt tình", "Ra quyết định nhanh chóng", "Có thể thiếu kiên nhẫn", "Tinh thần độc lập"],
              "tr": ["Enerjik ve özgürlüğüne düşkün", "Sosyal ve coşkulu", "Hızlı karar verir", "Sabırsız olabilir", "Bağımsız ruh"],
              "id": ["Energik dan cinta kebebasan", "Ramah dan antusias", "Cepat mengambil keputusan", "Bisa tidak sabar", "Jiwa yang mandiri"],
              "uz": ["Serharakat va erkinlikni sevuvchi", "Muloqotchan va ishtiyoqli", "Tez qaror qabul qiluvchi", "Sabrsiz bo'lishi mumkin", "Mustaqil ruh"],
              "kk": ["Қуатты және еркіндікті сүйетін", "Қарым-қатынасқа бейім және құштар", "Тез шешім қабылдайды", "Асығыс болуы мүмкін", "Тәуелсіз рухты"],
              "fr": ["Énergique et épris de liberté", "Sociable et enthousiaste", "Décide rapidement", "Peut être impatient", "Esprit indépendant"],
              "de": ["Energiegeladen und freiheitsliebend", "Gesellig und begeisterungsfähig", "Trifft schnelle Entscheidungen", "Kann ungeduldig sein", "Unabhängiger Geist"],
              "lo": ["ມີພະລັງ ແລະ ຮັກອິດສະຫຼະ", "ເຂົ້າສັງຄົມເກັ່ງ ແລະ ກະຕືລືລົ້ນ", "ຕັດສິນໃຈໄວ", "ອາດໃຈຮ້ອນ", "ມີຈິດວິນຍານອິດສະຫຼະ"],
              "it": ["Energico e amante della libertà", "Socievole ed entusiasta", "Decide rapidamente", "Può essere impaziente", "Spirito indipendente"],
              "ar": ["نشيط ومحب للحرية", "اجتماعي ومتحمس", "سريع في اتخاذ القرار", "قد يكون نافد الصبر", "ذو روح مستقلة"],
              "fa": ["پرانرژی و آزادی‌دوست", "اجتماعی و پرشور", "در تصمیم‌گیری سریع", "ممکن است بی‌تاب باشد", "روحیه‌ای مستقل دارد"]},
    "goat": {"en": ["Gentle, artistic, and compassionate", "Calm and resilient", "Strong sense of empathy", "Can be prone to worry", "Creative and imaginative"],
             "ru": ["Мягкость, творчество, сострадание", "Спокойствие, стойкость", "Развитая эмпатия", "Склонность к тревожности", "Творческая фантазия"],
             "es": ["Gentil, artístico y compasivo", "Calmado y resiliente", "Fuerte sentido de empatía", "Puede tender a preocuparse", "Creativo e imaginativo"],
             "hi": ["कोमल, कलात्मक और दयालु", "शांत और लचीला", "गहरी सहानुभूति", "चिंता करने की प्रवृत्ति", "रचनात्मक और कल्पनाशील"],
             "pt": ["Gentil, artístico e compassivo", "Calmo e resiliente", "Forte senso de empatia", "Pode ser propenso a se preocupar", "Criativo e imaginativo"],
             "vi": ["Dịu dàng, giàu nghệ thuật và trắc ẩn", "Điềm tĩnh và kiên cường", "Giàu lòng đồng cảm", "Dễ lo lắng", "Sáng tạo và giàu trí tưởng tượng"],
             "tr": ["Nazik, sanatsal ve şefkatli", "Sakin ve dirençli", "Güçlü empati duygusu", "Endişelenmeye eğilimli olabilir", "Yaratıcı ve hayal gücü geniş"],
             "id": ["Lembut, artistik, dan penuh kasih", "Tenang dan tangguh", "Rasa empati yang kuat", "Cenderung mudah khawatir", "Kreatif dan imajinatif"],
             "uz": ["Muloyim, san'atkor va mehribon", "Xotirjam va bardoshli", "Kuchli hamdardlik hissi", "Xavotirga moyil bo'lishi mumkin", "Ijodkor va tasavvurga boy"],
             "kk": ["Момын, өнерпаз және мейірімді", "Байсалды және төзімді", "Эмпатия сезімі күшті", "Уайымға бейім болуы мүмкін", "Шығармашыл және қиялы бай"],
             "fr": ["Doux, artistique et compatissant", "Calme et résilient", "Grand sens de l'empathie", "Peut avoir tendance à s'inquiéter", "Créatif et imaginatif"],
             "de": ["Sanft, künstlerisch und mitfühlend", "Ruhig und widerstandsfähig", "Ausgeprägtes Einfühlungsvermögen", "Kann zu Sorgen neigen", "Kreativ und fantasievoll"],
             "lo": ["ອ່ອນໂຍນ, ມີສິນລະປະ ແລະ ມີເມດຕາ", "ສະຫງົບ ແລະ ອົດທົນ", "ມີຄວາມເຫັນອົກເຫັນໃຈສູງ", "ອາດມັກກັງວົນ", "ສ້າງສັນ ແລະ ມີຈິນຕະນາການ"],
             "it": ["Gentile, artistico e compassionevole", "Calmo e resiliente", "Forte senso di empatia", "Può tendere a preoccuparsi", "Creativo e fantasioso"],
             "ar": ["لطيف وفني ورؤوف", "هادئ وقادر على التعافي", "يتمتع بحس تعاطف قوي", "قد يميل إلى القلق", "مبدع وخيالي"],
             "fa": ["ملایم، هنرمند و دلسوز", "آرام و تاب‌آور", "دارای همدلی قوی", "ممکن است مستعد نگرانی باشد", "خلاق و پرتخیل"]},
    "monkey": {"en": ["Clever and inventive", "Witty, quick learner", "Sociable and playful", "Can seem mischievous", "Versatile problem-solver"],
               "ru": ["Сообразительность, изобретательность", "Остроумие, быстрое обучение", "Общительность, игривость", "Может казаться озорным", "Универсальный решатель проблем"],
               "es": ["Astuto e inventivo", "Ingenioso, aprende rápido", "Sociable y juguetón", "Puede parecer travieso", "Solucionador versátil"],
               "hi": ["चतुर और आविष्कारशील", "मजाकिया, तेज़ सीखने वाला", "मिलनसार और चंचल", "नटखट लग सकता है", "बहुमुखी समस्या-समाधानकर्ता"],
               "pt": ["Esperto e inventivo", "Espirituoso, aprende rápido", "Sociável e brincalhão", "Pode parecer travesso", "Versátil na resolução de problemas"],
               "vi": ["Thông minh và sáng tạo", "Hóm hỉnh, học nhanh", "Hòa đồng và tinh nghịch", "Có thể tỏ ra ranh mãnh", "Giải quyết vấn đề linh hoạt"],
               "tr": ["Zeki ve yaratıcı", "Esprili, hızlı öğrenen", "Sosyal ve oyuncu", "Yaramaz görünebilir", "Çok yönlü problem çözücü"],
               "id": ["Cerdas dan inventif", "Cerdas dan cepat belajar", "Ramah dan suka bermain", "Bisa terlihat nakal", "Pemecah masalah yang serbabisa"],
               "uz": ["Aqlli va ixtirochi", "Hazilkash, tez o'rganuvchi", "Muloqotchan va o'ynoqi", "Ozg'in ko'rinishi mumkin", "Muammolarni har tomonlama hal qiluvchi"],
               "kk": ["Ақылды және тапқыр", "Әзілқой, тез үйренетін", "Қарым-қатынасқа бейім және ойыншыл", "Тентек болып көрінуі мүмкін", "Мәселені жан-жақты шеше алады"],
               "fr": ["Intelligent et inventif", "Spirituel, apprend vite", "Sociable et joueur", "Peut sembler espiègle", "Résout les problèmes avec polyvalence"],
               "de": ["Klug und einfallsreich", "Geistreich, lernt schnell", "Gesellig und verspielt", "Kann schelmisch wirken", "Vielseitiger Problemlöser"],
               "lo": ["ສະຫຼາດ ແລະ ມີໄຫວພິບ", "ຕະຫຼົກ, ຮຽນຮູ້ໄວ", "ເຂົ້າສັງຄົມເກັ່ງ ແລະ ຂີ້ຫຼິ້ນ", "ອາດເບິ່ງຄືຊຸກຊົນ", "ແກ້ບັນຫາໄດ້ຫຼາກຫຼາຍ"],
               "it": ["Intelligente e inventivo", "Arguto, impara in fretta", "Socievole e giocoso", "Può sembrare birichino", "Versatile nel risolvere problemi"],
               "ar": ["ذكي ومبتكر", "سريع البديهة وسريع التعلّم", "اجتماعي ومرح", "قد يبدو مشاغبًا", "بارع في حل المشكلات بطرق متعددة"],
               "fa": ["باهوش و مبتکر", "بذله‌گو و زودآموز", "اجتماعی و بازیگوش", "ممکن است شیطنت‌آمیز به نظر برسد", "در حل مسئله بسیار توانا و همه‌کاره"]},
    "rooster": {"en": ["Observant and hardworking", "Confident, direct communicator", "Punctual and organized", "Can seem critical", "Loyal once trusted"],
                "ru": ["Наблюдательность, трудолюбие", "Уверенность, прямота в общении", "Пунктуальность, организованность", "Может казаться критичным", "Верность при доверии"],
                "es": ["Observador y trabajador", "Confiado, comunicador directo", "Puntual y organizado", "Puede parecer crítico", "Leal una vez que confía"],
                "hi": ["चौकस और मेहनती", "आत्मविश्वासी, सीधा संवादकर्ता", "समयनिष्ठ और संगठित", "आलोचनात्मक लग सकता है", "भरोसा मिलने पर वफादार"],
                "pt": ["Observador e trabalhador", "Confiante, comunicador direto", "Pontual e organizado", "Pode parecer crítico", "Leal quando confia"],
                "vi": ["Quan sát tốt và chăm chỉ", "Tự tin, giao tiếp thẳng thắn", "Đúng giờ và ngăn nắp", "Có thể tỏ ra hay chỉ trích", "Trung thành khi đã tin tưởng"],
                "tr": ["Gözlemci ve çalışkan", "Özgüvenli, doğrudan iletişim kurar", "Dakik ve düzenli", "Eleştirel görünebilir", "Güvendikten sonra sadık"],
                "id": ["Jeli dan pekerja keras", "Percaya diri, komunikator yang blak-blakan", "Tepat waktu dan terorganisir", "Bisa terlihat suka mengkritik", "Setia begitu percaya"],
                "uz": ["Kuzatuvchan va mehnatkash", "O'ziga ishongan, ochiq muloqotchi", "Vaqtga rioya qiluvchi va tartibli", "Tanqidchi ko'rinishi mumkin", "Ishonch bilgach sodiq"],
                "kk": ["Байқампаз және еңбекқор", "Өзіне сенімді, ашық сөйлейтін", "Уақытты сақтайтын және ұйымшыл", "Сынаушы болып көрінуі мүмкін", "Сенім артқаннан кейін адал"],
                "fr": ["Observateur et travailleur", "Confiant, communicateur direct", "Ponctuel et organisé", "Peut sembler critique", "Loyal une fois la confiance établie"],
                "de": ["Aufmerksam und fleißig", "Selbstbewusst, direkter Kommunikator", "Pünktlich und organisiert", "Kann kritisch wirken", "Treu, sobald Vertrauen besteht"],
                "lo": ["ສັງເກດເກັ່ງ ແລະ ດຸໜັ່ນ", "ໝັ້ນໃຈ, ສື່ສານກົງໄປກົງມາ", "ຕົງເວລາ ແລະ ມີລະບຽບ", "ອາດເບິ່ງຄືມັກຕິຊົມ", "ຊື່ສັດເມື່ອໄວ້ໃຈກັນແລ້ວ"],
                "it": ["Attento e instancabile", "Sicuro di sé, comunicatore diretto", "Puntuale e organizzato", "Può sembrare critico", "Leale una volta guadagnata la fiducia"],
                "ar": ["ملاحظ ومجتهد", "واثق ومباشر في التواصل", "دقيق في المواعيد ومنظّم", "قد يبدو ناقدًا", "وفيّ بمجرد أن تُمنح ثقته"],
                "fa": ["تیزبین و پرکار", "مطمئن به خود و رک در گفتار", "وقت‌شناس و منظم", "ممکن است انتقادی به نظر برسد", "پس از جلب اعتماد، وفادار می‌ماند"]},
    "dog": {"en": ["Loyal and honest", "Protective of loved ones", "Strong sense of justice", "Can be anxious", "Reliable, steady friend"],
            "ru": ["Верность, честность", "Защищает близких", "Развитое чувство справедливости", "Может тревожиться", "Надёжный, стабильный друг"],
            "es": ["Leal y honesto", "Protector con sus seres queridos", "Fuerte sentido de la justicia", "Puede ser ansioso", "Amigo fiable y estable"],
            "hi": ["वफादार और ईमानदार", "अपनों की रक्षा करने वाला", "न्याय की गहरी भावना", "चिंतित हो सकता है", "भरोसेमंद, स्थिर मित्र"],
            "pt": ["Leal e honesto", "Protetor com quem ama", "Forte senso de justiça", "Pode ser ansioso", "Amigo confiável e constante"],
            "vi": ["Trung thành và trung thực", "Bảo vệ những người thân yêu", "Ý thức công bằng mạnh mẽ", "Có thể hay lo lắng", "Người bạn đáng tin cậy, ổn định"],
            "tr": ["Sadık ve dürüst", "Sevdiklerini koruyan", "Güçlü adalet duygusu", "Kaygılı olabilir", "Güvenilir, istikrarlı bir dost"],
            "id": ["Setia dan jujur", "Melindungi orang yang dicintai", "Rasa keadilan yang kuat", "Bisa cemas", "Teman yang bisa diandalkan dan stabil"],
            "uz": ["Sodiq va halol", "Yaqinlarini himoya qiluvchi", "Kuchli adolat hissi", "Xavotirli bo'lishi mumkin", "Ishonchli va barqaror do'st"],
            "kk": ["Адал және шыншыл", "Жақындарын қорғаушы", "Әділеттілік сезімі күшті", "Уайымшыл болуы мүмкін", "Сенімді, тұрақты дос"],
            "fr": ["Loyal et honnête", "Protecteur envers ses proches", "Grand sens de la justice", "Peut être anxieux", "Ami fiable et constant"],
            "de": ["Treu und ehrlich", "Beschützt geliebte Menschen", "Ausgeprägter Gerechtigkeitssinn", "Kann ängstlich sein", "Zuverlässiger, beständiger Freund"],
            "lo": ["ຊື່ສັດ ແລະ ຈິງໃຈ", "ປົກປ້ອງຄົນທີ່ຮັກ", "ມີຄວາມຍຸຕິທຳສູງ", "ອາດກັງວົນງ່າຍ", "ເປັນໝູ່ທີ່ໄວ້ໃຈໄດ້ ແລະ ໝັ້ນຄົງ"],
            "it": ["Leale e onesto", "Protettivo verso i propri cari", "Forte senso della giustizia", "Può essere ansioso", "Amico affidabile e costante"],
            "ar": ["وفيّ وصادق", "يحمي من يحب", "يتمتع بحس عدالة قوي", "قد يشعر بالقلق", "صديق يُعتمد عليه وثابت"],
            "fa": ["وفادار و صادق", "محافظ عزیزانش", "دارای حس عدالت قوی", "ممکن است مضطرب باشد", "دوستی قابل‌اعتماد و ثابت‌قدم"]},
    "pig": {"en": ["Warm-hearted and generous", "Diligent, enjoys comfort", "Honest and straightforward", "Can seem naive", "Sociable, enjoys good company"],
            "ru": ["Душевность, щедрость", "Трудолюбие, любит комфорт", "Честность, прямота", "Может казаться наивным", "Общительность, любит хорошую компанию"],
            "es": ["Cálido y generoso", "Diligente, disfruta de la comodidad", "Honesto y directo", "Puede parecer ingenuo", "Sociable, disfruta de buena compañía"],
            "hi": ["गर्मजोशी भरा और उदार", "मेहनती, आराम का आनंद लेता है", "ईमानदार और सीधा", "भोला लग सकता है", "मिलनसार, अच्छी संगति का आनंद लेता है"],
            "pt": ["Caloroso e generoso", "Diligente, aprecia o conforto", "Honesto e direto", "Pode parecer ingênuo", "Sociável, gosta de boa companhia"],
            "vi": ["Ấm áp và hào phóng", "Chăm chỉ, thích sự thoải mái", "Trung thực và thẳng thắn", "Có thể tỏ ra ngây thơ", "Hòa đồng, thích giao du bạn bè"],
            "tr": ["Sıcak kalpli ve cömert", "Çalışkan, konforu sever", "Dürüst ve açık sözlü", "Saf görünebilir", "Sosyal, iyi arkadaşlıktan hoşlanır"],
            "id": ["Berhati hangat dan murah hati", "Rajin, menikmati kenyamanan", "Jujur dan blak-blakan", "Bisa terlihat naif", "Ramah, senang berteman"],
            "uz": ["Mehribon va saxiy", "Mehnatkash, qulaylikni yaxshi ko'radi", "Halol va ochiq-oydin", "Soddadil ko'rinishi mumkin", "Muloqotchan, yaxshi suhbatdan xursand bo'ladi"],
            "kk": ["Жүрегі жылы және жомарт", "Еңбекқор, жайлылықты жақсы көреді", "Адал және ашық", "Аңқау болып көрінуі мүмкін", "Қарым-қатынасқа бейім, жақсы серіктестікті ұнатады"],
            "fr": ["Chaleureux et généreux", "Assidu, aime le confort", "Honnête et franc", "Peut sembler naïf", "Sociable, apprécie la bonne compagnie"],
            "de": ["Warmherzig und großzügig", "Fleißig, genießt Komfort", "Ehrlich und geradeheraus", "Kann naiv wirken", "Gesellig, schätzt gute Gesellschaft"],
            "lo": ["ໃຈດີ ແລະ ໃຈກວ້າງ", "ດຸໜັ່ນ, ມັກຄວາມສະບາຍ", "ຊື່ສັດ ແລະ ກົງໄປກົງມາ", "ອາດເບິ່ງຄືໄຮ້ດຽງສາ", "ເຂົ້າສັງຄົມເກັ່ງ, ມັກສະຫາຍທີ່ດີ"],
            "it": ["Caloroso e generoso", "Diligente, ama le comodità", "Onesto e diretto", "Può sembrare ingenuo", "Socievole, ama la buona compagnia"],
            "ar": ["دافئ القلب وكريم", "مجتهد ويستمتع بالراحة", "صادق ومباشر", "قد يبدو ساذجًا", "اجتماعي ويستمتع بالرفقة الطيبة"],
            "fa": ["گرم‌قلب و سخاوتمند", "سخت‌کوش و رفاه‌دوست", "صادق و رک", "ممکن است ساده‌لوح به نظر برسد", "اجتماعی و علاقه‌مند به همراهی خوب"]},
}

NAV_LABELS = {
    "en": {"home": "Home", "zodiac": "Zodiac Signs", "cta": "Take the free archetype test", "back": "← Back to Test",
           "element": "Element", "years": "Birth years", "h1_suffix": "Personality & Compatibility"},
    "ru": {"home": "Главная", "zodiac": "Знаки зодиака", "cta": "Пройти бесплатный тест на архетип", "back": "← Назад к тесту",
           "element": "Элемент", "years": "Годы рождения", "h1_suffix": "Характер и совместимость"},
    "es": {"home": "Inicio", "zodiac": "Signos del Zodíaco", "cta": "Haz el test de arquetipo gratis", "back": "← Volver al Test",
           "element": "Elemento", "years": "Años de nacimiento", "h1_suffix": "Personalidad y Compatibilidad"},
    "hi": {"home": "होम", "zodiac": "राशि चिह्न", "cta": "मुफ़्त आर्कटाइप टेस्ट लें", "back": "← टेस्ट पर वापस जाएँ",
           "element": "तत्व", "years": "जन्म वर्ष", "h1_suffix": "व्यक्तित्व और अनुकूलता"},
    "pt": {"home": "Início", "zodiac": "Signos do Zodíaco", "cta": "Faça o teste de arquétipo grátis", "back": "← Voltar ao Teste",
           "element": "Elemento", "years": "Anos de nascimento", "h1_suffix": "Personalidade e Compatibilidade"},
    "vi": {"home": "Trang chủ", "zodiac": "Con Giáp", "cta": "Làm bài trắc nghiệm nguyên mẫu miễn phí", "back": "← Quay lại Bài Test",
           "element": "Ngũ hành", "years": "Năm sinh", "h1_suffix": "Tính Cách & Sự Hợp Nhau"},
    "tr": {"home": "Ana Sayfa", "zodiac": "Burçlar", "cta": "Ücretsiz arketip testini yapın", "back": "← Teste Geri Dön",
           "element": "Element", "years": "Doğum yılları", "h1_suffix": "Kişilik ve Uyumluluk"},
    "id": {"home": "Beranda", "zodiac": "Shio", "cta": "Ikuti tes arketip gratis", "back": "← Kembali ke Tes",
           "element": "Elemen", "years": "Tahun kelahiran", "h1_suffix": "Kepribadian & Kecocokan"},
    "uz": {"home": "Bosh sahifa", "zodiac": "Zodiak Belgilari", "cta": "Bepul arxetip testini bajaring", "back": "← Testga qaytish",
           "element": "Element", "years": "Tug'ilgan yillar", "h1_suffix": "Xarakter va Moslik"},
    "kk": {"home": "Басты бет", "zodiac": "Зодиак Белгілері", "cta": "Тегін архетип тестінен өтіңіз", "back": "← Тестке оралу",
           "element": "Элемент", "years": "Туған жылдар", "h1_suffix": "Мінез және Үйлесімділік"},
    "fr": {"home": "Accueil", "zodiac": "Signes du Zodiaque", "cta": "Passez le test d'archétype gratuit", "back": "← Retour au Test",
           "element": "Élément", "years": "Années de naissance", "h1_suffix": "Personnalité et Compatibilité"},
    "de": {"home": "Startseite", "zodiac": "Sternzeichen", "cta": "Machen Sie den kostenlosen Archetyp-Test", "back": "← Zurück zum Test",
           "element": "Element", "years": "Geburtsjahre", "h1_suffix": "Persönlichkeit & Kompatibilität"},
    "lo": {"home": "ໜ້າຫຼັກ", "zodiac": "ນັກສັດ", "cta": "ເຮັດແບບທົດສອບຕົ້ນແບບຟຣີ", "back": "← ກັບໄປທົດສອບ",
           "element": "ທາດ", "years": "ປີເກີດ", "h1_suffix": "ບຸກຄະລິກ ແລະ ຄວາມເຂົ້າກັນໄດ້"},
    "it": {"home": "Home", "zodiac": "Segni Zodiacali", "cta": "Fai il test gratuito dell'archetipo", "back": "← Torna al Test",
           "element": "Elemento", "years": "Anni di nascita", "h1_suffix": "Personalità e Compatibilità"},
    "ar": {"home": "الرئيسية", "zodiac": "الأبراج الصينية", "cta": "أجرِ اختبار النمط الشخصي المجاني", "back": "← العودة إلى الاختبار",
           "element": "العنصر", "years": "سنوات الميلاد", "h1_suffix": "الشخصية والتوافق"},
    "fa": {"home": "خانه", "zodiac": "نشان‌های زودیاک", "cta": "آزمون رایگان کهن‌الگو را انجام دهید", "back": "← بازگشت به آزمون",
           "element": "عنصر", "years": "سال‌های تولد", "h1_suffix": "شخصیت و سازگاری"},
}

TITLE_TPL = {"en": "{name}: Personality Traits & Compatibility | AstroScan",
             "ru": "{name}: черты характера и совместимость | AstroScan",
             "es": "{name}: rasgos de personalidad y compatibilidad | AstroScan",
             "hi": "{name}: व्यक्तित्व विशेषताएँ और अनुकूलता | AstroScan",
             "pt": "{name}: Traços de Personalidade e Compatibilidade | AstroScan",
             "vi": "{name}: Tính Cách &amp; Độ Hợp | AstroScan",
             "tr": "{name}: Kişilik Özellikleri ve Uyumluluk | AstroScan",
             "id": "{name}: Sifat Kepribadian &amp; Kecocokan | AstroScan",
             "uz": "{name}: Xarakter Xususiyatlari va Moslik | AstroScan",
             "kk": "{name}: Мінез Ерекшеліктері және Үйлесімділік | AstroScan",
             "fr": "{name} : Traits de Personnalité et Compatibilité | AstroScan",
             "de": "{name}: Charaktereigenschaften &amp; Kompatibilität | AstroScan",
             "lo": "{name}: ລັກສະນະນິໄສ ແລະ ຄວາມເຂົ້າກັນໄດ້ | AstroScan",
             "it": "{name}: Tratti di Personalità e Compatibilità | AstroScan",
             "ar": "{name}: سمات الشخصية والتوافق | AstroScan",
             "fa": "{name}: ویژگی‌های شخصیتی و سازگاری | AstroScan"}
DESC_TPL = {"en": "Born in a {name} year? Discover Chinese zodiac {name} personality traits, best compatibility matches, and your element — free, no exact birth date needed.",
            "ru": "Родились в год {name}? Узнайте черты характера, совместимость и элемент знака {name} по китайскому зодиаку — бесплатно, без точной даты рождения.",
            "es": "¿Naciste en un año del {name}? Descubre los rasgos de personalidad, la compatibilidad y el elemento del signo {name} del zodíaco chino — gratis, sin fecha exacta de nacimiento.",
            "hi": "{name} वर्ष में जन्मे? चीनी राशि चक्र {name} के व्यक्तित्व गुण, सर्वोत्तम अनुकूलता और तत्व जानें — मुफ़्त, सटीक जन्म तिथि की आवश्यकता नहीं।",
            "pt": "Nasceu em um ano do {name}? Descubra os traços de personalidade do signo {name} do zodíaco chinês, as melhores combinações de compatibilidade e seu elemento — grátis, sem precisar da data exata de nascimento.",
            "vi": "Sinh vào năm {name}? Khám phá tính cách của người tuổi {name} theo con giáp Trung Hoa, những cặp hợp nhau nhất và ngũ hành của bạn — miễn phí, không cần ngày sinh chính xác.",
            "tr": "{name} yılında mı doğdunuz? Çin burcu {name}'in kişilik özelliklerini, en iyi uyumluluk eşleşmelerini ve elementinizi keşfedin — ücretsiz, tam doğum tarihi gerekmeden.",
            "id": "Lahir di tahun {name}? Temukan sifat kepribadian shio {name}, pasangan kecocokan terbaik, dan elemen Anda — gratis, tanpa perlu tanggal lahir yang tepat.",
            "uz": "{name} yilida tug'ilganmisiz? Xitoy zodiakidagi {name} belgisining xarakter xususiyatlarini, eng yaxshi moslik juftlarini va elementingizni bilib oling — bepul, aniq tug'ilgan sana talab qilinmaydi.",
            "kk": "{name} жылы туылдыңыз ба? Қытай зодиагындағы {name} белгісінің мінез ерекшеліктерін, ең жақсы үйлесімді жұптарын және элементіңізді біліңіз — тегін, нақты туған күн қажет емес.",
            "fr": "Né(e) une année du {name} ? Découvrez les traits de personnalité du signe {name} du zodiaque chinois, les meilleures compatibilités et votre élément — gratuit, sans date de naissance exacte requise.",
            "de": "In einem {name}-Jahr geboren? Entdecken Sie die Charaktereigenschaften des chinesischen Sternzeichens {name}, die besten Kompatibilitätspartner und Ihr Element — kostenlos, ohne genaues Geburtsdatum.",
            "lo": "ເກີດປີ {name} ບໍ? ຄົ້ນຫາລັກສະນະນິໄສຂອງນັກສັດ{name}ຕາມແບບຈີນ, ຄູ່ທີ່ເຂົ້າກັນໄດ້ດີທີ່ສຸດ ແລະ ທາດຂອງທ່ານ — ຟຣີ, ບໍ່ຕ້ອງໃຊ້ວັນເກີດທີ່ແນ່ນອນ.",
            "it": "Sei nato in un anno del {name}? Scopri i tratti di personalità del segno {name} nello zodiaco cinese, le migliori compatibilità e il tuo elemento — gratis, senza data di nascita esatta.",
            "ar": "هل وُلدت في سنة {name}؟ اكتشف سمات شخصية برج {name} في الأبراج الصينية، وأفضل حالات التوافق، وعنصرك — مجانًا، دون الحاجة إلى تاريخ ميلاد دقيق.",
            "fa": "در سال {name} به دنیا آمده‌اید؟ ویژگی‌های شخصیتی نشان {name} در زودیاک چینی، بهترین تطابق‌های سازگاری و عنصر خود را دریابید — رایگان، بدون نیاز به تاریخ تولد دقیق."}
INTRO_TPL = {"en": "In the Chinese zodiac, the {name} is associated with the {element} element. Unlike a Western birth chart, your Chinese zodiac sign is determined purely by your birth year — no birth time or location needed.",
             "ru": "В китайском зодиаке {name} ассоциируется с элементом {element}. В отличие от западной натальной карты, ваш знак китайского зодиака определяется исключительно годом рождения — без времени и места рождения.",
             "es": "En el zodíaco chino, el signo {name} está asociado con el elemento {element}. A diferencia de una carta natal occidental, tu signo del zodíaco chino se determina únicamente por tu año de nacimiento — sin necesidad de hora ni lugar de nacimiento.",
             "hi": "चीनी राशि चक्र में, {name} {element} तत्व से जुड़ा है। पश्चिमी जन्म कुंडली के विपरीत, आपकी चीनी राशि केवल आपके जन्म वर्ष से निर्धारित होती है — जन्म समय या स्थान की आवश्यकता नहीं।",
             "pt": "No zodíaco chinês, o {name} está associado ao elemento {element}. Diferente de um mapa astral ocidental, seu signo do zodíaco chinês é determinado apenas pelo ano de nascimento — sem necessidade de hora ou local de nascimento.",
             "vi": "Trong con giáp Trung Hoa, {name} gắn liền với hành {element}. Khác với lá số tử vi phương Tây, con giáp của bạn chỉ được xác định theo năm sinh — không cần giờ hay nơi sinh.",
             "tr": "Çin burcunda {name}, {element} elementiyle ilişkilendirilir. Batı doğum haritasının aksine, Çin burcunuz yalnızca doğum yılınıza göre belirlenir — doğum saati veya yeri gerekmez.",
             "id": "Dalam shio Tiongkok, {name} dikaitkan dengan elemen {element}. Berbeda dengan peta kelahiran Barat, shio Anda ditentukan murni berdasarkan tahun kelahiran — tanpa perlu waktu atau lokasi lahir.",
             "uz": "Xitoy zodiakida {name} {element} elementi bilan bog'liq. G'arb tug'ilish xaritasidan farqli o'laroq, sizning xitoy zodiak belgingiz faqat tug'ilgan yilingiz bo'yicha aniqlanadi — tug'ilgan vaqt yoki joy talab qilinmaydi.",
             "kk": "Қытай зодиагында {name} {element} элементімен байланысты. Батыс туу картасынан айырмашылығы, сіздің қытай зодиак белгіңіз тек туған жылыңыз бойынша анықталады — туған уақыт немесе орын қажет емес.",
             "fr": "Dans le zodiaque chinois, le {name} est associé à l'élément {element}. Contrairement à un thème astral occidental, votre signe du zodiaque chinois est déterminé uniquement par votre année de naissance — sans avoir besoin de l'heure ou du lieu de naissance.",
             "de": "Im chinesischen Tierkreis wird {name} mit dem Element {element} assoziiert. Anders als bei einem westlichen Geburtshoroskop wird Ihr chinesisches Sternzeichen ausschließlich durch Ihr Geburtsjahr bestimmt — ohne Geburtszeit oder -ort.",
             "lo": "ໃນນັກສັດຈີນ, {name} ກ່ຽວຂ້ອງກັບທາດ {element}. ຕ່າງຈາກຜັງດວງຊະຕາຕາເວັນຕົກ, ນັກສັດຂອງທ່ານຖືກກຳນົດໂດຍປີເກີດເທົ່ານັ້ນ — ບໍ່ຕ້ອງໃຊ້ເວລາ ຫຼື ສະຖານທີ່ເກີດ.",
             "it": "Nello zodiaco cinese, il {name} è associato all'elemento {element}. A differenza di un tema natale occidentale, il tuo segno zodiacale cinese è determinato esclusivamente dall'anno di nascita — non servono ora né luogo di nascita.",
             "ar": "في الأبراج الصينية، يرتبط برج {name} بعنصر {element}. وخلافًا للخريطة الفلكية الغربية، يُحدَّد برجك الصيني بناءً على سنة ميلادك فقط — دون حاجة لوقت أو مكان الميلاد.",
             "fa": "در زودیاک چینی، {name} با عنصر {element} در ارتباط است. برخلاف طالع تولد غربی، نشان زودیاک چینی شما تنها بر اساس سال تولدتان تعیین می‌شود — بدون نیاز به ساعت یا محل تولد."}
COMPAT_TPL = {"en": "Per traditional Chinese zodiac compatibility triangles, {name} shares natural affinity with {m1} and {m2}. {name} and {clash} sit in directly opposing positions on the 12-year cycle, traditionally considered the most challenging pairing.",
              "ru": "По традиционным треугольникам совместимости китайского зодиака, у {name} естественная близость с {m1} и {m2}. {name} и {clash} находятся в прямо противоположных позициях 12-летнего цикла — традиционно самая сложная пара.",
              "es": "Según los triángulos de compatibilidad tradicionales del zodíaco chino, {name} tiene afinidad natural con {m1} y {m2}. {name} y {clash} ocupan posiciones directamente opuestas en el ciclo de 12 años, tradicionalmente la combinación más desafiante.",
              "hi": "पारंपरिक चीनी राशि अनुकूलता त्रिकोणों के अनुसार, {name} का {m1} और {m2} के साथ स्वाभाविक तालमेल है। {name} और {clash} 12-वर्षीय चक्र में सीधे विपरीत स्थिति में हैं — परंपरागत रूप से सबसे चुनौतीपूर्ण जोड़ी।",
              "pt": "Segundo os triângulos tradicionais de compatibilidade do zodíaco chinês, {name} tem afinidade natural com {m1} e {m2}. {name} e {clash} ocupam posições diretamente opostas no ciclo de 12 anos, tradicionalmente considerada a combinação mais desafiadora.",
              "vi": "Theo tam hợp truyền thống của con giáp Trung Hoa, {name} có sự hợp nhau tự nhiên với {m1} và {m2}. {name} và {clash} nằm ở vị trí đối xung trực tiếp trong chu kỳ 12 năm, theo truyền thống được xem là cặp đôi khó hòa hợp nhất.",
              "tr": "Geleneksel Çin burcu uyumluluk üçgenlerine göre, {name} doğal olarak {m1} ve {m2} ile uyumludur. {name} ve {clash}, 12 yıllık döngüde tam karşıt konumlarda yer alır ve geleneksel olarak en zorlu eşleşme sayılır.",
              "id": "Menurut segitiga kecocokan shio Tiongkok tradisional, {name} memiliki keselarasan alami dengan {m1} dan {m2}. {name} dan {clash} berada di posisi yang berlawanan langsung dalam siklus 12 tahun, secara tradisional dianggap sebagai pasangan paling menantang.",
              "uz": "An'anaviy xitoy zodiaki moslik uchburchaklariga ko'ra, {name} {m1} va {m2} bilan tabiiy moslikka ega. {name} va {clash} 12 yillik davrada bir-biriga to'g'ridan-to'g'ri qarama-qarshi turadi va an'anaviy ravishda eng qiyin juftlik hisoblanadi.",
              "kk": "Дәстүрлі қытай зодиагы үйлесімділік үшбұрыштарына сәйкес, {name} {m1} және {m2} белгілерімен табиғи үйлесімге ие. {name} мен {clash} 12 жылдық циклде бір-біріне тікелей қарама-қарсы орналасқан және дәстүрлі түрде ең қиын жұп саналады.",
              "fr": "Selon les triangles de compatibilité traditionnels du zodiaque chinois, {name} partage une affinité naturelle avec {m1} et {m2}. {name} et {clash} occupent des positions directement opposées dans le cycle de 12 ans, traditionnellement considérées comme l'association la plus difficile.",
              "de": "Nach den traditionellen Kompatibilitätsdreiecken des chinesischen Tierkreises hat {name} eine natürliche Affinität zu {m1} und {m2}. {name} und {clash} stehen sich im 12-Jahres-Zyklus direkt gegenüber, was traditionell als die schwierigste Paarung gilt.",
              "lo": "ຕາມສາມຫຼ່ຽມຄວາມເຂົ້າກັນໄດ້ຂອງນັກສັດຈີນແບບດັ້ງເດີມ, {name} ມີຄວາມເຂົ້າກັນໄດ້ຕາມທຳມະຊາດກັບ {m1} ແລະ {m2}. {name} ແລະ {clash} ຢູ່ໃນຕຳແໜ່ງກົງກັນຂ້າມກັນໂດຍກົງໃນວົງຈອນ 12 ປີ, ຕາມປະເພນີຖືວ່າເປັນຄູ່ທີ່ທ້າທາຍທີ່ສຸດ.",
              "it": "Secondo i tradizionali triangoli di compatibilità dello zodiaco cinese, {name} ha un'affinità naturale con {m1} e {m2}. {name} e {clash} occupano posizioni direttamente opposte nel ciclo di 12 anni, tradizionalmente la combinazione più difficile.",
              "ar": "وفق مثلثات التوافق التقليدية في الأبراج الصينية، يشترك برج {name} بانسجام طبيعي مع {m1} و{m2}. يقع برج {name} وبرج {clash} في موقعين متقابلين تمامًا في الدورة البالغة 12 عامًا، وتُعدّ تقليديًا الأصعب من حيث التوافق.",
              "fa": "بر اساس مثلث‌های سنتی سازگاری در زودیاک چینی، {name} با {m1} و {m2} همخوانی طبیعی دارد. {name} و {clash} در چرخهٔ ۱۲ ساله در موقعیت‌های کاملاً مقابل هم قرار دارند که به‌طور سنتی چالش‌برانگیزترین ترکیب به شمار می‌رود."}
H1_TPL = "{emoji} {name} — {suffix}"


def page_path(lang, sign_id):
    return os.path.join(lang, "zodiac", sign_id, "index.html") if lang != "en" else os.path.join("zodiac", sign_id, "index.html")


def url_for(lang, sign_id):
    prefix = "" if lang == "en" else lang + "/"
    return f"{BASE}/{prefix}zodiac/{sign_id}/"


def home_url(lang):
    return BASE + "/" if lang == "en" else f"{BASE}/{lang}/"


def asset_prefix(lang):
    return "../../" if lang == "en" else "../../../"


def render_page(sign_id, lang):
    nav = NAV_LABELS[lang]
    name = NAMES[sign_id][lang]
    element = ELEMENT_NAMES[ELEMENT_KEY[sign_id]][lang]
    m1_id, m2_id = MATCH[sign_id][0], MATCH[sign_id][1]
    clash_id = CLASH[sign_id]
    m1 = NAMES[m1_id][lang]
    m2 = NAMES[m2_id][lang]
    clash = NAMES[clash_id][lang]
    title = TITLE_TPL[lang].format(name=name)
    desc = DESC_TPL[lang].format(name=name)
    intro = INTRO_TPL[lang].format(name=name, element=element)
    m1_link = f'<a href="{url_for(lang, m1_id)}">{m1}</a>'
    m2_link = f'<a href="{url_for(lang, m2_id)}">{m2}</a>'
    clash_link = f'<a href="{url_for(lang, clash_id)}">{clash}</a>'
    compat = COMPAT_TPL[lang].format(name=name, m1=m1_link, m2=m2_link, clash=clash_link)
    h1 = H1_TPL.format(emoji=EMOJI[sign_id], name=name, suffix=nav["h1_suffix"])
    traits_html = "".join(f"<li>{t}</li>" for t in TRAITS[sign_id][lang])
    hreflang_links = "\n    ".join(f'<link rel="alternate" hreflang="{l}" href="{url_for(l, sign_id)}">' for l in LANGS)
    hreflang_links += f'\n    <link rel="alternate" hreflang="x-default" href="{url_for("en", sign_id)}">'
    ap = asset_prefix(lang)
    jsonld = {
        "@context": "https://schema.org", "@type": "Article", "headline": title, "description": desc,
        "about": f"Chinese zodiac {sign_id} sign", "inLanguage": lang,
        "isPartOf": {"@type": "WebSite", "name": "AstroScan", "url": BASE + "/"},
    }
    breadcrumb_jsonld = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": nav['home'], "item": home_url(lang)},
            {"@type": "ListItem", "position": 2, "name": f"{EMOJI[sign_id]} {name}", "item": url_for(lang, sign_id)},
        ],
    }
    dir_attr = ' dir="rtl"' if lang in RTL_LANGS else ''
    return f"""<!DOCTYPE html>
<html lang="{lang}"{dir_attr}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{url_for(lang, sign_id)}">
  {hreflang_links}
  <link rel="icon" type="image/x-icon" href="{ap}favicon.ico">
  <link rel="manifest" href="{ap}manifest.json">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="{url_for(lang, sign_id)}">
  <meta property="og:image" content="{BASE}/cover.jpg">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://api.learntogoogle.de https://librecounter.org; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https://librecounter.org; frame-ancestors 'self' https://web.telegram.org https://telegram.org https://*.telegram.org; object-src 'none'; base-uri 'none'; upgrade-insecure-requests;">
  <link rel="stylesheet" href="{ap}assets/css/styles.css">
  <script type="application/ld+json">{json.dumps(jsonld, ensure_ascii=False)}</script>
  <script type="application/ld+json">{json.dumps(breadcrumb_jsonld, ensure_ascii=False)}</script>
</head>
<body class="lang-{lang}">
  <div class="container" style="max-width:760px;">
    <nav style="margin:1.5rem 0;font-size:0.9rem;"><a href="{home_url(lang)}">{nav['home']}</a> &rsaquo; {nav['zodiac']} &rsaquo; {EMOJI[sign_id]} {name}</nav>
    <h1>{h1}</h1>
    <p style="color:var(--text-dim);margin:1rem 0;">{intro}</p>
    <p><strong>{nav['element']}:</strong> {element} &nbsp;|&nbsp; <strong>{nav['years']}:</strong> {YEARS[sign_id]}</p>
    <ul style="margin:1rem 0 1rem 1.2rem;">{traits_html}</ul>
    <p style="color:var(--text-dim);">{compat}</p>
    <p style="margin-top:1.5rem;"><a class="btn-primary" href="{home_url(lang)}" style="display:inline-block;text-decoration:none;">{nav['cta']}</a></p>
    <p style="margin-top:2rem;"><a href="{home_url(lang)}">{nav['back']}</a></p>
  </div>
</body>
</html>
"""


for sign_id in NAMES:
    for lang in LANGS:
        path = page_path(lang, sign_id)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with io.open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(render_page(sign_id, lang))
        print("OK", path)

print("Done:", len(NAMES), "signs x", len(LANGS), "langs =", len(NAMES) * len(LANGS), "pages")
