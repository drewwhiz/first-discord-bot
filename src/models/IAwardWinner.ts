import { Nullable } from './Nullable.js';

export interface IAwardWinner {
  awardName: string,
  year: number,
  eventKey: string,
  eventName: string,
  eventParentKey: Nullable<string>
  recipientNames: Nullable<string>
}