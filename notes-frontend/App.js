import React, { useState, useEffect } from 'react';
import './App.css';

import noteService from './services/notes';
import login from './services/login';

import Notification from './components/Notification';
import Login from './components/Login';
import ShowToggle from './components/ShowToggle';
import Notes from './components/Notes';
import AddNewNote from './components/AddNewNote';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [flip, setFlip] = useState(false); /* Flips on every add/remove/update */
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const get = showAll ? noteService.getAll : noteService.getImportant;
    get().then(data => {
      setNotes(data);
    });
  }, [flip]);

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const handleNewNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleShowClick = () => {
    setShowAll(!showAll);
    setFlip(!flip);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await login({ username, password });
      localStorage.setItem('loggedNoteAppUser', JSON.stringify(loggedUser));
      noteService.setToken(loggedUser.token);
      setUser(loggedUser);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const addNote = (event) => {
    event.preventDefault();
    noteService
      .create(newNote)
      .then(() => {
        setNewNote('');
        setFlip(!flip);
      });
  };

  const removeNote = (note) => {
    const id = note.id;
    const content = note.content;
    if (confirm(`Remove "${content}"?`)) {
      noteService
        .remove(id)
        .then(() => {
          setFlip(!flip);
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
        setFlip(!flip);
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
      <Login
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
        user={user}
      />
      <AddNewNote 
        newNote={newNote} 
        handleNewNoteChange={handleNewNoteChange}
        addNote={addNote}
        user={user}
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
