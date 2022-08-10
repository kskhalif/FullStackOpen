import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotes } from './reducers/noteReducer';
import noteService from './services/notes-json-server';
import Notification from './components/Notification'
import AddNewNote from './components/AddNewNote';
import VisibilityFilter from './components/VisibilityFilter';
import Notes from './components/Notes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)));
  }, [dispatch]);
  
  return (
    <div>
      <h1>NotesApp</h1>
      <Notification />
      <AddNewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
