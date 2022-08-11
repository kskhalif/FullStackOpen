import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducer';
import Notification from './components/Notification'
import AddNewNote from './components/AddNewNote';
import VisibilityFilter from './components/VisibilityFilter';
import Notes from './components/Notes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
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
