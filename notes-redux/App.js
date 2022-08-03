import React from 'react';
import AddNewNote from './components/AddNewNote';
import VisibilityFilter from './components/VisibilityFilter';
import Notes from './components/Notes';

const App = () => {
  return (
    <div>
      <h1>NotesApp</h1>
      <AddNewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
