import { IWeather } from '../../models/IWeather.js';
import { Nullable } from '../../models/Nullable.js';

export interface IWeatherApiWebService {
    getCurrentWeather(zipCode: string): Promise<Nullable<IWeather>>;
}