import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

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

console.log('Bot is running...');

export default bot;
