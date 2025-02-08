import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class MichaelSaidCommand extends MessageCommand {
  public readonly name: string = 'michael said';
  public readonly description: string = 'Responds to \'michael said\' in the Discord.';
  public override readonly isSilly: boolean = true;

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().trim();
    return invariant.containsAnyPhrases(['michael said', 'benben said', '@ttgwinds2 said']);
  }

  public override async execute(message: Message): Promise<void> {
    message.reply('Yeah, @annastrutz - Michael said!');
  }
}
