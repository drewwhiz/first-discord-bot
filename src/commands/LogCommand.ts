import { ICommand } from "./ICommand";
import { Message } from "discord.js";
import { createLogger, transports } from "winston";
import "../extensions/DateExtension";

export class LogCommand implements ICommand {
  name: string = "log";
  description: string = "Logs DMs to group DMs involving the bot.";

  logger = createLogger( { transports: [
    new (transports.File)({ filename: `log.txt` })
  ]});

  public trigger(message: Message): boolean {
    return !message.author.bot && (message.channel.type == "dm" || message.channel.type == "group");
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    let date = new Date();
    let sender = message.author.username;
    let content = message.content;

    this.logger.info(`[${date.getIsoTime()}] ${sender}: ${content}`);
  }
}