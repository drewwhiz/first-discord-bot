import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IAcronymDataService } from '../../dataservices/interfaces/IAcronymDataService.js';

export class AcronymHelperCommand implements ICommand {
  public name: string = 'acronym helper';
  public description: string = 'answers known acronyms';

  private readonly _acronyms: IAcronymDataService;

  constructor(acronymDataService: IAcronymDataService) {
    this._acronyms = acronymDataService;
  }

  public trigger(message: Message): boolean {
    if (!message.content.trim().endsWith('?')) return false;
    const content = message.content.stripPunctuation().trim();
    if (this._acronyms.get(content) != null) return true;
    if (!content.toLowerCase().endsWith('s')) return false;
    return this._acronyms.get(content.substring(0, content.length - 1)) != null;
  }

  public async execute(message: Message): Promise<void> {
    const content = message.content.stripPunctuation().trim();
    let acronym = await this._acronyms.get(content);
    if (acronym != null) {
      await message.reply(acronym.explanation);
      return;
    }

    if (!content.toLowerCase().endsWith('s')) return;
    acronym = await this._acronyms.get(content.substring(0, content.length - 1));
    if (acronym == null) return;
    await message.reply(acronym.explanation + '(s)');
  }
}
