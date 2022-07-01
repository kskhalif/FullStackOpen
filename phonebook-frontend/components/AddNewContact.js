import React from 'react';

const AddNewContact = (props) => {
    return (
        <form onSubmit={props.add}>
          name:  
          <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
          {' '}
          number: 
          <input 
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
          {' '}
          <button type="submit">
            add
          </button>
      </form>
    );
};

export default AddNewContact;
