import { readFileSync } from 'fs';
import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class BonkCommand implements ICommand {
  public readonly name: string = 'bonk';
  public readonly description: string = 'Sends the bonk meme if the user mentions a forbidden phrase.';
  private _forbiddenPhrases: string[] = [];

  public constructor() {
    this._forbiddenPhrases = JSON.parse(readFileSync('data/forbiddenPhrases.json').toString());
  }

  public trigger(message: Message): boolean {
    return message.content.toLowerCase().containsAnyPhrases(this._forbiddenPhrases);
  }

  public async execute(message: Message): Promise<void> {
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
