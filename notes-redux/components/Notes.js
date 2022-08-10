import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const Notes = () => {
  const notes = useSelector(({ notes, filter }) => {
    return filter === 'ALL'
      ? notes
      : filter === 'IMPORTANT'
        ? notes.filter(note => note.important)
        : notes.filter(note => !note.important);
  });

  return (
    <ul>
      {notes.map(note =>
        <Note key={note.id} note={note} />
      )}
    </ul>
  );
};

export default Notes;
