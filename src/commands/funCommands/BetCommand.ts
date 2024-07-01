import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class BetCommand implements IMessageCommand {
  public readonly name: string = 'bet';
  public readonly description: string = 'Responds to \'bet\' in the Discord.';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('bet');
  }

  public async execute(message: Message): Promise<void> {
    message.reply('Do it. You won\'t.');
  }
}
