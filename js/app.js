/* ==========================================================================
   Azwa | Shared app.js
   Data + UI wiring. All server I/O goes through js/api.js.
   ========================================================================== */

import * as api from './api.js';

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

// Events are loaded from Supabase on boot. Kept as an offline seed so
// unauthenticated visitors still see something before the network completes.
let EVENTS = [
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
    image: 'assets/events/vox.jpg',
    imagePos: 'center',
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
    multiplier: '3X',
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
    image: 'assets/events/battlekart.jpg',
    imagePos: 'center',
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
    image: 'assets/events/sensas.jpg',
    imagePos: 'center',
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
    image: 'assets/events/bowling.jpg',
    imagePos: 'center',
    desc: 'أمسية بولينغ عائلية مع خصم 20% لأعضاء عزوة.',
    popular: false,
    nearby: true,
    mapQuery: 'Granada Mall Riyadh'
  },
  // ---------- KSA-wide destinations (also present in Supabase; local IDs may not match server IDs — server hydration replaces this whole array) ----------
  {
    id: 20,
    titleAr: 'تجربة صخرة الفيل، العلا',
    titleEn: 'Elephant Rock, AlUla',
    category: 'experience',
    date: '2026-09-15',
    time: '5:00 م',
    venue: 'صخرة الفيل',
    district: 'العلا',
    distanceKm: 1080,
    price: 220,
    points: 320,
    multiplier: '3X',
    image: 'assets/events/alula-elephant-rock.jpg',
    imagePos: 'center 55%',
    desc: 'زيارة إلى معلم صخرة الفيل الشهير عند غروب الشمس مع جلسة قهوة عربية.',
    popular: true,
    nearby: false,
    mapQuery: 'Elephant Rock AlUla'
  },
  {
    id: 21,
    titleAr: 'أمسية مرايا العلا',
    titleEn: 'Maraya Concert Hall, AlUla',
    category: 'experience',
    date: '2026-11-20',
    time: '8:30 م',
    venue: 'قاعة مرايا',
    district: 'العلا',
    distanceKm: 1080,
    price: 550,
    points: 900,
    multiplier: '3X',
    image: 'assets/events/alula-maraya.jpg',
    imagePos: 'center',
    desc: 'حفل موسيقي داخل أكبر مبنى بواجهة مرآة في العالم، في قلب صحراء العلا.',
    popular: true,
    nearby: false,
    mapQuery: 'Maraya Concert Hall AlUla'
  },
  {
    id: 22,
    titleAr: 'كورنيش جدة والنافورة',
    titleEn: 'Jeddah Corniche',
    category: 'family',
    date: '2026-08-14',
    time: '6:00 م',
    venue: 'كورنيش جدة',
    district: 'جدة',
    distanceKm: 950,
    price: 30,
    points: 40,
    multiplier: '2X',
    image: 'assets/events/jeddah-corniche.jpg',
    imagePos: 'center',
    desc: 'أمسية عائلية على الواجهة البحرية، وشاهد نافورة الملك فهد.',
    popular: true,
    nearby: false,
    mapQuery: 'Jeddah Corniche'
  },
  {
    id: 23,
    titleAr: 'جدة التاريخية — البلد',
    titleEn: 'Historic Jeddah (Al-Balad)',
    category: 'experience',
    date: '2026-09-05',
    time: '4:30 م',
    venue: 'حي البلد',
    district: 'جدة',
    distanceKm: 950,
    price: 80,
    points: 130,
    multiplier: '2X',
    image: 'assets/events/jeddah-al-balad.jpg',
    imagePos: 'center',
    desc: 'جولة إرشادية في الحيّ المُدرج ضمن التراث العالمي: البيوت الحجازية والرواشين والأزقة.',
    popular: false,
    nearby: false,
    mapQuery: 'Al Balad Jeddah'
  },
  {
    id: 24,
    titleAr: 'عشاء تراس البجيري، الدرعية',
    titleEn: 'Bujairi Terrace, Diriyah',
    category: 'food',
    date: '2026-07-30',
    time: '7:30 م',
    venue: 'تراس البجيري',
    district: 'الدرعية',
    distanceKm: 25,
    price: 180,
    points: 260,
    multiplier: '2X',
    image: 'assets/events/diriyah-bujairi.jpg',
    imagePos: 'center',
    desc: 'عشاء نجدي معاصر بإطلالة على حي الطريف التاريخي في الدرعية.',
    popular: true,
    nearby: true,
    mapQuery: 'Bujairi Terrace Diriyah'
  },
  {
    id: 25,
    titleAr: 'رحلة أبها وعسير',
    titleEn: 'Abha & Aseer Highlands',
    category: 'experience',
    date: '2026-09-25',
    time: '8:00 ص',
    venue: 'تلفريك أبها',
    district: 'أبها',
    distanceKm: 900,
    price: 320,
    points: 480,
    multiplier: '3X',
    image: 'assets/events/abha-aseer.jpg',
    imagePos: 'center',
    desc: 'يوم كامل بين مرتفعات عسير والقرى المدرّجة، مع جولة تلفريك تُطل على الجبال الخضراء.',
    popular: false,
    nearby: false,
    mapQuery: 'Abha Cable Car'
  },
  {
    id: 26,
    titleAr: 'حافة العالم',
    titleEn: 'Edge of the World (Jebel Fihrayn)',
    category: 'experience',
    date: '2026-10-10',
    time: '3:00 م',
    venue: 'جبل فهرين',
    district: 'خارج الرياض',
    distanceKm: 95,
    price: 250,
    points: 400,
    multiplier: '3X',
    image: 'assets/events/edge-of-world.jpg',
    imagePos: 'center',
    desc: 'رحلة بالدفع الرباعي إلى الحافة الشهيرة، مع غروب الشمس والعشاء في المخيم.',
    popular: true,
    nearby: false,
    mapQuery: 'Edge of the World Riyadh'
  },
  {
    id: 27,
    titleAr: 'بوليفارد وورلد',
    titleEn: 'Boulevard World, Riyadh',
    category: 'themepark',
    date: '2026-07-28',
    time: '7:00 م',
    venue: 'بوليفارد وورلد',
    district: 'الرياض',
    distanceKm: 5,
    price: 90,
    points: 130,
    multiplier: '3X',
    image: 'assets/events/riyadh-boulevard.jpg',
    imagePos: 'center',
    desc: 'تنقّل بين مناطق العالم في ليلة واحدة — الصين، إسبانيا، اليونان، أمريكا — مع عروض حية ومطاعم.',
    popular: true,
    nearby: true,
    mapQuery: 'Boulevard World Riyadh'
  }
];

