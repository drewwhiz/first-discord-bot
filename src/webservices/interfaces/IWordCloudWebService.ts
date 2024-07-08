export interface IWordCloudWebService {
    getWordCloud(text: string): Promise<Buffer>;
}