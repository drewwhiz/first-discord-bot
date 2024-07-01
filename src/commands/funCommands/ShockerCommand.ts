import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class ShockerCommand implements IMessageCommand {
  public readonly name: string = 'shocker';
  public readonly description: string = 'Responds to shocker.';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('shocker');
  }

  public async execute(message: Message): Promise<void> {
    let currentMessage = await message.reply('ha');
    currentMessage = await currentMessage.reply('robots');
    currentMessage = await currentMessage.reply('electronics');
    currentMessage = await currentMessage.reply('ha');
    await currentMessage.reply('shocker');
  }
}
