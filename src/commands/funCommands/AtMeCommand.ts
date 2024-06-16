import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class AtMeCommand implements ICommand {
  public readonly name: string = 'don\'t @ me';
  public readonly description: string = 'If tagged, tell the user not to tag the bot.';
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  trigger(message: Message): boolean {
    const regex = new RegExp(`<@!?${this.userId}>`);
    return regex.test(message.content);
  }

  async execute(message: Message): Promise<void> {
    message.reply('Don\'t @ me.');
  }
}