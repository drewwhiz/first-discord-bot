import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';
import { MessageCommand } from '../MessageCommand.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';

export class RoshamboCommand extends MessageCommand {
  public readonly isSilly: boolean = true;
  public readonly name: string = 'roshambo';
  public readonly description: string = 'Plays rock-paper-scissors.';

  private readonly _random: IRandomNumberService;

  private static readonly PAPER_EMOJI: string[] = ['📝', '📄', '📃', '📑', '📜', '📰', '🗞️'];
  private static readonly ROCK_EMOJI: string[] = ['🪨', '🗿'];
  private static readonly SCISSORS_EMOJI: string[] = ['✂️', '✁', '✃', '✄', '✂'];

  public constructor(random: IRandomNumberService, channelService: IChannelService) {
    super(channelService);
    this._random = random;
  }

  public override messageTrigger(message: Message): boolean {
    if (RoshamboCommand.PAPER_EMOJI.some(e => message.content.includes(e))) return true;
    if (RoshamboCommand.ROCK_EMOJI.some(e => message.content.includes(e))) return true;
    if (RoshamboCommand.SCISSORS_EMOJI.some(e => message.content.includes(e))) return true;
    return false;
  }

  public override async execute(message: Message): Promise<void> {
    const content = message.content;

    let rockContent = content;
    for (let i = 0; i < RoshamboCommand.ROCK_EMOJI.length; i++) {
      rockContent = rockContent.replace(RoshamboCommand.ROCK_EMOJI[i], '🪨');
    }

    let paperContent = content;
    for (let i = 0; i < RoshamboCommand.PAPER_EMOJI.length; i++) {
      paperContent = paperContent.replace(RoshamboCommand.PAPER_EMOJI[i], '📄');
    }

    let scissorsContent = content;
    for (let i = 0; i < RoshamboCommand.SCISSORS_EMOJI.length; i++) {
      scissorsContent = scissorsContent.replace(RoshamboCommand.SCISSORS_EMOJI[i], '✂️');
    }

    const rocks = [...rockContent.matchAll(new RegExp('🪨', 'g'))].map(m => m.index).flat().map(i => { return { index: i, value: '🪨' }; });
    const papers = [...paperContent.matchAll(new RegExp('📄', 'g'))].map(m => m.index).flat().map(i => { return { index: i, value: '📄' }; });
    const scissorses = [...scissorsContent.matchAll(new RegExp('✂️', 'g'))].map(m => m.index).flat().map(i => { return { index: i, value: '✂️' }; });

    const opponentRolls = rocks.concat(papers).concat(scissorses).sort(i => i.index);
    const playCount = rocks.length + papers.length + scissorses.length;

    const myRolls = this._random.getMultipleRolls(3, playCount).map(r => {
      switch (r) {
      case 1: return '📄';
      case 2: return '🪨';
      case 3: return '✂️';
      default: return ''; // should never happen
      }
    });

    let results = '';
    for (let i = 0; i < myRolls.length; i++) {
      if (
        (myRolls[i] == '📄' && opponentRolls[i].value == '🪨')
        || (myRolls[i] == '🪨' && opponentRolls[i].value == '✂️')
        || (myRolls[i] == '✂️' && opponentRolls[i].value == '📄')
      ) {
        results += ('W');
      } else if (
        (myRolls[i] == '🪨' && opponentRolls[i].value == '📄')
        || (myRolls[i] == '✂️' && opponentRolls[i].value == '🪨')
        || (myRolls[i] == '📄' && opponentRolls[i].value == '✂️')
      ) {
        results += ('L');
      } else {
        results += ('T');
      }
    }

    const wins = (results.match(/W/g) || []).length;
    const losses = (results.match(/L/g) || []).length;
    const ties = (results.match(/T/g) || []).length;

    const myReply = await message.reply(myRolls.join(''));
    if (playCount === 1) {
      await myReply.reply(wins === 1 ? 'I won!' : (losses === 1 ? 'I lost...' : 'It\'s a draw!'));
      return;
    }

    await myReply.reply(
      `Looks like I won ${wins} time${wins === 1 ? '' : 's'}, `
      + `lost ${losses} time${losses === 1 ? '' : 's'}, `
      + `and we tied ${ties} time${ties === 1 ? '' : 's'}.`
    );
  }
}
