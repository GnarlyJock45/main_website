"""
Azwa | Flask backend

Single-file Flask app that replaces the Supabase backend. Uses SQLite for
storage and identifies users by an X-User-Id header (a UUID the browser
generates and stores in localStorage). No passwords, no email — anonymous
identity is enough for a hackathon prototype.

Endpoints:
    GET    /api/health
    POST   /api/session/init
    POST   /api/session/reset

    GET    /api/profile
    PATCH  /api/profile

    GET    /api/wallet

    GET    /api/cards
    POST   /api/cards
    PATCH  /api/cards/<card_id>
    DELETE /api/cards/<card_id>

    GET    /api/events
    GET    /api/packages

    GET    /api/favorites
    POST   /api/favorites/<event_id>
    DELETE /api/favorites/<event_id>

    GET    /api/bookings

    POST   /api/rpc/recharge         { amount }
    POST   /api/rpc/book_event       { event_id, quantity }
    POST   /api/rpc/book_package     { package_id, quantity }

Run locally:
    pip install -r requirements.txt
    python app.py            # dev server on :5000

Deploy (Render):
    gunicorn app:app --bind 0.0.0.0:$PORT
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path
from threading import Lock

from flask import Flask, g, jsonify, request, send_from_directory, abort
from flask_cors import CORS

# --------------------------------------------------------------------------- #
# Config
# --------------------------------------------------------------------------- #

BASE_DIR = Path(__file__).parent
# The frontend lives one level up (repo root), assuming Render's "Root Directory"
# is set to "backend" (so the whole repo is at BASE_DIR.parent).
FRONTEND_DIR = BASE_DIR.parent

DB_PATH_ENV = os.environ.get("AZWA_DB_PATH")
# Fallback chain: env var (if set and writable) → alongside app.py → /tmp.
# Resolved lazily so we can log which one we picked.
DB_PATH: Path  # populated by init_db_if_needed()
SCHEMA_PATH = BASE_DIR / "schema.sql"
SEED_PATH = BASE_DIR / "seed.sql"

# One-time init lock (in case gunicorn spawns multiple workers concurrently).
_init_lock = Lock()
_initialized = False


# --------------------------------------------------------------------------- #
# DB helpers
# --------------------------------------------------------------------------- #

def get_db() -> sqlite3.Connection:
    if "db" not in g:
        conn = sqlite3.connect(DB_PATH, isolation_level=None)  # autocommit; use explicit BEGIN
        conn.row_factory = sqlite3.Row
        conn.execute("pragma foreign_keys = on")
        conn.execute("pragma journal_mode = wal")
        g.db = conn
    return g.db


def close_db(_exc=None):
    conn = g.pop("db", None)
    if conn is not None:
        conn.close()


def _pick_writable_db_path() -> Path:
    """Try each candidate DB path in order; return the first one we can
    actually create + open. Logs the choice so it's visible in Render logs."""
    candidates: list[Path] = []
    if DB_PATH_ENV:
        candidates.append(Path(DB_PATH_ENV))
    candidates.append(BASE_DIR / "azwa.db")   # next to app.py
    candidates.append(Path("/tmp/azwa.db"))   # always writable on Render/Linux

    for p in candidates:
        try:
            p.parent.mkdir(parents=True, exist_ok=True)
            # Touch+open to prove we can actually write here
            conn = sqlite3.connect(p, isolation_level=None)
            conn.close()
            print(f"[azwa] using DB path: {p}", flush=True)
            return p
        except Exception as e:  # OperationalError, PermissionError, OSError, ...
            print(f"[azwa] DB path unusable {p}: {e}", flush=True)
            continue
    # If we get here every candidate failed — surface the real error.
    raise RuntimeError(f"no writable DB path among: {candidates}")


