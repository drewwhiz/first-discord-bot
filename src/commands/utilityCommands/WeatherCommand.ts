import { GuildBasedChannel, Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { IWeatherApiWebService } from '../../webservices/interfaces/IWeatherApiWebService.js';
import { MessageCommand } from '../MessageCommand.js';

export class WeatherCommand extends MessageCommand {
  public readonly isSilly: boolean = false;
  public readonly name: string = 'weather';
  public readonly description: string = 'Responds to weather requests.';
  private static readonly ZIP_REGEX = /^[0-9]{5}(-[0-9]{4})?$/;

  private readonly _weather: IWeatherApiWebService;

  public constructor(weather: IWeatherApiWebService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._weather = weather;
  }

  public override messageTrigger(message: Message): boolean {
    const invariant = message.content.toLowerCase().trim();
    if (!invariant.startsWith('weather')) return false;

    const remainder = invariant.replace('weather', '').trim();
    if (remainder.length === 0) return true;
    return WeatherCommand.ZIP_REGEX.test(remainder);
  }

  public override async execute(message: Message): Promise<void> {
    const invariant = message.content.toLowerCase().trim();

    let zipCode: string = null;
    if (invariant === 'weather') {
      zipCode = process.env.DEFAULT_ZIP;
    } else {
      zipCode = invariant.replace('weather', '').trim();
    }

    if (!WeatherCommand.ZIP_REGEX.test(zipCode)) return;

    const weather = await this._weather.getCurrentWeather(zipCode);
    if (weather == null) return;

    const reply = `It is ${weather.current.temp_f}ºF with ${weather.current.humidity}% relative humidity in ${weather.location.name}, ${weather.location.region}.`;
    await message.reply(reply);
  }
}
