import { Document, model, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  teamEvent: boolean;
}

export const EventSchema = new Schema({
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  teamEvent: { type: Boolean, required: true },
});

const Event = model<IEvent>("Event", EventSchema);
export default Event;
