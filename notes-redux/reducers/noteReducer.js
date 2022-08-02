export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: Number((Math.random() * 1000000).toFixed(0))
    }
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  };
};

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];

    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id;
      const noteToUpdate = state.find(note => note.id === id);
      const updatedNote = { 
        ...noteToUpdate, 
        important: !noteToUpdate.important
      };
      return state.map(note => note.id !== id ? note : updatedNote);

    default:
      return state;
  }
};

export default noteReducer;
