import { GuildBasedChannel, Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class ThingCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'the thing';
  public override readonly description: string = 'Here\'s the thing';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const content = message.content.stripPunctuation().trim().toLowerCase();
    return content.includes('the thing');
  }

  public override async action(message: Message): Promise<void> {
    await message.reply({
      content: 'Here\'s The Thing...',
      files: ['./img/the-thing.avif']
    });
  }
}