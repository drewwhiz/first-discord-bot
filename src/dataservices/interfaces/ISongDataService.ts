import { ISong } from '../../models/ISong.js';

export interface ISongDataService {
    getAll(): Promise<ISong[]>;
}