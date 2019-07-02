import React, { Component} from "react";
import { Image } from 'react-bootstrap';
import _ from 'underscore';

import { getRandomWords } from '../../Util/WordsUtils';


const pics = {
  "COW": { src: "cow.png" },
  "DOG": { src: "dog.png" },
  "CAT": { src: "cat.png" },
  "DONKEY": { src: "donkey.png" },
  "HORSE": { src: "horse.png" },
  "DUCK": { src: "duck.png" },
  "ANTELOPE": { src: "antelope.png" }
};

const allWords = {
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
      "level": 1
    },
    "he": {
      "display": "ברווז",
      "level": 1
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
}

export default class MatchWordToPic extends Component{
  constructor(props) {
    super(props);
  };

  static defaultProps = {
    language: "en",
    level: 1
  };

  loadPics() {
    Object.keys(pics).forEach((pic) => {
      try {
        pics[pic].resource = require(`../../Resources/Images/${pics[pic].src}`)
      } catch (e) {

      }
    });
  };

  onWordClick(word, selected) {
    if (word === selected) {
      // TODO - implement scoring
      alert('correct!')
    } else {
      alert('incorrect!')
    }
  };

  render() {
    // TODO - handle seen
    const { language, level } = this.props;
    const words = getRandomWords(allWords, language, level, [], 4);
    const wordToShow = words[0];
    const picToShow = pics[wordToShow];
    this.loadPics();
    return (
      <div>
        <div className="col-lg-12">
          <img src={picToShow.resource} />

          {`/Resources/Images/${picToShow.src}`}
        </div>
        <div className="col-lg-12">
          <ul>
            {_.shuffle(words).map((o) => <li key={o} onClick={() => this.onWordClick(o, wordToShow)}>{allWords[o][language].display}</li> )}
          </ul>
        </div>
      </div>
    )
  }
}
