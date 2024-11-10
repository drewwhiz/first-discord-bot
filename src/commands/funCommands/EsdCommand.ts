import { GuildBasedChannel, Message } from 'discord.js';
import { IWeatherApiWebService } from '../../webservices/interfaces/IWeatherApiWebService.js';
import '../../extensions/StringExtension.js';
import { MessageCommand } from '../MessageCommand.js';

export class EsdCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'esd';
  public readonly description: string = 'check ESD conditions';

  private readonly _weather: IWeatherApiWebService;

  public constructor(weather: IWeatherApiWebService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._weather = weather;
  }

  public override messageTrigger(message: Message<boolean>): boolean {
    const invariant = message.content.toLowerCase().stripPunctuation().trim();
    return invariant.containsAnyWords('esd') || invariant.containsAnyPhrases([
      'electrostatic discharge',
      'electro static discharge',
      'electrostaticdischarge'
    ]);
  }

  public override async execute(message: Message<boolean>): Promise<void> {
    const weather = await this._weather.getCurrentWeather(process.env.DEFAULT_ZIP);
    if (weather == null) return;
    if (weather.current.humidity < 45) return;

    const reply = `ESD in ${weather.location.name}, ${weather.location.region}? At ${weather.current.humidity}% humidity? Seems unlikely, but okay...`;
    await message.reply(reply);
  }
}