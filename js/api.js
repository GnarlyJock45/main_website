// Azwa | Backend wrapper (Flask + SQLite)
//
// Same export surface as before (loadWallet, rechargeWallet, bookEvent, ...)
// so app.js needs zero changes. Under the hood every call is now `fetch` to
// the Flask API. User identity is a browser-generated UUID persisted in
// localStorage and sent as `X-User-Id` on every request.

import { BACKEND_URL } from './config.js';

// --------------------------------------------------------------------------
// Local identity
// --------------------------------------------------------------------------
const USER_ID_KEY = 'azwa.user_id';

function newUuid() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  // fallback (RFC4122 v4)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = newUuid();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

function clearUserId() {
  localStorage.removeItem(USER_ID_KEY);
}

// --------------------------------------------------------------------------
// HTTP helper
// --------------------------------------------------------------------------
async function request(path, { method = 'GET', body, headers } = {}) {
  const opts = {
    method,
    headers: {
      'Accept': 'application/json',
      'X-User-Id': getUserId(),
      ...(body != null ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
  };
  let res;
  try {
    res = await fetch(BACKEND_URL + path, opts);
  } catch (netErr) {
    throw new ApiError('network_error: ' + (netErr?.message || 'fetch failed'));
  }
  const text = await res.text();
  let data = null;
  if (text) {
    try { data = JSON.parse(text); } catch { /* keep raw */ }
  }
  if (!res.ok) {
    const msg = (data && data.error) || `HTTP ${res.status}`;
    throw new ApiError(msg, res.status);
  }
  return data;
}

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// --------------------------------------------------------------------------
// Auth-ish shims (kept for compatibility with app.js)
// --------------------------------------------------------------------------

// No real "session" object — we synthesize one so callers can check truthiness.
async function fakeSession() {
  return { user: { id: getUserId(), is_anonymous: true } };
}

export async function getSession() {
  return fakeSession();
}

// Called on boot. Provisions profile/wallet/card on the server (idempotent)
// and returns whatever the server sent back.
export async function ensureAnonSession() {
  await request('/api/session/init', { method: 'POST' });
  return fakeSession();
}

// Reset button: wipes this browser's data on the server, gives it a new UUID.
export async function resetToFreshAnon() {
  try { await request('/api/session/reset', { method: 'POST' }); } catch {}
  clearUserId();                        // brand new identity
  await request('/api/session/init', { method: 'POST' });  // provision it
  return fakeSession();
}

// No real auth events, but app.js registers a callback. Call it once with the
// current (fake) session so any state that depends on it can hydrate.
export function onAuthChange(cb) {
  fakeSession().then(cb);
  return () => {}; // unsubscribe no-op
}

// Kept for imports that reference `api.supabase.auth.getUser()`. Returns a
// minimal shape compatible with the two call sites in app.js.
export const supabase = {
  auth: {
    async getUser() {
      return { data: { user: { id: getUserId(), email: '' } } };
    },
    async getSession() {
      return { data: { session: await fakeSession() } };
    },
  },
};

// --------------------------------------------------------------------------
// Profile
// --------------------------------------------------------------------------
export async function loadProfile() {
  return request('/api/profile');
}

export async function updateProfile(patch) {
  // patch keys mirror the columns: first_name, last_name, phone, avatar_url
  return request('/api/profile', { method: 'PATCH', body: patch });
}

// --------------------------------------------------------------------------
// Wallet
// --------------------------------------------------------------------------
export async function loadWallet() {
  const w = await request('/api/wallet');
  return { balance: Number(w.balance), points: Number(w.points) };
}

// --------------------------------------------------------------------------
// Cards
// --------------------------------------------------------------------------
export async function loadCards() {
  return request('/api/cards');
}

export async function loadCard() {
  const cards = await loadCards();
  return cards.find(c => c.card_type === 'personal') || cards[0] || null;
}

export async function linkCard({ brand = 'VISA', last4, card_type = 'personal', label = null }) {
  return request('/api/cards', {
    method: 'POST',
    body: { brand, last4, card_type, label },
  });
}

export async function updateCard(cardId, patch) {
  return request('/api/cards/' + encodeURIComponent(cardId), {
    method: 'PATCH',
    body: patch,
  });
}

export async function deleteCard(cardId) {
  return request('/api/cards/' + encodeURIComponent(cardId), { method: 'DELETE' });
}

// --------------------------------------------------------------------------
// Events
// --------------------------------------------------------------------------
export async function loadEvents() {
  const rows = await request('/api/events');
  return rows.map(normalizeEvent);
}

function normalizeEvent(row) {
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    category: row.category,
    date: row.event_date,           // 'YYYY-MM-DD'
    time: row.event_time,
    venue: row.venue,
    district: row.district,
    distanceKm: row.distance_km != null ? Number(row.distance_km) : null,
    price: Number(row.price),
    points: row.points,
    multiplier: row.multiplier,
    image: row.image_url,
    imagePos: row.image_pos,
    desc: row.description,
    popular: !!row.popular,
    nearby: !!row.nearby,
    mapQuery: row.map_query,
  };
}

// --------------------------------------------------------------------------
// Favorites
// --------------------------------------------------------------------------
export async function loadFavorites() {
  return request('/api/favorites');
}

export async function addFavorite(eventId) {
  return request('/api/favorites/' + encodeURIComponent(eventId), { method: 'POST' });
}

export async function removeFavorite(eventId) {
  return request('/api/favorites/' + encodeURIComponent(eventId), { method: 'DELETE' });
}

// --------------------------------------------------------------------------
// Bookings
// --------------------------------------------------------------------------
export async function loadBookings() {
  return request('/api/bookings');
}

export async function loadTransactions() {
  return request('/api/transactions');
}

// --------------------------------------------------------------------------
// Packages
// --------------------------------------------------------------------------
export async function loadPackages() {
  const rows = await request('/api/packages');
  return rows.map(normalizePackage);
}

function normalizePackage(row) {
  const items = (row.items || [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map(i => i.event_id);
  return {
    id: row.id,
    titleAr: row.title_ar,
    titleEn: row.title_en,
    desc: row.description,
    price: Number(row.price),
    points: row.points,
    multiplier: row.multiplier,
    image: row.image_url,
    imagePos: row.image_pos,
    coverCategory: row.cover_category,
    region: row.region,
    popular: !!row.popular,
    eventIds: items,
  };
}

// --------------------------------------------------------------------------
// RPCs (atomic writes on the server)
// --------------------------------------------------------------------------
export async function rechargeWallet(amount) {
  const { new_balance } = await request('/api/rpc/recharge', {
    method: 'POST',
    body: { amount },
  });
  return { balance: Number(new_balance) };
}

// paymentMethod: 'balance' (default) or 'points'
export async function bookEvent(eventId, quantity, paymentMethod = 'balance') {
  const r = await request('/api/rpc/book_event', {
    method: 'POST',
    body: { event_id: eventId, quantity, payment_method: paymentMethod },
  });
  return {
    bookingId: r.booking_id,
    balance: Number(r.new_balance),
    points: Number(r.new_points),
  };
}

// Cancel a booking (refund). Returns the updated wallet + refund amounts.
export async function cancelBooking(bookingId) {
  const r = await request('/api/rpc/cancel_booking', {
    method: 'POST',
    body: { booking_id: bookingId },
  });
  return {
    balance: Number(r.new_balance),
    points: Number(r.new_points),
    refundedAmount: Number(r.refunded_amount || 0),
    refundedPoints: Number(r.refunded_points || 0),
  };
}

export async function bookPackage(packageId, quantity, paymentMethod = 'balance') {
  const r = await request('/api/rpc/book_package', {
    method: 'POST',
    body: { package_id: packageId, quantity, payment_method: paymentMethod },
  });
  return {
    bookingId: r.booking_id,
    balance: Number(r.new_balance),
    points: Number(r.new_points),
  };
}
