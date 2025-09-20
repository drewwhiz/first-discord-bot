import { GuildBasedChannel, Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class CrashOutCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'crash out';
  public override readonly description: string = 'reply to someone mentioning a crash out';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.stripPunctuation().trim().toLowerCase();
    return  invariant.containsAnyPhrases(['crash out', 'crashout', 'crashing out', 'crashed out']);
  }

  public override async action(message: Message): Promise<void> {
    await message.reply('Why crash out when you could lock in?');
  }
}