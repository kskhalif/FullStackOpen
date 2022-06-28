import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import AddNewContact from './components/AddNewContact';
import Filter from './components/Filter';
import Contacts from './components/Contacts';

const App = () => {
  const [phonebook, setPhonebook] = useState(new Map());
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/phonebook')
      .then(response => setPhonebook(new Map(response.data)))
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    if (phonebook.has(newName)) {
      return alert(`${newName} is already in the phonebook.`);
    }
    setPhonebook(new Map([...phonebook, [newName, newNumber]]));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setUserFilter(event.target.value);
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <h2>Add New Contact</h2>
      <AddNewContact addContact={addContact} 
                     newName={newName}
                     handleNameChange={handleNameChange} 
                     newNumber={newNumber}
                     handleNumberChange={handleNumberChange}               
      />
      <h2>Contacts</h2>
      <Filter userFilter={userFilter} 
              handleFilterChange={handleFilterChange} 
      />
      <Contacts phonebook={phonebook} 
                userFilter={userFilter} 
      />
    </div>
  );
};

export default App;
