/* ==========================================================================
   Azwa | Shared app.js
   Data, state (localStorage), UI wiring for all pages.
   ========================================================================== */

/* ---------- Data ---------- */
const CATEGORIES = [
  { key: 'all', label: 'الكل' },
  { key: 'food', label: 'مطاعم', icon: 'utensils' },
  { key: 'sport', label: 'رياضة', icon: 'trophy' },
  { key: 'concert', label: 'حفلات', icon: 'music' },
  { key: 'cinema', label: 'سينما', icon: 'clapper' },
  { key: 'games', label: 'ألعاب', icon: 'gamepad' },
  { key: 'experience', label: 'تجارب', icon: 'sparkles' }
];

const CATEGORY_LABEL = {
  themepark: 'مدن ترفيهية',
  water: 'ألعاب مائية',
  concert: 'حفلات',
  family: 'عائلية',
  indoor: 'ترفيه داخلي',
  live: 'عروض حية',
  sport: 'رياضة',
  experience: 'تجارب',
  food: 'مطاعم',
  games: 'ألعاب',
  cinema: 'سينما'
};

const CATEGORY_STYLE = {
  themepark: 'purple',
  water: 'blue',
  concert: 'purple',
  family: 'coral',
  indoor: 'blue',
  live: 'coral',
  sport: 'teal',
  experience: 'coral',
  food: 'coral',
  games: 'teal',
  cinema: 'purple'
};

const EVENTS = [
  {
    id: 1,
    titleAr: 'مباراة الهلال × النصر',
    titleEn: 'Al Hilal × Al Nassr',
    category: 'sport',
    date: '2026-07-25',
    time: '9:00 م',
    venue: 'استاد المملكة أرينا',
    district: 'الرياض',
    distanceKm: 6.2,
    price: 150,
    points: 340,
    multiplier: '3X',
    image: 'assets/events/hilal-nassr.jpg',
    imagePos: 'center 35%',
    desc: 'ديربي الرياض. أجواء استثنائية، هتافات ذهبية، وليلة كرة قدم لا تُنسى في استاد المملكة أرينا.',
    popular: true,
    nearby: true,
    mapQuery: 'Kingdom Arena Riyadh'
  },
  {
    id: 3,
    titleAr: 'سينما VOX',
    titleEn: 'VOX Cinemas',
    category: 'cinema',
    date: '2026-07-18',
    time: '7:00 م',
    venue: 'VOX Riyadh Park',
    district: 'الرياض',
    distanceKm: 2.3,
    price: 55,
    points: 90,
    multiplier: '2X',
    desc: 'استمتع بأحدث الأفلام العربية والعالمية بتجربة عرض متميزة، مع خصم 20% لأعضاء عزوة.',
    popular: true,
    nearby: true,
    mapQuery: 'VOX Cinemas Riyadh Park Mall'
  },
  {
    id: 4,
    titleAr: 'سيكس فلاغز مدينة القدية',
    titleEn: 'Six Flags Qiddiya City',
    category: 'themepark',
    date: '2026-08-02',
    time: '4:00 م',
    venue: 'مدينة القدية',
    district: 'القدية',
    distanceKm: 38,
    price: 170,
    points: 340,
    multiplier: '2X',
    image: 'assets/events/six-flags.jpg',
    imagePos: 'center',
    desc: 'أكبر مدينة ألعاب في المنطقة تفتح أبوابها. أفعوانيات عالمية، عروض ترفيهية، ومغامرات لا تنتهي.',
    popular: true,
    nearby: false,
    mapQuery: 'Six Flags Qiddiya City'
  },
  {
    id: 5,
    titleAr: 'أكواريبيا مدينة القدية',
    titleEn: 'Aquarabia Qiddiya',
    category: 'water',
    date: '2026-08-10',
    time: '2:00 م',
    venue: 'مدينة القدية',
    district: 'القدية',
    distanceKm: 40,
    price: 130,
    points: 210,
    multiplier: '2X',
    image: 'assets/events/qiddiya.png',
    imagePos: 'center',
    desc: 'مدينة الألعاب المائية الأكبر في الشرق الأوسط. زحاليق متطرفة، أمواج، ومسابح للعائلة.',
    popular: true,
    nearby: false,
    mapQuery: 'Aquarabia Qiddiya City'
  },
  {
    id: 7,
    titleAr: 'BattleKart الرياض',
    titleEn: 'BattleKart Riyadh',
    category: 'games',
    date: '2026-07-22',
    time: '6:00 م',
    venue: 'غرناطة مول',
    district: 'غرناطة',
    distanceKm: 5.8,
    price: 110,
    points: 150,
    multiplier: '2X',
    desc: 'كارتينج تفاعلي بتقنية الواقع المعزز — تحدَّ أصدقاءك في سباقات مبتكرة.',
    popular: true,
    nearby: true,
    mapQuery: 'BattleKart Riyadh'
  },
  {
    id: 8,
    titleAr: 'سوبر بارك الرياض',
    titleEn: 'SuperPark Riyadh',
    category: 'family',
    date: '2026-07-20',
    time: '11:00 ص',
    venue: 'خريص',
    district: 'خريص',
    distanceKm: 8.4,
    price: 80,
    points: 100,
    multiplier: '2X',
    desc: 'مدينة ألعاب داخلية للعائلة — أنشطة حركية، ملاعب، وتجارب تفاعلية للأطفال والكبار.',
    popular: false,
    nearby: true,
    mapQuery: 'SuperPark Riyadh'
  },
  {
    id: 9,
    titleAr: 'SENSAS تجربة الحواس الخمس',
    titleEn: 'SENSAS Experience',
    category: 'experience',
    date: '2026-08-05',
    time: '8:00 م',
    venue: 'روف مول',
    district: 'الياسمين',
    distanceKm: 9.2,
    price: 120,
    points: 180,
    multiplier: '2X',
    desc: 'رحلة حسية فريدة تُشغّل حواسك الخمس عبر ألغاز وتحديات في بيئات مصممة بعناية.',
    popular: false,
    nearby: true,
    mapQuery: 'Roof Mall Riyadh'
  },
  {
    id: 12,
    titleAr: 'يلا بولينغ',
    titleEn: 'Yalla Bowling',
    category: 'games',
    date: '2026-07-19',
    time: '7:00 م',
    venue: 'غرناطة مول',
    district: 'غرناطة',
    distanceKm: 5.6,
    price: 60,
    points: 80,
    multiplier: '2X',
    desc: 'أمسية بولينغ عائلية مع خصم 20% لأعضاء عزوة.',
    popular: false,
    nearby: true,
    mapQuery: 'Granada Mall Riyadh'
  }
];

