import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { readFileSync } from 'fs';
import { IProductSource } from '../../models/IProductSource.js';
import '../../extensions/StringExtension.js';

export class PartLookupCommand implements ICommand {
  public readonly name: string = 'part lookup';
  public readonly description: string = 'Lookup links to parts.';
  sources: IProductSource[];

  constructor() {
    this.sources = JSON.parse(readFileSync('data/products.json').toString());
  }

  trigger(message: Message<boolean>): boolean {
    const content = message?.content?.trim()?.toLowerCase() ?? '';
    if (content.includes(' ')) return false;
    return this.sources.some(source => content.startsWith(source.prefix) && content.length > source.prefix.length);
  }

  async execute(message: Message<boolean>): Promise<void> {
    const content = message.content.trim().toLowerCase();
    const matchingSource = this.sources.find(source => content.startsWith(source.prefix));
    if (matchingSource == null) return;
    const encodedContent = encodeURIComponent(content);
    const url = matchingSource.urlFormat.replace('{0}', encodedContent);
    message.reply(url);
  }
}