def init_db_if_needed():
    """Runs schema (idempotent) and seeds if the events table is empty."""
    global _initialized, DB_PATH
    with _init_lock:
        if _initialized:
            return
        DB_PATH = _pick_writable_db_path()
        conn = sqlite3.connect(DB_PATH, isolation_level=None)
        conn.execute("pragma foreign_keys = on")
        try:
            conn.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
            cnt = conn.execute("select count(*) from events").fetchone()[0]
            if cnt == 0:
                conn.executescript(SEED_PATH.read_text(encoding="utf-8"))
                print(f"[azwa] seeded fresh DB with events + packages", flush=True)
        finally:
            conn.close()
        _initialized = True


# --------------------------------------------------------------------------- #
# App factory
# --------------------------------------------------------------------------- #

app = Flask(__name__)
# Permissive CORS for the prototype. Tighten in production.
CORS(app, resources={r"/api/*": {"origins": "*"}},
     supports_credentials=False, allow_headers=["Content-Type", "X-User-Id"])

app.teardown_appcontext(close_db)


@app.before_request
def _ensure_db():
    init_db_if_needed()


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #

UUID_RE = re.compile(r"^[0-9a-fA-F-]{36}$")


def new_uuid() -> str:
    return str(uuid.uuid4())


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def bad(msg: str, code: int = 400):
    return jsonify({"error": msg}), code


def current_user_id() -> str | None:
    uid = request.headers.get("X-User-Id", "").strip()
    return uid if UUID_RE.match(uid or "") else None


def require_user() -> str:
    """Returns the user id or aborts with a 401.

    If the caller supplies a well-formed UUID but the user isn't in the DB yet,
    we lazily provision them (idempotent). This matches the Supabase behavior
    where the auth trigger auto-created profile+wallet+card on first login.
    """
    uid = current_user_id()
    if not uid:
        raise ApiError("missing or invalid X-User-Id header", 401)
    ensure_user_exists(uid)
    return uid


class ApiError(Exception):
    def __init__(self, msg: str, code: int = 400):
        super().__init__(msg)
        self.msg = msg
        self.code = code


@app.errorhandler(ApiError)
def _api_error(err: ApiError):
    return jsonify({"error": err.msg}), err.code


DEFAULT_FIRST_NAME = "أحمد"
DEFAULT_LAST_NAME = "العتيبي"


def ensure_user_exists(uid: str) -> None:
    """Idempotent: create profile + wallet + default card the first time we see a user id."""
    db = get_db()
    row = db.execute("select 1 from profiles where id = ?", (uid,)).fetchone()
    if row:
        return
    with db:  # transaction
        db.execute("BEGIN")
        try:
            db.execute(
                "insert into profiles (id, first_name, last_name) values (?, ?, ?)",
                (uid, DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME),
            )
            db.execute(
                "insert into wallets (user_id, balance, points) values (?, 250.00, 500)",
                (uid,),
            )
            # Default personal card with the user's name as the label
            db.execute(
                """insert into cards (id, user_id, brand, last4, linked, card_type, label)
                   values (?, ?, 'VISA', '5678', 1, 'personal', ?)""",
                (new_uuid(), uid, f"{DEFAULT_FIRST_NAME} {DEFAULT_LAST_NAME}"),
            )
            db.execute("COMMIT")
        except Exception:
            db.execute("ROLLBACK")
            raise


def row_to_dict(row: sqlite3.Row | None) -> dict | None:
    if row is None:
        return None
    return {k: row[k] for k in row.keys()}


# --------------------------------------------------------------------------- #
# Endpoints
# --------------------------------------------------------------------------- #

@app.get("/api/health")
def health():
    return {"ok": True, "time": now_iso()}


# ---------- Frontend static serving ----------
# Serves the HTML/CSS/JS/assets from the repo root (one level above this
# file). Lets a single Render service host both the API and the site so
# users only need one URL.

# Files at the frontend root the browser might ask for by exact name.
_FRONTEND_PAGES = {"index.html", "cards.html", "calendar.html",
                   "events.html", "map.html", "more.html"}
