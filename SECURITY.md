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

- **`X-Frame-Options`** cannot be set at the HTTP level. Clickjacking protection is instead enforced via the `frame-ancestors` directive in the CSP `<meta>` tag, which all modern browsers honor (note: `frame-ancestors` has no effect when delivered via `<meta>` per spec in some older browsers — this is a known tradeoff of static hosting without server-side header control).
- **HSTS** cannot be set at all — it is an HTTP-header-only mechanism and has no `<meta>` equivalent. GitHub Pages itself serves over HTTPS with redirect, which provides baseline protection, but we cannot enforce HSTS preloading from this repository.

If these matter for your use case, hosting behind a CDN/reverse proxy that adds these headers (e.g. Cloudflare) would be required — that's a deployment change outside this repository's scope.
