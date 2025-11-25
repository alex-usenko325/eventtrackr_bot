import { registerUser } from '../../db/queries.js';

export default async function startCommand(bot, msg) {
  const chatId = msg.chat.id;

  try {
    await registerUser(
      BigInt(msg.from.id),
      msg.from.username || null,
      msg.from.first_name || null,
    );

    // Лог для перевірки
    console.log(
      `✅ Спроба додати користувача з Telegram ID: ${
        msg.from.id
      }, тип: ${typeof BigInt(msg.from.id)}`,
    );

    bot.sendMessage(
      chatId,
      'Вітаю! Ви успішно зареєстровані.\n\nКоманди:\n' +
        '/help — список команд\n' +
        '/list — список подій\n' +
        '/add — додати подію\n' +
        '/delete — видалити подію',
    );
  } catch (err) {
    console.error('Помилка реєстрації користувача:', err);
    bot.sendMessage(chatId, '❌ Помилка при реєстрації. Спробуйте пізніше.');
  }
}
