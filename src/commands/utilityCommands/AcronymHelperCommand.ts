import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IAcronym } from '../../models/IAcronym.js';
import { readFileSync } from 'fs';

export class AcronymHelperCommand implements ICommand {
  public name: string = 'acronym helper';
  public description: string = 'answers known acronyms';

  private readonly _acronyms: IAcronym[];

  constructor() {
    this._acronyms = JSON.parse(readFileSync('data/acronyms.json').toString());
  }

  private getAcronym(message: Message): IAcronym {
    if (!message.content.endsWith('?')) return null;
    const content = message.content.stripPunctuation().trim();
    const invariant = content.toUpperCase();
    return this._acronyms.find(a => a.acronym == content || (!a.caseSensitive && a.acronym == invariant));
  }

  public trigger(message: Message): boolean {
    return this.getAcronym(message) != null;
  }

  public async execute(message: Message): Promise<void> {
    const acronym = this.getAcronym(message);
    if (acronym == null) return;
    await message.reply(acronym.explanation);
  }
}
