import { ChannelType, Message } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IAcronymDataService } from '../../dataservices/interfaces/IAcronymDataService.js';
import { IAcronym } from '../../models/IAcronym.js';

export class AcronymHelperCommand implements IMessageCommand {
  public readonly name: string = 'acronym helper';
  public readonly description: string = 'answers known acronyms';

  private readonly _acronyms: IAcronymDataService;

  public constructor(acronymDataService: IAcronymDataService) {
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
      await AcronymHelperCommand.sendReply(acronym, message);
      return;
    }

    if (!content.toLowerCase().endsWith('s')) return;
    acronym = await this._acronyms.get(content.substring(0, content.length - 1));
    if (acronym == null) return;
    await AcronymHelperCommand.sendReply(acronym, message);
  }

  private static async sendReply(acronym: IAcronym, message: Message): Promise<void> {
    if (acronym == null) return;

    if (!acronym.isChannelRestricted || message.channel.type !== ChannelType.GuildText) {
      await message.reply(acronym.explanation);
      return;
    }

    const isAllowed = process.env.RESTRICTED_CHANNEL == null
                      || process.env.RESTRICTED_CHANNEL.length === 0
                      || message.channel?.name === process.env.RESTRICTED_CHANNEL;

    if (!isAllowed) return;
    await message.reply(acronym.explanation);
  }
}
