import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const Notes = () => {
  const notes = useSelector(state => state);

  return (
    <ul>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
    </ul>
  );
};

export default Notes;
