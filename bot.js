const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const genPoster = require('./genposter');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5590417421:AAHzag95GOTfB3E7EmLzL8G9BtfizsjHMbg';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/sana [2-IYUN] /vaqt [SHANBA, 21:00]"
bot.onText(/\/sana (.+) \/vaqt (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  var [_, row_1, row_2] = match;
  
  if (row_1.length > 15) row_1 = row_1.substring(0, 15);
  if (row_2.length > 20) row_2 = row_2.substring(0, 20);

  (async () => {
    await genPoster(row_1, row_2);
    bot.sendPhoto(chatId, fs.createReadStream('./media/temp/arab-tili.jpg'));
  })();
});