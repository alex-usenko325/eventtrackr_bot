import { deleteEvent } from '../../db/queries.js';

export default async function deleteCommand(bot, msg) {
  const chatId = msg.chat.id;

  const id = Number(msg.text.split(' ')[1]);

  if (!id) {
    return bot.sendMessage(chatId, '❗ Формат:\n/delete ID');
  }

  try {
    await deleteEvent(id);
    bot.sendMessage(chatId, `🗑 Подію з ID *${id}* видалено.`, {
      parse_mode: 'Markdown',
    });
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, '❌ Помилка при видаленні.');
  }
}
