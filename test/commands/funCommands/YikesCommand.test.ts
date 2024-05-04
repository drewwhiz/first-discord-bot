import { Message } from 'discord.js';
import { expect } from 'chai';
import { YikesCommand } from '../../../src/commands/funCommands/YikesCommand.js';

describe('Yikes Command', () => {
    it('should trigger on \'yikes\'', () => {
        const content = 'yIkEs';
        const message = Message.prototype;
        message.content = content;
        const command = new YikesCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on message with other words', () => {
        const content = 'yIkEs is the key word for this command';
        const message = Message.prototype;
        message.content = content;
        const command = new YikesCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

});