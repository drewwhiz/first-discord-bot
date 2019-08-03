import { Message } from "discord.js";
import { EventController } from "../../controllers/EventController";
import { ICommand } from "../ICommand";

export class NextEventCommand implements ICommand {
  public name: string = "nextEvent";
  public triggers: string[] = ["event"];
  public description: string = "Gets the next upcoming event.";

  private controller: EventController;

  public constructor(controller: EventController) {
    this.controller = controller;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    if (this.controller != null) {
      let ftc = false;
      if (args != null && args.length > 0 && args[0] === "ftc") {
        ftc = true;
      }

      message.channel.send(await this.controller.getNextEvent(ftc));
    }
  }
}