const VENUES = [
  { name: 'بوليفارد رياض سيتي', district: 'الشمال', km: 4.1, query: 'Boulevard Riyadh City' },
  { name: 'ڤيا رياض', district: 'الملقا', km: 6.2, query: 'Via Riyadh' },
  { name: 'سوبر بارك — خريص', district: 'خريص', km: 8.4, query: 'SuperPark Riyadh' },
  { name: 'BattleKart الرياض', district: 'غرناطة', km: 5.8, query: 'BattleKart Riyadh' },
  { name: 'غرناطة مول', district: 'غرناطة', km: 5.9, query: 'Granada Mall Riyadh' },
  { name: 'استاد المملكة أرينا', district: 'الرياض', km: 6.2, query: 'Kingdom Arena Riyadh' },
  { name: 'مدينة القدية', district: 'القدية', km: 38, query: 'Qiddiya City' },
  { name: 'روف مول', district: 'الياسمين', km: 9.2, query: 'Roof Mall Riyadh' }
];

// Reasonable default view centered on Riyadh's entertainment district
const MAP_DEFAULT_QUERY = 'Boulevard Riyadh City';

function mapEmbedSrc(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=ar&z=14&output=embed`;
}

function mapLinkSrc(query) {
  return `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
}

/* ---------- State (localStorage) ---------- */
const STORAGE_KEY = 'azwa.v1';

const DEFAULT_STATE = {
  balance: 1250.50,
  points: 3480,
  user: {
    firstName: 'أحمد',
    lastName: 'العتيبي',
    fullName: 'أحمد العتيبي',
    email: 'ahmed@example.com',
    phone: '05X XXX XXXX',
    avatar: null,
    verified: true
  },
  card: {
    linked: true,
    last4: '5678',
    brand: 'VISA'
  },
  bookings: [],
  favorites: [],
  notifications: true
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    // shallow-merge defaults so new fields don't crash old saves
    return {
      ...DEFAULT_STATE,
      ...parsed,
      user: { ...DEFAULT_STATE.user, ...(parsed.user || {}) },
      card: { ...DEFAULT_STATE.card, ...(parsed.card || {}) }
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    /* silent for prototype */
  }
}

function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = { ...DEFAULT_STATE };
  refreshAll();
}

let state = loadState();

/* ---------- Formatters ---------- */
const arDigits = (n) => new Intl.NumberFormat('ar-SA', { maximumFractionDigits: 2 }).format(n);
const enDigits = (n) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n);
const fmtSAR = (n) => `${enDigits(n)} ر.س`;
const fmtPts = (n) => `${enDigits(n)} نقطة`;

