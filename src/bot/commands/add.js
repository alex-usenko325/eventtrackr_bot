import { createEvent } from '../../db/queries.js';
import { query } from '../../db/db.js';

// Об'єкт для зберігання стану користувачів
const userSessions = {};

export default function addCommand(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Встановлюємо стан користувача: чекаємо дані події
  userSessions[userId] = { step: 'waiting_for_event' };

  bot.sendMessage(
    chatId,
    '✏️ Надішліть деталі події у форматі:\nНазва; Опис; 10-03-2025 17:00',
  );

  // Обробник наступного повідомлення користувача
  const handler = async (nextMsg) => {
    if (nextMsg.from.id !== userId) return; // ігноруємо інших користувачів

    const text = nextMsg.text;

    if (!text.includes(';')) {
      return bot.sendMessage(
        chatId,
        '❌ Невірний формат! Використайте: Назва; Опис; 10-03-2025 17:00',
      );
    }

    const [title, description, date] = text.split(';').map((t) => t.trim());

    try {
      // --- Додаємо лог для перевірки користувача у базі ---
      const resCheck = await query(
        'SELECT telegram_id, id FROM users WHERE telegram_id = $1',
        [userId],
      );
      console.log('Пошук користувача у users:', resCheck.rows);

      if (resCheck.rowCount === 0) {
        return bot.sendMessage(
          chatId,
          '❌ Користувача немає в базі. Використайте /start',
        );
      }

      // Приводимо telegram_id до числа (BigInt) для вставки у events
      const dbTelegramId = resCheck.rows[0].telegram_id;
      console.log(
        'Телеграм ID для вставки у events:',
        dbTelegramId,
        'Тип:',
        typeof dbTelegramId,
      );

      // Створюємо подію
      const res = await createEvent(title, description, date, dbTelegramId);
      bot.sendMessage(chatId, `✅ Подію створено! ID: *${res.rows[0].id}*`, {
        parse_mode: 'Markdown',
      });

      console.log('Подія успішно додана:', res.rows[0]);
    } catch (err) {
      console.error('Помилка при створенні події:', err);
      bot.sendMessage(chatId, '❌ Помилка при створенні події.');
    }

    // Очищаємо стан користувача
    delete userSessions[userId];

    // Прибираємо обробник, щоб не ловити наступні повідомлення
    bot.removeListener('message', handler);
  };

  // Додаємо обробник
  bot.on('message', handler);
}
