import { Message } from 'discord.js';
import '../../extensions/StringExtension.js';
import { ICooldownDataService } from '../../dataservices/interfaces/ICooldownDataService.js';
import { CooldownCommandBase } from '../CooldownCommandBase.js';
import { IChannelService } from '../../services/interfaces/IChannelService.js';
import { MessageUtilities } from '../../utility/MessageUtilities.js';

export class WingspanCommand extends CooldownCommandBase {
  public override readonly isSilly: boolean = true;
  public override readonly name: string = 'wingspan';
  public override readonly description: string = 'Reports the rules - to Anna specifically';

  public constructor(cooldowns: ICooldownDataService, channelService: IChannelService) {
    super(channelService, cooldowns, 24);
  }

  public override messageTrigger(message: Message): boolean {
    return message.content.toLowerCase().stripPunctuation().trim().containsAnyPhrases(['wingspan', 'wing span']);
  }

  public override async action(message: Message): Promise<void> {
    const lines = [
      [
        '**The aim of the game**',
        'To win, score the most points, by collecting food, placing birds, activating their effects and laying eggs, while keeping each round\'s goal in mind.'
      ],
      [
        '**To set up**',
        '- Lay out the card tray, shuffle the bird deck, place it nearby and turn 3 cards from the top face up.',
        '- Choose a side of the goal board to play - green has more direct competition, blue has less. Place 4 goal tiles at random on the empty squares.',
        '- Place the food and egg tokens within easy reach and drop the dice in the bird feeder.',
        '- Shuffle the bonus cards and place them face down.',
        '- Give each player a mat, 8 cubes of the same color and 1 of each food token.',
        '- Everyone draws 5 bird cards from the deck, for each you want to keep, you\'ll need to pay a food token back to the supply.',
        '- Finally draw 2 bonus cards each, these have a unique goal on, which will score you points if completed. Pick 1 to keep and discard the other.',
        '- Then, choose a starting player.'
      ],
      [
        '**To play the game**',
        'On your turn, you can take 1 of 4 actions, placing a cube on the desired space.',
      ],
      [
        '*Option 1: Play a bird*',
        'Option 1 is to play a bird from your hand.A bird\'s food cost and habitat are marked in the top left corner. The feather shows how many points its worth and underneath are the nest type and number of eggs it can hold.',
        'To place a bird, first pay its food cost to the supply. If you don\'t have the correct food, you can use any 2 food tokens to count as the 1 you need. A pie chart symbol is wild, and means any food can be used.',
        'Next, place the bird in the leftmost empty spot on the matching habitat row. If a card shows multiple habitats, you can pick which it goes in.',
        'When placing, check the egg cost above each column. The first column is free, however, placing a bird further along costs 1 or 2 eggs.',
        'Finally, if the bird you placed has a \'when played\' action, you may use it.',
      ],
      [
        '*Option 2: Gain food and activate the forest*',
        'Option 2 is to gain food and activate birds in the forest. Place your cube on the leftmost empty forest space and take the number of food tokens equal to the dice shown. Some spaces will let you discard a card from your hand to take one extra.',
        'The type of food you can take depends on what\'s available in the feeder. If a die shows multiple symbols, you can pick which one. After you\'ve chosen food, remove the corresponding dice from the feeder. If ever the feeder is empty, roll all 5 dice back into it. If, before taking food, all available dice show the same, or there\'s just 1 left, you may reroll all 5 dice into the feeder.',
        'There\'s no limit to how much food you can hold. Make sure everyone can see your food.',
        'After taking food, you may choose to activate the abilities of any birds in your forest which have the \'when activated\' text, starting from the right and moving your cube left to keep track as you go.',
      ],
      [
        '*Option 3: Lay eggs and activate the grassland*',
        'Option 3 is to lay eggs and activate birds in your grassland.',
        'Again, place your cube on the leftmost empty grassland space and gain the number of eggs from the supply.Some spaces let you pay a food token to lay 1 additional egg.',
        'Place your eggs in any order you wish on any of your birds with space in their nest. Any eggs you can\'t place must be discarded. Once placed, eggs cannot be moved, apart from when they\'re used to pay for things.',
        'After laying eggs, activate any grassland bird\'s abilities you wish, from right to left.'
      ],
      [
        '*Option 4: Draw cards and activate the wetland*',
        'Option 4 is to draw more cards and activate wetland birds.',
        'Place your cube and draw the number of cards depicted, either from the top of the deck, the face up row or both. Some spots will let you spend an egg to draw an extra card.',
        'If you take any face up cards, do not replace them until the end of your turn. There\'s no limit to the number of cards in your hand.',
        'Finally, activate any wetland birds abilities you wish, from right to left.'
      ],
      [
        '**Turn end**',
        'After you\'ve taken an action it\'s the next player\'s turn.',
        'Some birds\' abilities say \'once between turns\', these are only triggered if an opponent fulfils the requirement on them during their turn.',
        'If multiple players trigger the same ability between your turns, you only get the effect once, until you take another turn.',
        'After everyone has placed all their cubes, the round ends.',
        '- First,remove all action cubes from your board.',
        '- Next, score the end of round goal, using one of your cubes to mark your score. This means each round, you\'ll have 1 less action to take.',
        '- If players tie for a position, place both their markers on it and leave the next one blank.',
        '- If you don\'t have any of the target items for that goal, place your cube on 0.',
        '- Finally, discard the 3 face up bird cards and draw new ones.',
        '- The first player passes left and a new round begins.'
      ],
      [
        '**Game end and scoring**',
        'After 4 rounds have been played, the game ends and scoring begins.',
        '- First, score points for each bird you\'ve placed.',
        '- Then for any bonus cards you’ve completed.',
        '- Then score points for each end round goal.',
        'If goals are tied, add the points for the tied position and the empty one next to it and divide the points among the tied players, rounding down.',
        '- Score 1 point for every egg and food token cached on your bird cards',
        '- And 1 point for every card tucked underneath your birds',
        'Whoever has the most points wins!',
        'In the case of a tie, whoever has the most unused food tokens wins. If it\'s still tied, share the victory.'
      ],
      [
        'That\'s Wingspan, a game where birds of a feather are played together.'
      ]
    ];

    let response = await message.reply('Oh, Wingspan? Yeah - I know the rules. <@!996616874467008573> - listen up!');

    for (let i = 0; i < lines.length; i++) {
      const messages = MessageUtilities.generateMessages(lines[i]);
      for (let j = 0; j < messages.length; j++) {
        response = await response.reply(messages[j]);
      }
    }
  }
}
