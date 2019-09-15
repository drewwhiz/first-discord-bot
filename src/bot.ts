import { Client } from "discord.js";
import { MongoError } from "mongodb";
import { connect, connection } from "mongoose";
import { configure, error, info, transports } from "winston";
import auth from "../auth/auth.json";
import { MultipleEventCommand } from "./commands/eventCommands/MultipleEventCommand.js";
import { SingleEventCommand } from "./commands/eventCommands/SingleEventCommand.js";
import { BetCommand } from "./commands/funCommands/BetCommand.js";
import { GameCommand } from "./commands/funCommands/GameCommand.js";
import { MainGoalCommand } from "./commands/funCommands/MainGoalCommand.js";
import { ManualCommand } from "./commands/funCommands/ManualCommand.js";
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
const commands = [] as ICommand[];

bot.on("ready", () => {
  info("Connected");
  info("Logged in as: ");
  info(bot.user.username + " - (" + bot.user.id + ")");
});

bot.on("message", async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.author.bot) {
    return;
  }

  const args = message.content
    .toLowerCase()
    .slice()
    .split(/ +/);

  for (const command of commands) {
    if (command != null && command.trigger(message)) {
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
  auth.dbUri + "/" + auth.dbName,
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
  commands.push(new BetCommand());
  commands.push(new MainGoalCommand());
  commands.push(new GameCommand());
  commands.push(new ManualCommand());
  commands.push(new LatestTeamUpdateCommand(teamUpdateController));
  commands.push(new SingleEventCommand(eventController));
  commands.push(new MultipleEventCommand(eventController));

  bot.login(auth.token);
});
