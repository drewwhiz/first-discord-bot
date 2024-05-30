import { IAcronym } from '../../models/IAcronym.js';

export interface IAcronymDataService {
    get(acronym: string): Promise<IAcronym>;
}