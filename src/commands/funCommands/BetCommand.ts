import { Message } from "discord.js";
import { ICommand } from "../ICommand";

export class BetCommand implements ICommand {
  public name: string = "bet";
  public description: string = "Responds to 'bet' in the Discord.";

  public trigger(message: Message): boolean {
    if (message != null) {
      const words = message.content
        .toLowerCase()
        .replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ");
      return words.includes("bet");
    }

    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send("Do it. You won't.");
  }
}
