import axios from "axios";

export class FrcTeamUpdates {

  public static getUpdateUrl(year: number, update: number): string {
    if (year < 2017 || year > new Date().getFullYear()) {
      throw new Error("Invalid year.");
    }
    const stringYear = year.toString();

    let stringUpdate = update.toString();
    if (update < 10) {
      stringUpdate = "0" + stringUpdate;
    }

    return `https://firstfrc.blob.core.windows.net/frc${stringYear}/Manual/TeamUpdates/TeamUpdate${stringUpdate}.pdf`;
  }

  public static async getLatestUpdate(year: number): Promise<string> {
    let retVal: string = "No team updates available.";

    const result = await axios.get(FrcTeamUpdates.getUpdateUrl(year, FrcTeamUpdates.latestUpdate + 1));
    if (result.status === 200) {
      FrcTeamUpdates.latestUpdate++;
    }

    if (FrcTeamUpdates.latestUpdate !== 0) {
      retVal = FrcTeamUpdates.getUpdateUrl(year, FrcTeamUpdates.latestUpdate);
    }

    return retVal;
  }

  private static latestUpdate: number = 0;
}
