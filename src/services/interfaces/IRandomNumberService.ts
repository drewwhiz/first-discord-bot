import { Message } from 'discord.js';

export interface IRandomNumberService {
    simpleRollReply(message: Message): Promise<void>;
    simpleFlipReply(message: Message): Promise<void>;
    countFlipReply(message: Message): Promise<void>;
    runFlipsReply(message: Message, count: number): Promise<void>;
    singleRollReply(message: Message, max: number): Promise<void>;
    multipleRollReply(message: Message, max: number, count: number): Promise<void>;
    countRollReply(message: Message): Promise<void>;
    getSingleRoll(max: number): number;
}