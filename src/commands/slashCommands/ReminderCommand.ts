import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import { IReminderScheduleService } from '../../services/interfaces/IReminderScheduleService.js';
import SlashCommand from './SlashCommand.js';

export default class ReminderCommand extends SlashCommand {
  private static readonly _UNITS: string = 'units';
  private static readonly _LENGTH: string = 'length';
  private static readonly _REMINDER: string = 'reminder';

  private readonly _reminderSchedule: IReminderScheduleService;

  public constructor(reminderCrons: IReminderScheduleService) {
    super('remindme', 'Set a reminder');
    this._reminderSchedule = reminderCrons;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {
    return (await super.build())
      .addIntegerOption(option => 
        option
          .setName(ReminderCommand._UNITS)
          .setDescription('Unit of time')
          .setChoices(
            { name: 'seconds', value: 1 },
            { name: 'minutes', value: 60 },
            { name: 'hours', value: 3600 },
            { name: 'days', value: 86400 },
            { name: 'weeks', value: 604800 },
            { name: 'months', value: 2592000 },
            { name: 'years', value: 31557600 },
          )
          .setRequired(true))
      .addNumberOption(option => 
        option
          .setName(ReminderCommand._LENGTH)
          .setDescription('How many of that unit?')
          .setRequired(true)
          .setMinValue(1)
      )
      .addStringOption(option => 
        option
          .setName(ReminderCommand._REMINDER)
          .setDescription('The reminder message')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const secondsInUnit = interaction.options.get(ReminderCommand._UNITS).value as number;
    const length = interaction.options.get(ReminderCommand._LENGTH).value as number;
    if (secondsInUnit == null || length == null) return;
    
    const secondsDuration = secondsInUnit * length;
    const reminder = interaction.options.get(ReminderCommand._REMINDER).value as string;
    if (reminder == null || reminder.length === 0) return;

    const now = new Date();
    const deadline = new Date(now.setSeconds(now.getSeconds() + secondsDuration));
    if (deadline == null) return;

    await this._reminderSchedule.handleReminder(interaction, reminder, deadline);
  }
}