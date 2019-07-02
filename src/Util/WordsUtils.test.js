import { getRandomWords } from './WordsUtils';

describe('when running with empty words', () => {
  test('it returns an empty array', () => {
    expect(getRandomWords({}, 'en', 1, ['COW'], 4)).toStrictEqual([]);
  });
});

describe('when running with a list of words', () => {
  let words;
  beforeEach(() => {
    words = {
      "COW": {
        "en": {
          "display": "Cow",
          "level": 1
        },
        "he": {
          "display": "פרה",
          "level": 1
        }
      },
      "DOG": {
        "en": {
          "display": "Dog",
          "level": 1
        },
        "he": {
          "display": "כלב",
          "level": 1
        }
      },
      "CAT": {
        "en": {
          "display": "Cat",
          "level": 1
        },
        "he": {
          "display": "חתול",
          "level": 1
        }
      },
      "DONKEY": {
        "en": {
          "display": "Donkey",
          "level": 1
        },
        "he": {
          "display": "חמור",
          "level": 1
        }
      },
      "HORSE": {
        "en": {
          "display": "Horse",
          "level": 1
        },
        "he": {
          "display": "סוס",
          "level": 1
        }
      },
      "DUCK": {
        "en": {
          "display": "Duck",
          "level": 2
        },
        "he": {
          "display": "ברווז",
          "level": 2
        }
      },
      "ANTELOPE": {
        "en": {
          "display": "Antelope",
          "level": 2
        },
        "he": {
          "display": "אנטילופה",
          "level": 2
        }
      }
    };
  });

  test('words to be filtered by level and seen', () => {
    const result = getRandomWords(words, 'en', 2, ['ANTELOPE'], 4);
    expect(result[0]).toBe('DUCK');
  });

  test('words to be randomized', () => {
    const resultOne = getRandomWords(words, 'en', 1, [], 4);
    const resultTwo = getRandomWords(words, 'en', 1, [], 4);
    expect(resultOne.length).toBe(4);
    expect(resultTwo.length).toBe(4);
    // this could be flaky
    expect(resultOne).not.toEqual(expect.arrayContaining(resultTwo));
  });


});
