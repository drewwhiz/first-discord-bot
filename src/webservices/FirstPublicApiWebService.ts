import { IFirstSeasonResponse } from '../models/IFirstSeasonResponse.js';
import { IFirstPublicApiWebService } from './interfaces/IFirstPublicApiWebService.js';
import https from 'https';
import winston from 'winston';

const { error } = winston;

export class FirstPublicApiWebService implements IFirstPublicApiWebService {
  private static readonly API_BASE_URL: string = 'https://my.firstinspires.org/usfirstapi';
  private static readonly SEASON_ENDPOINT: string = 'seasons/search';
  private static readonly PROGRAM_CODE_PARAMETER: string = 'ProgramCode=';
  private static readonly CURRENT_SEASON_PARAMETER: string = 'CurrentSeason=';

  public async getCurrentFrcSeason(): Promise<number> {
    const url = FirstPublicApiWebService.getFrcCurrentSeasonUrl();
    const result = await FirstPublicApiWebService.getFrcCurrentSeasonData(url);
    if (result == null || result.length != 1 || result[0] == null) {
      return new Date().getFullYear();
    }

    return result[0].SeasonYearStart;
  }

  private static getFrcCurrentSeasonData(url: string): Promise<IFirstSeasonResponse[]> {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          let s = '';
          res.on('data', d => s += d);
          res.on('end', () => {
            let value: IFirstSeasonResponse[] = null;
            try {
              value = JSON.parse(s);
            } catch {
              error(`Unable to parse ${s}`);
              value = null;
            }
            resolve(value);
          });
        })
        .on('error', e => reject(e));
    });
  }

  private static getFrcCurrentSeasonUrl(): string {
    return this.API_BASE_URL
            + '/'
            + this.SEASON_ENDPOINT
            + '?'
            + this.PROGRAM_CODE_PARAMETER
            + 'FRC'
            + '&'
            + this.CURRENT_SEASON_PARAMETER
            + 'true'
    ;
  }
}
