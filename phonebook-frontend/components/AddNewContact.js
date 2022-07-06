import React from 'react';

const AddNewContact = (props) => {
    return (
        <form onSubmit={props.add}>
          Name: {' '}
          <input 
            value={props.name}
            onChange={props.handleNameChange}
          />
          {' '}
          Number: {' '}
          <input 
            value={props.number}
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
