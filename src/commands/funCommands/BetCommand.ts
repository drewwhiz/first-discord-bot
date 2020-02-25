import { Message } from "discord.js";
import { ICommand } from "../ICommand";
import "../../extensions/StringExtension";

export class BetCommand implements ICommand {
  public name: string = "bet";
  public description: string = "Responds to 'bet' in the Discord.";

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAny("bet");
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send("Do it. You won't.");
  }
}
