import { expect } from 'chai';
import 'mocha';
import '../../src/extensions/StringExtension.js';

describe('String Extensions', () => {
  it('should strip punctuation', () => {
    const textWithPunctuation = '.,/#!$%^&abc*;:{}=-_`~()';
    expect(textWithPunctuation.stripPunctuation()).to.equal('abc');
  });

  it('REGRESSION TEST: should leave text alone', () => {
    const text = 'Ax';
    expect(text.stripPunctuation()).to.equal('Ax');
  });

  it('should be first word', () => {
    const phrase = 'bananas are high in potassium';
    expect(phrase.isFirstWord('bananas')).to.be.true;
  });

  it('should not be first word', () => {
    const phrase = 'bananas are high in potassium';
    expect(phrase.isFirstWord('banana')).to.be.false;
  });

  it('should match first phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the first phrase only';
    expect(text.getFirstMatchingPhrase(phrases)).to.equal('first phrase');
  });

  it('should match second phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the second phrase only';
    expect(text.getFirstMatchingPhrase(phrases)).to.equal('second phrase');
  });

  it('should match no phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains no phrase';
    expect(text.getFirstMatchingPhrase(phrases)).to.be.null;
  });

  it('should match first phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the first phrase only';
    expect(text.containsAnyPhrases(phrases)).to.be.true;
  });

  it('should match second phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains the second phrase only';
    expect(text.containsAnyPhrases(phrases)).to.be.true;
  });

  it('should match no phrase', () => {
    const phrases = ['first phrase', 'second phrase'];
    const text = 'this text contains no phrase';
    expect(text.containsAnyPhrases(phrases)).to.be.false;
  });

  it('should match first word', () => {
    const text = 'this text contains the first phrase only';
    expect(text.containsAnyWords('first', 'second')).to.be.true;
  });

  it('should match second word', () => {
    const text = 'this text contains the second phrase only';
    expect(text.containsAnyWords('third', 'second')).to.be.true;
  });

  it('should match no word', () => {
    const text = 'this text contains no phrase';
    expect(text.containsAnyWords('banana', 'apple')).to.be.false;
  });
});