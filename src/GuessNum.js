import React, { Component } from 'react';
import './App.css';

class GuessNum extends Component {
  render() {
    return (
      <>
        <h3>Tahmininiz: </h3>
        <input
          type="text"
          maxLength="4"
          onChange={this.props.changed}
          onKeyPress={this.props.keyPress}
          value={this.props.val}
        />
        <h3>Önceki Tahminleriniz: </h3>
        <div className="prevGuess">
          <p>
            {this.props.val} | <b>{this.props.hint}</b>{' '}
          </p>
          {this.props.prev.reverse().map((p) => {
            // array.map()
            // console.log(prev.guess, prev.hint)
            return (
              <p key={Math.random()}>
                {p.guess} | <b>{p.hint}</b>
              </p>
            );
          })}
        </div>
        <button onClick={this.props.click}>Yeni Oyun</button>
      </>
    );
  }
}

export default GuessNum;
