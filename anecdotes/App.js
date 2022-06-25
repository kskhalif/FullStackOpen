import React, { useState } from 'react';
import './App.css';

const generateRandom = (max) => {
  let rand = Math.random() * max;
  rand = Math.floor(rand);
  return rand;
};

const getMostVotes = (votes) => {
  let maxVal = -Infinity;
  let maxIndex = -1;
  for (let [i, val] of votes.entries()) {
    if (val > maxVal) {
      maxVal = val; 
      maxIndex = i;
    }
  }
  return maxIndex;
};

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];
   
  const [selected, setSelected] = useState(generateRandom(anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextClick = () => {
    setSelected(generateRandom(anecdotes.length))
  };

  const handleVoteClick = () => {
    let arr = [...votes];
    arr[selected] += 1;
    console.log(arr);
    setVotes(arr);
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={handleVoteClick} text={'vote'} />
      <Button handleClick={handleNextClick} text={'next anecdote'} />
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[getMostVotes(votes)]}</p>
    </div>
  );
};

export default App;
