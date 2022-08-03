import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/Anecdotes';

const App = () => {
  return (
    <div>
      <AnecdoteForm />
      <Anecdotes />
    </div>
  );
};

export default App;
