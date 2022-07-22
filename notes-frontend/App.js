import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import './App.css';
import SECRET from './SECRET';

import noteService from './services/notes';
import login from './services/login';

import Notification from './components/Notification';
import Welcome from './components/Welcome';
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

  const logout = () => {
    localStorage.removeItem('loggedNoteAppUser');
    setUser(null);
    noteService.setToken(null);
  };

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      jwt.verify(loggedUser.token, SECRET, (error) => {
        if (error) {
          logout();
        }
        else {
          setUser(loggedUser);
          noteService.setToken(loggedUser.token);
        }
      });
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

  const addNote = async (event) => {
    event.preventDefault();
    try {
      await noteService.create(newNote);
      setNewNote('');
      setFlip(!flip);
    }
    catch (exception) {
      setErrorMessage('note must have content');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const removeNote = async (note) => {
    const id = note.id;
    const content = note.content;
    if (confirm(`Remove "${content}"?`)) {
      try {
        await noteService.remove(id);
        setFlip(!flip);
      }
      catch (exception) {
        setErrorMessage(exception.response.data.error);
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };

  const toggleImportance = async (note, setLabel) => {
    const id = note.id;
    const important = note.important;
    const label = important ? 'mark important' : 'mark not important';
    try {
      await noteService.update(id);
      setLabel(label);
      setFlip(!flip);
    }
    catch (exception) {
      setErrorMessage(exception.response.data.error);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <Welcome
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
        user={user}
        logout={logout}
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
