import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { RandomRollCase } from '../../enum/RandomRollCase.js';
import { IRandomNumberService } from '../../services/interfaces/IRandomNumberService.js';

export class RandomCommand implements ICommand {
  private static readonly FLIP_COUNT_REGEX = /^flip [1-9][0-9]*$/;
  private static readonly ROLL_COUNT_REGEX = /^roll [1-9][0-9]*(\s[1-9][0-9]*)?$/;
  // TODO: dice private static readonly ROLL_DICE_REGEX = /^roll d(2|4|6|8|10|12|20|100)(\s[1-9][0-9]*)?$/;

  public name: string = 'random';
  public description: string = 'Sends some generated random number data.';
  private readonly _random: IRandomNumberService;

  constructor(random: IRandomNumberService) {
    this._random = random;
  }

  private getRollType(content: string): RandomRollCase {
    let invariant = content.toLowerCase().trim();
    if (invariant.startsWith('/')) invariant = invariant.substring(1);
    if (invariant == 'flip') return RandomRollCase.SIMPLE_FLIP;
    if (invariant == 'roll') return RandomRollCase.SIMPLE_ROLL;
    if (RandomCommand.FLIP_COUNT_REGEX.test(invariant)) return RandomRollCase.COUNT_FLIP;
    if (RandomCommand.ROLL_COUNT_REGEX.test(invariant)) return RandomRollCase.COUNT_ROLL;
    // TODO: dice if (RandomCommand.ROLL_DICE_REGEX.test(invariant)) return RandomRollCase.DICE_ROLL;
    return null;
  }

  public trigger(message: Message): boolean {
    if (message == null) return false;
    if (message.content == null) return false;
    return this.getRollType(message.content) != null;
  }

  public async execute(message: Message): Promise<void> {
    const rollType = this.getRollType(message.content);
    if (rollType == null) return;

    switch (rollType) {
    case RandomRollCase.SIMPLE_FLIP:
      await this._random.simpleFlipReply(message);
      break;
    case RandomRollCase.SIMPLE_ROLL:
      await this._random.simpleRollReply(message);
      break;
    case RandomRollCase.COUNT_FLIP:
      await this._random.countFlipReply(message);
      break;
    case RandomRollCase.COUNT_ROLL:
      await this._random.countRollReply(message);
      break;
    case RandomRollCase.DICE_ROLL:
      // TODO: dice roll.
      break;
    }
  }
}
