import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class CoreValuesCommand implements IMessageCommand {
  public readonly name: string = 'core values';
  public readonly description: string = 'Responds with Core Values.';

  private static readonly CORE_VALUES: object = {
    'DISCOVERY': 'We explore new skills and ideas.',
    'INNOVATION': 'We use creativity and persistence to solve problems.',
    'IMPACT': 'We apply what we learn to improve our world.',
    'INCLUSION': 'We respect each other and embrace our differences.',
    'TEAMWORK': 'We are stronger when we work together.',
    'FUN': 'We enjoy and celebrate what we do!'
  };

  private static isSingleValue(invariant: string): boolean {
    return CoreValuesCommand.CORE_VALUES[invariant] != null;
  }

  private static isGraciousProfessionalism(invariant: string): boolean {
    return invariant === 'GP'
            || invariant === 'GRACIOUS PROFESSIONALISM'
            || invariant === 'GRACIOUSPROFESSIONALISM'
            || invariant === 'CV'
            || invariant === 'CORE VALUES'
            || invariant === 'COREVALUES'
            || invariant === 'FIRST CORE VALUES'
            || invariant === 'FIRST COREVALUES'
            || invariant === 'FIRSTCOREVALUES';
  }

  public trigger(message: Message): boolean {
    const invariant = message.content.toUpperCase().stripPunctuation().trim();
    if (CoreValuesCommand.isSingleValue(invariant)) return true;
    return CoreValuesCommand.isGraciousProfessionalism(invariant);
  }

  public async execute(message: Message): Promise<void> {
    const invariant = message.content.toUpperCase().stripPunctuation().trim();
    if (CoreValuesCommand.isSingleValue(invariant)) {
      const coreValue = CoreValuesCommand.CORE_VALUES[invariant];
      await message.reply(`**${invariant.capitalize()}**: *${coreValue}*`);
      return;
    }

    let text = 'Gracious Professionalism? Start with the *FIRST* Core Values!';
    for (const [key, value] of Object.entries(CoreValuesCommand.CORE_VALUES)) {
      text += `\n- **${key.capitalize()}**: *${value}*`;
    }

    await message.reply(text);
  }
}
