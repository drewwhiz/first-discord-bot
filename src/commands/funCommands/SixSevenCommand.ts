import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class SixSevenCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'six-seven';
  public override readonly description: string = 'respond to someone doing six-seven';

  private readonly _regex: RegExp = new RegExp(/(six|6)\s*(or|to)\s*(seven|7)/, 'gmi');

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return this._regex.test(invariant);
  }

  public override async action(message: Message): Promise<void> {
    let response = await message.reply('Did someone say...');
    response = await response.reply('SIX');
    response = await response.reply('SEVEN');
    await response.reply('🫳🫴🫳🫴');
  }
}