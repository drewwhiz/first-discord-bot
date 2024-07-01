import { Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import { readFileSync } from 'fs';
import { IProductSource } from '../../models/IProductSource.js';
import '../../extensions/StringExtension.js';

export class PartLookupCommand implements IMessageCommand {
  public readonly name: string = 'part lookup';
  public readonly description: string = 'Lookup links to parts.';
  private _sources: IProductSource[];

  public constructor() {
    this._sources = JSON.parse(readFileSync('data/products.json').toString());
  }

  public trigger(message: Message<boolean>): boolean {
    const content = message?.content?.trim()?.toLowerCase() ?? '';
    if (content.includes(' ')) return false;
    return this._sources.some(source => content.startsWith(source.prefix) && content.length > source.prefix.length);
  }

  public async execute(message: Message<boolean>): Promise<void> {
    const content = message.content.trim().toLowerCase();
    const matchingSource = this._sources.find(source => content.startsWith(source.prefix));
    if (matchingSource == null) return;
    const encodedContent = encodeURIComponent(content);
    const url = matchingSource.urlFormat.replace('{0}', encodedContent);
    message.reply(url);
  }
}
