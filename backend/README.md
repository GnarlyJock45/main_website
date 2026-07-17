# Azwa backend (Flask + SQLite)

Single-file Flask app that provides the backend for the Azwa prototype.
Uses SQLite for storage — no external database service required.

## Endpoints

All endpoints require an `X-User-Id` header (any UUID). The user is auto-provisioned
on first request (profile, wallet with 250 SAR + 500 pts, and a default card).

| Method | Path                          | Purpose                            |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/api/health`                 | Health check                       |
| POST   | `/api/session/init`           | Ensure user exists; returns bootstrap payload |
| POST   | `/api/session/reset`          | Wipe user's data, re-provision fresh |
| GET    | `/api/profile`                | Load profile                       |
| PATCH  | `/api/profile`                | Update `first_name`, `last_name`, `phone`, `avatar_url` |
| GET    | `/api/wallet`                 | `{ balance, points }`              |
| GET    | `/api/cards`                  | List cards                         |
| POST   | `/api/cards`                  | Link a new card `{ brand, last4, card_type, label }` |
| PATCH  | `/api/cards/<id>`             | Update card fields                 |
| DELETE | `/api/cards/<id>`             | Delete card                        |
| GET    | `/api/events`                 | Public catalog                     |
| GET    | `/api/packages`               | Packages + their items             |
| GET    | `/api/favorites`              | List of event IDs                  |
| POST   | `/api/favorites/<event_id>`   | Add favorite                       |
| DELETE | `/api/favorites/<event_id>`   | Remove favorite                    |
| GET    | `/api/bookings`               | User's bookings                    |
| POST   | `/api/rpc/recharge`           | Body: `{ amount }`  → `{ new_balance }` |
| POST   | `/api/rpc/book_event`         | Body: `{ event_id, quantity }`     |
| POST   | `/api/rpc/book_package`       | Body: `{ package_id, quantity }`   |

The three `/api/rpc/*` endpoints are transactional (atomic on SQLite via `BEGIN IMMEDIATE`).

## Run locally

```
cd backend
pip install -r requirements.txt
python app.py         # http://localhost:5000
```

The DB file `azwa.db` is created next to `app.py` on first run and seeded from
`seed.sql` (8 events + 3 packages). Delete the file to start fresh.

## Deploy to Render (free tier)

1. Push this repository (or just the `backend/` folder) to GitHub.
2. In Render dashboard: **New +** → **Blueprint** → connect the repo.
   The `render.yaml` in the repo root is auto-detected.
   *(If you only pushed `backend/`, use **New +** → **Web Service** and
   set Build Command `pip install -r requirements.txt` and Start Command
   `gunicorn app:app --bind 0.0.0.0:$PORT`.)*
3. Wait ~2 min for build + first deploy.
4. Note the URL Render gives you (e.g. `https://azwa-api.onrender.com`).
5. Update `js/config.js` in the frontend: set the fallback `BACKEND_URL`
   to your Render URL, then re-deploy the frontend (drag folder into
   `https://app.netlify.com/drop` or similar).

### About the free tier

- **Sleeps after 15 min of inactivity.** First request after that takes 30–50s
  to wake up. Good enough for a demo — just click "wake up" a minute before
  your presentation.
- **Ephemeral disk.** The SQLite file resets on every deploy or restart.
  Per-browser wallets reset to defaults (250 SAR / 500 pts). For a
  hackathon this is fine (fresh state = clean demo). To persist across
  restarts, add a Render persistent disk (`$1/mo`) or switch to Render
  Postgres (free).

## Environment variables

- `PORT` — set by Render automatically
- `AZWA_DB_PATH` — override the SQLite file path (default: `azwa.db` next to `app.py`)

## Reset the database

Locally:
```
rm backend/azwa.db
```

Via API (per-user only):
```
curl -X POST http://localhost:5000/api/session/reset -H "X-User-Id: <uuid>"
```
