import { Client, Message, TextChannel } from 'discord.js';
import { IReminderDataService } from '../dataservices/interfaces/IReminderDataService.js';
import { IReminderScheduleService } from './interfaces/IReminderScheduleService.js';
import { scheduleJob } from 'node-schedule';
import { IReminder } from '../models/IReminder.js';

export class ReminderScheduleService implements IReminderScheduleService {
  private readonly _reminders: IReminderDataService;

  public constructor(reminders: IReminderDataService, client: Client<true>) {
    this._reminders = reminders;
    this.loadStoredReminders(client);
  }

  private async loadStoredReminders(client: Client<true>): Promise<void> {
    const reminders = await this._reminders.getAll();
    if (reminders == null || reminders.length == 0) return;

    for (let i = 0; i < reminders.length; i++) {
      await this.handleLoadReminder(client, reminders[i]);
    }
  }

  private async handleLoadReminder(client: Client<true>, reminder: IReminder): Promise<void> {
    if (reminder == null) return;

    if (client == null) {
      await this._reminders.delete(reminder.id);  
      return;  
    }  

    if (reminder.userId == null || reminder.userId.length == 0) {
      await this._reminders.delete(reminder.id);
      return;
    }
    
    const deadline = new Date(reminder.deadline);
    if (deadline < new Date()) {
      await ReminderScheduleService.sendReminder(client, reminder.reminder, reminder.userId, reminder.channelId, true);
      await this._reminders.delete(reminder.id);
      return;
    }

    scheduleJob(deadline, async () => {
      await ReminderScheduleService.sendReminder(client, reminder.reminder, reminder.userId, reminder.channelId);
      await this._reminders.delete(reminder.id);
    });
  }

  public async handleReminder(message: Message<boolean>, reminder: string, deadline: Date): Promise<void> {
    const client = message.client;
    if (client == null) {
      await message.reply('Unable to schedule reminder.');
      return;
    };

    if (message.channelId == null || message.channelId.length == 0) {
      await message.reply('Unable to schedule reminder.');
      return;
    }

    const reminderMessage = `<@!${message.author.id}> REMINDER: ${reminder}`;
    if (reminderMessage.length > 1990) {
      await message.reply('Reminder is too long. Please edit and try again.');
      return;
    }

    const createdReminder = await this._reminders.add({
      id: 0,
      userId: message.author.id,
      channelId: message.channelId,
      deadline: deadline.toUTCString(),
      reminder: reminderMessage
    });

    const time = new Date(createdReminder.deadline);
    scheduleJob(time, async () => {
      await ReminderScheduleService.sendReminder(message.client, reminderMessage, createdReminder.userId, createdReminder.channelId);
      await this._reminders.delete(createdReminder.id);
    });
  }

  private static async sendReminder(client: Client<true>, reminder: string, userId: string, channelId: string, isLate: boolean = false): Promise<void> {
    const channel = await client.channels.fetch(channelId);
    if (channel == null) {
      const user = await client.users.fetch(userId);
      if (user == null) return;
      await user.send(reminder);
      return;
    };

    const textChannel = channel as TextChannel;
    if (textChannel == null) {
      const user = await client.users.fetch(userId);
      if (user == null) return;
      await user.send(reminder);
      return;
    };

    const message = await textChannel.send(reminder);
    if (isLate) {
      await message.reply('This reminder was delayed. Sorry for the inconvenience.');
    }
  }
}