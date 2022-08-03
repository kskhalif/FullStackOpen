export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content,
      votes: 0,
      id: Number((Math.random() * 1000000).toFixed(0))
    }
  };
};

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  };
};

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToUpdate = state.find(anecdote => anecdote.id === id);
      const updatedAnecdote = { 
        ...anecdoteToUpdate, 
        votes: anecdoteToUpdate.votes + 1 
      };
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote);
    default:
      return state;
  }
};

export default anecdoteReducer;