// Packages: bundles of events sold as one purchase. Local seed only — replaced
// by loadPackagesFromServer() on boot. eventIds reference local EVENTS ids;
// after server hydration they reference server ids from the packages table.
let PACKAGES = [
  {
    id: 101,
    titleAr: 'مغامرة العلا',
    titleEn: 'AlUla Adventure',
    desc: 'باقة تجمع صخرة الفيل وأمسية مرايا — بسعر أقل من شرائهما منفصلين.',
    price: 700,
    points: 1300,
    multiplier: '3X',
    image: 'assets/events/alula-elephant-rock.jpg',
    imagePos: 'center 55%',
    coverCategory: 'experience',
    region: 'AlUla',
    popular: true,
    eventIds: [20, 21]
  },
  {
    id: 102,
    titleAr: 'عطلة نهاية أسبوع في جدة',
    titleEn: 'Jeddah Weekend',
    desc: 'يومان في جدة: نزهة على الكورنيش وجولة في البلد التاريخية.',
    price: 100,
    points: 200,
    multiplier: '2X',
    image: 'assets/events/jeddah-corniche.jpg',
    imagePos: 'center',
    coverCategory: 'family',
    region: 'Jeddah',
    popular: true,
    eventIds: [22, 23]
  },
  {
    id: 103,
    titleAr: 'ثلاثية الرياض العائلية',
    titleEn: 'Riyadh Family Trio',
    desc: 'يوم في سيكس فلاغز + سوبر بارك + جولة في بوليفارد وورلد. توفير على السعر الكامل.',
    price: 300,
    points: 600,
    multiplier: '3X',
    image: 'assets/events/six-flags.jpg',
    imagePos: 'center',
    coverCategory: 'themepark',
    region: 'Riyadh',
    popular: true,
    eventIds: [4, 8, 27]  // Six Flags, SuperPark, Boulevard World (local seed IDs)
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

/* ---------- State (backend-backed) ----------
   With anonymous auth, every browser gets its own Supabase user automatically.
   The DEFAULT_STATE below is only shown for the ~200ms between page paint and
   the first backend hydration.
*/
// Default identity shown before the server hydrates + as fallback when the
// user hasn't personalized their profile yet. Kept in sync with the backend
// defaults so first-time users see a coherent name/card holder throughout.
const DEFAULT_FIRST = 'أحمد';
const DEFAULT_LAST  = 'العتيبي';
const DEFAULT_FULL  = `${DEFAULT_FIRST} ${DEFAULT_LAST}`;

const DEFAULT_STATE = {
  authed: true,
  balance: 0,
  points: 0,
  user: {
    firstName: DEFAULT_FIRST,
    lastName: DEFAULT_LAST,
    fullName: DEFAULT_FULL,
    email: '',
    phone: '',
    avatar: null,
    verified: true
  },
  cards: [],
  bookings: [],
  favorites: [],
  notifications: true
};

let state = { ...DEFAULT_STATE, user: { ...DEFAULT_STATE.user }, cards: [] };

function setDefaultState() {
  state = { ...DEFAULT_STATE, user: { ...DEFAULT_STATE.user }, cards: [] };
}

async function hydrateFromServer() {
  const [profile, wallet, cards, favs, bookings] = await Promise.all([
    api.loadProfile().catch(() => null),
    api.loadWallet().catch(() => ({ balance: 0, points: 0 })),
    api.loadCards().catch(() => []),
    api.loadFavorites().catch(() => []),
    api.loadBookings().catch(() => [])
  ]);
  state = {
    authed: true,
    balance: wallet.balance,
    points: wallet.points,
    user: profile ? {
      firstName: profile.first_name || DEFAULT_FIRST,
      lastName: profile.last_name  || DEFAULT_LAST,
      fullName: (profile.first_name || profile.last_name)
        ? `${profile.first_name || DEFAULT_FIRST} ${profile.last_name || DEFAULT_LAST}`.trim()
        : DEFAULT_FULL,
      email: (await api.supabase.auth.getUser()).data.user?.email || '',
      phone: profile.phone || '',
      avatar: profile.avatar_url || null,
      verified: profile.verified !== false
    } : { ...DEFAULT_STATE.user },
    cards,
    bookings,
    favorites: favs,
    notifications: true
  };
}

/* ---------- Card helpers ----------
   The UI always shows one personal + one family tile even when the user has
   fewer real cards linked — missing ones render as placeholders with an
   "activate" CTA. Both cards spend from the same wallet.
*/
function findCard(type) {
  return state.cards.find(c => c.card_type === type) || null;
}
function primaryCard() {
  return findCard('personal') || state.cards[0] || null;
}

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
  if (balEl) balEl.innerHTML = `${enDigits(state.balance)} <small>ر.س</small>`;
  if (ptsEl) ptsEl.innerHTML = `${enDigits(state.points)} <small>نقطة</small>`;

  document.querySelectorAll('[data-bind="points-line"]').forEach(el => {
    el.textContent = `${enDigits(state.points)} نقطة`;
  });

  document.querySelectorAll('[data-bind="balance-inline"]').forEach(el => {
    el.textContent = fmtSAR(state.balance);
  });
  document.querySelectorAll('[data-bind="points-inline"]').forEach(el => {
    el.textContent = fmtPts(state.points);
  });
  document.querySelectorAll('[data-bind="user-first"]').forEach(el => el.textContent = state.user.firstName);
  document.querySelectorAll('[data-bind="user-full"]').forEach(el => el.textContent = state.user.fullName || `${state.user.firstName} ${state.user.lastName}`);
  document.querySelectorAll('[data-bind="user-email"]').forEach(el => el.textContent = state.user.email);
  const last4 = primaryCard()?.last4 || '••••';
  document.querySelectorAll('[data-bind="card-last4"]').forEach(el => el.textContent = `•••• ${last4}`);
  document.querySelectorAll('[data-bind="card-last4-suffix"]').forEach(el => el.textContent = last4);
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

/* ---------- Packages ---------- */
function packageCardHTML(pkg) {
  const style = CATEGORY_STYLE[pkg.coverCategory] || 'teal';
  const count = pkg.eventIds?.length || 0;
  const cover = pkg.image
    ? `<div class="cover cover--photo" style="background-image:url('${pkg.image}');background-position:${pkg.imagePos || 'center'}"></div>`
    : `<div class="cover ${pkg.coverCategory || 'experience'}">${coverArt(pkg.coverCategory || 'experience')}</div>`;
  return `
    <button class="event-card package-card" data-package-id="${pkg.id}" aria-label="${pkg.titleAr}">
      <div class="event-media">
        ${cover}
        <span class="pkg-badge">${count} فعاليات</span>
        <span class="mult ${style}">${pkg.multiplier} نقاط</span>
      </div>
      <div class="event-body">
        <span class="tag ${style}">باقة${pkg.region ? ' • ' + pkg.region : ''}</span>
        <h3 class="event-title">${pkg.titleAr}</h3>
        <div class="event-price">
          ابتداءً من <b>${enDigits(pkg.price)}</b> <small>ر.س</small>
        </div>
      </div>
    </button>
  `;
}

function renderPackages(container) {
  if (!container) return;
  if (!PACKAGES.length) {
    container.innerHTML = `<div class="empty">${ICONS.gift}<div>لا توجد باقات حالياً</div></div>`;
    return;
  }
  container.innerHTML = PACKAGES.map(packageCardHTML).join('');
  wirePackageTriggers(container);
}

function wirePackageTriggers(root) {
  root.querySelectorAll('[data-package-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.packageId);
      const pkg = PACKAGES.find(x => x.id === id);
      if (pkg) openPackageSheet(pkg);
    });
  });
}

