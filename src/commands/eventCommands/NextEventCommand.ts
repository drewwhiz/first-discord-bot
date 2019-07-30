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

  public execute(message: Message, args: string[]): void {
    if (this.controller != null) {
      message.channel.send(this.controller.getNextEvent());
    }
  }
}
