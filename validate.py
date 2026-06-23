import glob
import io, json, os, re, sys
import xml.etree.ElementTree as ET

errors = []

PAGES = ["index.html", "ru/index.html", "es/index.html", "hi/index.html"]
PAGES += sorted(glob.glob("zodiac/*/index.html"))
PAGES += sorted(glob.glob("ru/zodiac/*/index.html"))
PAGES += sorted(glob.glob("es/zodiac/*/index.html"))
PAGES += sorted(glob.glob("hi/zodiac/*/index.html"))
LOCAL_ASSET_ATTRS = re.compile(r'(?:href|src|srcset)="([^"]+)"')


def check_page(path):
    with io.open(path, encoding="utf-8") as f:
        html = f.read()

    m = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    if not m:
        errors.append("%s: no JSON-LD block found" % path)
    else:
        try:
            json.loads(m.group(1))
        except json.JSONDecodeError as e:
            errors.append("%s: invalid JSON-LD (%s)" % (path, e))

    for tag in ["div", "details", "summary", "section"]:
        opens = len(re.findall(r"<%s[ >]" % tag, html))
        closes = html.count("</%s>" % tag)
        if opens != closes:
            errors.append("%s: <%s> tag mismatch (%d open, %d close)" % (path, tag, opens, closes))

    base_dir = os.path.dirname(path)
    for m2 in LOCAL_ASSET_ATTRS.finditer(html):
        url = m2.group(1)
        if url.startswith(("http://", "https://", "#", "mailto:", "data:")):
            continue
        local_path = os.path.normpath(os.path.join(base_dir, url))
        if url.endswith("/"):
            local_path = os.path.join(local_path, "index.html")
        if not os.path.isfile(local_path):
            errors.append("%s: missing referenced asset '%s' (resolved: %s)" % (path, url, local_path))

    if "script-src 'self' 'unsafe-inline'" in html:
        errors.append("%s: CSP script-src still allows 'unsafe-inline'" % path)

    lang = {"index.html": "en", "ru/index.html": "ru", "es/index.html": "es", "hi/index.html": "hi"}.get(path)
    if lang:
        visible_count = len(re.findall(r'<details data-lang="%s"[^>]*>' % lang, html))
        try:
            data = json.loads(m.group(1))
            faq_nodes = [n for n in data.get("@graph", []) if n.get("@type") == "FAQPage"]
            jsonld_count = len(faq_nodes[0]["mainEntity"]) if faq_nodes else 0
        except Exception:
            jsonld_count = None
        if jsonld_count is not None and visible_count != jsonld_count:
            errors.append("%s: FAQ count mismatch — %d visible <details>, %d in JSON-LD" % (path, visible_count, jsonld_count))


for page in PAGES:
    if os.path.isfile(page):
        check_page(page)
    else:
        errors.append("missing page: %s" % page)

try:
    ET.parse("sitemap.xml")
except ET.ParseError as e:
    errors.append("sitemap.xml: invalid XML (%s)" % e)

try:
    with io.open("manifest.json", encoding="utf-8") as f:
        json.load(f)
except (json.JSONDecodeError, FileNotFoundError) as e:
    errors.append("manifest.json: %s" % e)

if errors:
    print("VALIDATION FAILED:")
    for e in errors:
        print(" -", e)
    sys.exit(1)
else:
    print("All checks passed:", len(PAGES), "pages, sitemap.xml, manifest.json")
