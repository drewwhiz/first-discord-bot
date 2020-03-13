import { Client } from "discord.js";
import { configure, error, info, transports } from "winston";
import auth from "../auth/auth.json";
import { BetCommand } from "./commands/funCommands/BetCommand";
import { GameCommand } from "./commands/funCommands/GameCommand";
import { MainGoalCommand } from "./commands/funCommands/MainGoalCommand";
import { ManualCommand } from "./commands/funCommands/ManualCommand";
import { LogCommand } from "./commands/LogCommand.js";
import { DanceCommand } from "./commands/funCommands/DanceCommand.js";
import { TeamCommand } from "./commands/frcCommands/TeamCommand.js";
import { ImagineCommand } from "./commands/funCommands/ImagineCommand.js";
import { RespectsCommand } from "./commands/funCommands/RespectsCommand";
import { DoubtCommand } from "./commands/funCommands/DoubtCommand";
import { AtMeCommand } from "./commands/funCommands/AtMeCommand";

// Configure default logger settings
configure({
  level: "info",
  transports: [new transports.Console()],
});

// Initialize Discord Bot commands
const bot = new Client();
const commands = [
  new AtMeCommand(),
  new BetCommand(),
  new RespectsCommand(),
  new DoubtCommand(),
  new MainGoalCommand(),
  new GameCommand(),
  new ManualCommand(),
  new LogCommand(),
  new DanceCommand(),
  new TeamCommand(),
  new ImagineCommand()
];

// Connect
bot.on("ready", () => {
  info("Connected");
  info("Logged in as: ");
  info(bot.user.username + " - (" + bot.user.id + ")");
});

// Handle message
bot.on("message", async (message) => {
  // Ignore bot messages
  if (message.author.bot) {
    return;
  }

  // Parse the message into words
  const args = message.content
    .toLowerCase()
    .slice()
    .split(/ +/);

  // Execute triggered commands.
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

// Start bot.
bot.login(auth.token);
