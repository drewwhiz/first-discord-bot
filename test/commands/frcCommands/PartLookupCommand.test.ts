import { Message } from 'discord.js';
import { expect } from 'chai';
import { PartLookupCommand } from '../../../src/commands/frcCommands/PartLookupCommand.js';

describe('Part Lookup Command', () => {
    it('should trigger on AM', () => {
        const content = 'AM-1';
        const message = Message.prototype;
        message.content = content;

        const command = new PartLookupCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on REV', () => {
        const content = 'REV-1';
        const message = Message.prototype;
        message.content = content;

        const command = new PartLookupCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on WCP', () => {
        const content = 'WCP-1';
        const message = Message.prototype;
        message.content = content;

        const command = new PartLookupCommand();
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on prefix only', () => {
        const content = 'WCP-';
        const message = Message.prototype;
        message.content = content;

        const command = new PartLookupCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on no prefix', () => {
        const content = 'W C P - 1';
        const message = Message.prototype;
        message.content = content;

        const command = new PartLookupCommand();
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});