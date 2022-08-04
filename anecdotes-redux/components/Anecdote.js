import React from 'react';
import { useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const addVote = () => {
    dispatch(vote(anecdote.id));
    dispatch(setNotification({ status: true, message: 'You voted!' }));
    setTimeout(() => dispatch(setNotification({})), 3000);
  };

  return (
    <p>
      {anecdote.content} {anecdote.votes} {' '}
      <button onClick={addVote}>vote</button>
    </p>
  );
};

export default Anecdote;