# Directories under the repo root that hold static assets.
_STATIC_DIRS = ("assets", "images", "js", "css")


def _serve_frontend(rel: str):
    """Send a file from FRONTEND_DIR, but only if it exists and is a real file
    (prevents directory traversal + accidentally serving app.py)."""
    if not rel:
        rel = "index.html"
    full = (FRONTEND_DIR / rel).resolve()
    try:
        full.relative_to(FRONTEND_DIR.resolve())
    except ValueError:
        abort(404)
    if not full.is_file():
        abort(404)
    return send_from_directory(FRONTEND_DIR, rel)


@app.get("/")
def index():
    return _serve_frontend("index.html")


@app.get("/<path:filename>")
def frontend_file(filename: str):
    # Only serve known top-level pages or files under whitelisted static dirs.
    if filename in _FRONTEND_PAGES:
        return _serve_frontend(filename)
    top = filename.split("/", 1)[0]
    if top in _STATIC_DIRS:
        return _serve_frontend(filename)
    abort(404)


@app.errorhandler(500)
def _internal_error(err):
    """Return a JSON body instead of the default HTML error page — makes
    it easier to see what's wrong from a browser or a curl call."""
    return jsonify({
        "error": "internal_error",
        "message": str(err),
    }), 500


@app.errorhandler(404)
def _not_found(_err):
    return jsonify({
        "error": "not_found",
        "message": "Unknown path. Frontend pages: /, /cards.html, /events.html, /map.html, /calendar.html, /more.html. API: /api/*."
    }), 404


# ---------- Session ----------

@app.post("/api/session/init")
def session_init():
    """Provisions the user (idempotent) and returns their identity + wallet.
    The browser calls this on every page load to make sure the row exists."""
    uid = require_user()
    return _load_bootstrap(uid)


@app.post("/api/session/reset")
def session_reset():
    """Wipes this user's data. Called by the "reset demo" button."""
    uid = current_user_id()
    if not uid:
        return bad("missing X-User-Id", 401)
    db = get_db()
    with db:
        db.execute("BEGIN")
        try:
            db.execute("delete from profiles where id = ?", (uid,))  # cascade takes wallets, cards, bookings, etc.
            db.execute("COMMIT")
        except Exception:
            db.execute("ROLLBACK")
            raise
    # Re-provision fresh so the caller can continue immediately
    ensure_user_exists(uid)
    return _load_bootstrap(uid)


def _load_bootstrap(uid: str) -> dict:
    db = get_db()
    profile = row_to_dict(db.execute(
        "select id, first_name, last_name, phone, avatar_url, verified from profiles where id = ?",
        (uid,)).fetchone())
    wallet = row_to_dict(db.execute(
        "select balance, points from wallets where user_id = ?", (uid,)).fetchone())
    cards = [row_to_dict(r) for r in db.execute(
        """select id, brand, last4, linked, card_type, label, created_at
           from cards where user_id = ? order by created_at""", (uid,)).fetchall()]
    return jsonify({"profile": profile, "wallet": wallet, "cards": cards})


# ---------- Profile ----------

@app.get("/api/profile")
def profile_get():
    uid = require_user()
    row = row_to_dict(get_db().execute(
        "select id, first_name, last_name, phone, avatar_url, verified from profiles where id = ?",
        (uid,)).fetchone())
    return jsonify(row)


@app.patch("/api/profile")
def profile_patch():
    uid = require_user()
    body = request.get_json(silent=True) or {}
    fields = {}
    for k in ("first_name", "last_name", "phone", "avatar_url"):
        if k in body:
            fields[k] = body[k]
    if not fields:
        return bad("no valid fields")
    sets = ", ".join(f"{k} = ?" for k in fields) + ", updated_at = ?"
    params = list(fields.values()) + [now_iso(), uid]
    get_db().execute(f"update profiles set {sets} where id = ?", params)
    return {"ok": True}


# ---------- Wallet ----------

