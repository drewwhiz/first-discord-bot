import {
  Client,
  Collection,
  Events,
  GuildBasedChannel,
  IntentsBitField,
  Message,
  MessageReaction,
  Partials,
  PermissionFlagsBits,
  REST,
  Role,
  Routes,
  TextChannel,
  ThreadChannel,
  User,
} from 'discord.js';
import winston from 'winston';
import { BetCommand } from './commands/sillyCommands/BetCommand.js';
import { ManualCommand } from './commands/funCommands/ManualCommand.js';
import { ImagineCommand } from './commands/sillyCommands/ImagineCommand.js';
import { AtMeCommand } from './commands/funCommands/AtMeCommand.js';
import { TsimfdCommand } from './commands/sillyCommands/TsimfdCommand.js';
import { BonkCommand } from './commands/funCommands/BonkCommand.js';
import { YikesCommand } from './commands/funCommands/YikesCommand.js';
import { HearMeOutCommand } from './commands/sillyCommands/HearMeOutCommand.js';
import { DocumentationCommand } from './commands/frcCommands/DocumentationCommand.js';
import * as nodeCron from 'node-cron';
import { GoodBotBadBotCommand } from './commands/funCommands/GoodBotBadBotCommand.js';
import { GlitchCommand } from './commands/funCommands/GlitchCommand.js';
import { StopCommand } from './commands/sillyCommands/StopCommand.js';
import { WompCommand } from './commands/funCommands/WompCommand.js';
import { RandomNumberService } from './services/RandomNumberService.js';
import { LolCommand } from './commands/funCommands/LolCommand.js';
import { YouProblemCommand } from './commands/sillyCommands/YouProblemCommand.js';
import { WeatherApiWebService } from './webservices/WeatherApiWebService.js';
import { WeatherCommand } from './commands/utilityCommands/WeatherCommand.js';
import { EsdCommand } from './commands/sillyCommands/EsdCommand.js';
import { ShockerCommand } from './commands/sillyCommands/ShockerCommand.js';
import { RoshamboCommand } from './commands/sillyCommands/RoshamboCommand.js';
import { PoopCommand } from './commands/sillyCommands/PoopCommand.js';
import { IMessageCommand, IReactionCommand } from './commands/ICommand.js';
import { JustAGirlCommand } from './commands/funCommands/JustAGirlCommand.js';
import { StrutCommand } from './commands/sillyCommands/StrutCommand.js';
import { WordCloudWebService } from './webservices/WordCloudWebService.js';
import { EveryoneCommand } from './commands/sillyCommands/EveryoneCommand.js';
import { CoreValuesCommand } from './commands/frcCommands/CoreValuesCommand.js';
import { RedCardAlertCommand } from './commands/utilityCommands/RedCardAlertCommand.js';
import { WeAreATeamCommand } from './commands/sillyCommands/WeAreATeamCommand.js';
import { MichaelSaidCommand } from './commands/sillyCommands/MichaelSaidCommand.js';
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
import { VexCommand } from './commands/sillyCommands/VexCommand.js';
import { RespectsCommand } from './commands/sillyCommands/RespectsCommand.js';
import { DoubtCommand } from './commands/sillyCommands/DoubtCommand.js';
import { MainGoalCommand } from './commands/sillyCommands/MainGoalCommand.js';
import { GameCommand } from './commands/sillyCommands/GameCommand.js';
import { BrandColorDataService } from './dataservices/BrandColorDataService.js';
import BrandCommand from './commands/slashCommands/BrandCommand.js';
import { ColorCommand } from './commands/utilityCommands/ColorCommand.js';
import { VendorDataService } from './dataservices/VendorDataService.js';
import PartLookupCommand from './commands/slashCommands/PartLookupCommand.js';
import DanceCommand from './commands/slashCommands/DanceCommand.js';
import { SongDataService } from './dataservices/SongDataService.js';
import { ForbiddenPhraseDataService } from './dataservices/ForbiddenPhraseDataService.js';
import { ThingCommand } from './commands/funCommands/ThingCommand.js';
import SocialCommand from './commands/slashCommands/SocialCommand.js';
import { SecretTunnelCommand } from './commands/sillyCommands/SecretTunnelCommand.js';
import { CrashOutCommand } from './commands/sillyCommands/CrashOutCommand.js';
import { LaunchCommand } from './commands/sillyCommands/LaunchCommand.js';
import { SongUtilities } from './utility/SongUtilities.js';
import { ProgramApiWebService } from './webservices/ProgramApiWebService.js';
import HistoryCommand from './commands/slashCommands/HistoryCommand.js';
import { Logger } from './utility/Logger.js';
import RoleLookupCommand from './commands/slashCommands/RoleLookupCommand.js';
import UserRoleLookupCommand from './commands/slashCommands/UserRoleLookupCommand.js';
import { StonksCommand } from './commands/sillyCommands/StonksCommand.js';
import CubeRuleCommand from './commands/slashCommands/CubeRuleCommand.js';
import { SixSevenCommand } from './commands/sillyCommands/SixSevenCommand.js';
import BrewCommand from './commands/slashCommands/BrewCommand.js';
import { ChannelService } from './services/ChannelService.js';
import { NoScrubsCommand } from './commands/sillyCommands/NoScrubsCommand.js';
import { DadCommand } from './commands/sillyCommands/DadCommand.js';
import { UnexpectedFactorialCommand } from './commands/funCommands/UexpectedFactorialCommand.js';
import { OopsCommand } from './commands/sillyCommands/OopsCommand.js';

