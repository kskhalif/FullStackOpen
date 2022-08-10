import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { setNotification } from '../reducers/notificationReducer';
import noteService from '../services/notes-json-server';

const AddNewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    if (content) {
      event.target.note.value = '';
      const newNote = await noteService.create(content);
      dispatch(createNote(newNote));
      dispatch(setNotification({ status: true, message: 'Added new note.' }));
      setTimeout(() => dispatch(setNotification({})), 3000);
    }
    else {
      dispatch(setNotification({ status: false, message: 'Note must have content.' }));
      setTimeout(() => dispatch(setNotification({})), 3000);
    }
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' placeholder="a new note..." />
      <button type='submit'>add</button>
    </form>
  );
};

export default AddNewNote;
