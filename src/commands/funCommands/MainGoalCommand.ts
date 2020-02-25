import { Message } from "discord.js";
import { ICommand } from "../ICommand";
import "../../extensions/StringExtension";

export class MainGoalCommand implements ICommand {
  public name: string = "mainGoal";
  public description: string =
    "Responds to messages containing 'goal' in the Discord.";

  public trigger(message: Message): boolean {
    return message != null && message.content.containsAny("goal", "goals");
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send(
      "My main goal is to blow up, then act like I don't know nobody. Hahahahahaha.",
    );
  }
}
