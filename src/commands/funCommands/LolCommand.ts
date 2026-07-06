import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class LolCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'lol';
  public readonly description: string = 'replies to lol';

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant.containsAnyWords('lol', 'lolol')) return true;
    return invariant.match(/l[\s]*o[\s]*l+\b/g) != null;
  }

  public override async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant.containsAnyWords('lolol')) {
      message = await message.reply('lolol? more like 10101 - amirite!?');
    } else {
      message = await message.reply('lol? more like 10101 - amirite!?');
    }

    message = await message.reply('"You are *so* right." - Caitlin');
    await message.react('🫠');
  }
}
