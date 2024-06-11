import { IFirstProgram } from '../../models/IFirstProgram.js';
import { IProgramData } from '../../models/IProgramData.js';

export interface IProgramDataService {
    get(id: number): Promise<IProgramData>;
    getAll(): Promise<IProgramData[]>;
    getByProgram(program: IFirstProgram): Promise<IProgramData>;
    update(id: number, updatedRecord: IProgramData): Promise<IProgramData>;
    upsert(record: IProgramData): Promise<IProgramData>;
    insert(record: IProgramData): Promise<IProgramData>;
}