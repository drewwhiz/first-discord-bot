import { Message } from 'discord.js';
import { expect } from 'chai';
import { AcronymHelperCommand } from '../../../src/commands/utilityCommands/AcronymHelperCommand.js';
import { IAcronymDataService } from '../../../src/dataservices/interfaces/IAcronymDataService.js';
import { AcronymDataService } from '../../../src/dataservices/AcronymDataService.js';
import * as sinon from 'ts-sinon';
import { IAcronym } from '../../../src/models/IAcronym.js';

const stubObject = sinon.stubObject;

describe('Acronym Helper Command', function() {
  it('should trigger on found', function() {
    const content = '?';
    const message = Message.prototype;
    message.content = content;

    const service = new AcronymDataService(null);
    const mock = stubObject<IAcronymDataService>(service);
    mock.get.returns(new Promise<IAcronym>((r) => r));
        
    const command = new AcronymHelperCommand(mock, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.true;
  });

  it('should not trigger on not found', function() {
    const content = '?';
    const message = Message.prototype;
    message.content = content;

    const service = new AcronymDataService(null);
    const mock = stubObject<IAcronymDataService>(service);
    mock.get.returns(null);
        
    const command = new AcronymHelperCommand(mock, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });

  it('should not trigger without question', function() {
    const content = 'banana';
    const message = Message.prototype;
    message.content = content;
        
    const command = new AcronymHelperCommand(null, null);
    const result = command.messageTrigger(message);
    expect(result).to.be.false;
  });
});