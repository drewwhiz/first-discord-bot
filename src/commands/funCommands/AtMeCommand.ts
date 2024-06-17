import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class AtMeCommand implements ICommand {
  public readonly name: string = 'don\'t @ me';
  public readonly description: string = 'If tagged, tell the user not to tag the bot.';
  private readonly _userId: string;

  public constructor(userId: string) {
    this._userId = userId;
  }

  public trigger(message: Message): boolean {
    const regex = new RegExp(`<@!?${this._userId}>`);
    return regex.test(message.content);
  }

  public async execute(message: Message): Promise<void> {
    message.reply('Don\'t @ me.');
  }
}