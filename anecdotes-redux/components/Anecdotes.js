import React from "react";
import { useSelector } from "react-redux";
import Anecdote from "./Anecdote";

const Anecdotes = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const regex = new RegExp(filter, 'i');
    const filtered = anecdotes.filter(a => regex.test(a.content));
    const sorted = [...filtered].sort((a1, a2) => {
      if (a1.votes > a2.votes) return -1;
      if (a1.votes < a2.votes) return 1;
      return 0;
    });
    return sorted;
  });

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  );
};

export default Anecdotes;
