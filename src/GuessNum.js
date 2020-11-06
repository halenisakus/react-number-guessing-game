import React, { Component } from 'react';
import './App.css';

class GuessNum extends Component {
  render() {
    return (
      <>
        <h3>Your Guess: </h3>
        <div>
          <input
            type="text"
            maxLength="4"
            placeholder="Enter a number"
            onChange={this.props.changed}
            onKeyPress={this.props.keyPress}
            value={this.props.val}
          />
        </div>
        <h3>Previous Guesses: </h3>
        <div className="prevGuess">
          <p>
            {this.props.val} | <b>{this.props.hint}</b>{' '}
          </p>
          {this.props.prev.reverse().map((p) => {
            return (
              <p key={Math.random()}>
                {p.guess} | <b>{p.hint}</b>
              </p>
            );
          })}
        </div>
        <button onClick={this.props.click}>New Game</button>
      </>
    );
  }
}

export default GuessNum;
