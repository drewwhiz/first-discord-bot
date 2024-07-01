import { Message } from 'discord.js';
import { IMessageCommand } from './ICommand.js';
import { ICooldownDataService } from '../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../utility/DateTimeUtilities.js';

export abstract class CooldownCommandBase implements IMessageCommand {
  public readonly name: string;
  public readonly description: string;
  protected readonly cooldownHours: number;
  private readonly _cooldowns: ICooldownDataService;

  public constructor(cooldowns: ICooldownDataService) {
    this._cooldowns = cooldowns;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public trigger(message: Message<boolean>): boolean {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async action(message: Message<boolean>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async execute(message: Message<boolean>): Promise<void> {
    let activeCooldown = await this._cooldowns.getByKeys(this.name, message.channelId);
    if (activeCooldown == null) {
      activeCooldown = {
        id: 0,
        commandName: this.name,
        channelId: message.channelId,
        deadline: null
      };
    }

    if (DateTimeUtilities.isCooldownInEffect(activeCooldown.deadline)) return;
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(this.cooldownHours);
    await this._cooldowns.upsert(activeCooldown);
    await this.action(message);
  }
}