import { Client, Events, GuildBasedChannel, IntentsBitField, Partials } from 'discord.js';
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
import { DocumentationCommand } from './commands/frcCommands/DocumentationCommand.js';
import { ChiefDelphiCommand } from './commands/frcCommands/ChiefDelphiCommand.js';
import { PartLookupCommand } from './commands/frcCommands/PartLookupCommand.js';
import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { GoogleCalendarDataService } from './dataservices/GoogleCalendarDataService.js';
import { AddCalendarCommand } from './commands/calendarCommands/AddCalendarCommand.js';
import { ListCalendarCommand } from './commands/calendarCommands/ListCalendarCommand.js';
import { RemoveCalendarCommand } from './commands/calendarCommands/RemoveCalendarCommand.js';
import { GoogleCalendarWebService } from './webservices/GoogleCalendarWebService.js';
import * as nodeCron from 'node-cron';
import { CalendarReportCommand } from './commands/calendarCommands/CalendarReportCommand.js';
import { RandomCommand } from './commands/utilityCommands/RandomCommand.js';
import { GoodBotBadBotCommand } from './commands/funCommands/GoodBotBadBotCommand.js';
import { GlitchCommand } from './commands/funCommands/GlitchCommand.js';
import { StopCommand } from './commands/funCommands/StopCommand.js';


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

const openDb = async (): Promise<Database<sqlite3.Database,sqlite3.Statement>> => {
  const db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.migrate({
    migrationsPath: './migrations'
  });

  return db;
};

const database = await openDb();
let commands = [];

// Connect
bot.once(Events.ClientReady, readyClient => {
  info(`Ready! Logged in as ${readyClient.user.tag}`);

  const googleCalendarDataService = new GoogleCalendarDataService(database);
  const googleCalendarWebService = new GoogleCalendarWebService(googleCalendarDataService);

  const generalChannels: GuildBasedChannel[] = [];
  readyClient.guilds.cache.forEach(g => {
    const generalChannel = g.channels.cache.find(c => c.name == 'general');
    if (generalChannel) generalChannels.push(generalChannel);
  });

  const calendarReportCommand = new CalendarReportCommand(googleCalendarWebService);
  nodeCron.schedule('0 14 * * Sun', () => {
    calendarReportCommand.sendReminder(generalChannels);
  });

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
    new HearMeOutCommand(),
    new DocumentationCommand(),
    new ChiefDelphiCommand(),
    new PartLookupCommand(),
    new RandomCommand(),
    new GlitchCommand(),
    new StopCommand(),
    new GoodBotBadBotCommand(readyClient),
    new AddCalendarCommand(googleCalendarDataService),
    new ListCalendarCommand(googleCalendarDataService),
    new RemoveCalendarCommand(googleCalendarDataService),
    calendarReportCommand
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
