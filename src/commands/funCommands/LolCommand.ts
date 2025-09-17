import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class LolCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'lol';
  public readonly description: string = 'replies to lol';

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('lol', 'lolol');
  }

  public override async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    if (invariant.containsAnyWords('lolol')) {
      await message.reply('lolol? more like 10101 - amirite!?');
      return;
    }

    message = await message.reply('lol? more like 10101 - amirite!?');
    await message.reply('"You are *so* right." - Caitlin');
  }
}
