import React, { useState, useEffect } from 'react';
import './App.css';

import phonebookService from './services/phonebook';
import Notification from './components/Notification';
import AddNewContact from './components/AddNewContact';
import Filter from './components/Filter';
import Contacts from './components/Contacts';

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [flip, setFlip] = useState(false); /* Flips on every add/remove/update */
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({});

  useEffect(() => {
    phonebookService
      .get(filter)
      .then(data => setPhonebook(data));
  }, [filter, flip]);

  const outputMessage = (status, content) => {
    setMessage({status: status, content: content});
    setTimeout(() => setMessage({}), 5000);
    setName('');
    setNumber('');
  };

  const updateContact = () => {
    if (confirm(`Update ${name}'s number?`)) {
      phonebookService
        .update(name, {id: name, content: number})
        .then(() => {
          outputMessage(true, `Updated ${name}`);
          setFlip(!flip);
        })
        .catch(() => outputMessage(false, `Already updated ${name}`));
    }
  };

  const addContact = (event) => {
    event.preventDefault();
    phonebookService
      .add({ id: name, content: number })
      .then(() =>  {
        outputMessage(true, `Added ${name}`);
        setFlip(!flip);
      })
      .catch((error) => {
        if (error.response.data === 'missing') {
          outputMessage(false, 'Missing name/number');
        }
        else if (error.response.data === 'exists') {
          updateContact();
        }
        else {
          outputMessage(false, `Already added ${name}`);
        }
      })  
  };

  const removeContact = (id) => {
    if (confirm(`Remove ${id} from your contacts?`)) {
      phonebookService
      .remove(id)
      .then(() => {
        outputMessage(true, `Removed ${id}`);
        setFlip(!flip);
      })
      .catch(() => outputMessage(false, `Already removed ${id}`));
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <h2>Add New Contact</h2>
      <AddNewContact add={addContact} 
                     name={name}
                     handleNameChange={handleNameChange} 
                     number={number}
                     handleNumberChange={handleNumberChange}               
      />
      <h2>Contacts</h2>
      <Filter filter={filter}
              handleFilterChange={handleFilterChange} 
      />
      <Contacts phonebook={phonebook} 
                filter={filter}
                remove={removeContact}
      />
    </div>
  );
};

export default App;
