import { query } from './db.js';

// Реєстрація користувача
export async function registerUser(telegram_id, username, first_name) {
  return query(
    `INSERT INTO users (telegram_id, username, first_name)
     VALUES ($1, $2, $3)
     ON CONFLICT (telegram_id) DO NOTHING`,
    [telegram_id, username, first_name],
  );
}

// Додавання події
export async function createEvent(title, description, date, created_by) {
  return query(
    `INSERT INTO events (title, description, event_date, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [title, description, date, created_by],
  );
}

// Отримання подій
export async function getEvents() {
  return query(`SELECT * FROM events ORDER BY event_date ASC`);
}

// Видалення події по id
export async function deleteEvent(id) {
  return query(`DELETE FROM events WHERE id = $1`, [id]);
}
