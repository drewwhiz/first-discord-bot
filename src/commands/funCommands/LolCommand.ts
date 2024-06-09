import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class LolCommand implements ICommand {
  public name: string = 'lol';
  public description: string = 'replies to lol';

  public trigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('lol');
  }

  public async execute(message: Message): Promise<void> {
    await message.reply('lol? more like 10101 - amirite!?');
  }
}
