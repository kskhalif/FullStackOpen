import React from 'react';

const AddNewNote = (props) => {
    if (props.user !== null) {
        return (
            <div>
                <form onSubmit={props.addNote}>
                Add a new note: {' '}
                <input 
                    value={props.newNote} 
                    onChange={props.handleNewNoteChange}
                />
                <button type="submit">
                    save
                </button>
            </form>
            <br />
          </div>
        );
    }
};

export default AddNewNote;