@app.get("/api/wallet")
def wallet_get():
    uid = require_user()
    row = row_to_dict(get_db().execute(
        "select balance, points from wallets where user_id = ?", (uid,)).fetchone())
    return jsonify(row)


# ---------- Cards ----------

@app.get("/api/cards")
def cards_list():
    uid = require_user()
    rows = [row_to_dict(r) for r in get_db().execute(
        """select id, brand, last4, linked, card_type, label, created_at
           from cards where user_id = ? order by created_at""", (uid,)).fetchall()]
    return jsonify(rows)


@app.post("/api/cards")
def cards_link():
    uid = require_user()
    body = request.get_json(silent=True) or {}
    last4 = str(body.get("last4", "")).strip()
    if not re.fullmatch(r"\d{4}", last4):
        return bad("last4 must be 4 digits")
    brand = str(body.get("brand") or "VISA")
    card_type = str(body.get("card_type") or "personal")
    label = body.get("label")
    cid = new_uuid()
    get_db().execute(
        """insert into cards (id, user_id, brand, last4, linked, card_type, label)
           values (?, ?, ?, ?, 1, ?, ?)""",
        (cid, uid, brand, last4, card_type, label))
    row = row_to_dict(get_db().execute(
        """select id, brand, last4, linked, card_type, label, created_at
           from cards where id = ?""", (cid,)).fetchone())
    return jsonify(row), 201


@app.patch("/api/cards/<card_id>")
def cards_update(card_id: str):
    uid = require_user()
    body = request.get_json(silent=True) or {}
    allowed = {"brand", "last4", "linked", "card_type", "label"}
    fields = {k: v for k, v in body.items() if k in allowed}
    if not fields:
        return bad("no valid fields")
    sets = ", ".join(f"{k} = ?" for k in fields)
    params = list(fields.values()) + [card_id, uid]
    cur = get_db().execute(
        f"update cards set {sets} where id = ? and user_id = ?", params)
    if cur.rowcount == 0:
        return bad("card not found", 404)
    row = row_to_dict(get_db().execute(
        """select id, brand, last4, linked, card_type, label, created_at
           from cards where id = ?""", (card_id,)).fetchone())
    return jsonify(row)


@app.delete("/api/cards/<card_id>")
def cards_delete(card_id: str):
    uid = require_user()
    cur = get_db().execute(
        "delete from cards where id = ? and user_id = ?", (card_id, uid))
    if cur.rowcount == 0:
        return bad("card not found", 404)
    return {"ok": True}


# ---------- Events ----------

@app.get("/api/events")
def events_list():
    rows = [row_to_dict(r) for r in get_db().execute(
        "select * from events order by event_date").fetchall()]
    # Normalize booleans (SQLite stores them as 0/1)
    for r in rows:
        r["popular"] = bool(r["popular"])
        r["nearby"] = bool(r["nearby"])
    return jsonify(rows)


# ---------- Packages ----------

@app.get("/api/packages")
def packages_list():
    db = get_db()
    packages = [row_to_dict(r) for r in db.execute(
        """select id, title_ar, title_en, description, price, points, multiplier,
                  image_url, image_pos, cover_category, region, popular, created_at
           from packages order by created_at""").fetchall()]
    # Fetch all items in one query, then group
    items = db.execute(
        "select package_id, event_id, position from package_items order by package_id, position"
    ).fetchall()
    by_pkg: dict[int, list[dict]] = {}
    for r in items:
        by_pkg.setdefault(r["package_id"], []).append(
            {"event_id": r["event_id"], "position": r["position"]})
    for p in packages:
        p["popular"] = bool(p["popular"])
        p["items"] = by_pkg.get(p["id"], [])
    return jsonify(packages)


# ---------- Favorites ----------

@app.get("/api/favorites")
def favorites_list():
    uid = require_user()
    rows = get_db().execute(
        "select event_id from favorites where user_id = ?", (uid,)).fetchall()
    return jsonify([r["event_id"] for r in rows])


