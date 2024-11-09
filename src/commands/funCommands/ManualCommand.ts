import { Message, TextChannel } from 'discord.js';
import { IMessageCommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';

export class ManualCommand implements IMessageCommand {
  private readonly frcManual: string = 'https://www.firstinspires.org/resource-library/frc/competition-manual-qa-system';
  private readonly ftcManual: string = 'https://www.firstinspires.org/resource-library/ftc/game-and-season-info';
  private readonly fllChallengeManual: string = 'https://www.firstinspires.org/resource-library/fll/challenge/challenge-and-resources';
  private readonly fllExploreManual: string = 'https://www.firstinspires.org/resource-library/fll/explore/challenge-and-resources';

  public readonly name: string = 'manual';
  public readonly description: string = 'Tells people to read the manual.';

  private getText(content: string): string {
    const invariant = content.toLowerCase();
    if (invariant.containsAnyWords('rtfm')) return 'rtfm';
    if (invariant.containsAnyWords('rtm')) return 'rtm';

    return null;
  }

  public trigger(message: Message): boolean {
    return this.getText(message?.content) != null;
  }

  public async execute(message: Message): Promise<void> {
    const channel = message.channel as TextChannel;
    if (channel == null) return;

    const acronym = this.getText(message?.content);
    const text = acronym === 'rtm' ? '(R)EAD (T)HE (M)ANUAL' : '(R)EAD (T)HE (F)IRST (M)ANUAL';
    const messageContent = `In case that wasn't clear, you should probably ${text}!`
      + '\n'
      + `FRC: <${this.frcManual}>`
      + '\n'
      + `FTC: <${this.ftcManual}>`
      + '\n'
      + `FLL Challenge: <${this.fllChallengeManual}>`
      + '\n'
      + `FLL Explore: <${this.fllExploreManual}>`;

    channel.send(messageContent);
  }
}
