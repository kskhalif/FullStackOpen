import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: 'If it hurts, do it more often.',
    votes: 2,
    id: 1
  },
  {
    content: 'Adding manpower to a late software project makes it later.',
    votes: 0,
    id: 2
  },
  {
    content: 'Premature optimization is the root of all evil',
    votes: 4,
    id: 3
  }
];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        votes: 0,
        id: Number((Math.random() * 1000000).toFixed(0))
      });
    },
    vote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find(a => a.id === id);
      const updatedAnecdote = { 
        ...anecdoteToUpdate, 
        votes: anecdoteToUpdate.votes + 1 
      };
      return state.map(a => a.id !== id ? a : updatedAnecdote);
    }
  }
});

export const { createAnecdote, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