function openPackageSheet(pkg) {
  const sheet = document.getElementById('sheet-package');
  if (!sheet) return;

  const style = CATEGORY_STYLE[pkg.coverCategory] || 'teal';
  let qty = 1;
  const total = () => pkg.price * qty;

  const rerender = () => {
    sheet.querySelector('[data-p="qty"]').textContent = qty;
    sheet.querySelector('[data-p="total"]').innerHTML = `<b>${enDigits(total())}</b> <small>ر.س</small>`;
    sheet.querySelector('[data-p="pts-total"]').textContent = `+${enDigits(pkg.points * qty)} نقطة`;
  };

  const cover = sheet.querySelector('[data-p="cover"]');
  if (pkg.image) {
    cover.innerHTML = `<div class="cover cover--photo" style="background-image:url('${pkg.image}');background-position:${pkg.imagePos || 'center'}"></div>`;
  } else {
    cover.innerHTML = `<div class="cover ${pkg.coverCategory || 'experience'}">${coverArt(pkg.coverCategory || 'experience')}</div>`;
  }
  sheet.querySelector('[data-p="tag"]').textContent = pkg.region ? `باقة • ${pkg.region}` : 'باقة';
  sheet.querySelector('[data-p="tag"]').className = `tag ${style}`;
  sheet.querySelector('[data-p="title"]').textContent = pkg.titleAr;
  sheet.querySelector('[data-p="sub"]').textContent = pkg.titleEn || '';
  sheet.querySelector('[data-p="desc"]').textContent = pkg.desc || '';

  // Constituent events list
  const itemsEl = sheet.querySelector('[data-p="items"]');
  const items = (pkg.eventIds || [])
    .map(eid => EVENTS.find(e => e.id === eid))
    .filter(Boolean);
  if (items.length) {
    itemsEl.innerHTML = items.map((ev, i) => `
      <div class="pkg-item">
        <span class="pkg-step">${i + 1}</span>
        <div class="pkg-item-body">
          <div class="pkg-item-title">${ev.titleAr}</div>
          <div class="pkg-item-meta">${ICONS.mapPin} ${ev.venue} • ${fmtShortDate(ev.date)}</div>
        </div>
      </div>
    `).join('');
  } else {
    itemsEl.innerHTML = `<div class="empty" style="padding:8px 0">تفاصيل الفعاليات قيد التحميل</div>`;
  }

  sheet.querySelector('[data-p="price"]').innerHTML = `<b>${enDigits(pkg.price)}</b> <small>ر.س</small>`;
  sheet.querySelector('[data-p="balance"]').innerHTML = `الرصيد الحالي: <b>${enDigits(Math.floor(state.balance))} ر.س</b>`;
  qty = 1;
  rerender();

  const dec = sheet.querySelector('[data-p="dec"]');
  const inc = sheet.querySelector('[data-p="inc"]');
  const confirmBtn = sheet.querySelector('[data-p="confirm"]');

  dec.onclick = () => { if (qty > 1) { qty--; rerender(); } };
  inc.onclick = () => { if (qty < 8) { qty++; rerender(); } };
  confirmBtn.onclick = async () => {
    if (!requireAuth('لحجز الباقة، يرجى تسجيل الدخول أولاً')) return;
    const cost = total();
    if (state.balance < cost) {
      toast('الرصيد غير كافٍ لإتمام الحجز', 'error');
      return;
    }
    setBusy(confirmBtn, true);
    try {
      const { balance, points, bookingId } = await api.bookPackage(pkg.id, qty);
      state.balance = balance;
      state.points = points;
      state.bookings.unshift({
        id: bookingId,
        package_id: pkg.id,
        event_id: null,
        quantity: qty,
        total_paid: cost,
        points_earned: pkg.points * qty,
        status: 'confirmed',
        created_at: new Date().toISOString()
      });
      refreshAll();
      closeSheet(sheet);
      toast(`تم حجز الباقة • أُضيفت ${enDigits(pkg.points * qty)} نقطة`);
    } catch (e) {
      toast(friendlyError(e), 'error');
    } finally {
      setBusy(confirmBtn, false);
    }
  };

  openSheet(sheet);
}

