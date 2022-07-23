import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import './App.css';
import SECRET from './SECRET';
import noteService from './services/notes';
import Notification from './components/Notification';
import Welcome from './components/Welcome';
import ShowToggle from './components/ShowToggle';
import Notes from './components/Notes';
import AddNewNote from './components/AddNewNote';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [flip, setFlip] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
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

  const refetch = () => {
    setFlip(!flip)
  };

  const handleShowClick = () => {
    setShowAll(!showAll);
    refetch();
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <Welcome
        user={user}
        setUser={setUser}
        setErrorMessage={setErrorMessage}
        logout={logout}
      />
      <AddNewNote 
        user={user}
        refetch={refetch}
        setErrorMessage={setErrorMessage}
      />
      <ShowToggle 
        showAll={showAll} 
        handleShowClick={handleShowClick} 
      />
      <Notes
        user={user}
        notes={notes}
        refetch={refetch}
        setErrorMessage={setErrorMessage} 
      />
      <Footer />
    </div>
  );
};

export default App;
