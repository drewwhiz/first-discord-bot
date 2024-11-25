import { GuildBasedChannel, Message } from 'discord.js';
import { readFileSync } from 'fs';
import { IProductSource } from '../../models/IProductSource.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class PartLookupCommand extends MessageCommand {
  public override isSilly: boolean = false;
  public readonly name: string = 'part lookup';
  public readonly description: string = 'Lookup links to parts.';
  private _sources: IProductSource[];

  public constructor(seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._sources = JSON.parse(readFileSync('data/products.json').toString());
  }

  public override messageTrigger(message: Message<boolean>): boolean {
    const content = message?.content?.trim()?.toLowerCase() ?? '';
    if (content.includes(' ')) return false;
    return this._sources.some(source => content.startsWith(source.prefix) && content.length > source.prefix.length);
  }

  public override async execute(message: Message<boolean>): Promise<void> {
    const content = message.content.trim().toLowerCase();
    const matchingSource = this._sources.find(source => content.startsWith(source.prefix));
    if (matchingSource == null) return;
    const encodedContent = encodeURIComponent(content);
    const url = matchingSource.urlFormat.replace('{0}', encodedContent);
    message.reply(url);
  }
}
