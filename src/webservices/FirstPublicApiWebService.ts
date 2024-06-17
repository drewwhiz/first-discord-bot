import { IProgramDataService } from '../dataservices/interfaces/IProgramDataService.js';
import { IFirstProgram } from '../models/IFirstProgram.js';
import { IFirstSeasonResponse } from '../models/IFirstSeasonResponse.js';
import { IProgramData } from '../models/IProgramData.js';
import { ProgramUtilities } from '../utility/ProgramUtilities.js';
import { IFirstPublicApiWebService } from './interfaces/IFirstPublicApiWebService.js';
import https from 'https';
import winston from 'winston';

const { error } = winston;

export class FirstPublicApiWebService implements IFirstPublicApiWebService {
  private static readonly API_BASE_URL: string = 'https://my.firstinspires.org/usfirstapi';
  private static readonly SEASON_ENDPOINT: string = 'seasons/search';
  private static readonly PROGRAM_CODE_PARAMETER: string = 'ProgramCode=';
  private static readonly CURRENT_SEASON_PARAMETER: string = 'CurrentSeason=';

  private readonly _programData: IProgramDataService;

  public constructor(programData: IProgramDataService) {
    this._programData = programData;
  }

  public async updateAllSeasons(): Promise<boolean> {
    await this.getCurrentSeason(IFirstProgram.FRC, true);
    await this.getCurrentSeason(IFirstProgram.FTC, true);
    await this.getCurrentSeason(IFirstProgram.FLL, true);
    await this.getCurrentSeason(IFirstProgram.JFLL, true);
    return true;
  }

  private static async fetchCurrentSeasonYear(program: IFirstProgram): Promise<number> {
    const programCode = ProgramUtilities.mapProgramToCode(program);
    if (programCode == null) return new Date().getFullYear();

    const url = this.getCurrentSeasonUrl(programCode);
    const result = await this.getCurrentSeasonData(url);
    if (result == null || result.length != 1 || result[0] == null) return new Date().getFullYear();
    return result[0].SeasonYearStart;
  }

  public async getCurrentSeason(program: IFirstProgram, override: boolean): Promise<number> {
    let knownValue: IProgramData = await this._programData.getByProgram(program);
    if (knownValue == null || override) {
      const newValue = (await FirstPublicApiWebService.fetchCurrentSeasonYear(program));
      if (knownValue == null) {
        knownValue = {
          id: 0,
          currentSeasonYear: newValue,
          programCode: ProgramUtilities.mapProgramToCode(program)
        };
      } else {
        knownValue.currentSeasonYear = newValue;
      }

      await this._programData.upsert(knownValue);
      return newValue;
    }

    return knownValue.currentSeasonYear;
  }

  private static getCurrentSeasonData(url: string): Promise<IFirstSeasonResponse[]> {
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

  private static getCurrentSeasonUrl(programCode: string): string {
    return this.API_BASE_URL
      + '/'
      + this.SEASON_ENDPOINT
      + '?'
      + this.PROGRAM_CODE_PARAMETER
      + programCode
      + '&'
      + this.CURRENT_SEASON_PARAMETER
      + 'true'
    ;
  }
}
