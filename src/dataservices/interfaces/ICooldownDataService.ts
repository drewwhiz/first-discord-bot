import { ICooldown } from '../../models/ICooldown.js';

export interface ICooldownDataService {
    add(cooldown: ICooldown): Promise<ICooldown>;
    getByCommand(command: string): Promise<ICooldown[]>;
    getByKeys(command: string, channelId: string): Promise<ICooldown>;
    get(id: number): Promise<ICooldown>;
    update(record: ICooldown): Promise<ICooldown>;
    upsert(record: ICooldown): Promise<ICooldown>;
}