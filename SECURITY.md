# Security Policy

AstroScan is a static, client-side personality test (no backend, no account system, no stored birth data — see our [Zero-Retention Policy](README.md#-zero-retention-policy)). The attack surface is intentionally minimal: a single static page hosted on GitHub Pages.

## Reporting a Vulnerability

If you find a security issue (XSS, CSP bypass, dependency confusion, etc.), please report it privately via:

- **Telegram:** [@ASTROSCAN_BOT](https://t.me/ASTROSCAN_BOT)

Please do not open a public GitHub issue for security reports. We aim to acknowledge reports within 7 days.

## Scope

- `index.html`, `ru/`, `es/`, `hi/` — the static frontend
- `app.js`-style inline scripts and the Content-Security-Policy configuration

Out of scope: the Telegram bot backend and its natal-chart calculation pipeline, which are not part of this repository.
