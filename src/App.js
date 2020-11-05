import React, { Component } from 'react';
import './App.css';
import GuessNum from './GuessNum';

class App extends Component {
  state = {
    prev: [
      // {guess: 4464, hint:'+--'}
      // {guess: 9014, hint:'++-'}
    ],
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

    // console.log(secret);

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
    //console.log(secret); // mutate edilmez
    console.log(...this.state.guessNum);
    this.setState({
      guessNum: [...this.state.guessNum, ...secret],
      startGame: !stateGame,
    });
  };
  // 1195
  newGame = () => {
    // let updateArr = [...this.state.guessNum];
    // console.log(updateArr);
    // let secret = this.generateNumber();

    // // if (secret[0] === 0) {
    // //   secret[0] = Math.floor((Math.random() * 9) + 1);
    // // }

    // updateArr = [...secret]
    // console.log(updateArr);

    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let random = Math.floor(Math.random() * (numbers.length - 1 - 0 + 1));
    let secret = []; // [0]

    for (let i = 0; i < 4; i++) {
      secret.push(numbers[random]);
      numbers.splice(numbers.indexOf(numbers[random]), 1);
      random = Math.floor(Math.random() * (numbers.length - 1 - 0 + 1));
    }

    console.log(secret);
    console.log('numbers', numbers);
    // [0, 1, 8, 6] gibi gelirse 0 üretmeyen random sayı al ve sıfırıncı indise ata
    if (secret[0] === 0) {
      let val = Math.floor(Math.random() * numbers.length - 1 + 1);
      secret[0] = val;
      numbers.splice(numbers.indexOf(numbers[val]), 1); //
    }
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
        valueArr.push(parseInt(value[i])); // [2, 3, 4, 5]
      }
      // doğru basamaktaysa +
      // yanlış basamaktaysa -
      // yer almıyorsa çıktı vermeyecek

      //console.log(valueArr);
      //console.log(guessNum);

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
    //console.log(val)
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.number === '') {
        alert('en az bir değer tahmin edilmeli.');
      } else {
        this.newGame();

        this.setState({
          prev: [
            ...this.state.prev,
            { guess: this.state.number, hint: this.state.hint },
          ],
        });
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
        {
          // conditional rendering
          this.state.startGame === !true ? (
            <button onClick={() => this.startGame()}>Start Game</button>
          ) : (
            <GuessNum
              prev={this.state.prev}
              click={() => this.newGame()}
              changed={(e) => this.getNumberFromUser(e)} //properties
              val={this.state.number}
              hint={this.state.hint}
              keyPress={this.handleKeyPress}
            />
          )
        }
      </div>
    );
  }
}

export default App;
