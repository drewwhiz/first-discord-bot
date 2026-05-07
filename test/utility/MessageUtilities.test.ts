import { expect } from 'chai';
import { MessageUtilities } from '../../src/utility/MessageUtilities.js';

describe('generateMessages', function() {
  it('should handle one message under max length', function() {
    let message = '';
    for (let index = 0; index < 1999; index++) {
      message += 'a';      
    }

    const messages = MessageUtilities.generateMessages([message]);
    expect(messages.length).to.equal(1);
  });

  it('should handle two messages together under max length', function() {
    let message = '';
    for (let index = 0; index < 999; index++) {
      message += 'a';      
    }

    const messages = MessageUtilities.generateMessages([message, message]);
    expect(messages.length).to.equal(1);
  });

  it('should handle two messages together over max length', function() {
    let message = '';
    for (let index = 0; index < 1001; index++) {
      message += 'a';      
    }

    const messages = MessageUtilities.generateMessages([message, message]);
    expect(messages.length).to.equal(2);
  });

  it('should handle empty list', function() {
    const messages = MessageUtilities.generateMessages([]);
    expect(messages.length).to.equal(0);
  });

  it('should any lines too long', function() {
    let message = '';
    for (let index = 0; index < 2000; index++) {
      message += 'a';      
    }

    const messages = MessageUtilities.generateMessages([message]);
    expect(messages.length).to.equal(0);
  });
});