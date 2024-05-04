import { ICommand } from '../ICommand.js';
import { Message } from 'discord.js';

export class TeamCommand implements ICommand {
  name: string = 'team';
  description: string = 'Gets the URL of a team\'s Blue Alliance page for the current year.';

  public trigger(message: Message): boolean {
    let team = Number(message.content.trim());
    return Number.isInteger(team) && team > 0;
  }

  public async execute(message: Message, args: string[]): Promise<void> {
    let year = new Date().getFullYear();
    let team = Number(message.content.trim());

    let reply = `Check out Team ${team} this season on The Blue Alliance: https://www.thebluealliance.com/team/${team}/${year}`;
    message.reply(reply);
  }
}