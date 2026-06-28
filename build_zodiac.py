import io, os, json

BASE = "https://astroscan-lab.github.io/astroscan_bot"
LANGS = ["en", "ru", "es", "hi"]

NAMES = {
    "rat": {"en": "Rat", "ru": "Крыса", "es": "Rata", "hi": "चूहा"},
    "ox": {"en": "Ox", "ru": "Бык", "es": "Buey", "hi": "बैल"},
    "tiger": {"en": "Tiger", "ru": "Тигр", "es": "Tigre", "hi": "बाघ"},
    "rabbit": {"en": "Rabbit", "ru": "Кролик", "es": "Conejo", "hi": "खरगोश"},
    "dragon": {"en": "Dragon", "ru": "Дракон", "es": "Dragón", "hi": "ड्रैगन"},
    "snake": {"en": "Snake", "ru": "Змея", "es": "Serpiente", "hi": "साँप"},
    "horse": {"en": "Horse", "ru": "Лошадь", "es": "Caballo", "hi": "घोड़ा"},
    "goat": {"en": "Goat", "ru": "Коза", "es": "Cabra", "hi": "बकरी"},
    "monkey": {"en": "Monkey", "ru": "Обезьяна", "es": "Mono", "hi": "बंदर"},
    "rooster": {"en": "Rooster", "ru": "Петух", "es": "Gallo", "hi": "मुर्गा"},
    "dog": {"en": "Dog", "ru": "Собака", "es": "Perro", "hi": "कुत्ता"},
    "pig": {"en": "Pig", "ru": "Свинья", "es": "Cerdo", "hi": "सुअर"},
}
EMOJI = {"rat": "🐀", "ox": "🐂", "tiger": "🐅", "rabbit": "🐇", "dragon": "🐉", "snake": "🐍",
         "horse": "🐎", "goat": "🐐", "monkey": "🐒", "rooster": "🐓", "dog": "🐕", "pig": "🐖"}
ELEMENT_KEY = {"rat": "water", "ox": "earth", "tiger": "wood", "rabbit": "wood", "dragon": "fire",
               "snake": "fire", "horse": "fire", "goat": "earth", "monkey": "metal", "rooster": "metal",
               "dog": "earth", "pig": "water"}
