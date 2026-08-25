import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class VexCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'vex';
  public override readonly description: string = 'Responds appropriately to vex';

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 1);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.toLowerCase().stripPunctuation().trim().containsAnyWords('vex');
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('Vex? Ew.');
  }
}
