import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoTable from './todoTable';
import reportWebVitals from './reportWebVitals';

const STARTING_TODOS = [
  { id: 1, description: 'Eat Breakfast', completed: true },
  { id: 2, description: 'Deploy to Heroku', completed: false },
  { id: 3, description: 'Check Email', completed: true },
  { id: 4, description: 'Eat Lunch', completed: false }
]

ReactDOM.render(
  <React.StrictMode>
    <TodoTable todos={STARTING_TODOS} />
  </React.StrictMode>,
  document.getElementById('root')
);