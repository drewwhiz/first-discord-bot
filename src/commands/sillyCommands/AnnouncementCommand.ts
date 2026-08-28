import { Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class AnnouncementCommand extends MessageCommand {
  public override readonly name: string = 'i have an announcement';
  public override readonly description: string = 'responds to announcement';
  public override readonly isSilly: boolean = false;

  private readonly _regex: RegExp = new RegExp(/\bi have an announcement\b/, 'gi');


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

    const response = await message.reply(`> ${matchText}\nThis better be good`);
    await response.reply('I cancelled my plans');
  }
}