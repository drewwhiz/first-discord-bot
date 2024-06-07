import { ChannelType, Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { IAcronymDataService } from '../../dataservices/interfaces/IAcronymDataService.js';
import { IAcronym } from '../../models/IAcronym.js';

export class AcronymHelperCommand implements ICommand {
  public name: string = 'acronym helper';
  public description: string = 'answers known acronyms';

  private static readonly TSIMFD: string = 'TSIMFD';
  private static readonly CHANNEL_RESTRICT: string = 'mentor-talk';

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
      await AcronymHelperCommand.safeSend(acronym, message);
      return;
    }

    if (!content.toLowerCase().endsWith('s')) return;
    acronym = await this._acronyms.get(content.substring(0, content.length - 1));
    if (acronym == null) return;
    acronym.explanation = acronym.explanation + '(s)';
    await AcronymHelperCommand.safeSend(acronym, message);
  }

  private static async safeSend(acronym: IAcronym, message: Message): Promise<void> {
    if (acronym == null) return;
    if (acronym.acronym.startsWith(AcronymHelperCommand.TSIMFD)) {
      const isInChannel = message.channel.type === ChannelType.GuildText;
      const isInAllowedChannel = isInChannel && message.channel?.name === AcronymHelperCommand.CHANNEL_RESTRICT;
      if (isInChannel && !isInAllowedChannel) return;
    }

    await message.reply(acronym.explanation);
  }
}
