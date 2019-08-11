import { Message } from "discord.js";
import { error } from "winston";
import { EventController } from "../../controllers/EventController";
import { ICommand } from "../ICommand";

export class SingleEventCommand implements ICommand {
  public name: string = "singleEvent";
  public description: string = "Gets the next upcoming event.";

  private controller: EventController;

  public constructor(controller: EventController) {
    this.controller = controller;
  }

  public trigger(message: Message): boolean {
    if (message != null) {
      return (
        message.content
          .toLowerCase()
          .split(" ")
          .shift() === "event"
      );
    }
    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    if (this.controller != null) {
      try {
        message.channel.send(await this.controller.getNextEvent(args));
      } catch (e) {
        error(e.message);
      }
    }
  }
}
