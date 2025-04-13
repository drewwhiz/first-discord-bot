import { ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { IFirstPublicApiWebService } from '../../webservices/interfaces/IFirstPublicApiWebService.js';
import { IFirstProgram } from '../../models/IFirstProgram.js';

export default class TeamCommand extends SlashCommand {
  private static readonly _TEAM: string = 'team';
  private static readonly _PROGRAM: string = 'program';

  private static readonly _FRC: string = 'FRC';
  private static readonly _FTC: string = 'FTC';

  private readonly _firstPublicApi: IFirstPublicApiWebService;

  public constructor(firstPublicApi: IFirstPublicApiWebService) {
    super('team', 'Lookup a FIRST team');
    this._firstPublicApi = firstPublicApi;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {    
    return (await super.build())
      .addStringOption(option =>
        option
          .setName(TeamCommand._PROGRAM)
          .setDescription('The FIRST program')
          .setRequired(true)
          .setChoices(
            { name: TeamCommand._FRC, value: TeamCommand._FRC },
            { name: TeamCommand._FTC, value: TeamCommand._FTC }
          )
      )
      .addIntegerOption(option => 
        option
          .setName(TeamCommand._TEAM)
          .setDescription('The team to look up')
          .setRequired(true)
          .setMinValue(1)
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let year = await this._firstPublicApi.getCurrentSeason(IFirstProgram.FRC, false);
    const team = interaction.options.getInteger(TeamCommand._TEAM);
    const program = interaction.options.getString(TeamCommand._PROGRAM);
    if (team == null) return;
    if (program == null) return;

    if (program != TeamCommand._FRC) year -= 1;

    const reply = TeamCommand.getReply(team, year, program);
    if (reply == null) return;
    await interaction.reply(reply);
  }

  private static getReply(team: number, year: number, program: string): string {
    switch (program) {
    case this._FRC:
      return this.getFRCReply(team, year);
    case this._FTC:
      return this.getFTCReply(team, year);
    default:
      return null;
    }
  }

  private static getFRCReply(team: number, year: number): string {
    return `Check out Team ${team} this season (${year}) on`
    + '\n'
    + `- The Blue Alliance: <https://www.thebluealliance.com/team/${team}/${year}>`
    + '\n'
    + `- FRC Events: <https://frc-events.firstinspires.org/${year}/team/${team}>`
    + '\n'
    + `- Statbotics: <https://www.statbotics.io/team/${team}/${year}>`
    + '\n\n'
    + `If data for the current season is not yet available, you can also try last season (${year - 1}) on`
    + '\n'
    + `- The Blue Alliance: <https://www.thebluealliance.com/team/${team}/${year - 1}>`
    + '\n'
    + `- FRC Events: <https://frc-events.firstinspires.org/${year - 1}/team/${team}>`
    + '\n'
    + `- Statbotics: <https://www.statbotics.io/team/${team}/${year - 1}>`;
  }

  private static getFTCReply(team: number, year: number): string {
    return `Check out Team ${team} this season (${year}) on`
    + '\n'
    + `- The Orange Alliance: <https://www.theorangealliance.com/teams/${team}>`
    + '\n'
    + `- FTC Events: <https://ftc-events.firstinspires.org/${year}/team/${team}>`
    + '\n\n'
    + `If data for the current season is not yet available, you can also try last season (${year - 1}) on`
    + '\n'
    + `- FTC Events: <https://ftc-events.firstinspires.org/${year - 1}/team/${team}>`;
  }
}