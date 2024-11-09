import { Message, TextChannel } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class DoubtCommand extends CooldownCommandBase {
  public override readonly name: string = 'doubt';
  public override readonly description: string = 'X to Doubt';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService) {
    super(cooldowns);
  }

  public override trigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'x';
  }

  public override async action(message: Message): Promise<void> {
    const channel = message.channel as TextChannel;
    if (channel == null) return;

    await channel.send({
      files: ['./img/doubt.jpg']
    });
  }
}