declare global {
  interface String {
    containsAnyWords: (this: string, ...args: string[]) => boolean;
    containsAnyPhrases: (this: string, args: string[]) => boolean;
    getFirstMatchingPhrase: (this: string, args: string[]) => string;
    isFirstWord: (this: string, startText: string) => boolean;
    stripPunctuation: (this: string) => string;
  }
}

String.prototype.containsAnyWords = function (this: string, ...args: string[]): boolean {
  if (args == null || args.length == 0) return false;

  const keywords = [] as string[];
  args.forEach(element => {
    keywords.push(element.toLocaleLowerCase());
  });

  const words = new String(this)
    .toLowerCase()
    .stripPunctuation()
    .split(' ');

  return words.some(element => keywords.indexOf(element) >= 0);
};

String.prototype.containsAnyPhrases = function (this: string, args: string[]): boolean {
  if (args == null || args.length == 0) return false;

  const keywords = [] as string[];
  args.forEach(element => {
    keywords.push(element.toLocaleLowerCase());
  });

  const invariant = this.toLowerCase();
  for (let i = 0; i < keywords.length; i++) {
    if (invariant.indexOf(keywords[i]) >= 0) return true;
  }

  return false;
};

String.prototype.getFirstMatchingPhrase = function (this: string, args: string[]): string {
  if (args == null || args.length == 0) return null;

  const keywords = [] as string[];
  args.forEach(element => {
    keywords.push(element.toLocaleLowerCase());
  });

  const invariant = this.toLowerCase();
  for (let i = 0; i < keywords.length; i++) {
    if (invariant.indexOf(keywords[i]) >= 0) return keywords[i];
  }

  return null;
};

String.prototype.isFirstWord = function (this: string, startText: string): boolean {
  if (startText == null || startText.length == 0) return false;

  const words = new String(this)
    .toLowerCase()
    .stripPunctuation()
    .split(' ');

  if (words.length < 1) return false;

  return startText.toLowerCase() == words[0];
};

String.prototype.stripPunctuation = function (this: string): string {
  return this.replace(/[.,\\/#!$%^&*;:{}=-_`~()]/g, '').replace(/\s{2,}/g, ' ');
};