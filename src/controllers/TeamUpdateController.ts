import TeamUpdate from "../models/TeamUpdate";

export class TeamUpdateController {
  public getAllUpdates() {
    return TeamUpdate.find();
  }

}
