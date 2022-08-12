import React from "react";
import { useDispatch } from "react-redux";
import { toggleImportanceOf, removeNote } from "../reducers/noteReducer";

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const toggleImportance = async () => {
    dispatch(toggleImportanceOf(note));
  };

  const remove = async () => {
    if (confirm(`Remove "${note.content}"?`))
    dispatch(removeNote(note.id)); 
  };

  return (
    <li key={note.id}>
      {note.content} {' '}
      <strong>{note.important ? '!' : null}</strong> {''}
      <button onClick={toggleImportance}>!</button>
      <button onClick={remove}>X</button>
    </li>
  );
};

export default Note;
