import fs from 'fs';

export class Secrets {
  private static getSecretString(name: string): string {
    try {
      return fs.readFileSync(`/run/secrets/${name}`, 'utf8').trim();
    } catch {
      return '';
    }
  }

  private static getSecretInteger(name: string): number {
    const secretString = this.getSecretString(name);
    if (secretString == '') return 0;
    return parseInt(secretString);
  }

  public static readonly TOKEN: string = this.getSecretString('TOKEN');
  public static readonly CLIENT_ID: string = this.getSecretString('CLIENT_ID');
  public static readonly GUILD_ID: string = this.getSecretString('GUILD_ID');
  public static readonly WEATHER_API_KEY: string = this.getSecretString('WEATHER_API_KEY');
  public static readonly DEFAULT_ZIP: string = this.getSecretString('DEFAULT_ZIP');
  public static readonly RESTRICTED_CHANNEL: string = this.getSecretString('RESTRICTED_CHANNEL');
  public static readonly MOD_REPORT_CHANNEL: string = this.getSecretString('MOD_REPORT_CHANNEL');
  public static readonly SERIOUS_CHANNELS: string = this.getSecretString('SERIOUS_CHANNELS');
  public static readonly DATABASE: string = this.getSecretString('db_database');
  public static readonly DB_PASSWORD: string = this.getSecretString('db_password');
  public static readonly DB_HOST: string = this.getSecretString('db_host');
  public static readonly DB_PORT: number = this.getSecretInteger('db_port');
}