const { configure, transports } = winston;

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
  IntentsBitField.Flags.GuildMessageReactions,
  IntentsBitField.Flags.GuildPresences
);

const bot = new Client({
  intents: myIntents,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

const database = knex({
  client: 'mysql2',
  connection: {
    host: Secrets.DB_HOST,
    port: Secrets.DB_PORT,
    user: 'root',
    database: Secrets.DATABASE,
    password: Secrets.DB_PASSWORD,
  },
});

await database.migrate.latest({ directory: './dist/migrations' });

let newMessageCommands: IMessageCommand[] = [];
let reactionCommands: IReactionCommand[] = [];
const slashCommands = new Collection<string, SlashCommand>();

const channelService = new ChannelService();

const rolesToTag: Role[] = [];

// Connect
bot.once(Events.ClientReady, (readyClient) => {
  Logger.logInfo(`Ready! Logged in as ${readyClient.user.tag}`);

  const acronymDataService = new AcronymDataService(database);
  const reminderDataService = new ReminderDataService(database);

  const programDataService = new ProgramDataService(database);
  const brandColorDataService = new BrandColorDataService(database);
  const cooldownDataService = new CooldownDataService(database);
  const vendorDataService = new VendorDataService(database);
  const songDataService = new SongDataService(database);
  const forbiddenPhraseDataService = new ForbiddenPhraseDataService(database);

  const firstPublicApiWebService = new FirstPublicApiWebService(
    programDataService
  );
  // firstPublicApiWebService.updateAllSeasons().then().catch();

  const reminderScheduleService = new ReminderScheduleService(
    reminderDataService,
    readyClient
  );
  const weatherService = new WeatherApiWebService();
  const wordCloudService = new WordCloudWebService();
  const programApiWebService = new ProgramApiWebService(programDataService);

  const generalChannels: GuildBasedChannel[] = [];
  const musicChannels: TextChannel[] = [];

  readyClient.guilds.cache.forEach((g) => {
    const announcementsChannel = g.channels.cache.find(c => c.name == 'announcements');
    if (announcementsChannel) generalChannels.push(announcementsChannel);

    const musicChannel = g.channels.cache.find(c => c.name == 'music') as TextChannel;
    if (musicChannel != null) musicChannels.push(musicChannel);

    const studentRole = g.roles.cache.find(r => r.name == 'Student');
    if (studentRole != null) rolesToTag.push(studentRole);

    const mentorRole = g.roles.cache.find(r => r.name == 'Mentor');
    if (mentorRole != null) rolesToTag.push(mentorRole);
  });

  if (generalChannels.length === 0) {
    readyClient.guilds.cache.forEach((g) => {
      const generalChannel = g.channels.cache.find((c) => c.name == 'general');
      if (generalChannel) generalChannels.push(generalChannel);
    });
  }

  nodeCron.schedule('0 0 3 * * *', async () => {
    await firstPublicApiWebService.updateAllSeasons();
  });

  newMessageCommands = [
    new TsimfdCommand(channelService),
    new AtMeCommand(readyClient.user.id, channelService),
    new BetCommand(channelService),
    new ImagineCommand(channelService),
    new BonkCommand(forbiddenPhraseDataService, channelService),
    new YikesCommand(channelService),
    new HearMeOutCommand(channelService),
    new LolCommand(channelService),
    new StopCommand(channelService),
    new WompCommand(channelService),
    new ShockerCommand(channelService),
    new YouProblemCommand(channelService),
    new PoopCommand(channelService),
    new StrutCommand(channelService),
    new EveryoneCommand(channelService),
    new VexCommand(cooldownDataService, channelService),
    new RespectsCommand(cooldownDataService, channelService),
    new DoubtCommand(cooldownDataService, channelService),
    new MainGoalCommand(cooldownDataService, channelService),
    new GameCommand(cooldownDataService, channelService),
    new GoodBotBadBotCommand(readyClient, channelService),
    new EsdCommand(weatherService, channelService),
    new ManualCommand(channelService),
    new DocumentationCommand(channelService),
    new ColorCommand(channelService),
    new CoreValuesCommand(channelService),
    new WeAreATeamCommand(channelService),
    new MichaelSaidCommand(channelService),
    new ThingCommand(channelService),
    new SecretTunnelCommand(channelService),
    new CrashOutCommand(cooldownDataService, channelService),
    new LaunchCommand(cooldownDataService, channelService),
    new StonksCommand(channelService),
    new AcronymHelperCommand(acronymDataService, channelService),
    new RoshamboCommand(new RandomNumberService(), channelService),
    new WeatherCommand(weatherService, channelService),
    new SixSevenCommand(cooldownDataService, channelService),
    new NoScrubsCommand(cooldownDataService, channelService),
    new DadCommand(cooldownDataService, channelService),
    new UnexpectedFactorialCommand(channelService),
    new OopsCommand(channelService)
  ];

  reactionCommands = [
    new GlitchCommand(channelService),
    new RedCardAlertCommand(channelService),
    new JustAGirlCommand(readyClient.user.id, channelService),
  ];

  const calendarReportCommand = new CalendarReportCommand(readyClient);
  nodeCron.schedule('0 14 * * Sun', () => {
    calendarReportCommand.sendReminder(generalChannels);
  });

  nodeCron.schedule('0 20 21 9 *', () => {
    SongUtilities.doYouRemember(musicChannels);
  });

  nodeCron.schedule('0 0 1 10 *', () => {
    SongUtilities.wakeMeUp(musicChannels);
  });

  const reminderCommand = new ReminderCommand(reminderScheduleService);
  const brandCommand = new BrandCommand(brandColorDataService);
  const rollCommand = new RollCommand(new RandomNumberService());
  const flipCommand = new FlipCommand(new RandomNumberService());
  const magicEightBallCommand = new MagicEightBallCommand(
    new RandomNumberService()
  );
  const chiefDelphiCommand = new ChiefDelphiCommand();
  const convertCommand = new ConvertUnitCommand();
  const teamCommand = new TeamCommand(firstPublicApiWebService);
  const analyzeCommand = new AnalyzeCommand(wordCloudService);
  const partLookupCommand = new PartLookupCommand(vendorDataService);
  const danceCommand = new DanceCommand(songDataService);
  const socialCommand = new SocialCommand();
  const historyCommand = new HistoryCommand(programApiWebService, programDataService);
  const roleLookupCommand = new RoleLookupCommand();
  const userRoleLookupCommand = new UserRoleLookupCommand();
  const cubeRuleCommand = new CubeRuleCommand();
  const brewCommand = new BrewCommand();

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
  slashCommands.set(socialCommand.name, socialCommand);
  slashCommands.set(historyCommand.name, historyCommand);
  slashCommands.set(roleLookupCommand.name, roleLookupCommand);
  slashCommands.set(userRoleLookupCommand.name, userRoleLookupCommand);
  slashCommands.set(cubeRuleCommand.name, cubeRuleCommand);
  slashCommands.set(brewCommand.name, brewCommand);

  const rest = new REST().setToken(Secrets.TOKEN);
  (async () => {
    const commands = slashCommands.map(async (c) => (await c.build()).toJSON());
    Promise.all(commands).then(async (r) => {
      try {
        await rest.put(
          Routes.applicationGuildCommands(Secrets.CLIENT_ID, Secrets.GUILD_ID),
          { body: r }
        );
      } catch {
        Logger.logError('Unable to register slash commands');
      }
    });
  })();

  readyClient.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = slashCommands.get(interaction.commandName) as SlashCommand;
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (e) {
      if (e instanceof Error) Logger.logError(e.message);
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
      } catch (e: unknown) {
        if (e instanceof Error) Logger.logError(e.message);
      }
    }
  }
});

