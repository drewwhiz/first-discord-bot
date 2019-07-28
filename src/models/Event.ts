import { MongoError } from "mongodb";
import mongoose from "mongoose";

const uri: string = "mongodb://127.0.0.1:27017/firstdiscordbot";
const auth = require("../../auth/auth.json");

mongoose.connect(uri, {
  pass: auth.mongoPassword,
  useNewUrlParser: true,
  user: auth.mongoUserName,
}, (err: MongoError) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

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
