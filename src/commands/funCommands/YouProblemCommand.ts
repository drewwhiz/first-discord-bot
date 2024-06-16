import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class YouProblemCommand implements ICommand {
  public name: string = 'you program';
  public description: string = 'Responds with something being a "you problem."';

  public trigger(message: Message): boolean {
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

  public async execute(message: Message): Promise<void> {
    await message.reply('Hmm... That sounds like a "you problem."');
  }
}