/* ---------- Cards page ----------
   Two hero tiles (personal + family) on top, then a history list of every
   card the user has ever linked. Full CRUD: add via the sheet, delete each
   history row. Both tiles spend from the same wallet.
*/
function renderCards(container) {
  if (!container) return;
  const holderName = state.user.fullName || 'حامل البطاقة';
  const tiles = [
    { type: 'personal', label: 'بطاقتي الشخصية', tint: '' },
    { type: 'family',   label: 'بطاقة العائلة',  tint: 'azwa-card--family' }
  ];

  const tilesHtml = tiles.map(t => {
    const card = findCard(t.type);
    const last4 = card?.last4 || '••••';
    const linked = !!card?.linked;
    const displayHolder = linked ? (card?.label || holderName) : 'غير مفعّلة';
    // Unactivated tiles have no balance/points — the wallet is only reachable
    // through a linked card. Once activated, both tiles share the same wallet.
    const shownBalance = linked ? state.balance : 0;
    const shownPoints  = linked ? state.points  : 0;
    const pointsLabel  = linked ? 'النقاط المشتركة' : 'النقاط';
    return `
      <article class="azwa-card ${t.tint} ${linked ? '' : 'azwa-card--placeholder'}" data-card-tile="${t.type}">
        <img class="card-art" src="images/azwa-card.png" alt="">
        <div class="card-overlay">
          <div class="card-top">
            <span class="card-badge">${t.type === 'family' ? 'عائلية' : 'شخصية'}</span>
            <span class="card-label">${t.label}</span>
          </div>
          <div class="card-balance">${enDigits(shownBalance)} <small>ر.س</small></div>
          <div class="card-holder-row">
            <span class="card-holder">${displayHolder}</span>
            <span class="card-num-mini">•••• ${last4}</span>
          </div>
          <div class="card-footer">
            <div class="card-points">
              <span class="k">${pointsLabel}</span>
              <span class="v">${enDigits(shownPoints)}</span>
            </div>
            ${linked
              ? `<button class="card-recharge" data-open="recharge" type="button">
                   <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
                   <span>شحن</span>
                 </button>`
              : `<button class="card-recharge" data-activate-card="${t.type}" type="button">
                   <span>تفعيل</span>
                 </button>`}
          </div>
        </div>
      </article>
    `;
  }).join('');

  // History list: every card ever added, newest first, with delete
  const history = state.cards.slice().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const historyHtml = history.length ? `
    <div class="section-head mt-16" style="padding:0 4px">
      <h2 style="font-size:14px">جميع بطاقاتك</h2>
      <span class="link" style="opacity:.7;cursor:default">${history.length} بطاقة</span>
    </div>
    <div class="menu-list mt-8">
      ${history.map(c => {
        const holder = c.label || holderName;
        const kindLabel = c.card_type === 'family' ? 'عائلية' : 'شخصية';
        const dateStr = c.created_at ? new Date(c.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('ar-SA') : '';
        return `
          <div class="menu-row" style="cursor:default;grid-template-columns:40px 1fr auto auto">
            <span class="ic-wrap">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
            </span>
            <div>
              <div style="font-weight:700;font-size:14px">${holder}</div>
              <div style="font-size:12px;color:var(--ink-3)">${c.brand} •••• ${c.last4} • ${kindLabel}${dateStr ? ' • ' + dateStr : ''}</div>
            </div>
            <span class="badge" style="background:var(--teal-050);color:var(--teal-ink)">مرتبطة</span>
            <button data-delete-card="${c.id}" class="icon-btn" aria-label="حذف البطاقة"
                    style="width:32px;height:32px;background:transparent;color:var(--coral-ink)">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
            </button>
          </div>
        `;
      }).join('')}
    </div>
  ` : '';

  container.innerHTML = tilesHtml + historyHtml;

  // Wire delete buttons on the history list
  container.querySelectorAll('[data-delete-card]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.dataset.deleteCard;
      if (!confirm('حذف هذه البطاقة؟')) return;
      setBusy(btn, true);
      try {
        await api.deleteCard(id);
        state.cards = state.cards.filter(c => c.id !== id);
        renderCards(container);
        toast('تم حذف البطاقة');
      } catch (err) {
        toast(friendlyError(err), 'error');
      } finally {
        setBusy(btn, false);
      }
    });
  });

  // Wire per-card actions
  container.querySelectorAll('[data-activate-card]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!requireAuth('لتفعيل البطاقة، يرجى تسجيل الدخول')) return;
      const type = btn.dataset.activateCard;
      const sheet = document.getElementById('sheet-card');
      if (!sheet) return;
      sheet.dataset.cardType = type;
      sheet.dataset.cardLabel = type === 'family' ? 'بطاقة العائلة' : 'بطاقتي الشخصية';
      // Update the sheet's title so users know what they're linking
      const title = sheet.querySelector('.sheet-title');
      if (title) title.textContent = type === 'family' ? 'تفعيل بطاقة العائلة' : 'تفعيل البطاقة الشخصية';
      openSheet(sheet);
    });
  });

  // The [data-open="recharge"] buttons are picked up by wireRecharge on boot.
  // For cards.html specifically, re-wire them so newly-rendered tiles work.
  container.querySelectorAll('[data-open="recharge"]').forEach(b => {
    b.addEventListener('click', () => {
      if (!requireAuth('لشحن الرصيد، يرجى تسجيل الدخول أولاً')) return;
      const sheet = document.getElementById('sheet-recharge');
      if (sheet) openSheet(sheet);
    });
  });
}

/* ---------- Load packages from server, non-blocking ---------- */
async function loadPackagesFromServer() {
  try {
    const rows = await api.loadPackages();
    if (Array.isArray(rows) && rows.length) {
      PACKAGES = rows;
      const pkgEl = document.querySelector('[data-render="packages"]');
      if (pkgEl) renderPackages(pkgEl);
    }
  } catch (e) {
    console.warn('[packages] fell back to seed:', e?.message || e);
  }
}

