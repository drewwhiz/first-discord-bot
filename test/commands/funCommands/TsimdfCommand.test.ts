import { Message } from 'discord.js';
import { expect } from 'chai';
import { TsimfdCommand } from '../../../src/commands/funCommands/TsimfdCommand.js';

describe('TSIMFD Command', () => {
    it('should trigger on \'cool\'', () => {
        const content = 'this message includes CoOl and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new TsimfdCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'awesome\'', () => {
        const content = 'this message includes AwEsOmE and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new TsimfdCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'neat\'', () => {
        const content = 'this message includes nEaT and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new TsimfdCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should trigger on \'dope\'', () => {
        const content = 'this message includes dOpE and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new TsimfdCommand();

        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on \'coolest\'', () => {
        const content = 'this message includes coolest and other words';
        const message = Message.prototype;
        message.content = content;
        const command = new TsimfdCommand();

        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});