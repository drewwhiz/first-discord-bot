import mongoose from "mongoose";

export interface ITeamUpdate extends mongoose.Document {
  teamUpdate: number;
  url: string;
  year: number;
}

export const TeamUpdateSchema = new mongoose.Schema({
  teamUpdate: { type: Number, required: true},
  url: { type: String, required: true },
  year: { type: Number, required: true },
});

const TeamUpdate = mongoose.model<ITeamUpdate>("TeamUpdate", TeamUpdateSchema);
export default TeamUpdate;
