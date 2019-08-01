import { connection } from "mongoose";
import { error } from "winston";
import Event, { EventSchema, IEvent } from "../models/Event";

export class EventController {
  public async getNextEvent(): Promise<string> {
    try {
      const result = await connection
        .collection(Event.name, EventSchema)
        .find<IEvent>();

      if (result != null && (await result.hasNext())) {
        return (await result.next()).name;
      }
    } catch (e) {
      error(e.message);
    }

    return "No events available.";
  }
}
