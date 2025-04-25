import { Secrets } from '../environment.js';
import { IWeather } from '../models/IWeather.js';
import { IWeatherApiWebService } from './interfaces/IWeatherApiWebService.js';
import https from 'https';
import winston from 'winston';

const { error } = winston;

export class WeatherApiWebService implements IWeatherApiWebService {
  private static readonly RATE_LIMIT_MINUTES = 5;
  private static readonly API_URL = 'https://api.weatherapi.com/v1/current.json';
  private static readonly KEY_PARAM = 'key';
  private static readonly ZIP_PARAM = 'q';
  private static readonly AQI_PARAM = 'aqi';

  private _rateLimitExpires: Date;

  public async getCurrentWeather(zipCode: string): Promise<IWeather> {
    const now = new Date();
    if (this._rateLimitExpires != null && now < this._rateLimitExpires) return null;

    this._rateLimitExpires = new Date(now.setMinutes(now.getMinutes() + WeatherApiWebService.RATE_LIMIT_MINUTES));
    const url = WeatherApiWebService.getUrl(zipCode);
    if (url == null) return null;

    try {
      return await WeatherApiWebService.fetchWeather(url);
    } catch {
      return null;
    }
  }

  private static getUrl(zipCode: string): string {
    if (zipCode == null) return null;
    if (zipCode.length != 5 && zipCode.length != 10) return null;

    return WeatherApiWebService.API_URL
            + '?'
            + WeatherApiWebService.KEY_PARAM
            + '='
            + Secrets.WEATHER_API_KEY
            + '&'
            + WeatherApiWebService.ZIP_PARAM
            + '='
            + zipCode
            + '&'
            + WeatherApiWebService.AQI_PARAM
            + '=no';
  }

  private static fetchWeather(url: string): Promise<IWeather> {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          let s = '';
          res.on('data', d => s += d);
          res.on('end', () => {
            let value: IWeather = null;
            try {
              value = JSON.parse(s);
            } catch {
              error(`Unable to parse ${s}`);
              value = null;
            }
            resolve(value);
          });
        })
        .on('error', e => reject(e));
    });
  }

}