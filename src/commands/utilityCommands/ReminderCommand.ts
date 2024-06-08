import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import { IReminderScheduleService } from '../../services/interfaces/IReminderScheduleService.js';

export class ReminderCommand implements ICommand {
  private static readonly REMIND_ME = '!remindme';
  private static readonly HELP = '!remindme help';
  private readonly _reminderSchedule: IReminderScheduleService;

  name: string = 'remind me';
  description: string = 'schedules reminders';

  constructor(reminderCrons: IReminderScheduleService) {
    this._reminderSchedule = reminderCrons;
  }

  trigger(message: Message<boolean>): boolean {
    const invariant = message.content.trim();
    const hasStart = invariant.startsWith(ReminderCommand.REMIND_ME);
    return hasStart;
  }

  async execute(message: Message<boolean>): Promise<void> {
    const invariant = message.content.trim();
    if (invariant === ReminderCommand.HELP) {
      await ReminderCommand.handleHelp(message);
      return;
    }

    const remindArgs = invariant.replace(ReminderCommand.REMIND_ME, '').trim();
    const firstSpace = remindArgs.indexOf(' ');
    const textTime = remindArgs.substring(0, firstSpace).trim();
    const reminder = remindArgs.substring(firstSpace).trim();
    if (reminder == null || reminder.length === 0) return;
    const deadline = ReminderCommand.getReminderDeadline(textTime);
    if (deadline == null) return;
    await this._reminderSchedule.handleReminder(message, reminder, deadline);
  }

  private static async handleHelp(message: Message): Promise<void> {
    const reply = 'Usage: `!remindme [timespan] [reminder]`'
      + '\n\n'
      + 'Where `timespan` is in the form `[Number][Period]` with no space. For example `3days`. Supported periods include `minutes`, `hours`, `days`, `weeks`, `months`, **OR** `years` (one only). The number must be a whole number.'
      + '\n'
      + 'The `reminder` is the message you want sent.'
      + '\n\n'
      + 'Example: `!remindme 3days prepare slide deck for meeting`'
      + '\n\n'
      + 'Reminders are sent in the channel they are requested, or as a DM if the channel no longer exists as a text channel.';

    await message.reply(reply);
  }

  private static getReminderDeadline(textTime: string): Date {
    if (textTime == null) return null;
    let invariant = textTime.toLowerCase().trim();
    if (invariant.length === 0) return null;
    if (!invariant.endsWith('s')) invariant += 's';

    if (invariant.endsWith('minutes')) return this.generateDeadlineMinutes(invariant);
    if (invariant.endsWith('hours')) return this.generateDeadlineHours(invariant);
    if (invariant.endsWith('days')) return this.generateDeadlineDays(invariant);
    if (invariant.endsWith('weeks')) return this.generateDeadlineWeek(invariant);
    if (invariant.endsWith('months')) return this.generateDeadlineMonths(invariant);
    if (invariant.endsWith('years')) return this.generateDeadlineYears(invariant);
    return null;
  }

  private static parseValue(text: string): number {
    const value = Number(text.trim());
    if (!Number.isInteger(value)) return null;
    if (value < 1) return null;
    return value;
  }

  private static generateDeadlineMinutes(minutes: string): Date {
    const value = this.parseValue(minutes.replace('minutes', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setMinutes(startDate.getMinutes() + value));
  }

  private static generateDeadlineHours(hours: string): Date {
    const value = this.parseValue(hours.replace('hours', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setHours(startDate.getHours() + value));
  }

  private static generateDeadlineDays(days: string): Date {
    const value = this.parseValue(days.replace('days', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setDate(startDate.getDate() + value));
  }

  private static generateDeadlineWeek(weeks: string): Date {
    const value = this.parseValue(weeks.replace('weeks', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setDate(startDate.getDate() + value * 7));
  }

  private static generateDeadlineMonths(months: string): Date {
    const value = this.parseValue(months.replace('months', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setMonth(startDate.getMonth() + value));
  }

  private static generateDeadlineYears(years: string): Date {
    const value = this.parseValue(years.replace('years', '').trim());
    if (value == null) return null;
    const startDate = new Date();
    return new Date(startDate.setFullYear(startDate.getFullYear() + value));
  }
}