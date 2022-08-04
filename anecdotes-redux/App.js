import React from 'react';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import Filter from './components/Filter';
import Anecdotes from './components/Anecdotes';

const App = () => {
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <Anecdotes />
    </div>
  );
};

export default App;
