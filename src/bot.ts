import { Client, Events, IntentsBitField, Partials } from 'discord.js';
import winston from 'winston';
import { BetCommand } from './commands/funCommands/BetCommand.js';
import { GameCommand } from './commands/funCommands/GameCommand.js';
import { MainGoalCommand } from './commands/funCommands/MainGoalCommand.js';
import { ManualCommand } from './commands/funCommands/ManualCommand.js';
import { DanceCommand } from './commands/funCommands/DanceCommand.js';
import { TeamCommand } from './commands/frcCommands/TeamCommand.js';
import { ImagineCommand } from './commands/funCommands/ImagineCommand.js';
import { RespectsCommand } from './commands/funCommands/RespectsCommand.js';
import { DoubtCommand } from './commands/funCommands/DoubtCommand.js';
import { AtMeCommand } from './commands/funCommands/AtMeCommand.js';
import { TsimfdCommand } from './commands/funCommands/TsimfdCommand.js';
import { BonkCommand } from './commands/funCommands/BonkCommand.js';
import { YikesCommand } from './commands/funCommands/YikesCommand.js';
import { HearMeOutCommand } from './commands/funCommands/HearMeOutCommand.js';

const { configure, transports, error, info } = winston;

// Configure default logger settings
configure({
  level: 'info',
  transports: [new transports.Console()],
});

// Initialize Discord Bot commands
const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.MessageContent, 
  IntentsBitField.Flags.Guilds, 
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.DirectMessages
);

const bot = new Client({ 
  intents: myIntents,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

let commands = [];

// Connect
bot.once(Events.ClientReady, readyClient => {
	info(`Ready! Logged in as ${readyClient.user.tag}`);
  commands = [
    new TsimfdCommand(),
    new AtMeCommand(readyClient.user.id),
    new BetCommand(),
    new RespectsCommand(),
    new DoubtCommand(),
    new MainGoalCommand(),
    new GameCommand(),
    new ManualCommand(),
    new DanceCommand(),
    new TeamCommand(),
    new ImagineCommand(),
    new BonkCommand(),
    new YikesCommand(),
    new HearMeOutCommand()
  ];
});


// Handle message
bot.addListener(Events.MessageCreate, async (message) => {
  // Ignore bot messages
  if (message.author.bot) {
    return;
  }

  // Execute triggered commands.
  for (const command of commands) {
    if (command != null && command.trigger(message)) {
      try {
        await command.execute(message);
      } catch (e) {
        error(e.message);
      }
    }
  }
});

// Start bot.
bot.login(process.env.TOKEN);