const DAY_NAMES = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const DAY_SHORT = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const MONTH_NAMES = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}
function fmtDayHeading(str) {
  const d = parseDate(str);
  return `${DAY_NAMES[d.getDay()]}، ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}
function fmtShortDate(str) {
  const d = parseDate(str);
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/* ---------- Icons (inline SVG) ---------- */
const ICONS = {
  bell: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1112 0c0 4 2 5 2 7H4c0-2 2-3 2-7z"/><path d="M10 20a2 2 0 004 0"/></svg>',
  settings: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12V8a2 2 0 00-2-2H5a2 2 0 000 4h15v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8"/><path d="M17 14h.01"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.9 2 10l7.1-1.1L12 2z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>',
  heart: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
  heartFill: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 21s-7-4.35-9.5-8.5C1 9.5 2.5 5 6.5 5c2 0 3.5 1.5 5.5 3.5C14 6.5 15.5 5 17.5 5c4 0 5.5 4.5 4 7.5C19 16.65 12 21 12 21z"/></svg>',
  bookmark: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v18l-6-4-6 4V4z"/></svg>',
  bookmarkFill: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M6 4h12v18l-6-4-6 4V4z"/></svg>',
  home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-5v-6h-4v6H5a2 2 0 01-2-2V10z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  pinFill: '<svg viewBox="0 0 24 24" width="24" height="34"><path d="M12 0a10 10 0 00-10 10c0 6.9 10 22 10 22s10-15.1 10-22A10 10 0 0012 0z" fill="currentColor"/><circle cx="12" cy="10" r="3.5" fill="#fff"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 100-4z"/><path d="M12 6v12" stroke-dasharray="2 3"/></svg>',
  more: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  calendarSm: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  utensils: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v6a3 3 0 006 0V3M7 9v12M15 3c-1.5 1-3 3-3 6s1 5 3 5v7"/></svg>',
  music: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  clapper: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M3 8l3-4h4l-3 4M11 8l3-4h4l-3 4M19 8l1-1"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h4M8 10v4"/><circle cx="16" cy="12" r="1"/><circle cx="18" cy="14" r="1"/><rect x="2" y="7" width="20" height="12" rx="4"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v4a4 4 0 01-8 0V4z"/><path d="M4 5h4v3a4 4 0 01-4-4V5zM20 5h-4v3a4 4 0 004-4V5zM12 13v4M8 21h8"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/></svg>',
  gift: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M20 12v9H4v-9M7 8a2.5 2.5 0 010-5C10 3 12 8 12 8s2-5 5-5a2.5 2.5 0 010 5"/></svg>',
  search: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  slider: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h16"/><circle cx="17" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  filter: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16l-6 8v6l-4 2v-8L4 4z"/></svg>',
  card: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  chat: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 01-11.6 7.2L4 21l1.8-5.4A8 8 0 1121 12z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 1.9.6 2.8a2 2 0 01-.5 2.1L8 9.8a16 16 0 006.2 6.2l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.8.6a2 2 0 011.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  help: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 4"/><path d="M12 17h.01"/></svg>',
  users: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.9M16 3.1A4 4 0 0116 11"/></svg>',
  location: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  info: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>',
  history: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 109-9 9 9 0 00-6.4 2.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>',
  logout: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
  camera: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  minus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
  chevronBack: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l-6-6 6-6"/></svg>',
  arrowNext: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l-6 6 6 6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2L4 5v7c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V5l-8-3z"/></svg>'
};

/* ---------- Cover artwork per category (inline SVG) ---------- */
function coverArt(category) {
  switch (category) {
    case 'sport': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="50" r="30"/><path d="M50 20l-10 15 10 15 10-15z"/><path d="M20 50l15-10 15 10-15 10zM80 50l-15-10-15 10 15 10zM50 80l10-15-10-15-10 15z"/></svg>';
    case 'concert': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M35 25v45a10 10 0 11-6-9V30l30-5v40a10 10 0 11-6-9V25z"/></svg>';
    case 'cinema': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="30" width="70" height="45" rx="4"/><path d="M20 30l6-10h12l-6 10M40 30l6-10h12l-6 10M60 30l6-10h12l-6 10"/></svg>';
    case 'themepark': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="50" cy="45" r="25"/><path d="M25 45h50M50 20v50M32 27l36 36M32 63l36-36"/><path d="M25 80h50" stroke-linecap="round"/></svg>';
    case 'water': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 55c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0M15 70c5-5 10-5 15 0s10 5 15 0 10-5 15 0 10 5 15 0M50 15v25M40 25l10-10 10 10"/></svg>';
    case 'games': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="15" y="35" width="70" height="35" rx="15"/><circle cx="65" cy="48" r="3"/><circle cx="75" cy="55" r="3"/><path d="M25 50h10M30 45v10"/></svg>';
    case 'family': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><circle cx="35" cy="35" r="8"/><path d="M25 60a10 10 0 0120 0v10H25z"/><circle cx="65" cy="40" r="6"/><path d="M58 60a7 7 0 0114 0v10H58z"/></svg>';
    case 'live': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M50 20c-10 0-15 8-15 15v10c0 5 5 10 15 10s15-5 15-10V35c0-7-5-15-15-15z"/><path d="M30 45c0 12 8 20 20 20s20-8 20-20M50 65v10M40 80h20"/></svg>';
    case 'experience': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M50 15l8 22 22 3-16 15 4 22-18-10-18 10 4-22-16-15 22-3z"/></svg>';
    case 'indoor': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="30" width="60" height="45" rx="2"/><path d="M30 40h40M30 50h25M30 60h30"/></svg>';
    case 'food': return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 20v25a10 10 0 0020 0V20M30 45v35M70 20c-6 4-10 12-10 22s4 15 10 15v23"/></svg>';
    default: return '<svg class="art" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="2"><rect x="20" y="20" width="60" height="60" rx="10"/></svg>';
  }
}

function coverHTML(category, extraClass = '', ev = null) {
  if (ev && ev.image) {
    const pos = ev.imagePos || 'center';
    return `<div class="cover cover--photo ${extraClass}" style="background-image:url('${ev.image}');background-position:${pos}"></div>`;
  }
  return `<div class="cover ${category} ${extraClass}">${coverArt(category)}</div>`;
}

/* ---------- Card templates ---------- */
function eventCardHTML(ev, opts = {}) {
  const style = CATEGORY_STYLE[ev.category] || 'teal';
  return `
    <button class="event-card" data-event-id="${ev.id}" aria-label="${ev.titleAr}">
      <div class="event-media">
        ${coverHTML(ev.category, '', ev)}
        <span class="fav" aria-hidden="true">${ICONS.heart}</span>
        <span class="mult ${style}">${ev.multiplier} نقاط</span>
      </div>
      <div class="event-body">
        <h3 class="event-title">${ev.titleAr}</h3>
        <div class="event-meta">
          <span class="row"><span class="ic">${ICONS.calendarSm}</span> ${fmtShortDate(ev.date)} • ${ev.time}</span>
          <span class="row"><span class="ic">${ICONS.mapPin}</span> ${ev.venue}</span>
        </div>
        <div class="event-price">ابتداءً من <b>${enDigits(ev.price)}</b> <small>ر.س</small></div>
      </div>
    </button>
  `;
}

function eventRowHTML(ev) {
  const style = CATEGORY_STYLE[ev.category] || 'teal';
  return `
    <button class="event-row" data-event-id="${ev.id}" aria-label="${ev.titleAr}">
      <div class="event-media">
        ${coverHTML(ev.category, '', ev)}
        <span class="mult ${style}" style="position:absolute;bottom:8px;inset-inline-start:8px">اكسب ${ev.multiplier} نقاط</span>
      </div>
      <div class="event-body">
        <span class="tag ${style}">${CATEGORY_LABEL[ev.category] || ''}</span>
        <div class="title">${ev.titleAr}</div>
        <div class="meta">
          <span class="row">${ICONS.mapPin} ${ev.venue}، ${ev.district}</span>
        </div>
        <div class="meta">
          <span class="row">${ICONS.clock} ${ev.time}</span>
          <span class="row">${ICONS.calendarSm} ${fmtShortDate(ev.date)}</span>
        </div>
        <div class="bottom">
          <div class="price">ابتداءً من <b>${enDigits(ev.price)}</b> <small>ر.س</small></div>
        </div>
      </div>
    </button>
  `;
}

function agendaRowHTML(ev) {
  const style = CATEGORY_STYLE[ev.category] || 'teal';
  return `
    <button class="event-row" data-event-id="${ev.id}" aria-label="${ev.titleAr}">
      <div class="event-media">${coverHTML(ev.category, '', ev)}</div>
      <div class="event-body">
        <span class="tag ${style}">${CATEGORY_LABEL[ev.category] || ''}</span>
        <div class="title">${ev.titleAr}</div>
        <div class="meta">
          <span class="row">${ICONS.mapPin} ${ev.venue}</span>
        </div>
        <div class="meta">
          <span class="row">${ICONS.clock} ${ev.time}</span>
        </div>
        <div class="bottom">
          <div class="price">ابتداءً من <b>${enDigits(ev.price)}</b> <small>ر.س</small></div>
          <span class="mult ${style}">اكسب ${ev.multiplier} نقاط</span>
        </div>
      </div>
    </button>
  `;
}

/* ---------- Renderers ---------- */
function renderHomeStats() {
  const balEl = document.querySelector('[data-bind="balance"]');
  const ptsEl = document.querySelector('[data-bind="points"]');
  if (balEl) balEl.innerHTML = `${enDigits(Math.floor(state.balance))} <small>ر.س</small>`;
  if (ptsEl) ptsEl.innerHTML = `${enDigits(state.points)} <small>نقطة</small>`;

  document.querySelectorAll('[data-bind="balance-inline"]').forEach(el => {
    el.textContent = fmtSAR(state.balance);
  });
  document.querySelectorAll('[data-bind="points-inline"]').forEach(el => {
    el.textContent = fmtPts(state.points);
  });
  document.querySelectorAll('[data-bind="user-first"]').forEach(el => el.textContent = state.user.firstName);
  document.querySelectorAll('[data-bind="user-full"]').forEach(el => el.textContent = state.user.fullName || `${state.user.firstName} ${state.user.lastName}`);
  document.querySelectorAll('[data-bind="user-email"]').forEach(el => el.textContent = state.user.email);
  document.querySelectorAll('[data-bind="card-last4"]').forEach(el => el.textContent = `•••• ${state.card.last4}`);
  document.querySelectorAll('[data-bind="card-last4-suffix"]').forEach(el => el.textContent = state.card.last4);
  document.querySelectorAll('[data-bind="points-equiv"]').forEach(el => {
    el.textContent = `تعادل ${enDigits(Math.round(state.points / 10))} ر.س`;
  });
}

function renderPopular(container) {
  if (!container) return;
  const items = EVENTS.filter(e => e.popular);
  container.innerHTML = items.map(eventCardHTML).join('');
  wireEventTriggers(container);
}

function renderNearbyCategories(container) {
  if (!container) return;
  const cats = [
    { key: 'food', label: 'مطاعم', icon: 'utensils' },
    { key: 'cinema', label: 'سينما', icon: 'clapper' },
    { key: 'themepark', label: 'ترفيه', icon: 'sparkles' },
    { key: 'games', label: 'ألعاب', icon: 'gamepad' },
    { key: 'sport', label: 'رياضة', icon: 'trophy' },
    { key: 'water', label: 'مائية', icon: 'sparkles' },
    { key: 'family', label: 'عائلة', icon: 'sparkles' },
    { key: 'experience', label: 'تجارب', icon: 'sparkles' }
  ];
  container.innerHTML = cats.slice(0, 8).map(c => `
    <a href="events.html?cat=${c.key}" class="cat-tile">
      <span class="ic-wrap">${ICONS[c.icon] || ICONS.sparkles}</span>
      <span class="lbl">${c.label}</span>
    </a>
  `).join('');
}

function renderEventList(container, opts = {}) {
  if (!container) return;
  const cat = opts.category || 'all';
  const q = (opts.query || '').trim();
  let items = EVENTS.slice();
  if (cat !== 'all') items = items.filter(e => e.category === cat || CATEGORY_LABEL[e.category] === CATEGORIES.find(c => c.key === cat)?.label);
  if (q) {
    const lower = q.toLowerCase();
    items = items.filter(e => (e.titleAr + e.titleEn + e.venue + e.district).toLowerCase().includes(lower));
  }
  if (items.length === 0) {
    container.innerHTML = `<div class="empty">${ICONS.search}<div>لا توجد نتائج مطابقة</div></div>`;
    return;
  }
  container.innerHTML = items.map(eventRowHTML).join('');
  wireEventTriggers(container);
}

function renderEventsWeekStrip(container) {
  if (!container) return;
  const weekEvents = EVENTS.slice(0, 5);
  container.innerHTML = weekEvents.map(ev => {
    const d = parseDate(ev.date);
    return `
      <button class="event-card" data-event-id="${ev.id}" style="flex:0 0 96px;max-width:96px">
        <div class="event-media" style="aspect-ratio:1/1">
          ${coverHTML(ev.category, '', ev)}
          <span class="mult" style="top:auto;bottom:6px;inset-inline-start:6px;font-size:10px;padding:2px 6px">${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0,3)}</span>
        </div>
        <div class="event-body" style="padding:6px 8px 8px">
          <h3 class="event-title" style="font-size:11px;text-align:center">${ev.titleAr.split(' ').slice(0,2).join(' ')}</h3>
        </div>
      </button>
    `;
  }).join('');
  wireEventTriggers(container);
}

/* ---------- Calendar ---------- */
let calCursor = new Date(2026, 6, 1); // July 2026

function renderCalendar(container, opts = {}) {
  if (!container) return;
  const y = calCursor.getFullYear();
  const m = calCursor.getMonth();

  const first = new Date(y, m, 1);
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const daysInPrev = new Date(y, m, 0).getDate();
  const startWeekday = first.getDay(); // 0=Sun

  const dowLabels = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  const eventDays = new Set(
    EVENTS
      .filter(e => {
        const d = parseDate(e.date);
        return d.getFullYear() === y && d.getMonth() === m;
      })
      .map(e => parseDate(e.date).getDate())
  );

  const today = new Date();
  const selectedDay = opts.selectedDay || null;

  let cells = '';
  // leading days
  for (let i = 0; i < startWeekday; i++) {
    const day = daysInPrev - startWeekday + i + 1;
    cells += `<button class="cal-cell other" tabindex="-1" disabled>${day}</button>`;
  }
  // month days
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(y, m, d);
    const isToday = isSameDay(cellDate, today);
    const isSelected = selectedDay && d === selectedDay;
    const hasEvents = eventDays.has(d);
    const classes = ['cal-cell'];
    if (isToday) classes.push('today');
    if (isSelected) classes.push('selected');
    cells += `<button class="${classes.join(' ')}" data-day="${d}">${d}${hasEvents ? '<span class="dot"></span>' : ''}</button>`;
  }
  // trailing to fill grid
  const total = startWeekday + daysInMonth;
  const trailing = (7 - (total % 7)) % 7;
  for (let i = 1; i <= trailing; i++) {
    cells += `<button class="cal-cell other" tabindex="-1" disabled>${i}</button>`;
  }

  container.innerHTML = `
    <div class="cal-head">
      <button class="arrow" data-cal="prev" aria-label="الشهر السابق">${ICONS.chevronRight}</button>
      <span class="month">${MONTH_NAMES[m]} ${y}</span>
      <button class="arrow" data-cal="next" aria-label="الشهر التالي">${ICONS.chevronLeft}</button>
    </div>
    <div class="cal-grid">
      ${dowLabels.map(d => `<span class="dow">${d}</span>`).join('')}
      ${cells}
    </div>
  `;

  container.querySelectorAll('[data-cal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.cal;
      calCursor.setMonth(calCursor.getMonth() + (dir === 'next' ? 1 : -1));
      renderCalendar(container);
      renderAgenda(document.querySelector('[data-agenda]'));
    });
  });

  container.querySelectorAll('[data-day]').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = Number(btn.dataset.day);
      renderCalendar(container, { selectedDay: day });
      renderAgenda(document.querySelector('[data-agenda]'), { day });
    });
  });
}

function renderAgenda(container, opts = {}) {
  if (!container) return;
  const y = calCursor.getFullYear();
  const m = calCursor.getMonth();
  const dayFilter = opts.day || null;

  let items = EVENTS.filter(e => {
    const d = parseDate(e.date);
    return d.getFullYear() === y && d.getMonth() === m && (!dayFilter || d.getDate() === dayFilter);
  }).sort((a, b) => parseDate(a.date) - parseDate(b.date));

  if (items.length === 0) {
    container.innerHTML = `<div class="empty">${ICONS.calendar}<div>لا توجد فعاليات في هذا التاريخ</div></div>`;
    return;
  }

  // Group by date
  const groups = new Map();
  items.forEach(ev => {
    const key = ev.date;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(ev);
  });

  let html = '';
  groups.forEach((list, date) => {
    html += `
      <div class="day-heading">
        <b>${fmtDayHeading(date)}</b>
        <small>${list.length} فعاليات</small>
      </div>
      <div class="event-list mt-8 mb-8">${list.map(agendaRowHTML).join('')}</div>
    `;
  });

  container.innerHTML = html;
  wireEventTriggers(container);
}

/* ---------- Sheets ---------- */
function openSheet(sheetEl) {
  if (!sheetEl) return;
  sheetEl.classList.add('open');
  sheetEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // focus trap: focus first focusable
  const focusable = sheetEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) setTimeout(() => focusable.focus(), 50);
  sheetEl._keyHandler = (e) => {
    if (e.key === 'Escape') closeSheet(sheetEl);
  };
  document.addEventListener('keydown', sheetEl._keyHandler);
}

function closeSheet(sheetEl) {
  if (!sheetEl) return;
  sheetEl.classList.remove('open');
  sheetEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (sheetEl._keyHandler) {
    document.removeEventListener('keydown', sheetEl._keyHandler);
    sheetEl._keyHandler = null;
  }
}

function wireSheetOverlays() {
  document.querySelectorAll('.sheet-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSheet(overlay);
    });
    overlay.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => closeSheet(overlay));
    });
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(message, type = 'success') {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.className = `toast ${type === 'error' ? 'error' : ''}`;
  el.innerHTML = `<span class="ic">${type === 'error' ? ICONS.x : ICONS.check}</span> <span>${message}</span>`;
  requestAnimationFrame(() => el.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

/* ---------- Recharge sheet ---------- */
function wireRecharge() {
  const openBtns = document.querySelectorAll('[data-open="recharge"]');
  const sheet = document.getElementById('sheet-recharge');
  if (!sheet) return;
  openBtns.forEach(b => b.addEventListener('click', () => openSheet(sheet)));

  const amounts = sheet.querySelectorAll('.amount');
  const custom = sheet.querySelector('#recharge-custom');
  let value = 250;

  const select = (v) => {
    value = v;
    amounts.forEach(a => a.classList.toggle('selected', Number(a.dataset.value) === v));
    custom.value = '';
  };

  amounts.forEach(a => a.addEventListener('click', () => select(Number(a.dataset.value))));
  select(250);

  custom.addEventListener('input', () => {
    amounts.forEach(a => a.classList.remove('selected'));
    value = Number(custom.value) || 0;
  });

  sheet.querySelector('[data-confirm="recharge"]').addEventListener('click', () => {
    if (!value || value < 10) {
      toast('الحد الأدنى للشحن 10 ر.س', 'error');
      return;
    }
    state.balance += value;
    saveState();
    refreshAll();
    closeSheet(sheet);
    toast(`تم شحن ${enDigits(value)} ر.س بنجاح`);
  });
}

/* ---------- Event details sheet ---------- */
function wireEventTriggers(root) {
  root.querySelectorAll('[data-event-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // don't open if user clicked fav
      if (e.target.closest('.fav')) return;
      const id = Number(btn.dataset.eventId);
      const ev = EVENTS.find(x => x.id === id);
      if (ev) openEventSheet(ev);
    });
  });
  root.querySelectorAll('.fav').forEach(fav => {
    fav.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = fav.closest('[data-event-id]');
      const id = Number(card.dataset.eventId);
      const isFav = state.favorites.includes(id);
      state.favorites = isFav ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
      fav.classList.toggle('on', !isFav);
      fav.innerHTML = !isFav ? ICONS.heartFill : ICONS.heart;
      saveState();
    });
    // set initial state
    const card = fav.closest('[data-event-id]');
    if (card && state.favorites.includes(Number(card.dataset.eventId))) {
      fav.classList.add('on');
      fav.innerHTML = ICONS.heartFill;
    }
  });
}

function openEventSheet(ev) {
  const sheet = document.getElementById('sheet-event');
  if (!sheet) return;

  const style = CATEGORY_STYLE[ev.category] || 'teal';
  let qty = 1;
  const total = () => ev.price * qty;

  const rerender = () => {
    sheet.querySelector('[data-e="qty"]').textContent = qty;
    sheet.querySelector('[data-e="total"]').innerHTML = `<b>${enDigits(total())}</b> <small>ر.س</small>`;
    sheet.querySelector('[data-e="pts-total"]').textContent = `+${enDigits(ev.points * qty)} نقطة`;
  };

  sheet.querySelector('[data-e="cover"]').innerHTML = coverHTML(ev.category);
  sheet.querySelector('[data-e="tag"]').textContent = CATEGORY_LABEL[ev.category] || '';
  sheet.querySelector('[data-e="tag"]').className = `tag ${style}`;
  sheet.querySelector('[data-e="title"]').textContent = ev.titleAr;
  sheet.querySelector('[data-e="sub"]').textContent = ev.titleEn || '';
  sheet.querySelector('[data-e="date"]').textContent = fmtDayHeading(ev.date);
  sheet.querySelector('[data-e="time"]').textContent = ev.time;
  sheet.querySelector('[data-e="venue"]').textContent = `${ev.venue}، ${ev.district}`;
  sheet.querySelector('[data-e="desc"]').textContent = ev.desc || '';
  const mapQ = ev.mapQuery || `${ev.venue}, Riyadh, Saudi Arabia`;
  const mapEl = sheet.querySelector('[data-e="map"]');
  if (mapEl) {
    mapEl.innerHTML = `<iframe title="خريطة ${ev.venue}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="${mapEmbedSrc(mapQ)}"></iframe>`;
  }
  const mapLink = sheet.querySelector('[data-e="map-link"]');
  if (mapLink) mapLink.href = mapLinkSrc(mapQ);
  sheet.querySelector('[data-e="price"]').innerHTML = `<b>${enDigits(ev.price)}</b> <small>ر.س</small>`;
  sheet.querySelector('[data-e="balance"]').innerHTML = `الرصيد الحالي: <b>${enDigits(Math.floor(state.balance))} ر.س</b>`;
  qty = 1;
  rerender();

  const dec = sheet.querySelector('[data-e="dec"]');
  const inc = sheet.querySelector('[data-e="inc"]');
  const confirm = sheet.querySelector('[data-e="confirm"]');

  const decHandler = () => { if (qty > 1) { qty--; rerender(); } };
  const incHandler = () => { if (qty < 8) { qty++; rerender(); } };
  const confirmHandler = () => {
    const cost = total();
    if (state.balance < cost) {
      toast('الرصيد غير كافٍ لإتمام الحجز', 'error');
      // shake balance row
      const row = sheet.querySelector('[data-e="balance-row"]');
      if (row) {
        row.style.borderColor = 'var(--coral-ink)';
        setTimeout(() => { row.style.borderColor = ''; }, 1200);
      }
      return;
    }
    state.balance -= cost;
    state.points += ev.points * qty;
    state.bookings.push({ id: Date.now(), eventId: ev.id, qty, when: new Date().toISOString() });
    saveState();
    refreshAll();
    closeSheet(sheet);
    toast(`تم الحجز بنجاح • أُضيفت ${enDigits(ev.points * qty)} نقطة`);
  };

  // replace listeners cleanly
  dec.onclick = decHandler;
  inc.onclick = incHandler;
  confirm.onclick = confirmHandler;

  openSheet(sheet);
}

