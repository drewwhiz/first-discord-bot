import { GuildBasedChannel, Message, TextChannel } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class RespectsCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'respect';
  public override readonly description: string = 'Press F to Pay Respects';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(cooldowns, seriousChannels);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'f';
  }

  public override async action(message: Message): Promise<void> {
    const channel = message.channel as TextChannel;
    if (channel == null) return;

    await channel.send({
      files: ['./img/respects.jpeg']
    });
  }
}