export interface ITBATeamMatch {
  alliances: {
    blue: ITBAAlliance;
    red: ITBAAlliance;
  };
  comp_level: string;
  event_key: string;
  match_number: number;
  set_number: number;
  winning_alliance: string;
}

export interface ITBAAlliance {
  dq_team_keys: string[];
  score: number;
  surrogate_team_keys: string[];
  team_keys: string[];
}
