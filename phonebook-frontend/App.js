import React, { useState, useEffect } from 'react';
import './App.css';

import AddNewContact from './components/AddNewContact';
import Filter from './components/Filter';
import Contacts from './components/Contacts';
import Notification from './components/Notification';
import phonebookService from './services/phonebook';

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialData => setPhonebook(initialData));
  }, []);

  const outputMessage = (status, content) => {
    setMessage({status: status, content: content});
    setTimeout(() => setMessage({}), 5000);
    setNewName('');
    setNewNumber('');
  };

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
            outputMessage(true, `Updated ${newName}`);
          })
          .catch(error => 
            outputMessage(false, `Already updated ${newName}`)
          );
      }
    }
    else {
      phonebookService
        .create({id: newName, content: newNumber})
        .then(returnedData => {
          setPhonebook(phonebook.concat(returnedData));
          outputMessage(true, `Added ${newName}`);
        })
        .catch(error =>
          outputMessage(false, `Already added ${newName}`)
        );
    }
  };

  const removeContact = (id) => {
    if (confirm(`Remove ${id} from your contacts?`)) {
      phonebookService
      .remove(id)
      .then(() => {
        setPhonebook(phonebook.filter(contact => contact.id !== id));
        outputMessage(true, `Removed ${id}`);
      })
      .catch(error =>
        outputMessage(false, `Already removed ${id}`)
      );
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
      <Notification message={message} />
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
