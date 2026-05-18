'use strict';

const ZODIACS = [
  { id: 'rat', nameEn: 'Rat', nameRu: 'Крыса', nameEs: 'Rata', nameAr: 'جرذ', nameHi: 'चूहा', nameDe: 'Ratte', namePt: 'Rato', nameId: 'Tikus', element: 'water', triangle: 0 },
  { id: 'ox', nameEn: 'Ox', nameRu: 'Бык', nameEs: 'Buey', nameAr: 'ثور', nameHi: 'बैल', nameDe: 'Ochse', namePt: 'Boi', nameId: 'Kerbau', element: 'earth', triangle: 1 },
  { id: 'tiger', nameEn: 'Tiger', nameRu: 'Тигр', nameEs: 'Tigre', nameAr: 'نمر', nameHi: 'बाघ', nameDe: 'Tiger', namePt: 'Tigre', nameId: 'Harimau', element: 'wood', triangle: 2 },
  { id: 'rabbit', nameEn: 'Rabbit', nameRu: 'Кролик', nameEs: 'Conejo', nameAr: 'أرنب', nameHi: 'खरगोश', nameDe: 'Hase', namePt: 'Coelho', nameId: 'Kelinci', element: 'wood', triangle: 3 },
  { id: 'dragon', nameEn: 'Dragon', nameRu: 'Дракон', nameEs: 'Dragón', nameAr: 'تنين', nameHi: 'ड्रैगन', nameDe: 'Drache', namePt: 'Dragão', nameId: 'Naga', element: 'fire', triangle: 0 },
  { id: 'snake', nameEn: 'Snake', nameRu: 'Змея', nameEs: 'Serpiente', nameAr: 'ثعبان', nameHi: 'साँप', nameDe: 'Schlange', namePt: 'Serpente', nameId: 'Ular', element: 'fire', triangle: 1 },
  { id: 'horse', nameEn: 'Horse', nameRu: 'Лошадь', nameEs: 'Caballo', nameAr: 'حصان', nameHi: 'घोड़ा', nameDe: 'Pferd', namePt: 'Cavalo', nameId: 'Kuda', element: 'fire', triangle: 2 },
  { id: 'goat', nameEn: 'Goat', nameRu: 'Коза', nameEs: 'Cabra', nameAr: 'ماعز', nameHi: 'बकरी', nameDe: 'Ziege', namePt: 'Cabra', nameId: 'Kambing', element: 'earth', triangle: 3 },
  { id: 'monkey', nameEn: 'Monkey', nameRu: 'Обезьяна', nameEs: 'Mono', nameAr: 'قرد', nameHi: 'बंदर', nameDe: 'Affe', namePt: 'Macaco', nameId: 'Monyet', element: 'metal', triangle: 0 },
  { id: 'rooster', nameEn: 'Rooster', nameRu: 'Петух', nameEs: 'Gallo', nameAr: 'ديك', nameHi: 'मुर्गा', nameDe: 'Hahn', namePt: 'Galo', nameId: 'Ayam', element: 'metal', triangle: 1 },
  { id: 'dog', nameEn: 'Dog', nameRu: 'Собака', nameEs: 'Perro', nameAr: 'كلب', nameHi: 'कुत्ता', nameDe: 'Hund', namePt: 'Cão', nameId: 'Anjing', element: 'earth', triangle: 2 },
  { id: 'pig', nameEn: 'Pig', nameRu: 'Свинья', nameEs: 'Cerdo', nameAr: 'خنزير', nameHi: 'सुअर', nameDe: 'Schwein', namePt: 'Porco', nameId: 'Babi', element: 'water', triangle: 3 }
];

const LANGS = ['en', 'ru', 'es', 'ar', 'hi', 'de', 'pt', 'id'];
const LANG_NAMES = { en: 'English', ru: 'Русский', es: 'Español', ar: 'العربية', hi: 'हिन्दी', de: 'Deutsch', pt: 'Português', id: 'Bahasa Indonesia' };

let currentLang = 'en';
let userScores = new Array(12).fill(0);
let currentQuestion = 0;

function detectLang() {
  const saved = localStorage.getItem('astroscan_lang');
  if (saved && LANGS.includes(saved)) return saved;
  const urlLang = new URLSearchParams(location.search).get('lang');
  if (urlLang && LANGS.includes(urlLang)) return urlLang;
  const browser = navigator.language.split('-')[0];
  return LANGS.includes(browser) ? browser : 'en';
}

function setLang(lang) {
  currentLang = lang;
  document.body.className = document.body.className.replace(/lang-\w+/g, '');
  document.body.classList.add(`lang-${lang}`);
  localStorage.setItem('astroscan_lang', lang);
  document.documentElement.lang = lang;
  
  const url = new URL(window.location);
  if (lang === 'en') url.searchParams.delete('lang');
  else url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url);
  
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(`lang-${lang}`);
  if (btn) btn.classList.add('active');
}

function buildLangBar() {
  const bar = document.getElementById('lang-bar');
  if (!bar) return;
  LANGS.forEach(l => {
    const btn = document.createElement('button');
    btn.id = `lang-${l}`;
    btn.className = 'lang-btn';
    btn.textContent = LANG_NAMES[l];
    btn.dataset.lang = l;
    btn.setAttribute('aria-label', `Switch to ${LANG_NAMES[l]}`);
    btn.addEventListener('click', () => setLang(l));
    bar.appendChild(btn);
  });
  setLang(detectLang());
}

document.addEventListener('DOMContentLoaded', buildLangBar);
