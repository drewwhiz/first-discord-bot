import { Message } from "discord.js";
import { ICommand } from "../ICommand";

export class MainGoalCommand implements ICommand {
  public name: string = "mainGoal";
  public triggers: string[] = ["goal", "goals"];
  public description: string = "Responds to 'goal' and 'goals' in the Discord.";

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send("My main goal is to blow up, then act like I don't know nobody. Hahahahahaha.");
  }
}
