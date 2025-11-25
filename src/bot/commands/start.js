import { registerUser } from '../../db/queries.js';

export default async function startCommand(bot, msg) {
  const chatId = msg.chat.id;

  await registerUser(
    msg.from.id,
    msg.from.username || null,
    msg.from.first_name || null,
  );

  bot.sendMessage(
    chatId,
    'Вітаю! Ви успішно зареєстровані.\n\nКоманди:\n' +
      '/help — список команд\n' +
      '/list — список подій\n' +
      '/add — додати подію\n' +
      '/delete — видалити подію',
  );
}
