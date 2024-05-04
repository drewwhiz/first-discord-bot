import { ICommand } from './ICommand.js';
import { ChannelType, Message } from 'discord.js';
import winston from 'winston';
import '../extensions/DateExtension.js';

const { createLogger, transports } = winston;

export class LogCommand implements ICommand {
  name: string = 'log';
  description: string = 'Logs DMs involving the bot.';

  logger = createLogger({
    transports: [
      new (transports.File)({ filename: `log.txt` })
    ]
  });

  public trigger(message: Message): boolean {
    return !message.author.bot && (message.channel.type == ChannelType.DM);
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    let date = new Date();
    let sender = message.author.username;
    let content = message.content;

    this.logger.info(`[${date.getIsoTime()}] ${sender}: ${content}`);
  }
}