@app.post("/api/favorites/<int:event_id>")
def favorites_add(event_id: int):
    uid = require_user()
    try:
        get_db().execute(
            "insert into favorites (user_id, event_id) values (?, ?)",
            (uid, event_id))
    except sqlite3.IntegrityError:
        pass  # already favorited, or event doesn't exist — treat as OK
    return {"ok": True}


@app.delete("/api/favorites/<int:event_id>")
def favorites_remove(event_id: int):
    uid = require_user()
    get_db().execute(
        "delete from favorites where user_id = ? and event_id = ?",
        (uid, event_id))
    return {"ok": True}


# ---------- Bookings ----------

@app.get("/api/bookings")
def bookings_list():
    uid = require_user()
    rows = [row_to_dict(r) for r in get_db().execute(
        """select b.id, b.event_id, b.package_id, b.quantity, b.total_paid,
                  b.points_earned, b.status, b.created_at,
                  e.title_ar as event_title, p.title_ar as package_title
           from bookings b
           left join events   e on e.id = b.event_id
           left join packages p on p.id = b.package_id
           where b.user_id = ? order by b.created_at desc""",
        (uid,)).fetchall()]
    return jsonify(rows)


# ---------- Transactions (activity log) ----------

@app.get("/api/transactions")
def transactions_list():
    uid = require_user()
    rows = [row_to_dict(r) for r in get_db().execute(
        """select id, kind, amount, points_delta, ref_booking_id, meta, created_at
           from transactions
           where user_id = ? order by created_at desc""",
        (uid,)).fetchall()]
    # meta is stored as JSON text; deserialize for convenience
    for r in rows:
        try:
            r["meta"] = json.loads(r.get("meta") or "{}")
        except Exception:
            r["meta"] = {}
    return jsonify(rows)


# ---------- RPCs (atomic wallet mutations) ----------

@app.post("/api/rpc/recharge")
def rpc_recharge():
    uid = require_user()
    body = request.get_json(silent=True) or {}
    try:
        amount = float(body.get("amount"))
    except (TypeError, ValueError):
        return bad("invalid amount")
    if amount < 10 or amount > 10_000:
        return bad("invalid_amount")

    db = get_db()
    with db:
        db.execute("BEGIN")
        try:
            db.execute(
                "update wallets set balance = balance + ?, updated_at = ? where user_id = ?",
                (amount, now_iso(), uid))
            db.execute(
                """insert into transactions (id, user_id, kind, amount, meta)
                   values (?, ?, 'recharge', ?, ?)""",
                (new_uuid(), uid, amount, json.dumps({"source": "alinma"})))
            row = db.execute(
                "select balance from wallets where user_id = ?", (uid,)).fetchone()
            db.execute("COMMIT")
        except Exception:
            db.execute("ROLLBACK")
            raise
    return jsonify({"new_balance": row["balance"]})


# 1 SAR = 10 points (matches the "تعادل X ر.س" hint on the wallet card).
POINTS_PER_SAR = 10


def _validate_method(m):
    return m if m in ("balance", "points") else None


