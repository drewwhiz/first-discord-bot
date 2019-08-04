import { error } from "winston";
import "../extensions/DateExtension";
import Event, { IEvent } from "../models/Event";

export class EventController {
  public async getNextEvent(ftc: boolean): Promise<string> {
    const query = Event
        .findOne({ startDate: {$gte: new Date() }, ftcSpecific: ftc })
        .sort({ startDate: "ascending", endDate: "ascending"});

    try {
      const result = await query.exec();
      if (result != null) {
        return `All times are ${(new Date()).getTimezone()}.\n\n` + this.formatEventData(result);
      }
    } catch (e) {
      error(e.message);
    }

    return "There is no next event to report.";
  }

  private formatEventData(event: IEvent): string {
    if (event != null) {
      return `The next upcoming event is ${event.name} at ${event.location},` +
       ` starting ${event.startDate.getFullDateLocal()} at ${event.startDate.getTwelveHourTimeLocal()}` +
       ` and ending at ${event.endDate.getFullDateLocal()} at ${event.endDate.getTwelveHourTimeLocal()}.`;
    } else {
      return "There is no event.";
    }
  }

}
