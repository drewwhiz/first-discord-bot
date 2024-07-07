import { Client, Events, GuildBasedChannel, IntentsBitField, Message, MessageReaction, Partials, User } from 'discord.js';
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
import { AcronymHelperCommand } from './commands/utilityCommands/AcronymHelperCommand.js';
import { AcronymDataService } from './dataservices/AcronymDataService.js';
import { WompCommand } from './commands/funCommands/WompCommand.js';
import { RandomNumberService } from './services/RandomNumberService.js';
import { MagicEightBallCommand } from './commands/utilityCommands/MagicEightBallCommand.js';
import { ConvertUnitCommand } from './commands/utilityCommands/ConvertUnitCommand.js';
import { ReminderDataService } from './dataservices/ReminderDataService.js';
import { ReminderScheduleService } from './services/ReminderScheduleService.js';
import { ReminderCommand } from './commands/utilityCommands/ReminderCommand.js';
import { LolCommand } from './commands/funCommands/LolCommand.js';
import { FirstPublicApiWebService } from './webservices/FirstPublicApiWebService.js';
import { ProgramDataService } from './dataservices/ProgramDataService.js';
import { ColorCommand } from './commands/utilityCommands/ColorCommand.js';
import { BrandCommand } from './commands/frcCommands/BrandCommand.js';
import { BrandColorDataService } from './dataservices/BrandColorDataService.js';
import { VexCommand } from './commands/funCommands/VexCommand.js';
import { CooldownDataService } from './dataservices/CooldownDataService.js';
import { YouProblemCommand } from './commands/funCommands/YouProblemCommand.js';
import { WeatherApiWebService } from './webservices/WeatherApiWebService.js';
import { WeatherCommand } from './commands/utilityCommands/WeatherCommand.js';
import { EsdCommand } from './commands/funCommands/EsdCommand.js';
import { ShockerCommand } from './commands/funCommands/ShockerCommand.js';
import { RoshamboCommand } from './commands/funCommands/RoshamboCommand.js';
import { PoopCommand } from './commands/funCommands/PoopCommand.js';
import { IMessageCommand, IReactionCommand } from './commands/ICommand.js';
import { JustAGirlCommand } from './commands/funCommands/JustAGirlCommand.js';
import { StrutCommand } from './commands/funCommands/StrutCommand.js';

const { configure, transports, error, info } = winston;

// Configure default logger settings
configure({
  level: 'debug',
  transports: [new transports.Console()],
});

// Initialize Discord Bot commands
const myIntents = new IntentsBitField();
myIntents.add(
  IntentsBitField.Flags.MessageContent, 
  IntentsBitField.Flags.Guilds, 
  IntentsBitField.Flags.GuildMessages,
  IntentsBitField.Flags.DirectMessages,
  IntentsBitField.Flags.GuildMessageReactions
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
let newMessageCommands: IMessageCommand[] = [];
let reactionCommands: IReactionCommand[] = [];

// Connect
bot.once(Events.ClientReady, readyClient => {
  info(`Ready! Logged in as ${readyClient.user.tag}`);

  const googleCalendarDataService = new GoogleCalendarDataService(database);
  const acronymDataService = new AcronymDataService(database);
  const reminderDataService = new ReminderDataService(database);
  const programDataService = new ProgramDataService(database);
  const brandColorDataService = new BrandColorDataService(database);
  const cooldownDataService = new CooldownDataService(database);

  const googleCalendarWebService = new GoogleCalendarWebService(googleCalendarDataService);
  const firstPublicApiWebService = new FirstPublicApiWebService(programDataService);
  const reminderScheduleService = new ReminderScheduleService(reminderDataService, readyClient);
  const weatherService = new WeatherApiWebService();

  const generalChannels: GuildBasedChannel[] = [];
  readyClient.guilds.cache.forEach(g => {
    const announcementsChannel = g.channels.cache.find(c => c.name == 'announcements');
    if (announcementsChannel) generalChannels.push(announcementsChannel);
  });

  if (generalChannels.length === 0) {
    readyClient.guilds.cache.forEach(g => {
      const generalChannel = g.channels.cache.find(c => c.name == 'general');
      if (generalChannel) generalChannels.push(generalChannel);
    });
  }

  const calendarReportCommand = new CalendarReportCommand(googleCalendarWebService);
  nodeCron.schedule('0 14 * * Sun', () => {
    calendarReportCommand.sendReminder(generalChannels);
  });

  nodeCron.schedule('0 0 3 * * *', async () => {
    await firstPublicApiWebService.updateAllSeasons();
  });

  newMessageCommands = [
    new TsimfdCommand(),
    new AtMeCommand(readyClient.user.id),
    new BetCommand(),
    new RespectsCommand(cooldownDataService),
    new DoubtCommand(cooldownDataService),
    new MainGoalCommand(cooldownDataService),
    new GameCommand(cooldownDataService),
    new ManualCommand(),
    new DanceCommand(),
    new TeamCommand(firstPublicApiWebService),
    new ImagineCommand(),
    new BonkCommand(),
    new YikesCommand(),
    new HearMeOutCommand(),
    new DocumentationCommand(),
    new ChiefDelphiCommand(),
    new PartLookupCommand(),
    new LolCommand(),
    new ColorCommand(),
    new BrandCommand(brandColorDataService),
    new RandomCommand(new RandomNumberService()),
    new MagicEightBallCommand(new RandomNumberService()),
    new StopCommand(),
    new WompCommand(),
    new ShockerCommand(),
    new ConvertUnitCommand(),
    new AcronymHelperCommand(acronymDataService),
    new GoodBotBadBotCommand(readyClient),
    new AddCalendarCommand(googleCalendarDataService),
    new ListCalendarCommand(googleCalendarDataService),
    new RemoveCalendarCommand(googleCalendarDataService),
    new ReminderCommand(reminderScheduleService),
    new VexCommand(cooldownDataService),
    new YouProblemCommand(),
    new RoshamboCommand(new RandomNumberService()),
    new WeatherCommand(weatherService),
    new EsdCommand(weatherService),
    new PoopCommand(),
    new StrutCommand(),
    calendarReportCommand
  ];

  reactionCommands = [
    new GlitchCommand(),
    new JustAGirlCommand(readyClient.user.id)
  ];
});

// Handle message
bot.addListener(Events.MessageCreate, async (message: Message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Execute triggered commands.
  for (const command of newMessageCommands) {
    if (command != null && command.trigger(message)) {
      try {
        await command.execute(message);
      } catch (e) {
        error(e.message);
      }
    }
  }
});

bot.addListener(Events.MessageReactionAdd, async (reaction: MessageReaction, user: User) => {
  // Ignore bot reactions
  if (user.bot) return;
  
  // Handle fetching message in case of partial
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (e) {
      error('Unable to fetch message:', e);
      return;
    }
  }

  for (const command of reactionCommands) {
    if (command != null && command.trigger(reaction)) {
      try {
        await command.execute(reaction);
      } catch (e) {
        error(e.message);
      }
    }
  }
});

// Start bot.
bot.login(process.env.TOKEN);
