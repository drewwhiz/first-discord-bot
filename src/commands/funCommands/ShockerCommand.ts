import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class ShockerCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'shocker';
  public readonly description: string = 'Responds to shocker.';

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('shocker');
  }

  public override async execute(message: Message): Promise<void> {
    let currentMessage = await message.reply('ha');
    currentMessage = await currentMessage.reply('robots');
    currentMessage = await currentMessage.reply('electronics');
    currentMessage = await currentMessage.reply('ha');
    await currentMessage.reply('shocker');
  }
}
