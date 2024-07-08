import https from 'https';
import winston from 'winston';
import { IWordCloudWebService } from './interfaces/IWordCloudWebService.js';

const { error } = winston;

export class WordCloudWebService implements IWordCloudWebService {
  private static readonly URL: string = 'https://quickchart.io/wordcloud?format=png&removeStopwords=true&backgroundColor=white&text=';

  public async getWordCloud(text: string): Promise<Buffer> {
    const url = WordCloudWebService.URL + text;
    return await WordCloudWebService.fetchWordCloud(url);
  }

  private static fetchWordCloud(url: string): Promise<Buffer> {
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
              error(e);
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