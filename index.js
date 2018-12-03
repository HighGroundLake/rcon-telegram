const config = require('./config.json')
const TelegramBot = require('node-telegram-bot-api');

const userId = 231038319

const token = "709489607:AAHaczB6x-SKlfYTEN3y4f0y3JspufnfJ7M"

const Rcon = require('rcon');

const conn = new Rcon('localhost', 35500, 'hglrcon876412');

//conn.on('auth', function() {
//console.log("Authed!");
//}).on('response', function(str) {
//bot.sendMessage(global._chatId, str.replace(/§[\da-z]/g, ''))

//}).on('end', function() {
//console.log("Socket closed!");
//process.exit();
//});

//conn.connect();
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    proxy: 'http://127.0.0.1:8001'
  },
});

// Matches "/echo [whatever]"
bot.onText(/\/rcon (.+)/, function (msg, match){
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
  if (msg.from.id !== userId) {
    bot.sendMessage('Permission deined')
  } else {
    const conn = new Rcon('localhost', 35500, 'hglrcon876412');
      const resp = match[1]; // the captured "whatever"
      conn.on('auth', function() {
        console.log("Authed!");
        conn.send(resp)
      }).on('response', function(str) {
        //bot.sendMessage(msg.chat.id, );
        bot.sendMessage(msg.chat.id, resp + ':\n' + str.replace(/§[\da-z]/g, ''))
        conn.disconnect();
      }).on('end', function() {
        console.log("Socket closed!");
      });
      conn.connect();
  }
});
bot.onText(/\/rcongetmyid/, function(msg, match) {
  bot.sendMessage(msg.chat.id, '你的ID是: ' + msg.from.id + '\n如果需要权限的话就把这个ID告诉管理员')
})

// Listen for any kind of message. There are different kinds of
// messages.
//bot.on('message', (msg) => {
//const chatId = msg.chat.id;

 ////send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, JSON.stringify(msg, null, 2));
//});
