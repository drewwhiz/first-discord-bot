import * as Discord from "discord.js";
import * as logger from "winston";
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
const eventController = new EventController();

// Initialize Discord Bot
const bot = new Discord.Client();

bot.on("ready", (evt) => {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(bot.user.username + " - (" + bot.user.id + ")");

});

bot.on("message", async (message) => {
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.content.substring(0, 1) === "!") {
    let args = message.content.substring(1).split(" ");
    const cmd = args[0];

    args = args.splice(1);
    switch (cmd) {
      // !ping
      case "events":
        const events = eventController.getAllEvents();

        break;
      case "update":
        message.reply(await FrcTeamUpdates.getLatestUpdate(new Date().getFullYear()));
        break;
    }
  }
});

const auth = require("../auth/auth.json");
bot.login(auth.token);
