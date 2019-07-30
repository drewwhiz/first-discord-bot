import { Message } from "discord.js";
import { ICommand } from "./ICommand";

export class BetCommand implements ICommand {
  public name: string = "bet";
  public triggers: string[] = ["bet"];
  public description: string = "Responds to 'bet' in the Discord.";

  public execute(message: Message, args: string[]): void {
    message.channel.send("Do it. You won't.");
  }
}
