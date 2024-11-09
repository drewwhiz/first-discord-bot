import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class ChiefDelphiCommand extends MessageCommand {
  public override isSilly: boolean = false;
  public readonly name: string = 'Chief Delphi';
  public readonly description: string = 'Look up something on Chief Delphi';

  private readonly CD_URL: string = 'https://www.chiefdelphi.com/search?q=';

  public override messageTrigger(message: Message<boolean>): boolean {
    const text = message?.content;
    if (text == null) return false;

    const strippedText = text.stripPunctuation().toLowerCase().trim();
    const regex = new RegExp(/^cd\s+.*$/);
    return regex.test(strippedText);
  }

  public override async execute(message: Message<boolean>): Promise<void> {
    const content = message.content.trim();
    const whiteSpaceContent = content.replace(/[\s]/g, ' ');
    const firstSpace = whiteSpaceContent.indexOf(' ');
    const searchString = content.substring(firstSpace).trim();

    const url = this.CD_URL + encodeURIComponent(searchString);
    message.reply(url);
  }
}