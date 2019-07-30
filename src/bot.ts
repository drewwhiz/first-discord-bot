import * as Discord from "discord.js";
import { Dictionary, Set } from "typescript-collections";
import * as logger from "winston";
import * as auth from "../auth/auth.json";
import { BetCommand } from "./commands/BetCommand.js";
import { ICommand } from "./commands/ICommand.js";
import { EventController } from "./controllers/EventController";
import { FrcTeamUpdates } from "./frc-team-updates";

// Configure logger settings
logger.configure({
  level: "info",
  transports: [
    new logger.transports.Console(),
  ],
});

// Get Controllers
// const eventController = new EventController();

// Initialize Discord Bot
const bot = new Discord.Client();

const commands: ICommand[] = [
  new BetCommand(),
];
const commandDict = new Dictionary<string, Set<ICommand>>();

for (const command of commands) {
  for (const trigger of command.triggers) {
    if (commandDict.getValue(trigger) == null) {
      commandDict.setValue(trigger, new Set<ICommand>());
    }
    commandDict.getValue(trigger).add(command);
  }
}

bot.on("ready", (evt) => {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.user.username + " - (" + bot.user.id + ")");
});

bot.on("message", async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  console.log(message);
  const args = message.content.slice().split(/ +/);
  const commandTrigger = args.shift().toLowerCase();

  const commandSet = commandDict.getValue(commandTrigger);
  console.log(commandTrigger);
  if (commandSet != null) {
    commandSet.forEach((command: ICommand) => {
      command.execute(message, args);
    });
  }
});

bot.login(auth.token);
