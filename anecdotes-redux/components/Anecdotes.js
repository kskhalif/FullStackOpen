import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const Anecdotes = () => {
  const unsortedAnecdotes = useSelector(state => state);
  let sortedAnecdotes = [...unsortedAnecdotes];
  sortedAnecdotes.sort((a1, a2) => {
    if (a1.votes > a2.votes) return -1;
    if (a1.votes < a2.votes) return 1;
    return 0;
  });

  return (
    <div>
      <h1>Anecdotes</h1>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  );
};

export default Anecdotes;
