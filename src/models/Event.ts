import mongoose from "mongoose";

export interface IEvent extends mongoose.Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  teamEvent: boolean;
}

export const EventSchema = new mongoose.Schema({
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  teamEvent: { type: Boolean, required: true },
});

const Event = mongoose.model<IEvent>("Event", EventSchema);
export default Event;
