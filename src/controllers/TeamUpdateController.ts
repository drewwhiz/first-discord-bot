import { connection } from "mongoose";
import { error } from "winston";
import TeamUpdate, { ITeamUpdate, TeamUpdateSchema } from "../models/TeamUpdate";

export class TeamUpdateController {
  public async getLatestUpdate(): Promise<string> {
    try {
      const result = await connection
        .collection(TeamUpdate.name, TeamUpdateSchema)
        .find<ITeamUpdate>();

      if (result != null && (await result.hasNext())) {
        return (await result.next()).url;
      }
    } catch (e) {
      error(e.message);
    }

    return "No events available.";
  }
}
