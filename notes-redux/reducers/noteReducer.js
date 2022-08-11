import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes-json-server';

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    updateNote(state, action) {
      const updatedNote = action.payload;
      return state.map(n => n.id !== updatedNote.id ? n : updatedNote);
    },
  }
});

const { setNotes, appendNote, updateNote } = noteSlice.actions;

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.create(content);
    dispatch(appendNote(newNote));
  };
};

export const toggleImportanceOf = note => {
  return async dispatch => {
    const updatedNote = await noteService.update(note);
    dispatch(updateNote(updatedNote));
  };
};

export default noteSlice.reducer;
