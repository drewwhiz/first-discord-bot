import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class RespectsCommand extends CooldownCommandBase {
  public override readonly name: string = 'respect';
  public override readonly description: string = 'Press F to Pay Respects';
  public override readonly cooldownHours: number = 24;

  public constructor(cooldowns: ICooldownDataService) {
    super(cooldowns);
  }

  public override trigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'f';
  }

  public override async action(message: Message): Promise<void> {
    await message.channel.send({
      files: ['./img/respects.jpeg']
    });
  }
}