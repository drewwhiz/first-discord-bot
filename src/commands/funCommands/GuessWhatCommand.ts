import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';

export class GuessWhatCommand extends CooldownCommandBase {
  public readonly name: string = 'guess what';
  public readonly description: string = 'chicken butt';
  public override readonly isSilly: boolean = true;

  public constructor(cooldownService: ICooldownDataService, channelService: IChannelService,) {
    super(channelService, cooldownService, 24);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.stripPunctuation().trim() == 'guess what';
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('🐓⬅️');
  }
}
