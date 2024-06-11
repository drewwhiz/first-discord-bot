import { IFirstProgram } from '../../models/IFirstProgram.js';

export interface IFirstPublicApiWebService {
    getCurrentSeason(program: IFirstProgram, override: boolean): Promise<number>;
    updateAllSeasons(): Promise<boolean>;
}