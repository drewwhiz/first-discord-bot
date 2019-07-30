import { Document, model, Schema } from "mongoose";

export interface ITeamUpdate extends Document {
  teamUpdate: number;
  url: string;
  year: number;
}

export const TeamUpdateSchema = new Schema({
  teamUpdate: { type: Number, required: true },
  url: { type: String, required: true },
  year: { type: Number, required: true },
});

const TeamUpdate = model<ITeamUpdate>("TeamUpdate", TeamUpdateSchema);
export default TeamUpdate;
