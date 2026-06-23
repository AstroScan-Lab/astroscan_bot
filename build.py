import io, re

BASE = "https://astroscan-lab.github.io/astroscan_bot"

LANGS = {
    "ru": {
        "locale": "ru_RU",
        "title": "AstroScan · Бесплатный тест: узнайте свой знак китайского зодиака без даты рождения (без регистрации)",
        "desc": "Бесплатный тест личности определяет ваш знак китайского зодиака и архетип по характеру — без даты рождения и регистрации. Проверьте совместимость, сравните западную и ведическую астрологию. Полный разбор — в Telegram.",
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
        "title": "AstroScan · Test Gratis: Descubre tu Signo del Zodíaco Chino Sin Fecha de Nacimiento (Sin Registro)",
        "desc": "Test de personalidad gratuito que revela tu signo del zodíaco chino y tu arquetipo según tu carácter — sin fecha de nacimiento ni registro. Comprueba la compatibilidad y compara la astrología occidental y védica. Informe completo en Telegram.",
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
        "title": "AstroScan · मुफ़्त टेस्ट: बिना जन्म तिथि के अपना चीनी राशि चक्र जानें (बिना पंजीकरण)",
        "desc": "मुफ़्त व्यक्तित्व परीक्षण आपके स्वभाव से आपका चीनी राशि चक्र और आर्कटाइप बताता है — बिना जन्म तिथि और पंजीकरण के। अनुकूलता जानें, पश्चिमी और वैदिक ज्योतिष की तुलना करें। पूरी रिपोर्ट Telegram में।",
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
}

import json as _json

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

EN_HOWTO_STEPS = [
    "Answer 10 questions about your behavior.",
    "Receive your Chinese zodiac sign and archetype.",
    "Choose a partner's sign and context (love/friendship/work).",
    "See compatibility percentage and personalized insights.",
]

with io.open("index.html", "r", encoding="utf-8") as f:
    template = f.read()

import os

# Keep index.html's own JSON-LD FAQPage in sync with its visible <details data-lang="en"> blocks,
# since index.html is the source template and never gets "built" from anything else.
_en_pairs = extract_faq(template, "en")
_en_faq_block = faq_mainentity_json(_en_pairs)
_resynced = re.sub(r'"mainEntity": \[.*?\n        \]', lambda m: _en_faq_block, template, count=1, flags=re.S)
if _resynced != template:
    template = _resynced
    with io.open("index.html", "w", encoding="utf-8", newline="\n") as f:
        f.write(template)
    print("Resynced index.html JSON-LD FAQ to", len(_en_pairs), "entries")

for lang, t in LANGS.items():
    html = template

    html = html.replace('<html lang="en">', '<html lang="%s" data-forced-lang="%s">' % (lang, lang), 1)

    html = re.sub(r'(<title>)[^<]*(</title>)', lambda m: m.group(1) + t["title"] + m.group(2), html, count=1)
    html = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + t["desc"] + m.group(2), html, count=1)
    html = re.sub(r'(<meta name="keywords" content=")[^"]*(")', lambda m: m.group(1) + t["keywords"] + m.group(2), html, count=1)
    html = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + BASE + "/" + lang + "/" + m.group(2), html, count=1)
    html = re.sub(r'(<meta property="og:title" content=")[^"]*(")', lambda m: m.group(1) + t["og_title"] + m.group(2), html, count=1)
    html = re.sub(r'(<meta property="og:description" content=")[^"]*(")', lambda m: m.group(1) + t["og_desc"] + m.group(2), html, count=1)
    html = re.sub(r'(<meta property="og:url" content=")[^"]*(")', lambda m: m.group(1) + BASE + "/" + lang + "/" + m.group(2), html, count=1)
    html = re.sub(r'(<meta property="og:locale" content=")[^"]*(")', lambda m: m.group(1) + t["locale"] + m.group(2), html, count=1)

    # localize JSON-LD: Product description, FAQPage Q&A, HowTo name+steps
    html = html.replace(
        '"description": "Free online test to discover your Chinese zodiac sign, behavioral archetype, and compatibility. No registration required. Compare Western and Vedic astrology. Based on Swiss Ephemeris calculations.",',
        '"description": "%s",' % t["product_desc"],
        1
    )
    faq_pairs = extract_faq(template, lang)
    new_faq_block = faq_mainentity_json(faq_pairs)
    html = re.sub(
        r'"mainEntity": \[.*?\n        \]',
        lambda m: new_faq_block,
        html, count=1, flags=re.S
    )
    html = html.replace('"name": "How to use AstroScan",', '"name": "%s",' % t["howto_name"], 1)
    for en_s, loc_s in zip(EN_HOWTO_STEPS, t["howto_steps"]):
        html = html.replace('"text": "%s" }' % en_s, '"text": "%s" }' % loc_s, 1)

    html = html.replace('<body class="lang-en">', '<body class="lang-%s">' % lang, 1)

    # relative asset paths need ../ prefix from a subdirectory
    html = html.replace('href="favicon.ico"', 'href="../favicon.ico"')
    html = html.replace('href="apple-touch-icon.png"', 'href="../apple-touch-icon.png"')
    html = html.replace('src="cover.jpg"', 'src="../cover.jpg"')
    html = html.replace('srcset="cover.webp"', 'srcset="../cover.webp"')
    html = html.replace('href="terms.html"', 'href="../terms.html"')
    html = html.replace('href="privacy.html"', 'href="../privacy.html"')
    html = html.replace('href="icon-192.png"', 'href="../icon-192.png"')
    html = html.replace('href="manifest.json"', 'href="../manifest.json"')
    html = html.replace('href="assets/css/styles.css"', 'href="../assets/css/styles.css"')
    html = html.replace('src="assets/js/main.js"', 'src="../assets/js/main.js"')

    os.makedirs(lang, exist_ok=True)
    with io.open(os.path.join(lang, "index.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("OK", lang + "/index.html", len(html), "bytes")

print("Done:", ", ".join(LANGS.keys()))
