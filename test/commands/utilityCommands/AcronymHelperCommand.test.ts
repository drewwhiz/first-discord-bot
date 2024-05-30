import { Message } from 'discord.js';
import { expect } from 'chai';
import { AcronymHelperCommand } from '../../../src/commands/utilityCommands/AcronymHelperCommand.js';
import { IAcronymDataService } from '../../../src/dataservices/interfaces/IAcronymDataService.js';
import { AcronymDataService } from '../../../src/dataservices/AcronymDataService.js';
import * as sinon from "ts-sinon";
import { IAcronym } from '../../../src/models/IAcronym.js';

const stubObject = sinon.stubObject;

describe('Acronym Helper Command', () => {

    it('should trigger on found', () => {
        const content = '?';
        const message = Message.prototype;
        message.content = content;

        const service = new AcronymDataService(null);
        const mock = stubObject<IAcronymDataService>(service);

        const acronym = {acronym: '', explanation: '', caseSensitive : false} as IAcronym;
        mock.get.returns(new Promise<IAcronym>((res, rej) => acronym));
        
        const command = new AcronymHelperCommand(mock);
        const result = command.trigger(message);
        expect(result).to.be.true;
    });

    it('should not trigger on not found', () => {
        const content = '?';
        const message = Message.prototype;
        message.content = content;

        const service = new AcronymDataService(null);
        const mock = stubObject<IAcronymDataService>(service);
        mock.get.returns(null);
        
        const command = new AcronymHelperCommand(mock);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });

    it('should not trigger without question', () => {
        const content = 'banana';
        const message = Message.prototype;
        message.content = content;
        
        const command = new AcronymHelperCommand(null);
        const result = command.trigger(message);
        expect(result).to.be.false;
    });
});