import { Message } from 'discord.js';
import { StopCommand } from '../../../src/commands/funCommands/StopCommand.js';
import { expect } from 'chai';

describe('Stop Command', () => {
    it('should trigger on \'Stop\'', () => {
        const content = 'Stop';
        const message = Message.prototype;
        message.content = content;
        const command = new StopCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on \'i Stop\'', () => {
        const content = 'i Stop';
        const message = Message.prototype;
        message.content = content;
        const command = new StopCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should trigger on \'Stop?\'', () => {
        const content = 'Stop?';
        const message = Message.prototype;
        message.content = content;
        const command = new StopCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on \'Stopter\'', () => {
        const content = 'Stopter';
        const message = Message.prototype;
        message.content = content;
        const command = new StopCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});