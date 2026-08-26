import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class ImagineCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'imagine';
  public readonly description: string = 'Couldn\'t be me';

  public override messageTrigger(message: Message): boolean {
    return message != null && message.content.stripPunctuation().toLowerCase().startsWith('imagine');
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('Couldn\'t be me.');
  }
}