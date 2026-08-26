import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class CrashOutCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'crash out';
  public override readonly description: string = 'reply to someone mentioning a crash out';

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return invariant.containsAnyPhrases(['crash out', 'crashout', 'crashing out', 'crashed out']);
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('Why crash out when you could lock in?');
  }
}