function renderEventList(container, opts = {}) {
  if (!container) return;
  const cat = opts.category || 'all';
  const q = (opts.query || '').trim();
  const mult = (opts.multiplier || '').trim();  // e.g. "3X"
  let items = EVENTS.slice();
  if (cat !== 'all') items = items.filter(e => e.category === cat || CATEGORY_LABEL[e.category] === CATEGORIES.find(c => c.key === cat)?.label);
  if (mult) items = items.filter(e => (e.multiplier || '').toUpperCase() === mult.toUpperCase());
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

/* ---------- Helpers: auth-gate (no-op with anon auth), errors, busy state ----------
   With anonymous auth every browser has a session, so requireAuth() always
   returns true. It kicks off ensureAnonSession() defensively in case the
   session was somehow cleared (very rare — the boot flow already does this).
*/
function requireAuth(_message) {
  if (!state.authed) {
    // Session was cleared out from under us — recover silently.
    api.ensureAnonSession().catch(() => {});
  }
  return true;
}

function friendlyError(err) {
  const msg = err?.message || String(err);
  const map = {
    'insufficient_balance': 'الرصيد غير كافٍ',
    'invalid_amount': 'المبلغ غير صحيح',
    'invalid_quantity': 'الكمية غير صحيحة',
    'not_authenticated': 'الرجاء تسجيل الدخول',
    'event_not_found': 'الفعالية غير متاحة',
    'wallet_missing': 'المحفظة غير مهيّأة'
  };
  for (const k of Object.keys(map)) {
    if (msg.includes(k)) return map[k];
  }
  if (msg.includes('Invalid login credentials')) return 'البريد أو كلمة المرور غير صحيحة';
  if (msg.includes('User already registered')) return 'هذا البريد مسجّل مسبقاً — استخدم "تسجيل الدخول"';
  if (msg.includes('Password should be at least')) return 'كلمة المرور 6 أحرف على الأقل';
  if (msg.includes('Email not confirmed')) return 'يرجى تأكيد بريدك أولاً (تحقّق من صندوق الوارد)';
  if (msg.includes('Token has expired') || msg.includes('otp_expired')) return 'انتهت صلاحية الرمز، أعد المحاولة';
  if (msg.includes('rate limit') || msg.includes('over_email_send_rate_limit') || msg.includes('429')) return 'تم تجاوز الحد المسموح — جرّب لاحقاً أو استخدم كلمة المرور';
  if (msg.includes('Unable to validate email') || msg.includes('email_address_invalid')) return 'صيغة البريد غير صحيحة';
  return msg.length < 80 ? msg : 'حدث خطأ، حاول لاحقاً';
}

function setBusy(btn, busy) {
  if (!btn) return;
  if (busy) {
    btn.dataset._label = btn.dataset._label ?? btn.textContent;
    btn.disabled = true;
    btn.style.opacity = '0.7';
  } else {
    btn.disabled = false;
    btn.style.opacity = '';
  }
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
  openBtns.forEach(b => b.addEventListener('click', () => {
    if (!requireAuth('لشحن الرصيد، يرجى تسجيل الدخول أولاً')) return;
    openSheet(sheet);
  }));

  const amounts = sheet.querySelectorAll('.amount');
  const custom = sheet.querySelector('#recharge-custom');
  const confirmBtn = sheet.querySelector('[data-confirm="recharge"]');
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

  confirmBtn.addEventListener('click', async () => {
    if (!value || value < 10) {
      toast('الحد الأدنى للشحن 10 ر.س', 'error');
      return;
    }
    setBusy(confirmBtn, true);
    try {
      const { balance } = await api.rechargeWallet(value);
      state.balance = balance;
      refreshAll();
      closeSheet(sheet);
      toast(`تم شحن ${enDigits(value)} ر.س بنجاح`);
    } catch (e) {
      toast(friendlyError(e), 'error');
    } finally {
      setBusy(confirmBtn, false);
    }
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
    fav.addEventListener('click', async (e) => {
      e.stopPropagation();
      if (!requireAuth('لحفظ الفعالية، يرجى تسجيل الدخول')) return;
      const card = fav.closest('[data-event-id]');
      const id = Number(card.dataset.eventId);
      const isFav = state.favorites.includes(id);
      // optimistic UI
      fav.classList.toggle('on', !isFav);
      fav.innerHTML = !isFav ? ICONS.heartFill : ICONS.heart;
      state.favorites = isFav ? state.favorites.filter(x => x !== id) : [...state.favorites, id];
      try {
        if (isFav) await api.removeFavorite(id);
        else await api.addFavorite(id);
      } catch (err) {
        // rollback
        fav.classList.toggle('on', isFav);
        fav.innerHTML = isFav ? ICONS.heartFill : ICONS.heart;
        state.favorites = isFav ? [...state.favorites, id] : state.favorites.filter(x => x !== id);
        toast(friendlyError(err), 'error');
      }
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
  const confirmBtn = sheet.querySelector('[data-e="confirm"]');

  const decHandler = () => { if (qty > 1) { qty--; rerender(); } };
  const incHandler = () => { if (qty < 8) { qty++; rerender(); } };
  const confirmHandler = async () => {
    if (!requireAuth('للحجز، يرجى تسجيل الدخول أولاً')) return;
    const cost = total();
    if (state.balance < cost) {
      toast('الرصيد غير كافٍ لإتمام الحجز', 'error');
      const row = sheet.querySelector('[data-e="balance-row"]');
      if (row) {
        row.style.borderColor = 'var(--coral-ink)';
        setTimeout(() => { row.style.borderColor = ''; }, 1200);
      }
      return;
    }
    setBusy(confirmBtn, true);
    try {
      const { balance, points, bookingId } = await api.bookEvent(ev.id, qty);
      state.balance = balance;
      state.points = points;
      state.bookings.unshift({
        id: bookingId,
        event_id: ev.id,
        quantity: qty,
        total_paid: cost,
        points_earned: ev.points * qty,
        status: 'confirmed',
        created_at: new Date().toISOString()
      });
      refreshAll();
      closeSheet(sheet);
      toast(`تم الحجز بنجاح • أُضيفت ${enDigits(ev.points * qty)} نقطة`);
    } catch (e) {
      toast(friendlyError(e), 'error');
    } finally {
      setBusy(confirmBtn, false);
    }
  };

  // replace listeners cleanly
  dec.onclick = decHandler;
  inc.onclick = incHandler;
  confirmBtn.onclick = confirmHandler;

  openSheet(sheet);
}

/* ---------- Auth (anonymous-only) ----------
   No sign-in UI. The boot flow ensures every browser has a Supabase session.
   The old "logout" button now resets the demo (new anonymous user + fresh wallet).
*/
function wireAuth() { /* intentionally empty — kept as a hook for future auth */ }

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

/* ---------- Auth-state driven UI ----------
   With anonymous auth there's no traditional login/logout. The old "logout"
   button is repurposed as "reset demo data" — signs out, creates a fresh
   anonymous user, re-hydrates. Handy for demos.
*/
function updateAuthUI() {
  document.querySelectorAll('[data-auth-label]').forEach(el => {
    el.textContent = 'إعادة تعيين البيانات';
  });
  document.querySelectorAll('[data-auth-action]').forEach(btn => {
    btn.onclick = async () => {
      if (!confirm('سيتم إنشاء حساب تجريبي جديد وحذف بياناتك الحالية. المتابعة؟')) return;
      setBusy(btn, true);
      try {
        await api.resetToFreshAnon();
        await hydrateFromServer();
        refreshAll();
        toast('تم إعادة تعيين البيانات');
      } catch (e) {
        toast(friendlyError(e), 'error');
      } finally {
        setBusy(btn, false);
      }
    };
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
  updateAuthUI();
  // Cards page shows live balance/points inside the card visuals, so re-render
  // it whenever state moves (recharge, booking, sign-in, sign-out).
  const cardsEl = document.querySelector('[data-render="cards"]');
  if (cardsEl) renderCards(cardsEl);
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

    <div class="sheet-overlay" id="sheet-package" role="dialog" aria-modal="true" aria-labelledby="pk-title" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <div class="detail-cover" data-p="cover"></div>
        <div class="hstack mt-12" style="justify-content:space-between">
          <span class="tag" data-p="tag">باقة</span>
          <button class="icon-btn" data-close aria-label="إغلاق" style="width:32px;height:32px;background:var(--surface-2)">
            ${ICONS.x}
          </button>
        </div>
        <h3 class="detail-title" id="pk-title" data-p="title">—</h3>
        <div class="detail-sub" data-p="sub">—</div>
        <p class="detail-desc" data-p="desc">—</p>
        <div class="pkg-items-head">تشمل الباقة</div>
        <div class="pkg-items" data-p="items"></div>
        <div class="qty-row">
          <div>
            <div style="font-size:12px;color:var(--ink-3)">عدد المشتركين</div>
            <div style="font-weight:700;margin-top:2px" data-p="price">— ر.س</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-p="dec" aria-label="تقليل">${ICONS.minus}</button>
            <span class="qty-num" data-p="qty">1</span>
            <button class="qty-btn" data-p="inc" aria-label="زيادة">${ICONS.plus}</button>
          </div>
        </div>
        <div class="hstack mt-8" style="justify-content:space-between">
          <span style="color:var(--ink-3);font-size:13px">المجموع</span>
          <span style="font-weight:800" data-p="total">— ر.س</span>
        </div>
        <div class="hstack" style="justify-content:space-between">
          <span style="color:var(--ink-3);font-size:13px">تكسب</span>
          <span style="font-weight:800;color:var(--teal-ink)" data-p="pts-total">+—</span>
        </div>
        <div class="balance-row">
          <span data-p="balance">الرصيد الحالي: <b>—</b></span>
          <button class="btn btn-outline" style="min-height:36px;padding:0 12px" data-open="recharge">شحن</button>
        </div>
        <button class="btn btn-primary btn-block sheet-cta" data-p="confirm">احجز الباقة</button>
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

    <!-- Generic list sheet: reused for tickets, favorites, activity, and static "about" content -->
    <div class="sheet-overlay" id="sheet-list" role="dialog" aria-modal="true" aria-hidden="true">
      <div class="sheet">
        <div class="grip"></div>
        <div class="hstack" style="justify-content:space-between;margin-bottom:8px">
          <h3 class="sheet-title" data-list="title">—</h3>
          <button class="icon-btn" data-close aria-label="إغلاق" style="width:32px;height:32px;background:var(--surface-2)">
            ${ICONS.x}
          </button>
        </div>
        <p class="sheet-sub" data-list="sub">—</p>
        <div data-list="body" class="mt-12"></div>
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

/* ---------- Load events from backend, then re-render pages ---------- */
async function loadEventsFromServer() {
  try {
    const rows = await api.loadEvents();
    if (Array.isArray(rows) && rows.length) {
      EVENTS = rows;
      const popular = document.querySelector('[data-render="popular"]');
      const allEvents = document.querySelector('[data-render="events-list"]');
      const weekStrip = document.querySelector('[data-render="week-strip"]');
      const agenda = document.querySelector('[data-agenda]');
      const cal = document.querySelector('[data-render="calendar"]');
      if (popular) renderPopular(popular);
      if (weekStrip) renderEventsWeekStrip(weekStrip);
      if (cal) renderCalendar(cal);
      if (agenda) renderAgenda(agenda);
      if (allEvents) {
        const q = new URLSearchParams(location.search).get('cat') || 'all';
        renderEventList(allEvents, { category: q });
      }
    }
  } catch (e) {
    console.warn('[events] fell back to offline seed:', e?.message || e);
  }
}

/* ---------- Auth-state driven hydrate ----------
   Ensures every browser has an anonymous session, then hydrates state from
   the backend. First-time visitors get a fresh wallet via the DB trigger.
*/
async function bootAuth() {
  try {
    await api.ensureAnonSession();
    await hydrateFromServer();
    hideAuthErrorBanner();
  } catch (e) {
    const msg = e?.message || String(e);
    console.warn('[bootAuth] failed:', msg);
    setDefaultState();
    if (msg.includes('anonymous_provider_disabled') || msg.includes('Anonymous sign-ins are disabled')) {
      showAuthErrorBanner(
        'تسجيل الدخول التلقائي غير مُفعّل',
        'يجب تفعيل Anonymous Sign-Ins في لوحة تحكم Supabase قبل استخدام الشحن/الحجز/تفعيل البطاقات.'
      );
    } else {
      showAuthErrorBanner(
        'تعذّر الاتصال بالخادم',
        msg.length > 120 ? 'تحقّق من الاتصال بالإنترنت' : msg
      );
    }
  }
  refreshAll();
}

function showAuthErrorBanner(title, subtitle) {
  let el = document.getElementById('azwa-auth-banner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'azwa-auth-banner';
    el.style.cssText = 'position:fixed;top:0;inset-inline:0;z-index:9999;background:#EF5A5A;color:#fff;padding:10px 16px;font-size:13px;font-weight:600;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.15);max-width:480px;margin:0 auto;line-height:1.4';
    document.body.appendChild(el);
  }
  el.innerHTML = `<div>${title}</div><div style="font-weight:500;font-size:12px;opacity:0.95;margin-top:2px">${subtitle}</div>`;
}
function hideAuthErrorBanner() {
  const el = document.getElementById('azwa-auth-banner');
  if (el) el.remove();
}

/* ---------- Boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectSharedSheets();
  highlightNav();
  wireSheetOverlays();
  wireRecharge();
  wireSupportOptions();
  wireGenericOpeners();
  wireAuth();
  wireHiddenReset();
  refreshAll();

  // Kick off backend loads (non-blocking so UI paints immediately from seed)
  loadEventsFromServer();
  loadPackagesFromServer();
  bootAuth();

  // Keep state in sync if the anon session changes (token refresh, reset)
  api.onAuthChange(async (session) => {
    if (session) {
      await hydrateFromServer().catch(() => setDefaultState());
      refreshAll();
    }
  });

  // Page-specific
  const popular = document.querySelector('[data-render="popular"]');
  const cats = document.querySelector('[data-render="nearby-cats"]');
  const allEvents = document.querySelector('[data-render="events-list"]');
  const weekStrip = document.querySelector('[data-render="week-strip"]');
  const cal = document.querySelector('[data-render="calendar"]');
  const agenda = document.querySelector('[data-agenda]');
  const packagesEl = document.querySelector('[data-render="packages"]');
  const cardsEl = document.querySelector('[data-render="cards"]');

  if (popular) renderPopular(popular);
  if (cats) renderNearbyCategories(cats);
  if (weekStrip) renderEventsWeekStrip(weekStrip);
  if (packagesEl) renderPackages(packagesEl);
  if (cardsEl) renderCards(cardsEl);
  if (cal) {
    renderCalendar(cal);
    renderAgenda(agenda);
  }
  if (allEvents) {
    // Events page: chips + search + optional ?mult=NX filter (from home 3X banner)
    const params = new URLSearchParams(location.search);
    let current = params.get('cat') || 'all';
    let mult = params.get('mult') || '';
    let query = '';

    const chips = document.querySelectorAll('[data-filter-cat]');
    const rerender = () => renderEventList(allEvents, { category: current, query, multiplier: mult });

    chips.forEach(c => {
      c.addEventListener('click', () => {
        current = c.dataset.filterCat;
        chips.forEach(x => x.classList.toggle('is-active', x === c));
        rerender();
      });
      if (c.dataset.filterCat === current) c.classList.add('is-active');
    });
    const searchInput = document.querySelector('[data-events-search]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value;
        rerender();
      });
    }

    // If a multiplier filter is active, show a dismissable banner above the list
    if (mult) {
      const banner = document.createElement('div');
      banner.className = 'filter-banner';
      banner.innerHTML = `
        <span class="lbl">تمّت التصفية إلى فعاليات ${mult} نقاط فقط</span>
        <button class="clear" aria-label="إزالة التصفية">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>`;
      allEvents.parentElement?.insertBefore(banner, allEvents);
      banner.querySelector('.clear').addEventListener('click', () => {
        mult = '';
        banner.remove();
        // clean the query string
        const url = new URL(location.href);
        url.searchParams.delete('mult');
        history.replaceState({}, '', url);
        rerender();
      });
    }

    rerender();
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
  wireMoreButtons();
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

  const saveBtn = sheet.querySelector('[data-confirm="profile"]');
  saveBtn.addEventListener('click', async () => {
    const first = sheet.querySelector('#pf-first').value.trim();
    const last = sheet.querySelector('#pf-last').value.trim();
    const email = sheet.querySelector('#pf-email').value.trim();
    const phone = sheet.querySelector('#pf-phone').value.trim();
    if (!first || !last || !email) {
      toast('يرجى تعبئة الحقول المطلوبة', 'error');
      return;
    }
    setBusy(saveBtn, true);
    try {
      await api.updateProfile({
        first_name: first,
        last_name: last,
        phone,
        avatar_url: sheet._tempAvatar || state.user.avatar || null
      });
      state.user.firstName = first;
      state.user.lastName = last;
      state.user.fullName = `${first} ${last}`;
      state.user.email = email; // (email change via auth not implemented for prototype)
      state.user.phone = phone;
      if (sheet._tempAvatar) state.user.avatar = sheet._tempAvatar;
      refreshAll();
      const av = document.querySelector('[data-avatar]');
      if (av) {
        if (state.user.avatar) av.innerHTML = `<img alt="" src="${state.user.avatar}">`;
        else av.textContent = first.charAt(0);
      }
      closeSheet(sheet);
      toast('تم حفظ بياناتك');
    } catch (e) {
      toast(friendlyError(e), 'error');
    } finally {
      setBusy(saveBtn, false);
    }
  });
}

function wireCardLink() {
  const sheet = document.getElementById('sheet-card');
  if (!sheet) return;

  const nameInput = sheet.querySelector('#c-name');

  // Multiple entry points on the page ("wallet" button, "payment methods" row, etc.)
  // Auto-fill the holder name from the profile every time we open, and reset
  // the sheet title if a per-card activation flow hasn't set a custom one.
  document.querySelectorAll('[data-open="link-card"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (nameInput) nameInput.value = state.user.fullName || '';
      if (!sheet.dataset.cardType) {
        const title = sheet.querySelector('.sheet-title');
        if (title) title.textContent = 'ربط بطاقة جديدة';
      }
      openSheet(sheet);
    });
  });

  const saveBtn = sheet.querySelector('[data-confirm="card"]');
  saveBtn.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    const last4 = sheet.querySelector('#c-last4').value.trim();
    if (!name || !/^\d{4}$/.test(last4)) {
      toast('يرجى إدخال بيانات صحيحة', 'error');
      return;
    }
    setBusy(saveBtn, true);
    try {
      const type = sheet.dataset.cardType || 'personal';
      // The label stores the holder name (used for display in the card history).
      const newCard = await api.linkCard({ brand: 'VISA', last4, card_type: type, label: name });
      // Append (keep history — user can now see all cards they've linked).
      state.cards = [...state.cards, newCard];
      // Reset sheet for next open
      delete sheet.dataset.cardType;
      delete sheet.dataset.cardLabel;
      sheet.querySelector('#c-last4').value = '';
      refreshAll();
      const cardsEl = document.querySelector('[data-render="cards"]');
      if (cardsEl) renderCards(cardsEl);
      closeSheet(sheet);
      toast('تمت إضافة البطاقة');
    } catch (e) {
      toast(friendlyError(e), 'error');
    } finally {
      setBusy(saveBtn, false);
    }
  });
}

/* ---------- More-page buttons: tickets, favorites, activity, and stubs ----------
   Anything that can be shown from data we already have (bookings, favorites,
   transactions) opens the shared list sheet. Static-content rows (privacy,
   terms, about, addresses, invite, offers, ratings) open the same sheet with
   a friendly placeholder — they're not real product features yet, but tapping
   them does something instead of being dead.
*/
function wireMoreButtons() {
  document.querySelectorAll('[data-more]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const kind = btn.dataset.more;
      try {
        switch (kind) {
          case 'tickets':      await showTicketsSheet(); break;
          case 'favorites':    await showFavoritesSheet(); break;
          case 'activity':     await showActivitySheet(); break;
          case 'ratings':      showStaticListSheet('التقييمات', 'شارك رأيك في الفعاليات التي حجزتها.', 'لم تُقيّم أي فعالية بعد. بعد أول حجز، ستظهر هنا خيار تقييم التجربة.'); break;
          case 'offers':       showStaticListSheet('عروضي وكوبوناتي', 'الكوبونات المتاحة لك حالياً.', 'لا توجد كوبونات نشطة حالياً. تابع صفحة "الأكثر رواجاً" للحصول على عروض 3X.'); break;
          case 'invite':       await handleInvite(); break;
          case 'addresses':    showStaticListSheet('عناويني', 'العناوين المحفوظة للاستلام والتوصيل.', 'لم تضِف أي عنوان بعد.'); break;
          case 'about':        showStaticListSheet('عن عزوة', 'منصّة عزوة للترفيه والمكافآت.', 'عزوة هي تطبيق تجريبي للترفيه في المملكة، يجمع الحجز والمكافآت في مكان واحد. النسخة الحالية عرض تجريبي — البيانات محلية.'); break;
          case 'language':     showStaticListSheet('اللغة', null, 'اللغة العربية هي اللغة الوحيدة المدعومة حالياً في النسخة التجريبية.'); break;
          case 'privacy':      showStaticListSheet('سياسة الخصوصية', null, 'هذا التطبيق تجريبي. لا تُخزَّن أي بيانات دفع حقيقية. جميع البيانات محفوظة في الخادم الخاص بالنموذج الأولي فقط.'); break;
          case 'terms':        showStaticListSheet('الشروط والأحكام', null, 'باستخدام هذا التطبيق التجريبي، فأنت توافق على أنه للعرض فقط ولا يُنفذ عمليات مالية حقيقية.'); break;
          default: toast('قريباً');
        }
      } catch (e) {
        toast(friendlyError(e), 'error');
      }
    });
  });
}

async function showTicketsSheet() {
  const bookings = await api.loadBookings();
  const body = bookings.length
    ? bookings.map(b => {
        const title = b.event_title || b.package_title || 'حجز';
        const when = b.created_at ? new Date(b.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('ar-SA') : '';
        const kind = b.package_id ? 'باقة' : 'فعالية';
        return `
          <div class="menu-row" style="cursor:default">
            <span class="ic-wrap" style="background:var(--teal-050);color:var(--teal-ink)">${ICONS.ticket}</span>
            <div>
              <div style="font-weight:700;font-size:14px">${title}</div>
              <div style="font-size:12px;color:var(--ink-3)">${kind} • ${b.quantity} × • ${when}</div>
            </div>
            <span style="font-weight:800;font-size:13px">${enDigits(b.total_paid)} <small>ر.س</small></span>
            <span class="badge">+${enDigits(b.points_earned)} نقطة</span>
          </div>`;
      }).join('')
    : `<div class="empty" style="padding:24px 0">${ICONS.ticket}<div>لا توجد تذاكر بعد</div><div style="font-size:12px;color:var(--ink-4);margin-top:4px">اذهب إلى صفحة الفعاليات وابدأ الحجز.</div></div>`;
  openListSheet('تذاكري', `${bookings.length} تذكرة`, `<div class="menu-list">${body}</div>`);
}

async function showFavoritesSheet() {
  const ids = state.favorites;
  const favs = EVENTS.filter(e => ids.includes(e.id));
  const body = favs.length
    ? favs.map(agendaRowHTML).join('')
    : `<div class="empty" style="padding:24px 0">${ICONS.heart}<div>لا توجد فعاليات محفوظة</div><div style="font-size:12px;color:var(--ink-4);margin-top:4px">اضغط على القلب في أي فعالية لحفظها هنا.</div></div>`;
  openListSheet('المفضلة', `${favs.length} فعالية محفوظة`, favs.length ? `<div class="event-list">${body}</div>` : body);
  // Wire the event triggers so tapping a fav opens its detail sheet.
  const list = document.querySelector('[data-list="body"] .event-list');
  if (list) wireEventTriggers(list);
}

async function showActivitySheet() {
  const txns = await api.loadTransactions();
  if (!txns.length) {
    openListSheet('سجل النشاط', '—', `<div class="empty" style="padding:24px 0">${ICONS.history}<div>لا توجد معاملات بعد</div></div>`);
    return;
  }
  const rows = txns.map(t => {
    const when = t.created_at ? new Date(t.created_at.replace(' ', 'T') + 'Z').toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' }) : '';
    const kindLabel = { recharge: 'شحن رصيد', booking: 'حجز', refund: 'استرداد', points_credit: 'إضافة نقاط', points_redeem: 'استبدال نقاط' }[t.kind] || t.kind;
    const isCredit = t.kind === 'recharge' || t.kind === 'points_credit';
    const amountStr = `${isCredit ? '+' : '−'}${enDigits(t.amount)} ر.س`;
    const color = isCredit ? 'var(--teal-ink)' : 'var(--coral-ink)';
    const pts = t.points_delta ? `<span class="badge" style="background:var(--teal-050);color:var(--teal-ink)">+${enDigits(t.points_delta)} نقطة</span>` : '';
    return `
      <div class="menu-row" style="cursor:default">
        <span class="ic-wrap">${isCredit ? ICONS.wallet : ICONS.ticket}</span>
        <div>
          <div style="font-weight:700;font-size:14px">${kindLabel}</div>
          <div style="font-size:12px;color:var(--ink-3)">${when}</div>
        </div>
        <span style="font-weight:800;font-size:13px;color:${color}">${amountStr}</span>
        ${pts}
      </div>`;
  }).join('');
  openListSheet('سجل النشاط', `${txns.length} عملية`, `<div class="menu-list">${rows}</div>`);
}

function showStaticListSheet(title, sub, bodyText) {
  openListSheet(title, sub, `<div style="padding:12px 4px;line-height:1.7;color:var(--ink-2);font-size:14px">${bodyText}</div>`);
}

async function handleInvite() {
  const link = location.origin + '/index.html';
  const msg = `تعرف على تطبيق عزوة للترفيه والمكافآت! ${link}`;
  if (navigator.share) {
    try { await navigator.share({ title: 'عزوة', text: msg, url: link }); return; }
    catch { /* user cancelled */ }
  }
  try {
    await navigator.clipboard.writeText(link);
    toast('تم نسخ الرابط للحافظة');
  } catch {
    showStaticListSheet('دعوة الأصدقاء', 'شارك هذا الرابط مع أصدقائك.', link);
  }
}

function openListSheet(title, sub, bodyHtml) {
  const sheet = document.getElementById('sheet-list');
  if (!sheet) return;
  sheet.querySelector('[data-list="title"]').textContent = title;
  const subEl = sheet.querySelector('[data-list="sub"]');
  if (sub) { subEl.textContent = sub; subEl.style.display = ''; }
  else     { subEl.style.display = 'none'; }
  sheet.querySelector('[data-list="body"]').innerHTML = bodyHtml;
  openSheet(sheet);
}

function wireToggles() {
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => {
      const on = t.getAttribute('aria-checked') === 'true';
      t.setAttribute('aria-checked', String(!on));
      const key = t.dataset.toggle;
      if (key === 'notifications') state.notifications = !on;
    });
    if (t.dataset.toggle === 'notifications') {
      t.setAttribute('aria-checked', String(!!state.notifications));
    }
  });
}
