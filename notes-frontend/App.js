import React, { useState, useEffect } from 'react';
import './App.css';

import noteService from './services/notes';
import Notification from './components/Notification';
import ShowToggle from './components/ShowToggle';
import Notes from './components/Notes';
import AddNewNote from './components/AddNewNote';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [numAll, setNumAll] = useState(0);
  const [numImportant, setNumImportant] = useState(0);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const get = showAll ? noteService.getAll : noteService.getImportant;
    const set = showAll ? setNumAll : setNumImportant;
    get().then(data => {
      setNotes(data);
      set(data.length);
    });
  }, [showAll, numAll, numImportant]);

  const handleInputChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleShowClick = () => {
    setShowAll(!showAll);
  };

  const addNote = (event) => {
    event.preventDefault();
    noteService
      .create(newNote)
      .then(() => {
        setNumAll(numAll + 1);
        setNewNote('');
      });
  };

  const removeNote = (note) => {
    const id = note.id;
    const content = note.content;
    const important = note.important;
    if (confirm(`Remove "${content}"?`)) {
      noteService
        .remove(id)
        .then(() => {
          setNumAll(numAll - 1);
          if (important) {
            setNumImportant(numImportant - 1);
          }
        })
        .catch(() => {
          setErrorMessage(`"${content}" was already removed`);
          setTimeout(() => setErrorMessage(null), 5000);
        });
    }
  };

  const toggleImportance = (note, setLabel) => {
    const id = note.id;
    const content = note.content;
    const important = note.important;
    const label = important ? 'mark important' : 'mark not important'; 
    noteService
      .update(id)
      .then(() => {
        setLabel(label);
        important ? 
          setNumImportant(numImportant - 1) : 
          setNumImportant(numImportant + 1);
      })
      .catch(() => {
        setErrorMessage(`"${content}" was already removed`);
        setTimeout(() => setErrorMessage(null), 5000);
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <AddNewNote 
        newNote={newNote} 
        handleInputChange={handleInputChange}
        addNote={addNote}
      />
      <ShowToggle showAll={showAll} handleShowClick={handleShowClick} />
      <Notes 
        notes={notes} 
        removeNote={removeNote} 
        toggleImportance={toggleImportance}
      />
      <Footer />
    </div>
  );
};

export default App;
