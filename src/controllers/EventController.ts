import { error } from "winston";
import "../extensions/DateExtension";
import Event, { IEvent } from "../models/Event";

export class EventController {
  public async getNextEvent(args: string[]): Promise<string> {
    if (args != null) {
      const query = Event.findOne({
        ftcSpecific: args.includes("ftc"),
        startDate: { $gte: new Date() },
      }).sort({ startDate: "ascending", endDate: "ascending" });

      try {
        const result = await query.exec();
        if (result != null) {
          return (
            `All times are ${new Date().getTimezone()}.\n\n` +
            this.formatEventData(result)
          );
        }
      } catch (e) {
        error(e.message);
      }
    }

    return "There is no upcoming event to report.";
  }

  public async getEvents(args: string[]): Promise<string> {
    if (args != null) {
      // Get only numeric strings
      const days = args.filter((value) => {
        if (!isNaN(Number(value))) {
          return value;
        }
      });

      // Get the biggest number
      const maxDays =
        days.length === 0
          ? 0
          : Number(
              days.reduce((prev, current) => {
                return Number(prev) > Number(current) ? prev : current;
              }),
            );

      // Get a date range.
      const firstDate = new Date();
      const lastDate =
        maxDays > 0
          ? new Date(firstDate.getTime() + maxDays * Date.millisecondsPerDay)
          : null;

      // Find and sort.
      const query = Event.find({
        ftcSpecific: args.includes("ftc"),
        startDate:
          lastDate === null
            ? { $gte: firstDate }
            : { $gte: firstDate, $lte: lastDate },
      }).sort({
        // Sort by start date and then by end date.
        startDate: "ascending",
        // tslint:disable-next-line: object-literal-sort-keys
        endDate: "ascending",
      });

      try {
        const result = await query.exec();
        if (result != null && result.length > 0) {
          let reply = `All times are ${firstDate.getTimezone()}.\n\n`;
          for (const event of result) {
            reply += this.formatEventData(event);
            reply += "\n\n";
          }
          return reply.trim();
        }
      } catch (e) {
        error(e.message);
      }
    }

    return "There are no upcoming events to report.";
  }

  private formatEventData(event: IEvent): string {
    if (event != null) {
      return (
        `${event.name} at ${event.location},` +
        ` starting ${event.startDate.getFullDateLocal()} at ${event.startDate.getTwelveHourTimeLocal()}` +
        ` and ending ${event.endDate.getFullDateLocal()} at ${event.endDate.getTwelveHourTimeLocal()}.`
      );
    } else {
      return "There is no event.";
    }
  }
}
