import { Message } from 'discord.js';
import { expect } from 'chai';
import { DanceCommand } from '../../../src/commands/funCommands/DanceCommand.js';

describe('Dance Command', () => {
    it('should trigger on \'frc dance\'', () => {
        const content = 'frc dance';
        const message = Message.prototype;
        message.content = content;
        const command = new DanceCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should NOT trigger on only contains \'frc dance\'', () => {
        const content = 'this message includes frc dance and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new DanceCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});