import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class ChiefDelphiCommand implements ICommand {
  name: string = 'Chief Delphi';
  description: string = 'Look up something on Chief Delphi';

  private readonly CD_URL: string = 'https://www.chiefdelphi.com/search?q=';

  trigger(message: Message<boolean>): boolean {
    const text = message?.content;
    if (text == null) return false;

    const strippedText = text.stripPunctuation().toLowerCase().trim();
    const regex = new RegExp(/^cd\s+.*$/);
    return regex.test(strippedText);
  }

  async execute(message: Message<boolean>): Promise<void> {
    const content = message.content.trim();
    const whiteSpaceContent = content.replace(/[\s]/g, ' ');
    const firstSpace = whiteSpaceContent.indexOf(' ');
    const searchString = content.substring(firstSpace).trim();

    const url = this.CD_URL + encodeURIComponent(searchString);
    message.reply(url);
  }
}