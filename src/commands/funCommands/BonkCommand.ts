import { readFileSync } from 'fs';
import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class BonkCommand implements ICommand {
  name: string = 'bonk';
  description: string = 'Sends the bonk meme if the user mentions a forbidden phrase.';
  forbiddenPhrases: string[] = [];

  constructor() {
    this.forbiddenPhrases = JSON.parse(readFileSync('data/forbiddenPhrases.json').toString());
  }

  public trigger(message: Message): boolean {
    return message.content.toLowerCase().containsAnyPhrases(this.forbiddenPhrases);
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    const sender = message.author.toString();
    const forbiddenPhrase = message.content.toLowerCase().getFirstMatchingPhrase(this.forbiddenPhrases);
    if (forbiddenPhrase == null) return;

    const text = `${sender}, did you just say "${forbiddenPhrase}"?`;
    message.reply({
      content: text,
      files: ['./img/bonk.jpg']
    });
  }
}
