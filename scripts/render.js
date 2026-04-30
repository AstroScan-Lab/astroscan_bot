const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const LANGS = [
  { code: '', dir: '.' },
  { code: 'ru', dir: 'ru' },
  { code: 'es', dir: 'es' },
  { code: 'ar', dir: 'ar' },
  { code: 'hi', dir: 'hi' },
  { code: 'de', dir: 'de' },
  { code: 'pt', dir: 'pt' },
  { code: 'id', dir: 'id' }
];

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new'
  });
  const page = await browser.newPage();

  for (const lang of LANGS) {
    const langPath = lang.code ? `/${lang.code}` : '';
    const url = `${BASE_URL}${langPath}`;
    console.log(`⚙️  Рендеринг: ${url}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      const html = await page.content();
      const outputDir = path.join(__dirname, '..', lang.dir);
      await fs.ensureDir(outputDir);
      await fs.writeFile(path.join(outputDir, 'index.html'), html);
      console.log(`✅ Сохранён: ${outputDir}/index.html`);
    } catch (err) {
      console.error(`❌ Ошибка для ${url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('🎉 Все статические страницы сгенерированы.');
})();