ELEMENT_NAMES = {
    "water": {"en": "Water", "ru": "Вода", "es": "Agua", "hi": "जल"},
    "earth": {"en": "Earth", "ru": "Земля", "es": "Tierra", "hi": "पृथ्वी"},
    "wood": {"en": "Wood", "ru": "Дерево", "es": "Madera", "hi": "काष्ठ"},
    "fire": {"en": "Fire", "ru": "Огонь", "es": "Fuego", "hi": "अग्नि"},
    "metal": {"en": "Metal", "ru": "Металл", "es": "Metal", "hi": "धातु"},
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
            "hi": ["तेज़-तर्रार और साधन-संपन्न", "मिलनसार और अनुकूलनीय", "व्यावहारिक, बचत में माहिर", "अवसरवादी लग सकता है", "जिज्ञासु और चौकस"]},
    "ox": {"en": ["Diligent and dependable", "Patient and methodical", "Strong sense of responsibility", "Can be stubborn", "Calm under pressure"],
           "ru": ["Усердие и надёжность", "Терпеливость, методичность", "Развитое чувство долга", "Может быть упрямым", "Спокойствие под давлением"],
           "es": ["Diligente y confiable", "Paciente y metódico", "Fuerte sentido de la responsabilidad", "Puede ser obstinado", "Calmado bajo presión"],
           "hi": ["मेहनती और भरोसेमंद", "धैर्यवान और व्यवस्थित", "मजबूत जिम्मेदारी की भावना", "ज़िद्दी हो सकता है", "दबाव में शांत"]},
    "tiger": {"en": ["Brave and confident", "Natural leader, competitive", "Passionate and dynamic", "Can be impulsive", "Independent-minded"],
              "ru": ["Смелость и уверенность", "Врождённый лидер, соревновательность", "Страстность и динамичность", "Может быть импульсивным", "Независимое мышление"],
              "es": ["Valiente y confiado", "Líder nato, competitivo", "Apasionado y dinámico", "Puede ser impulsivo", "De mente independiente"],
              "hi": ["साहसी और आत्मविश्वासी", "स्वाभाविक नेता, प्रतिस्पर्धी", "जोशीला और गतिशील", "आवेगी हो सकता है", "स्वतंत्र विचारधारा"]},
    "rabbit": {"en": ["Gentle and diplomatic", "Sensitive and compassionate", "Values harmony and stability", "Can be overly cautious", "Refined taste"],
               "ru": ["Мягкость и дипломатичность", "Чувствительность, отзывчивость", "Ценит гармонию и стабильность", "Может быть чрезмерно осторожным", "Тонкий вкус"],
               "es": ["Gentil y diplomático", "Sensible y compasivo", "Valora la armonía y la estabilidad", "Puede ser demasiado cauteloso", "Gustos refinados"],
               "hi": ["कोमल और कूटनीतिक", "संवेदनशील और दयालु", "सद्भाव और स्थिरता को महत्व देता है", "अत्यधिक सावधान हो सकता है", "परिष्कृत स्वाद"]},
    "dragon": {"en": ["Confident and charismatic", "Ambitious, natural-born leader", "Highly creative and energetic", "Can come across as prideful or stubborn", "Generous toward people they trust"],
               "ru": ["Уверенность и харизма", "Амбициозность, врождённые лидерские качества", "Творческая энергия", "Может казаться гордым или упрямым", "Щедрость к тем, кому доверяет"],
               "es": ["Confianza y carisma", "Ambición, líder nato", "Muy creativo y enérgico", "Puede parecer orgulloso o obstinado", "Generoso con quienes confía"],
               "hi": ["आत्मविश्वासी और आकर्षक", "महत्वाकांक्षी, स्वाभाविक नेता", "अत्यंत रचनात्मक और ऊर्जावान", "घमंडी या ज़िद्दी लग सकता है", "विश्वसनीय लोगों के प्रति उदार"]},
    "snake": {"en": ["Wise and intuitive", "Calm, strategic thinker", "Private and self-reliant", "Can seem secretive", "Elegant and perceptive"],
              "ru": ["Мудрость и интуиция", "Спокойствие, стратегическое мышление", "Скрытность, самодостаточность", "Может казаться таинственным", "Элегантность и проницательность"],
              "es": ["Sabio e intuitivo", "Pensador calmado y estratégico", "Reservado y autosuficiente", "Puede parecer reservado en exceso", "Elegante y perceptivo"],
              "hi": ["बुद्धिमान और सहज ज्ञान वाला", "शांत, रणनीतिक सोच", "निजी और आत्मनिर्भर", "गुप्त लग सकता है", "सुरुचिपूर्ण और सूक्ष्मदर्शी"]},
    "horse": {"en": ["Energetic and freedom-loving", "Sociable and enthusiastic", "Quick decision-maker", "Can be impatient", "Independent spirit"],
              "ru": ["Энергичность, любовь к свободе", "Общительность, энтузиазм", "Быстрые решения", "Может быть нетерпеливым", "Независимый дух"],
              "es": ["Energético y amante de la libertad", "Sociable y entusiasta", "Decide rápido", "Puede ser impaciente", "Espíritu independiente"],
              "hi": ["ऊर्जावान और स्वतंत्रता-प्रिय", "मिलनसार और उत्साही", "त्वरित निर्णय लेने वाला", "अधीर हो सकता है", "स्वतंत्र भावना"]},
    "goat": {"en": ["Gentle, artistic, and compassionate", "Calm and resilient", "Strong sense of empathy", "Can be prone to worry", "Creative and imaginative"],
             "ru": ["Мягкость, творчество, сострадание", "Спокойствие, стойкость", "Развитая эмпатия", "Склонность к тревожности", "Творческая фантазия"],
             "es": ["Gentil, artístico y compasivo", "Calmado y resiliente", "Fuerte sentido de empatía", "Puede tender a preocuparse", "Creativo e imaginativo"],
             "hi": ["कोमल, कलात्मक और दयालु", "शांत और लचीला", "गहरी सहानुभूति", "चिंता करने की प्रवृत्ति", "रचनात्मक और कल्पनाशील"]},
    "monkey": {"en": ["Clever and inventive", "Witty, quick learner", "Sociable and playful", "Can seem mischievous", "Versatile problem-solver"],
               "ru": ["Сообразительность, изобретательность", "Остроумие, быстрое обучение", "Общительность, игривость", "Может казаться озорным", "Универсальный решатель проблем"],
               "es": ["Astuto e inventivo", "Ingenioso, aprende rápido", "Sociable y juguetón", "Puede parecer travieso", "Solucionador versátil"],
               "hi": ["चतुर और आविष्कारशील", "मजाकिया, तेज़ सीखने वाला", "मिलनसार और चंचल", "नटखट लग सकता है", "बहुमुखी समस्या-समाधानकर्ता"]},
    "rooster": {"en": ["Observant and hardworking", "Confident, direct communicator", "Punctual and organized", "Can seem critical", "Loyal once trusted"],
                "ru": ["Наблюдательность, трудолюбие", "Уверенность, прямота в общении", "Пунктуальность, организованность", "Может казаться критичным", "Верность при доверии"],
                "es": ["Observador y trabajador", "Confiado, comunicador directo", "Puntual y organizado", "Puede parecer crítico", "Leal una vez que confía"],
                "hi": ["चौकस और मेहनती", "आत्मविश्वासी, सीधा संवादकर्ता", "समयनिष्ठ और संगठित", "आलोचनात्मक लग सकता है", "भरोसा मिलने पर वफादार"]},
    "dog": {"en": ["Loyal and honest", "Protective of loved ones", "Strong sense of justice", "Can be anxious", "Reliable, steady friend"],
            "ru": ["Верность, честность", "Защищает близких", "Развитое чувство справедливости", "Может тревожиться", "Надёжный, стабильный друг"],
            "es": ["Leal y honesto", "Protector con sus seres queridos", "Fuerte sentido de la justicia", "Puede ser ansioso", "Amigo fiable y estable"],
            "hi": ["वफादार और ईमानदार", "अपनों की रक्षा करने वाला", "न्याय की गहरी भावना", "चिंतित हो सकता है", "भरोसेमंद, स्थिर मित्र"]},
    "pig": {"en": ["Warm-hearted and generous", "Diligent, enjoys comfort", "Honest and straightforward", "Can seem naive", "Sociable, enjoys good company"],
            "ru": ["Душевность, щедрость", "Трудолюбие, любит комфорт", "Честность, прямота", "Может казаться наивным", "Общительность, любит хорошую компанию"],
            "es": ["Cálido y generoso", "Diligente, disfruta de la comodidad", "Honesto y directo", "Puede parecer ingenuo", "Sociable, disfruta de buena compañía"],
            "hi": ["गर्मजोशी भरा और उदार", "मेहनती, आराम का आनंद लेता है", "ईमानदार और सीधा", "भोला लग सकता है", "मिलनसार, अच्छी संगति का आनंद लेता है"]},
}

