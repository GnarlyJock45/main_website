-- Azwa | SQLite schema
-- Port of the Postgres schema. No RLS; endpoint-level enforcement via X-User-Id.

pragma foreign_keys = on;

create table if not exists profiles (
  id            text primary key,
  first_name    text not null default '',
  last_name     text not null default '',
  phone         text,
  avatar_url    text,
  verified      integer not null default 1,
  created_at    text not null default (datetime('now')),
  updated_at    text not null default (datetime('now'))
);

create table if not exists wallets (
  user_id       text primary key references profiles(id) on delete cascade,
  balance       real not null default 250.00 check (balance >= 0),
  points        integer not null default 500 check (points >= 0),
  updated_at    text not null default (datetime('now'))
);

create table if not exists cards (
  id            text primary key,
  user_id       text not null references profiles(id) on delete cascade,
  brand         text not null default 'VISA',
  last4         text not null check (length(last4) = 4),
  linked        integer not null default 1,
  card_type     text not null default 'personal',
  label         text,
  created_at    text not null default (datetime('now'))
);
create index if not exists cards_user_idx on cards(user_id);

create table if not exists events (
  id            integer primary key autoincrement,
  title_ar      text not null,
  title_en      text,
  category      text not null check (category in
                  ('sport','cinema','themepark','water','games','family',
                   'experience','food','indoor','concert','live')),
  event_date    text not null,   -- 'YYYY-MM-DD'
  event_time    text not null,
  venue         text not null,
  district      text,
  distance_km   real,
  price         real not null check (price >= 0),
  points        integer not null check (points >= 0),
  multiplier    text not null default '2X',
  image_url     text,
  image_pos     text,
  description   text,
  popular       integer not null default 0,
  nearby        integer not null default 0,
  map_query     text,
  created_at    text not null default (datetime('now'))
);
create index if not exists events_date_idx on events(event_date);
create index if not exists events_category_idx on events(category);

create table if not exists packages (
  id            integer primary key autoincrement,
  title_ar      text not null,
  title_en      text,
  description   text,
  price         real not null check (price >= 0),
  points        integer not null check (points >= 0),
  multiplier    text not null default '2X',
  image_url     text,
  image_pos     text,
  cover_category text,
  region        text,
  popular       integer not null default 0,
  created_at    text not null default (datetime('now'))
);

create table if not exists package_items (
  package_id    integer not null references packages(id) on delete cascade,
  event_id      integer not null references events(id) on delete restrict,
  position      integer not null default 0,
  primary key (package_id, event_id)
);

create table if not exists bookings (
  id            text primary key,
  user_id       text not null references profiles(id) on delete cascade,
  event_id      integer references events(id) on delete restrict,
  package_id    integer references packages(id) on delete restrict,
  quantity      integer not null check (quantity between 1 and 20),
  total_paid    real not null check (total_paid >= 0),
  points_earned integer not null check (points_earned >= 0),
  status        text not null default 'confirmed',
  created_at    text not null default (datetime('now'))
);
create index if not exists bookings_user_idx on bookings(user_id, created_at);

create table if not exists transactions (
  id            text primary key,
  user_id       text not null references profiles(id) on delete cascade,
  kind          text not null check (kind in ('recharge','booking','refund','points_credit','points_redeem')),
  amount        real not null,
  points_delta  integer not null default 0,
  ref_booking_id text references bookings(id) on delete set null,
  meta          text not null default '{}',
  created_at    text not null default (datetime('now'))
);
create index if not exists transactions_user_idx on transactions(user_id, created_at);

create table if not exists favorites (
  user_id       text not null references profiles(id) on delete cascade,
  event_id      integer not null references events(id) on delete cascade,
  created_at    text not null default (datetime('now')),
  primary key (user_id, event_id)
);
