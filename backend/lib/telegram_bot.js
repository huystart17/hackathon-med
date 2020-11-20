process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1029067862:AAFeS2Zr-U8CgZEkdqRUdhcs9dvG-WA9rDE';

// Create a bot that uses 'polling' to fetch new updates
const teleBot = new TelegramBot(token, { polling: false });
const pushNotif = (msg) => {
    teleBot.sendMessage('@huyhuy17', msg);
    return msg;
};

const vaisLabelBotToken = '722916184:AAG3cNh6ZtX6ZqAy1irvixV8t4T76usfAzo';
const teleVaisBot = new TelegramBot(vaisLabelBotToken, { polling: false });

const pushVaisJobLabel = (msg) => {
    teleVaisBot.sendMessage('-432743679', msg);
    return msg;
};
module.exports = { teleBot, pushNotif, pushVaisJobLabel ,teleVaisBot};