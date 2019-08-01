import { Message } from "discord.js";
import { TeamUpdateController } from "../../controllers/TeamUpdateController";
import { ICommand } from "../ICommand";

export class LatestTeamUpdateCommand implements ICommand {
  public name: string = "latestTeamUpdate";
  public triggers: string[] = ["update"];
  public description: string = "Gets the URL of the latest FRC Team Update.";

  private controller: TeamUpdateController;

  public constructor(controller: TeamUpdateController) {
    this.controller = controller;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    if (this.controller != null) {
      message.channel.send(this.controller.getLatestUpdate());
    }
  }
}
