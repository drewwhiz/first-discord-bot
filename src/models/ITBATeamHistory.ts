import { Nullable } from './Nullable.js';

export interface ITBATeamHistory {
  awards: Nullable<ITBATeamAward[]>;
  events: Nullable<ITBATeamEvent[]>;
}

export interface ITBATeamAward {
  event_key: string;
  name: string;
  year: number;
  recipient_list: Nullable<ITBATeamAwardRecipient>[];
}

export interface ITBATeamAwardRecipient {
  awardee: Nullable<string>;
  team_key: string;
}

export interface ITBATeamEvent {
  end_date: Date;
  start_date: Date;
  week: number;
  year: number;
  first_event_code: string;
  key: string;
  parent_event_key: string;
  name: string;
}
