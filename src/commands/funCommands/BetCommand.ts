import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class BetCommand implements ICommand {
  public readonly name: string = 'bet';
  public readonly description: string = 'Responds to \'bet\' in the Discord.';

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAnyWords('bet');
  }

  public async execute(message: Message): Promise<void> {
    message.reply('Do it. You won\'t.');
  }
}
