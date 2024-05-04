import { Message } from 'discord.js';
import { BetCommand } from '../../../src/commands/funCommands/BetCommand.js';
import { expect } from 'chai';

describe('Bet Command', () => {
    it('should trigger on \'bet\'', () => {
        const content = 'bet';
        const message = Message.prototype;
        message.content = content;
        const command = new BetCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'i bet\'', () => {
        const content = 'i bet';
        const message = Message.prototype;
        message.content = content;
        const command = new BetCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'bet? sure\'', () => {
        const content = 'bet? sure';
        const message = Message.prototype;
        message.content = content;
        const command = new BetCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on \'better\'', () => {
        const content = 'better';
        const message = Message.prototype;
        message.content = content;
        const command = new BetCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});