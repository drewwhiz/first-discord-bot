import * as Discord from 'discord.js';
import * as logger from 'winston';
import { FrcTeamUpdates } from './frc-team-updates';

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

bot.on('message', async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.content.substring(0, 1) === '!') {
    var args = message.content.substring(1).split(' ');
    var cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case 'events':
        message.reply(
          'The FIRST LEGO League Alabama Coaches Workshop is August 24, 2019.\n' + 
          'FTC Kickoff is September 7, 2019.\n' + 
          'FRC Kickoff is January 4, 2020.\n' + 
          'The FIRST LEGO League Alabama Championship is January 25, 2020.\n' + 
          'The Rocket City Regional is April 1-4, 2020.\n' + 
          'The FIRST LEGO League Jr. Alabama Expo is April 4, 2020.'
        );
        break;
      case 'update':
        message.reply(await FrcTeamUpdates.getLatestUpdate(new Date().getFullYear()));
        break;
    }
  }
});

let auth = require('../auth/auth.json');
bot.login(auth.token);