import Event from "../models/Event";

export class EventController {
  public getAllEvents() {
    return Event.find();
  }
}
