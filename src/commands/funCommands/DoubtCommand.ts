import { Message } from 'discord.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';

export class DoubtCommand extends CooldownCommandBase {
  public override readonly name: string = 'doubt';
  public override readonly description: string = 'X to Doubt';
  public override readonly cooldownHours: number = 24;

  constructor(cooldowns: ICooldownDataService) {
    super(cooldowns);
  }

  override trigger(message: Message): boolean {
    return message.content.stripPunctuation().trim().toLowerCase() == 'x';
  }

  override async action(message: Message): Promise<void> {
    await message.channel.send({
      files: ['./img/doubt.jpg']
    });
  }
}