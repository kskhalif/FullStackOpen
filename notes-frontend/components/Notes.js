import React, { useState } from 'react';

const Note = (props) => {
  const [label, setLabel] = useState(
    props.note.important ? 'mark not important' : 'mark important'
  );
  return (
    <li>
      {props.note.content + ' '}
      <button onClick={() => props.toggleImportance(props.note, setLabel)}>
        {label}
      </button>
      <button onClick={props.removeNote}>
        remove
      </button>
    </li>
  );
};

const Notes = (props) => {  
  return (
    <ul>
      {props.notes.map(note => 
        <Note 
          key={note.id}
          note={note}
          removeNote={() => props.removeNote(note)}
          toggleImportance={props.toggleImportance}
        />
      )}
    </ul>
  );
};

export default Notes;
