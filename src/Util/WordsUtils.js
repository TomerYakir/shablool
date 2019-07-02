// getRandomWords - gets a dictionary of words, filters by level and if the words was seen and returns an array of random words
import _ from 'underscore';

export function getRandomWords(words, lang, level, seen, num) {
  return _.shuffle(Object.keys(words).filter(o =>
    words[o][lang].level >= level && !seen.includes(o)
  )).slice(0, num);
};
