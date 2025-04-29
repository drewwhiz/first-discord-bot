import { Client, Collection, Events, GuildBasedChannel, IntentsBitField, Message, MessageReaction, Partials, REST, Routes, User } from 'discord.js';
import winston from 'winston';
import { BetCommand } from './commands/funCommands/BetCommand.js';
import { ManualCommand } from './commands/funCommands/ManualCommand.js';
import { ImagineCommand } from './commands/funCommands/ImagineCommand.js';
import { AtMeCommand } from './commands/funCommands/AtMeCommand.js';
import { TsimfdCommand } from './commands/funCommands/TsimfdCommand.js';
import { BonkCommand } from './commands/funCommands/BonkCommand.js';
import { YikesCommand } from './commands/funCommands/YikesCommand.js';
import { HearMeOutCommand } from './commands/funCommands/HearMeOutCommand.js';
import { DocumentationCommand } from './commands/frcCommands/DocumentationCommand.js';
import * as nodeCron from 'node-cron';
import { GoodBotBadBotCommand } from './commands/funCommands/GoodBotBadBotCommand.js';
import { GlitchCommand } from './commands/funCommands/GlitchCommand.js';
import { StopCommand } from './commands/funCommands/StopCommand.js';
import { WompCommand } from './commands/funCommands/WompCommand.js';
import { RandomNumberService } from './services/RandomNumberService.js';
import { LolCommand } from './commands/funCommands/LolCommand.js';
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
import { WordCloudWebService } from './webservices/WordCloudWebService.js';
import { EveryoneCommand } from './commands/funCommands/EveryoneCommand.js';
import { CoreValuesCommand } from './commands/frcCommands/CoreValuesCommand.js';
import { RedCardAlertCommand } from './commands/utilityCommands/RedCardAlertCommand.js';
import { WeAreATeamCommand } from './commands/funCommands/WeAreATeamCommand.js';
import { MichaelSaidCommand } from './commands/funCommands/MichaelSaidCommand.js';
import SlashCommand from './commands/SlashCommand.js';
import CalendarReportCommand from './commands/slashCommands/CalendarReportCommand.js';
import RollCommand from './commands/slashCommands/RollCommand.js';
import FlipCommand from './commands/slashCommands/FlipCommand.js';
import MagicEightBallCommand from './commands/slashCommands/MagicEightBallCommand.js';
import ChiefDelphiCommand from './commands/slashCommands/ChiefDelphiCommand.js';
import ConvertUnitCommand from './commands/slashCommands/ConvertUnitCommand.js';
import AnalyzeCommand from './commands/slashCommands/AnalyzeCommand.js';
import { Secrets } from './environment.js';
import knex from 'knex';
import { AcronymDataService } from './dataservices/AcronymDataService.js';
import { AcronymHelperCommand } from './commands/utilityCommands/AcronymHelperCommand.js';
import { ReminderDataService } from './dataservices/ReminderDataService.js';
import { ReminderScheduleService } from './services/ReminderScheduleService.js';
import ReminderCommand from './commands/slashCommands/ReminderCommand.js';
import { ProgramDataService } from './dataservices/ProgramDataService.js';
import { FirstPublicApiWebService } from './webservices/FirstPublicApiWebService.js';
import TeamCommand from './commands/slashCommands/TeamCommand.js';
import { CooldownDataService } from './dataservices/CooldownDataService.js';
import { VexCommand } from './commands/funCommands/VexCommand.js';
import { RespectsCommand } from './commands/funCommands/RespectsCommand.js';
import { DoubtCommand } from './commands/funCommands/DoubtCommand.js';
import { MainGoalCommand } from './commands/funCommands/MainGoalCommand.js';
import { GameCommand } from './commands/funCommands/GameCommand.js';
import { BrandColorDataService } from './dataservices/BrandColorDataService.js';
import BrandCommand from './commands/slashCommands/BrandCommand.js';
import { ColorCommand } from './commands/utilityCommands/ColorCommand.js';
import { VendorDataService } from './dataservices/VendorDataService.js';
import PartLookupCommand from './commands/slashCommands/PartLookupCommand.js';
import DanceCommand from './commands/slashCommands/DanceCommand.js';
import { SongDataService } from './dataservices/SongDataService.js';
import { ForbiddenPhraseDataService } from './dataservices/ForbiddenPhraseDataService.js';

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

const database = knex({
  client: 'mysql2',
  connection: {
    host: Secrets.DB_HOST,
    port: Secrets.DB_PORT,
    user: 'root',
    database: Secrets.DATABASE,
    password: Secrets.DB_PASSWORD
  },
});

await database.migrate.latest({ directory: './dist/migrations' });

let newMessageCommands: IMessageCommand[] = [];
let reactionCommands: IReactionCommand[] = [];
const slashCommands = new Collection<string, SlashCommand>();

