import { GuildBasedChannel, Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';
import { IForbiddenPhraseDataService } from '../../dataservices/interfaces/IForbiddenPhraseDataService.js';

export class BonkCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'bonk';
  public readonly description: string = 'Sends the bonk meme if the user mentions a forbidden phrase.';

  private readonly _forbiddenPhrases: IForbiddenPhraseDataService;
  private _cache: string[] = [];

  public constructor(forbiddenPhrases: IForbiddenPhraseDataService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._forbiddenPhrases = forbiddenPhrases;
    if (this._forbiddenPhrases != null) this._forbiddenPhrases.getAll().then(x => this._cache = x);
  }

  public override messageTrigger(message: Message): boolean {
    if (this._cache == null) return false;
    return message.content.toLowerCase().containsAnyPhrases(this._cache);
  }

  public override async execute(message: Message): Promise<void> {
    const sender = message.author.toString();
    const forbiddenPhrase = message.content.toLowerCase().getFirstMatchingPhrase(this._cache);
    if (forbiddenPhrase == null) return;

    const text = `${sender}, did you just say "${forbiddenPhrase}"?`;
    message.reply({
      content: text,
      files: ['./img/bonk.jpg']
    });
  }
}
