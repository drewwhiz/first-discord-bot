import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import { IReminderScheduleService } from '../../services/interfaces/IReminderScheduleService.js';
import SlashCommand from './SlashCommand.js';

export default class ReminderCommand extends SlashCommand {
  private readonly _reminderSchedule: IReminderScheduleService;

  public constructor(reminderCrons: IReminderScheduleService) {
    super('remindme', 'A command to set a reminder for a user.');
    this._reminderSchedule = reminderCrons;
  }

  public override build(): SlashCommandOptionsOnlyBuilder {
    return super.build()
      .addIntegerOption(option => 
        option
          .setName('units')
          .setDescription('The unit of time to wait')
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
          .setName('length')
          .setDescription('The amount of unit to wait')
          .setRequired(true)
          .setMinValue(1)
      )
      .addStringOption(option => 
        option
          .setName('reminder')
          .setDescription('The message to remind the user with')
          .setRequired(true)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const secondsInUnit = interaction.options.get('units').value as number;
    const length = interaction.options.get('length').value as number;
    const secondsDuration = secondsInUnit * length;

    const reminder = interaction.options.get('reminder').value as string;
    if (reminder == null || reminder.length === 0) return;

    const now = new Date();
    const deadline = new Date(now.setSeconds(now.getSeconds() + secondsDuration));
    if (deadline == null) return;

    await this._reminderSchedule.handleReminder(interaction, reminder, deadline);
  }
}