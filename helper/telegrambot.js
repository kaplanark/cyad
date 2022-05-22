
process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const token = "5318705407:AAHycDpJFa4XbYsgkqk2GJa67fZaC70PCTo";
const chanel = '5048735822';
const bot = new TelegramBot(token, {polling: true});

const sendErr = async (message)=>{
    bot.sendMessage(chanel, `Hata: ${message}`);
}
const sendPayment = async (message)=>{
    bot.sendMessage(chanel, `Yeni Bağış: ${message} ₺`);
}
const sendNewContact = async (message)=>{
    bot.sendMessage(chanel, `Yeni İletişim Formu: ${message}`);
}
module.exports = {
    sendErr,
    sendPayment,
    sendNewContact
};
