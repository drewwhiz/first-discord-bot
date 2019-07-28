import Event, { IEvent } from "../models/Event";

export class EventController {
  public constructor() {
    Event.create({
      name: "test name",
      startDate: new Date(),
      endDate: new Date(),
      location: "test location",
      teamEvent: false
    } as IEvent, (err, doc) => {
      if (err) {
        console.log('error creating test record');
      } else {
        console.log('able to create record');
      }
    });
  }

  public getAllEvents() {
    const events = Event.find();
    return events;
  }

}
