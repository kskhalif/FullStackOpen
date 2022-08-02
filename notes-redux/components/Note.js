import React from "react";
import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const toggleImportance = () => {
    dispatch(toggleImportanceOf(note.id));
  };

  return (
    <li key={note.id} onClick={toggleImportance}>
      {note.content} {' '}
      <strong>{note.important ? 'important' : null}</strong>
    </li>
  );
};

export default Note;
