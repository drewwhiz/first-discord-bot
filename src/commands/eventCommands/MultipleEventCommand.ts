import { Message } from "discord.js";
import { error } from "winston";
import { EventController } from "../../controllers/EventController";
import { ICommand } from "../ICommand";

export class MultipleEventCommand implements ICommand {
  public name: string = "multipleEvent";
  public description: string = "Gets a list of upcoming events.";

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
          .shift() === "events"
      );
    }

    return false;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    if (this.controller != null) {
      try {
        message.channel.send(await this.controller.getEvents(args));
      } catch (e) {
        error(e.message);
      }
    }
  }
}
