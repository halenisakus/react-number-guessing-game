import React, { Component } from 'react';
import './App.css';
import GuessNum from './GuessNum';

class App extends Component {
  state = {
    prev: [],
    guessNum: [],
    number: '',
    hint: '',
    startGame: false,
  };
  generateNumber = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let random = Math.floor(Math.random() * (numbers.length - 1 - 0 + 1));
    let secret = []; // [0]

    for (let i = 0; i < 4; i++) {
      secret.push(numbers[random]);
      numbers.splice(numbers.indexOf(numbers[random]), 1);
      random = Math.floor(Math.random() * (numbers.length - 1 - 0 + 1));
    }

    //console.log(secret);

    // [0, 1, 8, 6] gibi gelirse 0 üretmeyen random sayı al ve sıfırıncı indise ata
    if (secret[0] === 0) {
      let val = Math.floor(Math.random() * numbers.length - 1 + 1);
      secret[0] = val;
      numbers.splice(numbers.indexOf(numbers[val]), 1); //
    }
    return secret;
  };
  startGame = () => {
    const stateGame = this.state.startGame;
    let secret = this.generateNumber();
    console.log(...this.state.guessNum);
    this.setState({
      guessNum: [...this.state.guessNum, ...secret],
      startGame: !stateGame,
    });
  };
  // 1195
  render() {
    return (
      <div className="App">
        {
          // conditional rendering
          this.state.startGame === !true ? (
            <button onClick={() => this.startGame()}>Yeni Oyun</button>
          ) : (
            <GuessNum />
          )
        }
      </div>
    );
  }
}

export default App;
