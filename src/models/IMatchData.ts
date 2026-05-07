import { Nullable } from './Nullable.js';

export interface IMatchData {
  teamAlliance: string,
  winningAlliance: Nullable<string>,
  competitionLevel: string,
  eventKey: string,
  setNumber: number,
  matchNumber: number,
  year: number,
  isSurrogate: boolean
}