/* ---------- Generic openers (data-open="support") ----------
   Note: 'recharge', 'link-card', 'profile-edit' are wired in their own
   functions since they need to populate form fields before opening.
*/
function wireGenericOpeners() {
  const map = { support: 'sheet-support' };
  document.querySelectorAll('[data-open]').forEach(btn => {
    const key = btn.dataset.open;
    const targetId = map[key];
    if (!targetId) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sheet = document.getElementById(targetId);
      if (sheet) openSheet(sheet);
    });
  });
}

/* ---------- Support sheet ---------- */
function wireSupportOptions() {
  document.querySelectorAll('[data-support]').forEach(btn => {
    btn.addEventListener('click', () => {
      toast('سيتم توجيهك إلى القناة (نموذج أولي)');
      const sheet = document.getElementById('sheet-support');
      if (sheet) closeSheet(sheet);
    });
  });
}

/* ---------- Bottom nav highlight ---------- */
function highlightNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const target = a.getAttribute('href');
    if (target === path || (path === '' && target === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
}

/* ---------- Hidden reset (long-press logo) ---------- */
function wireHiddenReset() {
  const logo = document.querySelector('.brand');
  if (!logo) return;
  let timer = null;
  const start = () => {
    timer = setTimeout(() => {
      resetState();
      toast('تمت إعادة تعيين النموذج التجريبي');
    }, 1500);
  };
  const cancel = () => { clearTimeout(timer); timer = null; };
  logo.addEventListener('pointerdown', start);
  logo.addEventListener('pointerup', cancel);
  logo.addEventListener('pointerleave', cancel);
  logo.addEventListener('pointercancel', cancel);
}

/* ---------- refresh everything on state change ---------- */
function refreshAll() {
  renderHomeStats();
}

/* ---------- Inject shared sheets ---------- */
function injectSharedSheets() {
  if (document.getElementById('sheet-recharge')) return; // already present
  const html = `
    <div class="sheet-overlay" id="sheet-recharge" role="dialog" aria-modal="true" aria-labelledby="rch-title" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <h3 class="sheet-title" id="rch-title">شحن الرصيد</h3>
        <p class="sheet-sub">اختر المبلغ الذي تود إضافته إلى بطاقة عزوة</p>
        <div class="amounts" role="group" aria-label="مبلغ الشحن">
          <button class="amount" data-value="100">100 ر.س</button>
          <button class="amount" data-value="250">250 ر.س</button>
          <button class="amount" data-value="500">500 ر.س</button>
        </div>
        <div class="field">
          <label for="recharge-custom">مبلغ مخصص</label>
          <input id="recharge-custom" type="number" inputmode="numeric" placeholder="أدخل المبلغ" min="10">
        </div>
        <div class="source-row">
          <div class="bank-logo">بنك<br>الإنماء</div>
          <div class="txt">
            <b>عبر بنك الإنماء</b>
            <small>مصدر التمويل المرتبط بحسابك</small>
          </div>
        </div>
        <button class="btn btn-primary btn-block sheet-cta" data-confirm="recharge">تأكيد الشحن</button>
        <button class="btn btn-ghost btn-block mt-8" data-close>إلغاء</button>
        <p class="empty" style="padding:12px 0 0;font-size:11px">هذه واجهة تجريبية — لا تُنفذ عمليات مالية حقيقية</p>
      </div>
    </div>

    <div class="sheet-overlay" id="sheet-event" role="dialog" aria-modal="true" aria-labelledby="ev-title" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <div class="detail-cover" data-e="cover"></div>
        <div class="hstack mt-12" style="justify-content:space-between">
          <span class="tag" data-e="tag">فعالية</span>
          <button class="icon-btn" data-close aria-label="إغلاق" style="width:32px;height:32px;background:var(--surface-2)">
            ${ICONS.x}
          </button>
        </div>
        <h3 class="detail-title" data-e="title">—</h3>
        <div class="detail-sub" data-e="sub">—</div>
        <div class="detail-meta">
          <div class="cell">
            <div class="k">${ICONS.calendarSm} التاريخ</div>
            <div class="v" data-e="date">—</div>
          </div>
          <div class="cell">
            <div class="k">${ICONS.clock} الوقت</div>
            <div class="v" data-e="time">—</div>
          </div>
          <div class="cell" style="grid-column:span 2">
            <div class="k">${ICONS.mapPin} المكان</div>
            <div class="v" data-e="venue">—</div>
          </div>
        </div>
        <p class="detail-desc" data-e="desc">—</p>
        <div class="mini-map" data-e="map"></div>
        <a data-e="map-link" class="mini-map-cta" target="_blank" rel="noopener">
          ${ICONS.location}
          <span>افتح في خرائط Google</span>
        </a>
        <div class="qty-row">
          <div>
            <div style="font-size:12px;color:var(--ink-3)">عدد التذاكر</div>
            <div style="font-weight:700;margin-top:2px" data-e="price">— ر.س</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-e="dec" aria-label="تقليل">${ICONS.minus}</button>
            <span class="qty-num" data-e="qty">1</span>
            <button class="qty-btn" data-e="inc" aria-label="زيادة">${ICONS.plus}</button>
          </div>
        </div>
        <div class="hstack mt-8" style="justify-content:space-between">
          <span style="color:var(--ink-3);font-size:13px">المجموع</span>
          <span style="font-weight:800" data-e="total">— ر.س</span>
        </div>
        <div class="hstack" style="justify-content:space-between">
          <span style="color:var(--ink-3);font-size:13px">تكسب</span>
          <span style="font-weight:800;color:var(--teal-ink)" data-e="pts-total">+—</span>
        </div>
        <div class="balance-row" data-e="balance-row">
          <span data-e="balance">الرصيد الحالي: <b>—</b></span>
          <button class="btn btn-outline" style="min-height:36px;padding:0 12px" data-open="recharge">شحن</button>
        </div>
        <button class="btn btn-primary btn-block sheet-cta" data-e="confirm">احجز الآن</button>
      </div>
    </div>

    <div class="sheet-overlay" id="sheet-support" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <h3 class="sheet-title">تواصل مع خدمة العملاء</h3>
        <p class="sheet-sub">اختر الطريقة المناسبة لك للتواصل</p>
        <div class="menu-list mt-12" style="margin:12px 0 0">
          <button class="menu-row" data-support="chat">
            <span class="ic-wrap" style="background:var(--teal-050);color:var(--teal-ink)">${ICONS.chat}</span>
            <span>المحادثة المباشرة</span>
            <span></span>
            <span class="chev">${ICONS.chevronLeft}</span>
          </button>
          <button class="menu-row" data-support="call">
            <span class="ic-wrap" style="background:var(--blue-bg);color:var(--blue-ink)">${ICONS.phone}</span>
            <span>اتصال هاتفي</span>
            <span></span>
            <span class="chev">${ICONS.chevronLeft}</span>
          </button>
          <button class="menu-row" data-support="mail">
            <span class="ic-wrap" style="background:var(--coral-bg);color:var(--coral-ink)">${ICONS.mail}</span>
            <span>البريد الإلكتروني</span>
            <span></span>
            <span class="chev">${ICONS.chevronLeft}</span>
          </button>
          <button class="menu-row" data-support="faq">
            <span class="ic-wrap" style="background:var(--purple-bg);color:var(--purple-ink)">${ICONS.help}</span>
            <span>الأسئلة الشائعة</span>
            <span></span>
            <span class="chev">${ICONS.chevronLeft}</span>
          </button>
        </div>
        <button class="btn btn-ghost btn-block mt-12" data-close>إغلاق</button>
      </div>
    </div>

    <div class="sheet-overlay" id="sheet-profile" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <h3 class="sheet-title">تعديل البيانات</h3>
        <p class="sheet-sub">حدّث معلومات ملفك الشخصي</p>
        <div class="hstack mt-12" style="gap:14px">
          <div class="avatar" id="pf-avatar-preview" aria-hidden="true">أ</div>
          <label class="btn btn-secondary" style="min-height:40px;padding:0 14px;cursor:pointer">
            ${ICONS.camera}
            <span>تغيير الصورة</span>
            <input id="pf-avatar-file" type="file" accept="image/*" hidden>
          </label>
        </div>
        <div class="field">
          <label for="pf-first">الاسم الأول *</label>
          <input id="pf-first" type="text">
        </div>
        <div class="field">
          <label for="pf-last">اسم العائلة *</label>
          <input id="pf-last" type="text">
        </div>
        <div class="field">
          <label for="pf-email">البريد الإلكتروني *</label>
          <input id="pf-email" type="email">
        </div>
        <div class="field">
          <label for="pf-phone">رقم الجوال</label>
          <input id="pf-phone" type="tel">
        </div>
        <button class="btn btn-primary btn-block sheet-cta" data-confirm="profile">حفظ التغييرات</button>
        <button class="btn btn-ghost btn-block mt-8" data-close>إلغاء</button>
      </div>
    </div>

    <div class="sheet-overlay" id="sheet-card" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <h3 class="sheet-title">ربط بطاقة جديدة</h3>
        <p class="sheet-sub">أضِف بطاقة عزوة إلى حسابك (بيانات نموذجية)</p>
        <div class="field">
          <label for="c-name">اسم حامل البطاقة</label>
          <input id="c-name" type="text" placeholder="أحمد العتيبي">
        </div>
        <div class="field">
          <label for="c-last4">آخر 4 أرقام</label>
          <input id="c-last4" type="text" inputmode="numeric" maxlength="4" placeholder="4821">
        </div>
        <button class="btn btn-primary btn-block sheet-cta" data-confirm="card">تأكيد الربط</button>
        <button class="btn btn-ghost btn-block mt-8" data-close>إلغاء</button>
        <p class="empty" style="padding:12px 0 0;font-size:11px">لا تُطلب أو تُخزَّن أي بيانات دفع حقيقية</p>
      </div>
    </div>
  `;
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  // Insert into .app so overlays are constrained to app width on desktop
  const app = document.querySelector('.app') || document.body;
  Array.from(wrap.children).forEach(c => app.appendChild(c));
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectSharedSheets();
  highlightNav();
  wireSheetOverlays();
  wireRecharge();
  wireSupportOptions();
  wireGenericOpeners();
  wireHiddenReset();
  refreshAll();

  // Page-specific
  const popular = document.querySelector('[data-render="popular"]');
  const cats = document.querySelector('[data-render="nearby-cats"]');
  const allEvents = document.querySelector('[data-render="events-list"]');
  const weekStrip = document.querySelector('[data-render="week-strip"]');
  const cal = document.querySelector('[data-render="calendar"]');
  const agenda = document.querySelector('[data-agenda]');

  if (popular) renderPopular(popular);
  if (cats) renderNearbyCategories(cats);
  if (weekStrip) renderEventsWeekStrip(weekStrip);
  if (cal) {
    renderCalendar(cal);
    renderAgenda(agenda);
  }
  if (allEvents) {
    // Events page: filter chips + search
    const q = new URLSearchParams(location.search).get('cat');
    let current = q || 'all';
    let query = '';
    const chips = document.querySelectorAll('[data-filter-cat]');
    chips.forEach(c => {
      c.addEventListener('click', () => {
        current = c.dataset.filterCat;
        chips.forEach(x => x.classList.toggle('is-active', x === c));
        renderEventList(allEvents, { category: current, query });
      });
      if (c.dataset.filterCat === current) c.classList.add('is-active');
    });
    const searchInput = document.querySelector('[data-events-search]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value;
        renderEventList(allEvents, { category: current, query });
      });
    }
    renderEventList(allEvents, { category: current });
  }

  // Map venues + Google Maps iframe wiring
  const mapVenues = document.querySelector('[data-render="venues"]');
  const gmap = document.getElementById('main-gmap');
  if (mapVenues) {
    mapVenues.innerHTML = VENUES.map((v, i) => `
      <button class="venue-row ${i === 0 ? 'is-active' : ''}" data-map-query="${v.query}">
        <span class="ic-wrap">${ICONS.location}</span>
        <div>
          <div class="name">${v.name}</div>
          <div class="sub">${v.district}</div>
        </div>
        <div class="dist"><b>${enDigits(v.km)} كم</b><span>تقريباً</span></div>
      </button>
    `).join('');

    mapVenues.querySelectorAll('[data-map-query]').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.mapQuery;
        if (gmap) gmap.src = mapEmbedSrc(q);
        mapVenues.querySelectorAll('.venue-row').forEach(r => r.classList.toggle('is-active', r === btn));
        // scroll map into view smoothly
        document.querySelector('.map-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // Profile page bindings
  wireProfileEdits();
  wireCardLink();
  wireToggles();
});