NAV_LABELS = {
    "en": {"home": "Home", "zodiac": "Zodiac Signs", "cta": "Take the free archetype test", "back": "← Back to Test",
           "element": "Element", "years": "Birth years"},
    "ru": {"home": "Главная", "zodiac": "Знаки зодиака", "cta": "Пройти бесплатный тест на архетип", "back": "← Назад к тесту",
           "element": "Элемент", "years": "Годы рождения"},
    "es": {"home": "Inicio", "zodiac": "Signos del Zodíaco", "cta": "Haz el test de arquetipo gratis", "back": "← Volver al Test",
           "element": "Elemento", "years": "Años de nacimiento"},
    "hi": {"home": "होम", "zodiac": "राशि चिह्न", "cta": "मुफ़्त आर्कटाइप टेस्ट लें", "back": "← टेस्ट पर वापस जाएँ",
           "element": "तत्व", "years": "जन्म वर्ष"},
}

TITLE_TPL = {"en": "{name}: Personality Traits & Compatibility | AstroScan",
             "ru": "{name}: черты характера и совместимость | AstroScan",
             "es": "{name}: rasgos de personalidad y compatibilidad | AstroScan",
             "hi": "{name}: व्यक्तित्व विशेषताएँ और अनुकूलता | AstroScan"}
