import { Message } from "discord.js";
import { Dictionary } from "typescript-collections";
import { ICommand } from "../ICommand";
import "../../extensions/StringExtension";

export class GameCommand implements ICommand {
  private static COOLDOWN: number = 15 * 60 * 1000;

  public name: string = "game";
  public description: string = "Loses the game.";
  private lastLosses: Dictionary<string, Date> = new Dictionary<string, Date>();

  public trigger(message: Message): boolean {
    if (message != null && message.content.containsAny("game", "games")) {
      const now = new Date();
      const destination = message.channel.id;

      if (destination != null) {
        const lastLoss = this.lastLosses.getValue(destination);
        if (
          lastLoss == null ||
          Math.abs(now.getTime() - lastLoss.getTime()) > GameCommand.COOLDOWN
        ) {
          this.lastLosses.setValue(destination, now);
          return true;
        }
      }
    }

    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    message.channel.send("I just lost the game.");
  }
}
