import { GuildBasedChannel, Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class AtMeCommand extends MessageCommand {
  public override readonly name: string = 'don\'t @ me';
  public override readonly description: string = 'If tagged, tell the user not to tag the bot.';
  public override readonly isSilly: boolean = true;

  private readonly _userId: string;

  public constructor(userId: string, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._userId = userId;
  }

  public override messageTrigger(message: Message): boolean {
    const regex = new RegExp(`<@!?${this._userId}>`);
    return regex.test(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('Don\'t @ me.');
  }
}