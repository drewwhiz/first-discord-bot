export interface IAcronym {
  id: number;
  acronym: string;
  case_sensitive: boolean;
  explanation: string;
  is_channel_restricted: boolean;
}