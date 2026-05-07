import { IProgramDataService } from '../dataservices/interfaces/IProgramDataService.js';
import { Secrets } from '../environment.js';
import { IAwardWinner } from '../models/IAwardWinner.js';
import { IFirstProgram } from '../models/IFirstProgram.js';
import { IMatchData } from '../models/IMatchData.js';
import { ITBATeamEvent, ITBATeamHistory } from '../models/ITBATeamHistory.js';
import { ITBATeamMatch } from '../models/ITBATeamMatch.js';
import { ITBATeamResponse } from '../models/ITBATeamResponse.js';
import { Nullable } from '../models/Nullable.js';
import { IProgramApiWebService } from './interfaces/IProgramApiWebService.js';

export class ProgramApiWebService implements IProgramApiWebService {
  private static readonly TBA_BASE_URL: string = 'https://thebluealliance.com/api/v3';
  private static readonly TEAM_FORMAT: string = '/team/frc{0}';
  private static readonly TEAM_HISTORY_FORMAT: string = '/team/frc{0}/history';
  private static readonly TEAM_MATCHES_FORMAT: string = '/team/frc{0}/matches/{1}/simple';

  private readonly _programDataService: IProgramDataService;

  public constructor(programDataService: IProgramDataService) {
    this._programDataService = programDataService;
  }

  public async getMatchData(teamNumber: number, rookieYear: number, seasonYear: Nullable<number>): Promise<IMatchData[]> {
    if (teamNumber <= 0) return [];
    if (rookieYear <= 1989) return [];
    if (seasonYear != null && seasonYear < rookieYear) return [];

    const currentYear = (await this._programDataService.getByProgram(IFirstProgram.FRC))?.current_season_year;
    if (currentYear == null) return [];

    const matches: ITBATeamMatch[] = [];
    const startYear = seasonYear == null ? rookieYear : seasonYear;
    const endYear = seasonYear == null ? currentYear : seasonYear;
    for (let year = startYear; year <= endYear; year++) {
      const parameters = ProgramApiWebService.TEAM_MATCHES_FORMAT.format(`${teamNumber}`, `${year}`);
      const result = await ProgramApiWebService.sendRequest<ITBATeamMatch[]>(parameters);
      if (result == null) continue;
      matches.push(...result);
    }

    return matches.map(m => {
      const isBlue = m.alliances.blue.team_keys.includes(`frc${teamNumber}`);
      const isDQ = isBlue ? m.alliances.blue.dq_team_keys.includes(`frc${teamNumber}`) : m.alliances.red.dq_team_keys.includes(`frc${teamNumber}`);
      const isSurrogate = m.alliances.blue.surrogate_team_keys.includes(`frc${teamNumber}`) || m.alliances.red.surrogate_team_keys.includes(`frc${teamNumber}`);
      
      return <IMatchData>{
        teamAlliance: isBlue ? 'blue' : 'red',
        winningAlliance: isDQ ? null : m.winning_alliance,
        competitionLevel: m.comp_level,
        eventKey: m.event_key,
        setNumber: m.set_number,
        matchNumber: m.match_number,
        year: Number(m.event_key.substring(0, 4)),
        isSurrogate: isSurrogate,
      };
    });
  }

  public async getAwardsMessages(teamNumber: number, seasonYear: Nullable<number>): Promise<IAwardWinner[]> {
    if (teamNumber <= 0) return [];
    if (seasonYear != null && seasonYear < 1989) return [];

    const requestParameters = ProgramApiWebService.TEAM_HISTORY_FORMAT.format(`${teamNumber}`);
    const history = await ProgramApiWebService.sendRequest<ITBATeamHistory>(requestParameters);
    if (history?.awards == null || history?.awards?.length == 0) return [];

    let awardList = history.awards;
    if (seasonYear != null) {
      awardList = awardList.filter(a => a?.year == seasonYear);
      if (awardList == null || awardList.length == 0) return [];
    }

    const eventMap = new Map<string, ITBATeamEvent>();
    if (history.events != null) {
      for (const event of history.events) {
        eventMap.set(event.key, event);
      }
    }

    return awardList.map(a => {
      const event = eventMap.get(a.event_key);
      const recipientList = a.recipient_list.filter(r => r?.team_key == `frc${teamNumber}` && r.awardee != null && r.awardee.length > 0).map(r => r?.awardee);
      let recipientNames: Nullable<string> = null;
      if (recipientList != null && recipientList.length > 0) {
        recipientNames = recipientList.join(', ');
      }
      
      return <IAwardWinner>{
        awardName: a.name,
        year: a.year,
        eventKey: a.event_key,
        eventName: event?.name ?? 'Unknown Event Name',
        eventParentKey: event?.parent_event_key,
        recipientNames: recipientNames
      };
    });
  }

  public async getTeamData(
    teamNumber: number
  ): Promise<Nullable<ITBATeamResponse>> {
    if (teamNumber <= 0) return null;

    const programData = await this._programDataService.getByProgram(IFirstProgram.FRC);
    if (programData == null) return null;

    const parameters = ProgramApiWebService.TEAM_FORMAT.format(`${teamNumber}`);
    const result = await ProgramApiWebService.sendRequest<ITBATeamResponse>(parameters);
    if (result == null) return null;
    return result;
  }

  private static async sendRequest<T>(path: string): Promise<Nullable<T>> {
    const url = ProgramApiWebService.TBA_BASE_URL + path;
    const response = await fetch(url, {
      headers: {
        'X-TBA-Auth-Key': Secrets.BLUE_ALLIANCE_KEY,
        accept: 'application/json',
      },
      method: 'GET',
    });

    if (response == null) return null;
    const text = await response.text();
    if (text == null || text.length == 0) return null;
    const value: Nullable<T> = JSON.parse(text);
    return value;
  }
}
