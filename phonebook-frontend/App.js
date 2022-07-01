import React, { useState, useEffect } from 'react';
import './App.css';

import AddNewContact from './components/AddNewContact';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import phonebookService from './services/phonebook';

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => setPhonebook(initialData));
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    if (phonebook.find(contact => contact.id === newName)) {
      if (confirm(`Update ${newName}'s number?`)) {
        phonebookService
          .update(newName, {id: newName, content: newNumber})
          .then(returnData => {
            setPhonebook(phonebook.map(contact => 
              contact.id !== newName ? contact : returnData
            ));
            setNewName('');
            setNewNumber('');
          });
      }
    }
    else {
      const newContact = {id: newName, content: newNumber};
      phonebookService
        .create(newContact)
        .then(returnedData => {
          setPhonebook(phonebook.concat(returnedData));
          setNewName('');
          setNewNumber('');
        });
    }
  };

  const removeContact = (id) => {
    if (confirm(`Remove ${id} from your contacts?`)) {
      phonebookService.remove(id);
      setPhonebook(phonebook.filter(contact => contact.id !== id));
    }
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
      <AddNewContact add={addContact} 
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
                remove={removeContact}
      />
    </div>
  );
};

export default App;
