import https from 'https';
import { IWordCloudWebService } from './interfaces/IWordCloudWebService.js';
import { Logger } from '../utility/Logger.js';
import { Nullable } from '../models/Nullable.js';

export class WordCloudWebService implements IWordCloudWebService {
  private static readonly URL: string = 'https://quickchart.io/wordcloud?format=png&removeStopwords=true&backgroundColor=white&text=';

  public async getWordCloud(text: string): Promise<Nullable<Buffer>> {
    const url = WordCloudWebService.URL + text;
    return await WordCloudWebService.fetchWordCloud(url);
  }

  private static fetchWordCloud(url: string): Promise<Nullable<Buffer>> {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          const data = [];
          res.on('data', d => data.push(d));
          res.on('end', () => {
            let buffer = null;
            try {
              buffer = Buffer.concat(data);
            } catch (e) {
              if (e instanceof Error) Logger.logError(e.toString());
              resolve(null);
              return;
            }
            resolve(buffer);
          });
        })
        .on('error', e => reject(e));
    });
  }
}