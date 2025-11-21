// src/db/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

// Підключення через DATABASE_URL Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // потрібно для Render
  },
});

// Функція для виконання SQL-запитів
export const query = (text, params) => pool.query(text, params);

// Тест підключення (можна закоментувати після перевірки)
async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Database connected:', res.rows[0]);
  } catch (err) {
    console.error('❌ Database connection error:', err);
  }
}

// Викликати для перевірки при запуску
testConnection();
