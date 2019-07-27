import * as Discord from 'discord.js';
import * as logger from 'winston';

// Configure logger settings
logger.configure({
  level: 'info',
  transports: [
    new logger.transports.Console()
  ]
});

// Initialize Discord Bot
var bot = new Discord.Client();

bot.on('ready', (evt) => {
  logger.info('Connected');
  logger.info('Logged in as: ');
  logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});

bot.on('message', (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.content.substring(0, 1) === '!') {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case 'frcevents':
        message.reply('The Rocket City Regional is April 1-4, 2020.');
        break;
      case 'ftcevents':
        break;
      case 'fllevents':
        break;
      case 'flljrevents':
        break;
    }
  }
});

let auth = require('../auth/auth.json');
bot.login(auth.token);