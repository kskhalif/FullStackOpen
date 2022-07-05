import React from 'react';

const AddNewNote = (props) => {
    return (
        <div>
            <form onSubmit={props.addNote}>
            Add a new note: {' '}
            <input 
                value={props.newNote} 
                onChange={props.handleInputChange}
            />
            <button type="submit">
                save
            </button>
        </form>
        <br />
      </div>
    );
};

export default AddNewNote;
