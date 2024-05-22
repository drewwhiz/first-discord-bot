import { Message, MessageType } from 'discord.js';
import { expect } from 'chai';
import { GlitchCommand } from '../../../src/commands/funCommands/GlitchCommand.js';

describe('Glitch Command', () => {
    it('should trigger on glitch', () => {
        const content = 'glitch';
        const message = Message.prototype;
        message.type = MessageType.Reply;
        message.content = content;
        const command = new GlitchCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on /glitch', () => {
        const content = '/glitch';
        const message = Message.prototype;
        message.content = content;
        message.type = MessageType.Reply;
        const command = new GlitchCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on nonreply', () => {
        const content = '/glitch';
        const message = Message.prototype;
        message.content = content;
        message.type = MessageType.Default;
        const command = new GlitchCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger on glitch in the middle', () => {
        const content = 'this is a glitch';
        const message = Message.prototype;
        message.content = content;
        message.type = MessageType.Reply;
        const command = new GlitchCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});