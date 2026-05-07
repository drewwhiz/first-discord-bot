import { IAwardWinner } from '../../models/IAwardWinner.js';
import { IMatchData } from '../../models/IMatchData.js';
import { ITBATeamResponse } from '../../models/ITBATeamResponse.js';
import { Nullable } from '../../models/Nullable.js';

export interface IProgramApiWebService {
  getTeamData(teamNumber: number): Promise<Nullable<ITBATeamResponse>>;
  getAwardsMessages(teamNumber: number, seasonYear: Nullable<number>): Promise<IAwardWinner[]>;
  getMatchData(teamNumber: number, rookieYear: number, seasonYear: Nullable<number>): Promise<IMatchData[]>;
}