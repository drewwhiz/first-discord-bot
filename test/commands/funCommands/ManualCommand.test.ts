import { Message } from 'discord.js';
import { expect } from 'chai';
import { ManualCommand } from '../../../src/commands/funCommands/ManualCommand.js';

describe('Manual Command', () => {
    it('should trigger on \'rtm\'', () => {
        const content = 'this contains RTM and others';
        const message = Message.prototype;
        message.content = content;
        const command = new ManualCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'rtfm\'', () => {
        const content = 'this contains RTFM and others';
        const message = Message.prototype;
        message.content = content;
        const command = new ManualCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger without phrase', () => {
        const content = 'this contains no key phrase';
        const message = Message.prototype;
        message.content = content;
        const command = new ManualCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });


});