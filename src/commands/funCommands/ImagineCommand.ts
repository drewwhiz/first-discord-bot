import { IMessageCommand } from '../ICommand.js';
import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';

export class ImagineCommand implements IMessageCommand {
  public readonly name: string = 'imagine';
  public readonly description: string = 'Couldn\'t be me';

  public trigger(message: Message): boolean {
    return message != null && message.content.stripPunctuation().toLowerCase().startsWith('imagine');
  }

  public async execute(message: Message): Promise<void> {
    message.reply('Couldn\'t be me.');
  }
}