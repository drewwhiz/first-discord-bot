import { Message } from 'discord.js';
import { ICooldownDataService } from '../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../utility/DateTimeUtilities.js';
import { MessageCommand } from './MessageCommand.js';
import { IChannelService } from '../services/interfaces/IChannelService.js';

export abstract class CooldownCommandBase extends MessageCommand {
  private readonly _cooldownHours: number;
  private readonly _cooldowns: ICooldownDataService;

  public constructor(channelService: IChannelService, cooldowns: ICooldownDataService, cooldownHours: number) {
    super(channelService);
    this._cooldowns = cooldowns;
    this._cooldownHours = cooldownHours;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public override messageTrigger(message: Message<boolean>): boolean {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async action(message: Message<boolean>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public override async execute(message: Message<boolean>): Promise<void> {
    let activeCooldown = await this._cooldowns.getByKeys(this.name, message.channelId);
    if (activeCooldown == null) {
      activeCooldown = {
        id: 0,
        command_name: this.name,
        channel_id: message.channelId,
        deadline: null
      };
    }

    if (DateTimeUtilities.isCooldownInEffect(activeCooldown.deadline)) return;
    activeCooldown.deadline = DateTimeUtilities.getFutureTime(this._cooldownHours);
    await this._cooldowns.upsert(activeCooldown);
    await this.action(message);
  }
}