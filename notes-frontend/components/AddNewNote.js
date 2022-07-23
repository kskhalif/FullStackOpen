import React, { useState } from 'react';
import noteService from '../services/notes';

const AddNewNote = (props) => {
    const [newNote, setNewNote] = useState('');

    const handleNewNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const addNote = async (event) => {
        event.preventDefault();
        try {
            await noteService.create(newNote);
            setNewNote('');
            props.refetch();
        }
        catch (exception) {
            props.setErrorMessage('note must have content');
            setTimeout(() => props.setErrorMessage(null), 5000);
        }
    };

    if (props.user !== null) {
        return (
            <div>
                <form onSubmit={addNote}>
                Add a new note: {' '}
                <input 
                    value={newNote} 
                    onChange={handleNewNoteChange}
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
