import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class StonksCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'stonks';
  public readonly description: string = 'Responds to stonks in the Discord.';

  public override messageTrigger(message: Message): boolean {
    return message.content.stripPunctuation().toLowerCase().trim() == 'stonks';
  }

  public override async execute(message: Message): Promise<void> {
    await message.reply({
      files: ['./img/stonks.gif']
    });
  }
}
