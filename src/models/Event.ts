import { Document, model, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  ftcSpecific: boolean;
}

export const EventSchema = new Schema({
  endDate: { type: Date, required: true },
  ftcSpecific: { type: Boolean, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
});

const Event = model<IEvent>("Event", EventSchema);
export default Event;
