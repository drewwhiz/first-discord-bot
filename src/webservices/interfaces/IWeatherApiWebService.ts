import { IWeather } from '../../models/IWeather.js';

export interface IWeatherApiWebService {
    getCurrentWeather(zipCode: string): Promise<IWeather>;
}