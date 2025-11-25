import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { query } from '../db/db.js';

dotenv.config();

import startCommand from './commands/start.js';
import listCommand from './commands/list.js';
import addCommand from './commands/add.js';
import deleteCommand from './commands/delete.js';
import helpCommand from './commands/help.js';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => startCommand(bot, msg));
bot.onText(/\/list/, (msg) => listCommand(bot, msg));
bot.onText(/\/add/, (msg) => addCommand(bot, msg));
bot.onText(/\/delete/, (msg) => deleteCommand(bot, msg));
bot.onText(/\/help/, (msg) => helpCommand(bot, msg));

// --- нова тестова команда для перевірки користувачів ---
bot.onText(/\/debugusers/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const res = await query(
      'SELECT telegram_id, username, first_name FROM users',
    );
    const usersList =
      res.rows
        .map(
          (u) =>
            `${u.telegram_id} | ${u.username || '-'} | ${u.first_name || '-'}`,
        )
        .join('\n') || 'Немає користувачів';

    bot.sendMessage(chatId, `📋 Користувачі у базі:\n${usersList}`);
  } catch (err) {
    console.error('Помилка отримання користувачів:', err);
    bot.sendMessage(chatId, '❌ Не вдалося отримати користувачів.');
  }
});

console.log('Bot is running...');

export default bot;