DESC_TPL = {"en": "Born in a {name} year? Discover Chinese zodiac {name} personality traits, best compatibility matches, and your element — free, no exact birth date needed.",
            "ru": "Родились в год {name}? Узнайте черты характера, совместимость и элемент знака {name} по китайскому зодиаку — бесплатно, без точной даты рождения.",
            "es": "¿Naciste en un año del {name}? Descubre los rasgos de personalidad, la compatibilidad y el elemento del signo {name} del zodíaco chino — gratis, sin fecha exacta de nacimiento.",
            "hi": "{name} वर्ष में जन्मे? चीनी राशि चक्र {name} के व्यक्तित्व गुण, सर्वोत्तम अनुकूलता और तत्व जानें — मुफ़्त, सटीक जन्म तिथि की आवश्यकता नहीं।"}
INTRO_TPL = {"en": "In the Chinese zodiac, the {name} is associated with the {element} element. Unlike a Western birth chart, your Chinese zodiac sign is determined purely by your birth year — no birth time or location needed.",
             "ru": "В китайском зодиаке {name} ассоциируется с элементом {element}. В отличие от западной натальной карты, ваш знак китайского зодиака определяется исключительно годом рождения — без времени и места рождения.",
             "es": "En el zodíaco chino, el signo {name} está asociado con el elemento {element}. A diferencia de una carta natal occidental, tu signo del zodíaco chino se determina únicamente por tu año de nacimiento — sin necesidad de hora ni lugar de nacimiento.",
             "hi": "चीनी राशि चक्र में, {name} {element} तत्व से जुड़ा है। पश्चिमी जन्म कुंडली के विपरीत, आपकी चीनी राशि केवल आपके जन्म वर्ष से निर्धारित होती है — जन्म समय या स्थान की आवश्यकता नहीं।"}
COMPAT_TPL = {"en": "Per traditional Chinese zodiac compatibility triangles, {name} shares natural affinity with {m1} and {m2}. {name} and {clash} sit in directly opposing positions on the 12-year cycle, traditionally considered the most challenging pairing.",
              "ru": "По традиционным треугольникам совместимости китайского зодиака, у {name} естественная близость с {m1} и {m2}. {name} и {clash} находятся в прямо противоположных позициях 12-летнего цикла — традиционно самая сложная пара.",
              "es": "Según los triángulos de compatibilidad tradicionales del zodíaco chino, {name} tiene afinidad natural con {m1} y {m2}. {name} y {clash} ocupan posiciones directamente opuestas en el ciclo de 12 años, tradicionalmente la combinación más desafiante.",
              "hi": "पारंपरिक चीनी राशि अनुकूलता त्रिकोणों के अनुसार, {name} का {m1} और {m2} के साथ स्वाभाविक तालमेल है। {name} और {clash} 12-वर्षीय चक्र में सीधे विपरीत स्थिति में हैं — परंपरागत रूप से सबसे चुनौतीपूर्ण जोड़ी।"}
H1_TPL = "{emoji} {name} — Personality & Compatibility"


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
    m1 = NAMES[MATCH[sign_id][0]][lang]
    m2 = NAMES[MATCH[sign_id][1]][lang]
    clash = NAMES[CLASH[sign_id]][lang]
    title = TITLE_TPL[lang].format(name=name)
    desc = DESC_TPL[lang].format(name=name)
    intro = INTRO_TPL[lang].format(name=name, element=element)
    compat = COMPAT_TPL[lang].format(name=name, m1=m1, m2=m2, clash=clash)
    h1 = H1_TPL.format(emoji=EMOJI[sign_id], name=name)
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
    return f"""<!DOCTYPE html>
<html lang="{lang}">
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
