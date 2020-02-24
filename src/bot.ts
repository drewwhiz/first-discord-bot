import { Client } from "discord.js";
import { configure, error, info, transports } from "winston";
import auth from "../auth/auth.json";
import { BetCommand } from "./commands/funCommands/BetCommand";
import { GameCommand } from "./commands/funCommands/GameCommand";
import { MainGoalCommand } from "./commands/funCommands/MainGoalCommand";
import { ManualCommand } from "./commands/funCommands/ManualCommand";
import { LogCommand } from "./commands/LogCommand.js";

// Configure logger settings
configure({
  level: "info",
  transports: [new transports.Console()],
});

// Initialize Discord Bot
const bot = new Client();
const commands = [
  new BetCommand(),
  new MainGoalCommand(),
  new GameCommand(),
  new ManualCommand(),
  new LogCommand()
];

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


bot.login(auth.token);
