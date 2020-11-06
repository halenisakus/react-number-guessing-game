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
    let secret = [];

    for (let i = 0; i < 4; i++) {
      secret.push(numbers[random]);
      numbers.splice(numbers.indexOf(numbers[random]), 1);
      random = Math.floor(Math.random() * (numbers.length - 1 - 0 + 1));
    }

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
    this.setState({
      guessNum: [...this.state.guessNum, ...secret],
      startGame: !stateGame,
    });
  };

  newGame = () => {
    let secret = this.generateNumber();
    this.setState({
      guessNum: [...secret],
      number: '',
      hint: '',
      prev: [],
    });
  };

  getNumberFromUser = (e) => {
    let value = e.target.value;
    let guessNum = this.state.guessNum;
    let hintState = '';
    let valueArr = [];

    if (!isNaN(parseInt(value))) {
      for (let i = 0; i < value.length; i++) {
        valueArr.push(parseInt(value[i]));
      }
      for (let i = 0; i < 4; i++) {
        if (valueArr[i] === guessNum[i]) {
          hintState += '+';
        } else if (guessNum.includes(valueArr[i])) {
          hintState += '-';
        }
      }

      this.setState({
        number: parseInt(value),
        hint: hintState,
      });
    } else {
      this.setState({
        number: '',
        hint: '',
      });
    }
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.number === '') {
        alert('Enter a 4-digits number please');
      } else {
        if (this.state.number.toString().length < 4) {
          alert('The must be 4-digits');
        } else {
          if (this.state.hint.includes('-')) {
            this.setState({
              prev: [
                ...this.state.prev,
                { guess: this.state.number, hint: this.state.hint },
              ],
              number: '',
              hint: '',
            });
          } else {
            alert('Congratulations!.Right guess.New game is starting...');
            this.newGame();
          }
        }
      }
    }
  };

  render() {
    return (
      <div className="App">
        <div className="title">Number Guessing Game</div>
        <div className="definition">
          Random number selected 4-digits.You will get hint for your guess.
        </div>
        {this.state.startGame === !true ? (
          <button onClick={() => this.startGame()}>Start Game</button>
        ) : (
          <GuessNum
            prev={this.state.prev}
            click={() => this.newGame()}
            changed={(e) => this.getNumberFromUser(e)}
            val={this.state.number}
            hint={this.state.hint}
            keyPress={this.handleKeyPress}
          />
        )}
      </div>
    );
  }
}
export default App;
