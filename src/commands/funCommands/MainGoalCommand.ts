import { Message } from "discord.js";
import { ICommand } from "../ICommand";

export class MainGoalCommand implements ICommand {
  public name: string = "mainGoal";
  public description: string =
    "Responds to messages containing 'goal' in the Discord.";

  public trigger(message: Message): boolean {
    if (message != null) {
      const words = message.content
        .toLowerCase()
        .replace(/[.,\/#?!$%\^&\*;:{}=\-_`~()]/g, "")
        .split(" ");
      return words.includes("goal") || words.includes("goals");
    }

    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send(
      "My main goal is to blow up, then act like I don't know nobody. Hahahahahaha.",
    );
  }
}
