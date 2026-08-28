import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class IdeaCommand extends MessageCommand {
  public override readonly name: string = 'i have an idea';
  public override readonly description: string = 'oh no';
  public override readonly isSilly: boolean = false;

  private readonly _regex: RegExp = new RegExp(/\bi have an idea\b/, 'gi');


  public constructor(channelService: IChannelService) {
    super(channelService);
  }

  public override messageTrigger(message: Message): boolean {
    return this._regex.test(message.content);
  }

  public override async execute(message: Message): Promise<void> {
    const matches = message.content.match(this._regex);
    if (matches == null || matches.length == 0) return;

    const matchText = matches[0];

    await message.reply(`> ${matchText}\n*oh no*`);
  }
}