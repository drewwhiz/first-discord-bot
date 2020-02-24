import { ICommand } from "./ICommand";
import { Message } from "discord.js";
import { createLogger, transports } from "winston";

export class LogCommand implements ICommand {
  name: string;  
  description: string;

  logger = createLogger( { transports: [
    new (transports.File)({ filename: '~/discord-log.txt' })
  ]});

  trigger(message: Message): boolean {
    return !message.author.bot && (message.channel.type == "dm" || message.channel.type == "group");
  }

  execute(message: Message, args: string[]): Promise<void> {
    let date = new Date().toLocaleString();
    let sender = message.author.username;
    let content = message.content;

    this.logger.info(`[${date}] ${sender}: ${content}`);
    return;
  }


}