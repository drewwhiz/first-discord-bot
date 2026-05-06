import { Nullable } from '../../models/Nullable.js';

export interface IWordCloudWebService {
    getWordCloud(text: string): Promise<Nullable<Buffer>>;
}