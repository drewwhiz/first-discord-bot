import fs from 'fs';

export class Secrets {
  public static readonly TOKEN: string = fs.readFileSync('/run/secrets/TOKEN', 'utf8').trim();
  public static readonly CLIENT_ID: string = fs.readFileSync('/run/secrets/CLIENT_ID', 'utf8').trim();
  public static readonly GUILD_ID: string = fs.readFileSync('/run/secrets/GUILD_ID', 'utf8').trim();
  public static readonly WEATHER_API_KEY: string = fs.readFileSync('/run/secrets/WEATHER_API_KEY', 'utf8').trim();
  public static readonly DEFAULT_ZIP: string = fs.readFileSync('/run/secrets/DEFAULT_ZIP', 'utf8').trim();
  public static readonly RESTRICTED_CHANNEL: string = fs.readFileSync('/run/secrets/RESTRICTED_CHANNEL', 'utf8').trim();
  public static readonly MOD_REPORT_CHANNEL: string = fs.readFileSync('/run/secrets/MOD_REPORT_CHANNEL', 'utf8').trim();
  public static readonly SERIOUS_CHANNELS: string = fs.readFileSync('/run/secrets/SERIOUS_CHANNELS', 'utf8').trim();
  public static readonly DATABASE: string = fs.readFileSync('/run/secrets/db_database', 'utf8').trim();
  public static readonly DB_PASSWORD: string = fs.readFileSync('/run/secrets/db_password', 'utf8').trim();
  public static readonly DB_HOST: string = fs.readFileSync('/run/secrets/db_host', 'utf8').trim();
  public static readonly DB_PORT: number = parseInt(fs.readFileSync('/run/secrets/db_port', 'utf8').trim());
}