import React from "react";
import { useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const toggleImportance = async () => {
    dispatch(toggleImportanceOf(note));
  };

  return (
    <li key={note.id} onClick={toggleImportance}>
      {note.content} {' '}
      <strong>{note.important ? '!' : null}</strong>
    </li>
  );
};

export default Note;
