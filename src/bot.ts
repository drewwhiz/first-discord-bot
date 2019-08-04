import { Client } from "discord.js";
import { MongoError } from "mongodb";
import { connect, connection } from "mongoose";
import { Dictionary, Set } from "typescript-collections";
import { configure, error, info, transports } from "winston";
import auth from "../auth/auth.json";
import { MultipleEventCommand } from "./commands/eventCommands/MultipleEventCommand.js";
import { SingleEventCommand } from "./commands/eventCommands/SingleEventCommand.js";
import { BetCommand } from "./commands/funCommands/BetCommand.js";
import { MainGoalCommand } from "./commands/funCommands/MainGoalCommand.js";
import { ICommand } from "./commands/ICommand.js";
import { LatestTeamUpdateCommand } from "./commands/teamUpdateCommands/LatestTeamUpdateCommand.js";
import { EventController } from "./controllers/EventController.js";
import { TeamUpdateController } from "./controllers/TeamUpdateController.js";

// Configure logger settings
configure({
  level: "info",
  transports: [new transports.Console()],
});

// Controllers
let eventController: EventController = null;
let teamUpdateController: TeamUpdateController = null;

// Initialize Discord Bot
const bot = new Client();
const commandDict = new Dictionary<string, Set<ICommand>>();

bot.on("ready", () => {
  info("Connected");
  info("Logged in as: ");
  info(bot.user.username + " - (" + bot.user.id + ")");
});

bot.on("message", async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  const args = message.content.toLowerCase().slice().split(/ +/);
  const commandTrigger = args.shift().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  const commandSet =
    commandDict.getValue(commandTrigger) != null
      ? commandDict.getValue(commandTrigger).toArray()
      : null;

  if (commandSet != null) {
    for (const command of commandSet) {
      try {
        await command.execute(message, args);
      } catch (e) {
        error(e.message);
      }
    }
  }
});

// Initialize database.
connect(
  auth.dbUri,
  {
    pass: auth.mongoPassword,
    useNewUrlParser: true,
    user: auth.mongoUserName,
  },
  (e: MongoError) => {
    if (e) {
      error(e.message);
    }
  },
);

connection.on("error", () => error("Unable to connect to database"));
connection.once("open", () => {
  // we're connected!
  info("Succesfully Connected!");

  eventController = new EventController();
  teamUpdateController = new TeamUpdateController();

  // Initialize commands.
  const commands: ICommand[] = [
    new BetCommand(),
    new MainGoalCommand(),
    new LatestTeamUpdateCommand(teamUpdateController),
    new SingleEventCommand(eventController),
    new MultipleEventCommand(eventController),
  ];

  for (const command of commands) {
    for (const trigger of command.triggers) {
      if (commandDict.getValue(trigger) == null) {
        commandDict.setValue(trigger, new Set<ICommand>());
      }
      commandDict.getValue(trigger).add(command);
    }
  }

  bot.login(auth.token);
});
