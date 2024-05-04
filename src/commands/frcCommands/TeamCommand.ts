import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class TeamCommand implements ICommand {
  name: string = 'team';
  description: string = 'Gets the URL of a team\'s Blue Alliance page for the current year.';

  public trigger(message: Message): boolean {
    if (message.content.includes('.')) return false;
    if (message.content.includes(',')) return false;
    const team = Number(message.content.trim());
    return Number.isInteger(team) && team > 0;
  }

  public async execute(message: Message): Promise<void> {
    const year = new Date().getFullYear();
    const team = Number(message.content.trim());

    const reply =
      `Check out Team ${team} this season on`
      + '\n'
      + `The Blue Alliance: https://www.thebluealliance.com/team/${team}/${year}`
      + '\n'
      + `FRC Events: https://frc-events.firstinspires.org/${year}/team/${team}`
      + '\n'
      + `Statbotics: https://www.statbotics.io/team/${team}/${year}`;

    message.reply(reply);
  }
}