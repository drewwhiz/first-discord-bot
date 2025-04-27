import { GuildBasedChannel, Message } from 'discord.js';
import { ICooldownDataService } from '../dataservices/interfaces/ICooldownDataService.js';
import { DateTimeUtilities } from '../utility/DateTimeUtilities.js';
import { MessageCommand } from './MessageCommand.js';

export abstract class CooldownCommandBase extends MessageCommand {
  public readonly name: string;
  public readonly description: string;
  protected readonly cooldownHours: number;
  private readonly _cooldowns: ICooldownDataService;

  public constructor(cooldowns: ICooldownDataService, seriousChannels: GuildBasedChannel[]) {
    super(seriousChannels);
    this._cooldowns = cooldowns;
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
    activeCooldown.deadline = DateTimeUtilities.getFutureTimeUTCString(this.cooldownHours);
    await this._cooldowns.upsert(activeCooldown);
    await this.action(message);
  }
}