def _do_booking(uid, quantity, method, sar_price, points_per_unit,
                event_id=None, package_id=None):
    """Shared logic for booking an event OR a package. Returns a Flask response.
    - balance mode: charges SAR from wallet, credits earned points
    - points mode: charges (price × qty × 10) points, no new points earned
    """
    total_sar = float(sar_price) * quantity
    total_points_cost = int(round(total_sar * POINTS_PER_SAR))
    earned = int(points_per_unit) * quantity if method == "balance" else 0

    db = get_db()
    with db:
        db.execute("BEGIN IMMEDIATE")
        try:
            wallet = db.execute(
                "select balance, points from wallets where user_id = ?", (uid,)).fetchone()
            if not wallet:
                db.execute("ROLLBACK")
                return bad("wallet_missing", 500)

            if method == "balance":
                if float(wallet["balance"]) < total_sar:
                    db.execute("ROLLBACK")
                    return bad("insufficient_balance", 400)
                db.execute(
                    """update wallets set balance = balance - ?,
                                         points  = points  + ?,
                                         updated_at = ?
                       where user_id = ?""",
                    (total_sar, earned, now_iso(), uid))
                txn_kind = "booking"
                txn_amount = total_sar          # what was charged
                txn_points_delta = earned       # what was earned
            else:  # points
                if int(wallet["points"]) < total_points_cost:
                    db.execute("ROLLBACK")
                    return bad("insufficient_points", 400)
                db.execute(
                    """update wallets set points = points - ?,
                                         updated_at = ?
                       where user_id = ?""",
                    (total_points_cost, now_iso(), uid))
                txn_kind = "points_redeem"
                txn_amount = 0                  # no money moved
                txn_points_delta = -total_points_cost

            booking_id = new_uuid()
            # For a points booking, total_paid=0 (nothing charged in SAR).
            recorded_paid = total_sar if method == "balance" else 0.0
            db.execute(
                """insert into bookings (id, user_id, event_id, package_id, quantity,
                                        total_paid, points_earned)
                   values (?, ?, ?, ?, ?, ?, ?)""",
                (booking_id, uid, event_id, package_id, quantity, recorded_paid, earned))
            meta = {"qty": quantity, "method": method}
            if event_id is not None:   meta["event_id"] = event_id
            if package_id is not None: meta["package_id"] = package_id
            if method == "points":     meta["points_spent"] = total_points_cost
            db.execute(
                """insert into transactions (id, user_id, kind, amount, points_delta,
                                            ref_booking_id, meta)
                   values (?, ?, ?, ?, ?, ?, ?)""",
                (new_uuid(), uid, txn_kind, txn_amount, txn_points_delta,
                 booking_id, json.dumps(meta)))
            new_row = db.execute(
                "select balance, points from wallets where user_id = ?", (uid,)).fetchone()
            db.execute("COMMIT")
        except Exception:
            db.execute("ROLLBACK")
            raise
    return jsonify({
        "booking_id": booking_id,
        "new_balance": new_row["balance"],
        "new_points": new_row["points"],
    })


@app.post("/api/rpc/book_event")
def rpc_book_event():
    uid = require_user()
    body = request.get_json(silent=True) or {}
    try:
        event_id = int(body.get("event_id"))
        quantity = int(body.get("quantity"))
    except (TypeError, ValueError):
        return bad("invalid parameters")
    if not (1 <= quantity <= 20):
        return bad("invalid_quantity")
    method = _validate_method(body.get("payment_method") or "balance")
    if not method:
        return bad("invalid_payment_method")

    event = get_db().execute(
        "select price, points from events where id = ?", (event_id,)).fetchone()
    if not event:
        return bad("event_not_found", 404)

    return _do_booking(uid, quantity, method,
                       sar_price=event["price"], points_per_unit=event["points"],
                       event_id=event_id)


@app.post("/api/rpc/book_package")
def rpc_book_package():
    uid = require_user()
    body = request.get_json(silent=True) or {}
    try:
        package_id = int(body.get("package_id"))
        quantity = int(body.get("quantity"))
    except (TypeError, ValueError):
        return bad("invalid parameters")
    if not (1 <= quantity <= 20):
        return bad("invalid_quantity")
    method = _validate_method(body.get("payment_method") or "balance")
    if not method:
        return bad("invalid_payment_method")

    pkg = get_db().execute(
        "select price, points from packages where id = ?", (package_id,)).fetchone()
    if not pkg:
        return bad("package_not_found", 404)

    return _do_booking(uid, quantity, method,
                       sar_price=pkg["price"], points_per_unit=pkg["points"],
                       package_id=package_id)


# --------------------------------------------------------------------------- #
# Local dev entrypoint
# --------------------------------------------------------------------------- #

if __name__ == "__main__":
    init_db_if_needed()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
