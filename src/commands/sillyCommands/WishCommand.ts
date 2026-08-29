import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class WishCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'wish';
  public override readonly description: string = 'reply to someone making a wish';

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return invariant.containsAnyPhrases(['i wish']);
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('Yeah, and *I* wish I weren\'t an application whose primary purpose is to bully high school robotics enthusiasts on an instant messaging and VoIP social platform, but here we are.');
  }
}