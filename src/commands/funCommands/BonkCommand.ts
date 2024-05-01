import { ICommand } from "../ICommand";
import { Message } from "discord.js";

export class BonkCommand implements ICommand {
  name: string = "bonk";
  description: string = "Sends the bonk meme if the user mentions a forbidden phrase.";

  private getPhrase(content: string): string {
    const invariant = content.toLowerCase();
    if (invariant.indexOf("dual event") >= 0) return "dual event";
    if (invariant.indexOf("double event") >= 0) return "double event";
    if (invariant.indexOf("triple event") >= 0) return "triple event";
    if (invariant.indexOf("quadruple event") >= 0) return "quadruple event";
    return null;
  }

  public trigger(message: Message): boolean {
    return this.getPhrase(message.content) != null;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    const sender = message.author.toString();
    const forbiddenPhrase = this.getPhrase(message.content);
    const text = `${sender}, did you just say "${forbiddenPhrase}"?`;

    message.channel.send({
      content: text,
      files: ['./img/bonk.jpg']
    });
  }
}
