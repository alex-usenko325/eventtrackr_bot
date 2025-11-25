import { getEvents } from '../../db/queries.js';

export default async function listCommand(bot, msg) {
  const chatId = msg.chat.id;

  const { rows } = await getEvents();

  if (rows.length === 0) {
    return bot.sendMessage(chatId, 'Наразі немає створених подій.');
  }

  let text = '📅 *Список подій:*\n\n';

  rows.forEach((ev) => {
    text += `🆔 *${ev.id}*\n`;
    text += `*${ev.title}*\n`;
    text += `${ev.description || '—'}\n`;
    text += `📆 ${ev.event_date}\n\n`;
  });

  bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
}