// Connect
bot.once(Events.ClientReady, readyClient => {
  info(`Ready! Logged in as ${readyClient.user.tag}`);

  const acronymDataService = new AcronymDataService(database);
  const reminderDataService = new ReminderDataService(database);
  const programDataService = new ProgramDataService(database);
  const brandColorDataService = new BrandColorDataService(database);
  const cooldownDataService = new CooldownDataService(database);
  const vendorDataService = new VendorDataService(database);
  const songDataService = new SongDataService(database);
  const forbiddenPhraseDataService = new ForbiddenPhraseDataService(database);

  const firstPublicApiWebService = new FirstPublicApiWebService(programDataService);
  const reminderScheduleService = new ReminderScheduleService(reminderDataService, readyClient);
  const weatherService = new WeatherApiWebService();
  const wordCloudService = new WordCloudWebService();

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

  const seriousChannelNames: string[] = Secrets.SERIOUS_CHANNELS?.split(',') ?? [];
  const seriousChannels: GuildBasedChannel[] = [];
  readyClient.guilds.cache.forEach(g => {
    const channels = g.channels.cache.filter(c => seriousChannelNames.includes(c.name)).map(c => c);
    if (channels == null) return;
    if (channels.length == 0) return;
    seriousChannels.push(...channels);
  });

  nodeCron.schedule('0 0 3 * * *', async () => {
    await firstPublicApiWebService.updateAllSeasons();
  });

  newMessageCommands = [
    new TsimfdCommand(seriousChannels),
    new AtMeCommand(readyClient.user.id, seriousChannels),
    new BetCommand(seriousChannels),
    new ImagineCommand(seriousChannels),
    new BonkCommand(forbiddenPhraseDataService, seriousChannels),
    new YikesCommand(seriousChannels),
    new HearMeOutCommand(seriousChannels),
    new LolCommand(seriousChannels),
    new StopCommand(seriousChannels),
    new WompCommand(seriousChannels),
    new ShockerCommand(seriousChannels),
    new YouProblemCommand(seriousChannels),
    new PoopCommand(seriousChannels),
    new StrutCommand(seriousChannels),
    new EveryoneCommand(seriousChannels),
    new VexCommand(cooldownDataService, seriousChannels),
    new RespectsCommand(cooldownDataService, seriousChannels),
    new DoubtCommand(cooldownDataService, seriousChannels),
    new MainGoalCommand(cooldownDataService, seriousChannels),
    new GameCommand(cooldownDataService, seriousChannels),
    new GoodBotBadBotCommand(readyClient, seriousChannels),
    new EsdCommand(weatherService, seriousChannels),
    new ManualCommand(seriousChannels),
    new DocumentationCommand(seriousChannels),
    new ColorCommand(seriousChannels),
    new CoreValuesCommand(seriousChannels),
    new WeAreATeamCommand(seriousChannels),
    new MichaelSaidCommand(seriousChannels),

    new AcronymHelperCommand(acronymDataService, seriousChannels),
    new RoshamboCommand(new RandomNumberService(), seriousChannels),
    new WeatherCommand(weatherService, seriousChannels)
  ];

  reactionCommands = [
    new GlitchCommand(seriousChannels),
    new RedCardAlertCommand(seriousChannels),
    new JustAGirlCommand(readyClient.user.id, seriousChannels)
  ];

  const calendarReportCommand = new CalendarReportCommand(readyClient);
  nodeCron.schedule('0 14 * * Sun', () => {
    calendarReportCommand.sendReminder(generalChannels);
  });

  const reminderCommand = new ReminderCommand(reminderScheduleService);
  const brandCommand = new BrandCommand(brandColorDataService);
  const rollCommand = new RollCommand(new RandomNumberService());
  const flipCommand = new FlipCommand(new RandomNumberService());
  const magicEightBallCommand = new MagicEightBallCommand(new RandomNumberService());
  const chiefDelphiCommand = new ChiefDelphiCommand();
  const convertCommand = new ConvertUnitCommand();
  const teamCommand = new TeamCommand(firstPublicApiWebService);
  const analyzeCommand = new AnalyzeCommand(wordCloudService);
  const partLookupCommand = new PartLookupCommand(vendorDataService);
  const danceCommand = new DanceCommand(songDataService);

  slashCommands.set(reminderCommand.name, reminderCommand);
  slashCommands.set(calendarReportCommand.name, calendarReportCommand);
  slashCommands.set(brandCommand.name, brandCommand);
  slashCommands.set(rollCommand.name, rollCommand);
  slashCommands.set(flipCommand.name, flipCommand);
  slashCommands.set(magicEightBallCommand.name, magicEightBallCommand);
  slashCommands.set(chiefDelphiCommand.name, chiefDelphiCommand);
  slashCommands.set(convertCommand.name, convertCommand);
  slashCommands.set(teamCommand.name, teamCommand);
  slashCommands.set(analyzeCommand.name, analyzeCommand);
  slashCommands.set(partLookupCommand.name, partLookupCommand);
  slashCommands.set(danceCommand.name, danceCommand);

  const rest = new REST().setToken(Secrets.TOKEN);
  (async () => {
    const commands = slashCommands.map(async c => (await c.build()).toJSON());
    Promise.all(commands).then(async r => {
      try {
        await rest.put(
          Routes.applicationGuildCommands(Secrets.CLIENT_ID, Secrets.GUILD_ID),
          { body: r }
        );
      } catch {
        error('Unable to register slash commands');
      }
    });
  })();
  
  readyClient.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const command = slashCommands.get(interaction.commandName) as SlashCommand;
    if (!command) return;
    
    try {
      await command.execute(interaction);
    } catch (e) {
      error(e);
    }
  });
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
        await command.execute(reaction, user);
      } catch (e) {
        error(e.message);
      }
    }
  }
});

// Start bot.
bot.login(Secrets.TOKEN);
