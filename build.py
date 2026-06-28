import io, re, os
import json as _json
from html.parser import HTMLParser

BASE = "https://astroscan-lab.github.io/astroscan_bot"
ALL_LANGS = ["en", "ru", "es", "hi"]

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

    html = html.replace('<html lang="en">', '<html lang="%s" data-forced-lang="%s">' % (lang, lang), 1)

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
LANG_BAR_NAMES = {"en": "English", "ru": "Русский", "es": "Español", "hi": "हिन्दी"}

LOCALE_MAP = {"en": "en_US", "ru": "ru_RU", "es": "es_ES", "hi": "hi_IN"}

for page in ["privacy", "terms"]:
    with io.open("%s_template.html" % page, "r", encoding="utf-8") as f:
        legal_template = f.read()

    lang_bar_re = re.compile(r'<div class="lang-bar">.*?</div>', re.S)
    script_re = re.compile(r'\s*<script>\s*function setPLang.*?</script>', re.S)

    for lang in ALL_LANGS:
        html = legal_template
        is_en = lang == "en"
        canon = BASE + ("/%s.html" % page if is_en else "/%s/%s.html" % (lang, page))

        html = html.replace('<html lang="en">', '<html lang="%s">' % lang, 1)
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
