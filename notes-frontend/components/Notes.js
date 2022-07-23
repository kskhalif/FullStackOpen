import React, { useState } from 'react';
import noteService from '../services/notes';

const Note = (props) => {
  const [label, setLabel] = useState(
    props.note.important ? 'mark not important' : 'mark important'
  );

  const handleLabelChange = (newLabel) => {
    setLabel(newLabel);
  };

  const handleToggle = () => {
    props.toggleImportance(props.note, handleLabelChange);
  };

  const noteToDisplay = () => {
    if (props.authorized) {
      return (
        <li>
          {props.note.content}
          <button onClick={handleToggle}>
            {label}
          </button>
          <button onClick={props.removeNote}>
            remove
          </button>
        </li>
      );
    }
    else {
      return (
        <li>
          {props.note.content}
        </li>
      );
    }
  };

  return (
    <div>
      {noteToDisplay()}
    </div>
  );
};

const Notes = (props) => {
  const toggleImportance = async (note, handler) => {
    const id = note.id;
    const important = note.important;
    const label = important ? 'mark important' : 'mark not important';
    try {
      await noteService.update(id);
      handler(label);
      props.refetch();
    }
    catch (exception) {
      props.setErrorMessage(exception.response.data.error);
      setTimeout(() => props.setErrorMessage(null), 5000);
    }
  };

  const removeNote = async (note) => {
    const id = note.id;
    const content = note.content;
    if (confirm(`Remove "${content}"?`)) {
      try {
        await noteService.remove(id);
        props.refetch();
      }
      catch (exception) {
        props.setErrorMessage(exception.response.data.error);
        setTimeout(() => props.setErrorMessage(null), 5000);
      }
    }
  };

  return (
    <ul>
      {props.notes.map(note => {
        const authorized = props.user !== null
          ? props.user.username === note.user.username
          : false;
        return (
          <Note 
            key={note.id}
            note={note}
            authorized={authorized}
            toggleImportance={toggleImportance}
            removeNote={() => removeNote(note)}
          />
        );
      })}
    </ul>
  );
};

export default Notes;
