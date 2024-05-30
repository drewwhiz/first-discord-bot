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
    return this._acronyms.get(content) != null;
  }

  public async execute(message: Message): Promise<void> {
    const content = message.content.stripPunctuation().trim();
    const acronym = await this._acronyms.get(content);
    if (acronym == null) return;
    await message.reply(acronym.explanation);
  }
}
