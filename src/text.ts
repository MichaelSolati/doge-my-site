import pluralize from 'pluralize';

class Dogeify {
  ADJECTIVES = 'so such very much many how'.split(' ');
  EMOTIONS = 'wow amaze excite'.split(' ');
  forbiddenPhrases = ['re', 've', '/'];
  allNouns: string[] = [];
  ignore: string[] = [];

  getSentences(str: string) {
    const acceptedPunctuations = ['.', '!', '?'];
    if (!acceptedPunctuations.includes(str[str.length - 1])) {
      str += '.';
    }

    let sentences: string[] | null = str.toLowerCase().match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length) {
      sentences = sentences.map(sentence => {
        if (sentence && sentence[0] === ' ') {
          return sentence.slice(1);
        }
        return sentence;
      });
    }
    return sentences;
  }

  isWordForbidden(word: string) {
    return (
      this.forbiddenPhrases.includes(word) ||
      !!(this.ignore && this.ignore.includes(word))
    );
  }

  getNouns(sentence: string) {
    return sentence
      .split(/\/| /g)
      .map(word => word.replace(/[^a-zA-Z0-9\-']+/g, ''))
      .filter(
        word => this.allNouns.includes(word) && !this.isWordForbidden(word),
      );
  }

  /**
   * @param {String} word
   * @returns {String}
   * @description Replaces some common word parts into dogespeak
   */
  correctSpelling(word: string) {
    return word
      .replace(/er$/, 'ar')
      .replace('ph', 'f')
      .replace('cious', 'shus')
      .replace('stion', 'schun')
      .replace('tion', 'shun')
      .replace('doge', 'dog')
      .replace('dog', 'doge');
  }

  getAdjective() {
    const idx = Math.floor(Math.random() * this.ADJECTIVES.length);
    return this.ADJECTIVES[idx];
  }

  getEmotion() {
    const idx = Math.floor(Math.random() * this.EMOTIONS.length);
    return this.EMOTIONS[idx];
  }

  fixPhrases(phrases: string[]) {
    return phrases.map(phrase => {
      let newPhrase = this.correctSpelling(phrase);
      newPhrase = `${this.getAdjective()} ${newPhrase}.`;
      return newPhrase;
    });
  }

  async fillNouns() {
    try {
      const result = await chrome.storage.local.get(['nounList']);
      if (result.nounList) {
        const nouns: string[] = result.nounList.split('\n');
        this.allNouns = [...nouns, ...nouns.map(n => pluralize(n))];
      } else {
        console.error('Noun list not found in local storage.');
      }
    } catch (err) {
      console.error('Error retrieving noun list from local storage:', err);
    }
  }

  async init(str: string, opts: {ignore: string[]} = {ignore: []}) {
    if (opts) {
      Object.assign(this, opts);
    }

    await this.fillNouns();

    let sentences = this.getSentences(str);
    if (!sentences) {
      sentences = [];
    }
    if (sentences.length) {
      sentences = sentences.map(sentence => {
        let nouns = this.getNouns(sentence);
        if (nouns && nouns.length) {
          nouns = this.fixPhrases(nouns);
        } else {
          nouns = [];
        }
        nouns.push(`${this.getEmotion()}.`);
        return nouns.join(' ');
      });
    } else {
      sentences.push(`${this.getEmotion()}.`);
    }

    return sentences.join(' ');
  }
}

const dogeify = (str: string) => new Dogeify().init(str);

function color(): string {
  const colors: string[] = ['red', 'green', 'blue', 'pink', 'orange', 'yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
}

async function text() {
  const tags: HTMLElement[] = [
    ...Array.from(document.getElementsByTagName('h1')),
    ...Array.from(document.getElementsByTagName('h2')),
    ...Array.from(document.getElementsByTagName('h3')),
    ...Array.from(document.getElementsByTagName('h4')),
    ...Array.from(document.getElementsByTagName('h5')),
    ...Array.from(document.getElementsByTagName('h6')),
    ...Array.from(document.getElementsByTagName('p')),
  ];

  for (const tag of tags) {
    const texts: string[] = [];
    const sentences = tag.innerText.split('([^ ]+ [^ ]+) ');
    for (const code of sentences) {
      const subSentences = code.split(/(?<=["!?.])/);
      for (const text of subSentences) {
        const dogeText = isNaN(Number(text)) ? await dogeify(text) : text;
        texts.push(`<span style="color: ${color()};">${dogeText}</span>`);
      }
    }
    tag.innerHTML = texts.join(' ');
  }
}

void text();
