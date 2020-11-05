import React, { Component } from 'react';
import './App.css';

class GuessNum extends Component {
  render() {
    return (
      <>
        <h3>Tahmininiz: </h3>
        <input type="text" maxLength="4" />
        <h3>Önceki Tahminleriniz: </h3>

        <button>Yeni Oyun</button>
      </>
    );
  }
}

export default GuessNum;