/* ---------- Profile edits (settings sheet) ---------- */
function wireProfileEdits() {
  const openBtn = document.querySelector('[data-open="profile-edit"]');
  const sheet = document.getElementById('sheet-profile');
  if (!openBtn || !sheet) return;

  openBtn.addEventListener('click', () => {
    sheet.querySelector('#pf-first').value = state.user.firstName;
    sheet.querySelector('#pf-last').value = state.user.lastName;
    sheet.querySelector('#pf-email').value = state.user.email;
    sheet.querySelector('#pf-phone').value = state.user.phone;
    const preview = sheet.querySelector('#pf-avatar-preview');
    if (state.user.avatar) {
      preview.innerHTML = `<img alt="" src="${state.user.avatar}">`;
    } else {
      preview.innerHTML = state.user.firstName?.charAt(0) || 'ع';
    }
    openSheet(sheet);
  });

  const fileInput = sheet.querySelector('#pf-avatar-file');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      sheet.querySelector('#pf-avatar-preview').innerHTML = `<img alt="" src="${ev.target.result}">`;
      sheet._tempAvatar = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  sheet.querySelector('[data-confirm="profile"]').addEventListener('click', () => {
    const first = sheet.querySelector('#pf-first').value.trim();
    const last = sheet.querySelector('#pf-last').value.trim();
    const email = sheet.querySelector('#pf-email').value.trim();
    const phone = sheet.querySelector('#pf-phone').value.trim();
    if (!first || !last || !email) {
      toast('يرجى تعبئة الحقول المطلوبة', 'error');
      return;
    }
    state.user.firstName = first;
    state.user.lastName = last;
    state.user.fullName = `${first} ${last}`;
    state.user.email = email;
    state.user.phone = phone;
    if (sheet._tempAvatar) state.user.avatar = sheet._tempAvatar;
    saveState();
    refreshAll();
    // update visible avatar
    const av = document.querySelector('[data-avatar]');
    if (av) {
      if (state.user.avatar) av.innerHTML = `<img alt="" src="${state.user.avatar}">`;
      else av.textContent = first.charAt(0);
    }
    closeSheet(sheet);
    toast('تم حفظ بياناتك');
  });
}

function wireCardLink() {
  const openBtn = document.querySelector('[data-open="link-card"]');
  const sheet = document.getElementById('sheet-card');
  if (!openBtn || !sheet) return;

  openBtn.addEventListener('click', () => openSheet(sheet));

  sheet.querySelector('[data-confirm="card"]').addEventListener('click', () => {
    const name = sheet.querySelector('#c-name').value.trim();
    const last4 = sheet.querySelector('#c-last4').value.trim();
    if (!name || !/^\d{4}$/.test(last4)) {
      toast('يرجى إدخال بيانات صحيحة', 'error');
      return;
    }
    state.card = { ...state.card, linked: true, last4 };
    saveState();
    refreshAll();
    closeSheet(sheet);
    toast('تمت إضافة البطاقة');
  });
}

function wireToggles() {
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => {
      const on = t.getAttribute('aria-checked') === 'true';
      t.setAttribute('aria-checked', String(!on));
      const key = t.dataset.toggle;
      if (key === 'notifications') {
        state.notifications = !on;
        saveState();
      }
    });
    if (t.dataset.toggle === 'notifications') {
      t.setAttribute('aria-checked', String(!!state.notifications));
    }
  });
}
