import { readFileSync } from 'fs';
import { GuildBasedChannel, Message } from 'discord.js';
import { MessageCommand } from '../MessageCommand.js';

export class BonkCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'bonk';
  public readonly description: string = 'Sends the bonk meme if the user mentions a forbidden phrase.';
  private _forbiddenPhrases: string[] = [];

  public constructor(seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._forbiddenPhrases = JSON.parse(readFileSync('data/forbiddenPhrases.json').toString());
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.toLowerCase().containsAnyPhrases(this._forbiddenPhrases);
  }

  public override async execute(message: Message): Promise<void> {
    const sender = message.author.toString();
    const forbiddenPhrase = message.content.toLowerCase().getFirstMatchingPhrase(this._forbiddenPhrases);
    if (forbiddenPhrase == null) return;

    const text = `${sender}, did you just say "${forbiddenPhrase}"?`;
    message.reply({
      content: text,
      files: ['./img/bonk.jpg']
    });
  }
}
