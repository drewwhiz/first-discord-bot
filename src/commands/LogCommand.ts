import { ICommand } from "./ICommand";
import { Message } from "discord.js";
import { createLogger, transports } from "winston";
import "../extensions/DateExtension";

export class LogCommand implements ICommand {
  name: string = "log";
  description: string = "Logs DMs to group DMs involving the bot.";

  date: string = (new Date()).getIsoDate();

  logger = createLogger( { transports: [
    new (transports.File)({ filename: `log/${this.date}.txt` })
  ]});

  trigger(message: Message): boolean {
    return !message.author.bot && (message.channel.type == "dm" || message.channel.type == "group");
  }

  execute(message: Message, args: string[]): Promise<void> {
    let date = new Date();
    if (date.getIsoDate() != this.date) {
      this.date = date.getIsoDate();
      (this.logger.transports[0] as transports.FileTransportInstance).filename = `log/${this.date}.txt`;
    }

    let sender = message.author.username;
    let content = message.content;

    this.logger.info(`[${date.getIsoTime()}] ${sender}: ${content}`);
    return;
  }
}