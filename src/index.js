import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';

const STARTING_TODOS = [
  { question: 'test question', choice1: 'wrong',choce2: 'wrong', choice3:'correct', answer: 'correct' }
]
ReactDOM.render(
  <React.StrictMode>
    <Game mcqs={STARTING_TODOS}/>
  </React.StrictMode>,
  document.getElementById('root')
);