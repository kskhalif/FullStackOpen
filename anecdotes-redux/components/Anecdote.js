import React from 'react';
import { useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const addVote = () => {
    dispatch(vote(anecdote.id));
  };

  return (
    <p>
      {anecdote.content} {anecdote.votes} {' '}
      <button onClick={addVote}>vote</button>
    </p>
  );
};

export default Anecdote;
