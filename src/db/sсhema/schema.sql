DROP TABLE IF EXISTS responses;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP NOT NULL,
  created_by BIGINT REFERENCES users(telegram_id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  event_id INT REFERENCES events(id),
  status TEXT CHECK (status IN ('yes', 'no', 'maybe', 'confirmed')),
  UNIQUE(user_id, event_id)
);
