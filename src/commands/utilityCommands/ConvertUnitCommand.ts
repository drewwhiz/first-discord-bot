import { Message } from 'discord.js';
import { ICommand } from '../ICommand.js';
import '../../extensions/StringExtension.js';
import { Unit, convertMany } from 'convert';
import winston from 'winston';

const { debug } = winston;

export class ConvertUnitCommand implements ICommand {
  private static readonly CONVERT_WORD = 'convert';
  private static readonly TO_WORD = ' to ';
  private static readonly CONVERT_REGEX = /^convert .* to .*$/;

  public name: string = 'convert';
  public description: string = 'converts units';

  public trigger(message: Message): boolean {
    const content = message.content.toLowerCase().trim();
    return ConvertUnitCommand.CONVERT_REGEX.test(content);
  }

  public async execute(message: Message): Promise<void> {
    const trimmedContent = message.content.trim();
    const postConvert = trimmedContent.substring(ConvertUnitCommand.CONVERT_WORD.length).trim();
    const toIndex = postConvert.toLowerCase().indexOf(ConvertUnitCommand.TO_WORD);
    if (toIndex <= 0) return;

    const originalFirstPhrase = postConvert.substring(0, toIndex).trim();

    const parsedFirst = originalFirstPhrase.replaceAll(/\s/g, '').replaceAll('^', '').trim();
    const secondPhrase = postConvert.substring(toIndex + ConvertUnitCommand.TO_WORD.length).replaceAll(/\s/g, '').replaceAll('^', '').trim();

    try {
      const result = Math.round(100000 * convertMany(parsedFirst).to(secondPhrase as Unit)) / 100000;
      await message.reply(`${originalFirstPhrase} is equivalent to ${result} ${secondPhrase}`);
    } catch (e) {
      debug(e);
      return;
    }
  }
}
