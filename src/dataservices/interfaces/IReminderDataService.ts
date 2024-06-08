import { IReminder } from '../../models/IReminder.js';

export interface IReminderDataService {
    add(reminder: IReminder): Promise<IReminder>;
    get(id: number): Promise<IReminder>;
    getAll(): Promise<IReminder[]>;
    delete(id: number): Promise<boolean>;
}