bot.addListener(
  Events.MessageReactionAdd,
  async (reaction: MessageReaction, user: User) => {
    // Ignore bot reactions
    if (user.bot) return;

    // Handle fetching message in case of partial
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (e) {
        if (e instanceof Error) Logger.logError(`Unable to fetch message: ${e.message}`);
        return;
      }
    }

    for (const command of reactionCommands) {
      if (command != null && command.trigger(reaction)) {
        try {
          await command.execute(reaction, user);
        } catch (e: unknown) {
          if (e instanceof Error) Logger.logError(e.message);
        }
      }
    }
  }
);

bot.addListener(Events.ThreadCreate, async (thread: ThreadChannel) => {
  const parentChannel = thread.parent;
  if (parentChannel == null) return;

  if (!channelService.notifyOnThreadCreation(parentChannel)) return;

  const roles = parentChannel.guild.roles.cache.map(r => r);
  const roleMatches = roles.filter((value) =>
    rolesToTag.includes(value),
  );

  roleMatches.forEach(async (role: Role) => {
    const hasPermission = parentChannel.permissionsFor(role).has(PermissionFlagsBits.ViewChannel);
    if (!hasPermission) return;
    await thread.send(`<@&${role.id}>`);
  });
});

// Start bot.
bot.login(Secrets.TOKEN);
