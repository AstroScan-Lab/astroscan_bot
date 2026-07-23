"""Regenerate sitemap.xml: 16 home pages, terms/privacy, and 192 zodiac pages (12 signs x 16 langs)."""
import datetime

BASE = "https://astroscan-lab.github.io/astroscan_bot"
LANGS = ["en", "ru", "es", "hi", "pt", "vi", "tr", "id", "uz", "kk", "fr", "de", "lo", "it", "ar", "fa"]
SIGNS = ["rat", "ox", "tiger", "rabbit", "dragon", "snake", "horse", "goat", "monkey", "rooster", "dog", "pig"]
TODAY = datetime.date.today().isoformat()

LANG_PREFIX = {l: ("" if l == "en" else l + "/") for l in LANGS}


def hreflang_block(path_for_lang, indent="    "):
    lines = [f'{indent}<xhtml:link rel="alternate" hreflang="x-default" href="{BASE}/{path_for_lang("en")}"/>']
    for l in LANGS:
        lines.append(f'{indent}<xhtml:link rel="alternate" hreflang="{l}" href="{BASE}/{path_for_lang(l)}"/>')
    return "\n".join(lines)


urls = []

# Home pages
for l in LANGS:
    loc = f"{BASE}/{LANG_PREFIX[l]}"
    block = hreflang_block(lambda x: LANG_PREFIX[x])
    urls.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n{block}\n  </url>')

# Zodiac pages
for sign in SIGNS:
    block = hreflang_block(lambda x, s=sign: f"{LANG_PREFIX[x]}zodiac/{s}/")
    for l in LANGS:
        loc = f"{BASE}/{LANG_PREFIX[l]}zodiac/{sign}/"
        urls.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n{block}\n  </url>')

# Legal pages — now single-language per URL too, with hreflang alternates
for page in ["terms.html", "privacy.html"]:
    block = hreflang_block(lambda x, p=page: f"{LANG_PREFIX[x]}{p}")
    for l in LANGS:
        loc = f"{BASE}/{LANG_PREFIX[l]}{page}"
        urls.append(f'  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n{block}\n  </url>')

xml = (
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    + "\n".join(urls) + "\n"
    "</urlset>\n"
)

with open("sitemap.xml", "w", encoding="utf-8", newline="\n") as f:
    f.write(xml)

print(f"Wrote sitemap.xml with {len(urls)} <url> entries")
