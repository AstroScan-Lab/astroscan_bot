# Security Policy

AstroScan is a static, client-side personality test (no backend, no account system, no stored birth data — see our [Zero-Retention Policy](README.md#-zero-retention-policy)). The attack surface is intentionally minimal: a single static page hosted on GitHub Pages.

## Reporting a Vulnerability

If you find a security issue (XSS, CSP bypass, dependency confusion, etc.), please report it privately via:

- **Telegram:** [@ASTROSCAN_BOT](https://t.me/ASTROSCAN_BOT)
- **Email:** sintyau1777@gmail.com

Please do not open a public GitHub issue for security reports. We aim to acknowledge reports within 7 days.

## Scope

- `template.html`, `privacy_template.html`, `terms_template.html` and the pages `build.py`/`build_zodiac.py` generate from them (`index.html`, `ru/`, `es/`, `hi/`, zodiac sign pages, `privacy.html`, `terms.html`)
- `assets/js/main.js` and the Content-Security-Policy configuration

Out of scope: the Telegram bot backend and its natal-chart calculation pipeline, which are not part of this repository.

## Known Platform Limitations

This site is hosted on GitHub Pages' free tier, which does not allow setting custom HTTP response headers. As a result:

- **`X-Frame-Options`** cannot be set at the HTTP level, and there is no working substitute: per the CSP specification, the `frame-ancestors` directive (along with `sandbox` and `report-uri`/`report-to`) is ignored entirely when CSP is delivered via a `<meta>` tag, in every browser — not just older ones. The `frame-ancestors` value present in this site's CSP `<meta>` tag is set for documentation/intent purposes only and provides **no actual clickjacking protection**. This is an inherent limitation of static hosting without server-side header control, not a bug fixable from within this repository.
- **`X-Content-Type-Options: nosniff`** is also not set, and has no `<meta>` equivalent.
- **HSTS** is actually handled — GitHub Pages sets `Strict-Transport-Security: max-age=31556952` automatically on every response (verified via live response headers), so this is covered at the platform level without any action needed from this repository. It does not include `preload`, so the domain is not eligible for the HSTS preload list, but the header itself is present and effective from the first HTTPS response onward.

If these matter for your use case, hosting behind a CDN/reverse proxy that adds these headers (e.g. Cloudflare) would be required — that's a deployment change outside this repository's scope.
