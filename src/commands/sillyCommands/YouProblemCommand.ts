import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class YouProblemCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'you program';
  public readonly description: string = 'Responds with something being a "you problem."';

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyPhrases([
      'i hate',
      'i dislike',
      'i dont like',
      'i detest',
      'i abhor',
      'i despise',
      'i disapprove of',
      'i loathe',
      'i resent'
    ]);
  }

  public override async execute(message: Message): Promise<void> {
    await message.reply('Hmm... That sounds like a "you problem."');
  }
}
