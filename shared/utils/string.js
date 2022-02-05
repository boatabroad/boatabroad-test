const isLetterOrNumber = (char) => {
  const code = char.charCodeAt(0);
  return (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
};

const normalize = (word) =>
  word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const getNormalizedWords = (phrase = '') => {
  phrase = normalize(phrase);
  const words = [''];
  let index = 0;
  let lastWasSymbol = true;

  for (let k = 0; k < phrase.length; k += 1) {
    const char = phrase[k];
    if (isLetterOrNumber(char)) {
      lastWasSymbol = false;
      words[index] += char;
    } else if (!lastWasSymbol) {
      lastWasSymbol = true;
      index += 1;
      words[index] = '';
    }
  }
  return words;
};

export const getWordsParts = (phrase = '') => {
  const words = getNormalizedWords(phrase);
  const parts = [];
  words.forEach((word) => {
    for (let i = 1; i <= word.length; i += 1) {
      parts.push(word.substring(0, i));
    }
  });

  return [...new Set(parts)];
};
