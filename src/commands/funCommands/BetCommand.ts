import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class BetCommand extends MessageCommand {
  public readonly name: string = 'bet';
  public readonly description: string = 'Responds to \'bet\' in the Discord.';
  public override readonly isSilly: boolean = true;

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('bet');
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('Do it. You won\'t.');
  }
}
