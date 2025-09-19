import { GuildBasedChannel, Message } from 'discord.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';

export class ThisIsCommand extends CooldownCommandBase {
  public readonly isSilly: boolean = true;
  public override readonly name: string = 'this is';
  public override readonly description: string = 'Sends the 10101 meme image.';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation();
    return invariant.containsAnyPhrases(['is this', 'this is', 'that is', 'thats']);
  }

  public override async action(message: Message): Promise<void> {
    await message.reply({
      files: ['./img/this-is-critical-hit.png']
    });
  }
}
