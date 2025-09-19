import { ChannelType, GuildBasedChannel, Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class LaunchCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'launch';
  public override readonly description: string = 'correct shoot vs launch terminology';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    if (message.channel.type !== ChannelType.GuildText) return false;
    const channelName = message.channel?.name;
    if (channelName !== 'ftc' && channelName !== 'strategy') return false;
    
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return invariant.containsAnyPhrases(['shoot', 'shooter', 'shooting', 'shoots']);
  }

  public override async action(message: Message): Promise<void> {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    if (invariant.containsAnyWords('shooting')) {
      await message.reply('Ahem... *launching*');
      return;
    }

    if (invariant.containsAnyWords('shooter')) {
      await message.reply('Ahem... *launcher*');
      return;
    }

    if (invariant.containsAnyWords('shoot')) {
      await message.reply('Ahem... *launch*');
      return;
    }

    if (invariant.containsAnyWords('shoots')) {
      await message.reply('Ahem... *launches*');
      return;
    }
  }
}