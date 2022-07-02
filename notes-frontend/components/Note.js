import React from 'react';

const Note = (props) => {
  const toggleLabel = () => {
    return props.note.important ?  'mark not important' : 'mark important';
  };

  return (
    <li className='note'>
      {props.note.content + ' '}
      <button onClick={props.toggleImportance}>
        {toggleLabel()}
      </button>
    </li>
  );
};

export default Note;
