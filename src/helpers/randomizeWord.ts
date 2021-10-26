const shuffleWord = (word: string) => {
  if (word.length < 4) return word;
  const first = word.slice(0, 1);
  const middle = word.slice(1, -1);
  const last = word.slice(-1);
  const shuffled = middle
    .split('')
    .sort(() => 0.1 - Math.random())
    .join('');
  return first + shuffled + last;
};

export const processSentence = (sentence: string) =>
  sentence
    .split(/("[^"]+"|[^"\s]+)/g)
    .map(shuffleWord)
    .join('');

export const finalSentence = (sentence: string) => {
  const words = sentence.split(' ');
  for (var i = 0; i < words.length - 1; i++) {
    words[i] += ' ';
  }
  return words;
};
