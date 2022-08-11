import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";
import { setNotification } from '../reducers/notificationReducer';

const AddNewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    if (content) {
      dispatch(createNote(content));
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
