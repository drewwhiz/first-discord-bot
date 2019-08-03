import { error } from "winston";
import Event from "../models/Event";

export class EventController {
  public async getNextEvent(ftc: boolean): Promise<string> {
    const query = Event
        .findOne({ startDate: {$gte: new Date() }, ftcSpecific: ftc })
        .sort({ startDate: "ascending", endDate: "ascending"});

    try {
      const result = await query.exec();

      if (result != null) {
        const name = result.name;
        const startDate = result.startDate.toLocaleString();
        const endDate = result.endDate.toLocaleString();
        const location = result.location;
        return `The next upcoming event is ${name}, starting ${startDate} and ending ${endDate} at ${location}.`;
      }
    } catch (e) {
      error(e.message);
    }

    return "There is no next event to report.";
  }
}
