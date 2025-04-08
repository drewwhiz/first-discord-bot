/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import 'mocha';
import '../../src/extensions/StringExtension.js';

describe('String Extensions', function() {
  it('should strip punctuation', function() {
    const textWithPunctuation = '.,/#!$%^&abc*;:{}=-_`~()';
    expect(textWithPunctuation.stripPunctuation()).to.equal('abc');
  });

  it('REGRESSION TEST: should leave text alone', function() {
    const text = 'Ax';
    expect(text.stripPunctuation()).to.equal('Ax');
  });

  it('should be first word', function() {
    const phrase = 'bananas are high in potassium';
    expect(phrase.isFirstWord('bananas')).to.be.true;
  });

  it('should not be first word', function() {
    const phrase = 'bananas are high in potassium';
    expect(phrase.isFirstWord('banana')).to.be.false;
  });

  it('should match first phrase - get first', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the first phrase only';
    expect(text.getFirstMatchingPhrase(phrases)).to.equal('first phrase');
  });

  it('should match second phrase - get first', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the second phrase only';
    expect(text.getFirstMatchingPhrase(phrases)).to.equal('second phrase');
  });

  it('should match no phrase - first', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains no phrase';
    expect(text.getFirstMatchingPhrase(phrases)).to.be.null;
  });

  it('should match first phrase - get any', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the first phrase only';
    expect(text.containsAnyPhrases(phrases)).to.be.true;
  });

  it('should match second phrase - get any', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the second phrase only';
    expect(text.containsAnyPhrases(phrases)).to.be.true;
  });

  it('should match no phrase - any', function() {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains no phrase';
    expect(text.containsAnyPhrases(phrases)).to.be.false;
  });

  it('should match first word', function() {
    const text = 'this text contains the first phrase only';
    expect(text.containsAnyWords('first', 'second')).to.be.true;
  });

  it('should match second word', function() {
    const text = 'this text contains the second phrase only';
    expect(text.containsAnyWords('third', 'second')).to.be.true;
  });

  it('should match no word', function() {
    const text = 'this text contains no phrase';
    expect(text.containsAnyWords('banana', 'apple')).to.be.false;
  });

  it('should capitalize nothing', function() {
    const text = '';
    expect(text.capitalize()).to.equal('');
  });

  it('should capitalize one letter', function() {
    const text = 'a';
    expect(text.capitalize()).to.equal('A');
  });

  it('should capitalize multiple letters', function() {
    const text = 'abc';
    expect(text.capitalize()).to.equal('Abc');
  });
});