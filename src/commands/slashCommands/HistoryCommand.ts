import { APIApplicationCommandOptionChoice, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';
import SlashCommand from '../SlashCommand.js';
import { IProgramApiWebService } from '../../webservices/interfaces/IProgramApiWebService.js';
import { MessageUtilities } from '../../utility/MessageUtilities.js';
import { IProgramDataService } from '../../dataservices/interfaces/IProgramDataService.js';
import { IFirstProgram } from '../../models/IFirstProgram.js';

export default class HistoryCommand extends SlashCommand {
  private static readonly _TEAM: string = 'team';
  private static readonly _SEASON: string = 'season';
  private static readonly _DATA: string = 'data';

  private static readonly _AWARD_OPTION = 'AWARD';
  private static readonly _MATCH_OPTION = 'MATCH';
  private static readonly _ALL_OPTION = 'BOTH';

  private readonly _programApi: IProgramApiWebService;
  private readonly _programDataService: IProgramDataService;

  public constructor(programApi: IProgramApiWebService, programDataService: IProgramDataService) {
    super('history', 'Lookup an FRC team\'s history');
    this._programApi = programApi;
    this._programDataService = programDataService;
  }

  public override async build(): Promise<SlashCommandOptionsOnlyBuilder> {  
    const dataTypes: APIApplicationCommandOptionChoice<string>[] = [
      { name: 'Awards', value: HistoryCommand._AWARD_OPTION },
      { name: 'Matches', value: HistoryCommand._MATCH_OPTION },
      { name: 'All Data', value: HistoryCommand._ALL_OPTION },
    ];

    return (await super.build())
      .addStringOption((option) =>
        option
          .setName(HistoryCommand._DATA)
          .setDescription('The types of data to return.')
          .setRequired(true)
          .setChoices(...dataTypes),
      )
      .addIntegerOption((option) =>
        option
          .setName(HistoryCommand._TEAM)
          .setDescription('The FRC Team Number')
          .setRequired(false)
          .setMinValue(1),
      )
      .addIntegerOption((option) =>
        option
          .setName(HistoryCommand._SEASON)
          .setDescription('The season to look up')
          .setRequired(false)
          .setMinValue(1989),
      );
  }
  
  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    let team = interaction.options.getInteger(HistoryCommand._TEAM);
    if (team == null) team = 10101;

    const season = interaction.options.getInteger(HistoryCommand._SEASON);

    const dataTypes = interaction.options.getString(HistoryCommand._DATA);
    const includeAwards = dataTypes == HistoryCommand._AWARD_OPTION || dataTypes == HistoryCommand._ALL_OPTION;
    const includeMatches = dataTypes == HistoryCommand._MATCH_OPTION || dataTypes == HistoryCommand._ALL_OPTION;

    await interaction.deferReply();

    const currentSeason = (await this._programDataService.getByProgram(IFirstProgram.FRC))?.current_season_year;
    if (currentSeason == null) {
      await interaction.editReply('Sorry - I couldn\'t determine the current season.');
      return;
    }

    const teamData = await this._programApi.getTeamData(team);
    if (teamData == null) {
      await interaction.editReply(`Sorry... I couldn't find data for team ${team}.`);
      return;
    }

    if (season != null && teamData.rookie_year > season) {
      await interaction.editReply(`Team ${team} did not exist during the ${season} season.`);
      return;
    }

    const lastYear = season == null ? currentSeason : season;
    const firstYear = season == null ? teamData.rookie_year : season;
    const lines: string[] = [];

    if (includeAwards) {
      const awards = (await this._programApi.getAwardsMessages(team, season)).sort((a, b) => b.year - a.year);
      const awardsByYear = Map.groupBy(awards, a => a.year);
      lines.push(`Looking at Team ${team} (${teamData.nickname})'s Award History...`);
      if (awardsByYear == null || awardsByYear.size == 0) {
        lines.push('No awards data found.');
      } else {
        for (let year = lastYear; year >= firstYear; year--) {
          const awardsInYear = awardsByYear.get(year);
          if (awardsInYear == null || awardsInYear.length == 0) {
            lines.push(`${year} - No awards.`);
            continue;
          }

          lines.push(`${year}`);
          for (const award of awardsInYear) {
            let line = `- ${award.awardName} at ${award.eventName}`;
            if (award.recipientNames != null && award.recipientNames.length > 0) line += ` for ${award.recipientNames}`;
            lines.push(line);
          }
        }
      }
    }

    if (includeMatches) {
      const matches = (await this._programApi.getMatchData(team, teamData.rookie_year, season)).sort((a,b) => b.year - a.year);
      const matchesByYear = Map.groupBy(matches, m => m.year);
      lines.push(`Looking at Team ${team} (${teamData.nickname})'s Match Records...`);
      if (matchesByYear == null || matchesByYear.size == 0) {
        lines.push('No match data found.');
      } else {
        const allTimeWins = matches.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance).length;
        const allTimeQualWins = matches.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance && m.competitionLevel == 'qm').length;
        const allTimeLosses = matches.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '').length;
        const allTimeQualLosses = matches.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '' && m.competitionLevel == 'qm').length;
        const allTimeTies = matches.filter(m => m.winningAlliance == '' && !m.isSurrogate).length;
        const allTimeQualTies = matches.filter(m => m.winningAlliance == '' && !m.isSurrogate && m.competitionLevel == 'qm').length;
      
        lines.push(`All-Time: ${allTimeWins}-${allTimeLosses}-${allTimeTies} (Quals: ${allTimeQualWins}-${allTimeQualLosses}-${allTimeQualTies}, Playoffs: ${allTimeWins-allTimeQualWins}-${allTimeLosses-allTimeQualLosses}-${allTimeTies-allTimeQualTies})`);

        for (let year = lastYear; year >= firstYear; year--) {
          const matchesInYear = matchesByYear.get(year);
          if (matchesInYear == null || matchesInYear.length == 0) {
            lines.push(`${year} - No matches.`);
            continue;
          }

          const yearWins = matchesInYear.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance).length;
          const yearQualWins = matchesInYear.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance && m.competitionLevel == 'qm').length;
          const yearLosses = matchesInYear.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '').length;
          const yearQualLosses = matchesInYear.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '' && m.competitionLevel == 'qm').length;
          const yearTies = matchesInYear.filter(m => m.winningAlliance == '' && !m.isSurrogate).length;
          const yearQualTies = matchesInYear.filter(m => m.winningAlliance == '' && !m.isSurrogate && m.competitionLevel == 'qm').length;
        
          lines.push(`${year}: ${yearWins}-${yearLosses}-${yearTies} (Quals: ${yearQualWins}-${yearQualLosses}-${yearQualTies}, Playoffs: ${yearWins-yearQualWins}-${yearLosses-yearQualLosses}-${yearTies-yearQualTies})`);

          const matchesByEvent = Map.groupBy(matchesInYear, m => m.eventKey);
          for (const eventData of matchesByEvent) {
            const [eventKey, matchesInEvent] = eventData;
            const eventWins = matchesInEvent.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance).length;
            const eventLosses = matchesInEvent.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '').length;
            const eventTies = matchesInEvent.filter(m => m.winningAlliance == '' && !m.isSurrogate).length;
          
            const eventQualWins = matchesInEvent.filter(m => !m.isSurrogate && m.winningAlliance == m.teamAlliance && m.competitionLevel == 'qm').length;
            const eventQualLosses = matchesInEvent.filter(m => !m.isSurrogate && m.winningAlliance != m.teamAlliance && m.winningAlliance != '' && m.competitionLevel == 'qm').length;
            const eventQualTies = matchesInEvent.filter(m => m.winningAlliance == '' && !m.isSurrogate && m.competitionLevel == 'qm').length;
          
            lines.push(`- ${eventKey}: ${eventWins}-${eventLosses}-${eventTies} (Quals: ${eventQualWins}-${eventQualLosses}-${eventQualTies}, Playoffs: ${eventWins-eventQualWins}-${eventLosses-eventQualLosses}-${eventTies-eventQualTies})`);
          }
        }
      }
    }

    const messages = MessageUtilities.generateMessages(lines);
    if (messages == null || messages.length == 0) {
      await interaction.editReply(`Sorry - I ran into an issue learning about Team ${team}.`);
      return;
    }

    await interaction.editReply(messages[0]);
    for (let index = 1; index < messages.length; index++) {
      await interaction.followUp(messages[index]);
    }
  }
}