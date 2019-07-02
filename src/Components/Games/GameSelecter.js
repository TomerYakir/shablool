import React, { Component} from "react";

import MatchWordToPic from "./MatchWordToPic";

const AVAILABLE_GAMES = [
  {key: "matchWordToPic", titles: {"en": "Match word to pic", "he": "התאמת מילה לתמונה"}, component: <MatchWordToPic />},
  {key: "completeWords", titles: {"en": "Complete words", "he": "השלמת מילים"}}
];

export default class GameSelecter extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedGame: null
    }
  }

  static defaultProps = {
    language: "en"
  }

  onSelectGame(game) {
    this.setState({
      selectedGame: game
    });
  }

  render() {
    const { selectedGame } = this.state;
    const { language } = this.props;
    if (!selectedGame) {
      return (
        <div>
          Games:
          {AVAILABLE_GAMES.map((game) => {
          return <li key={game.key} onClick={() => {this.onSelectGame(game)}} >{game.titles[language]}</li>
          })}
        </div>
      )
    } else {
      return (
        <div>
          selected game: {selectedGame.titles[language]}
          {selectedGame.component}
        </div>
      )
    }
  }
}
