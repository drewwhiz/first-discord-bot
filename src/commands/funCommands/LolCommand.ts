import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class LolCommand implements ICommand {
  public readonly name: string = 'lol';
  public readonly description: string = 'replies to lol';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('lol', 'lolol');
  }

  public async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant.containsAnyWords('lolol')) {
      await message.reply('lolol? more like 10101 - amirite!?');
      return;
    }

    await message.reply('lol? more like 10101 - amirite!?');
  }
}
