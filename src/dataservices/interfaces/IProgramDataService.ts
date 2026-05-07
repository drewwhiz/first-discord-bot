import { IFirstProgram } from '../../models/IFirstProgram.js';
import { IProgramData } from '../../models/IProgramData.js';
import { Nullable } from '../../models/Nullable.js';

export interface IProgramDataService {
    get(id: number): Promise<Nullable<IProgramData>>;
    getAll(): Promise<IProgramData[]>;
    getByProgram(program: IFirstProgram): Promise<Nullable<IProgramData>>;
    update(id: number, updatedRecord: IProgramData): Promise<Nullable<IProgramData>>;
    upsert(record: IProgramData): Promise<Nullable<IProgramData>>;
    insert(record: IProgramData): Promise<Nullable<IProgramData>>;
}