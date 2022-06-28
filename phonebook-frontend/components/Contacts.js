import React from 'react';

const filterContacts = (props) => {
    if (!props.userFilter) {
        return [...props.phonebook];
    }
    return [...props.phonebook].filter(contact => 
        contact[0].toLowerCase().includes(props.userFilter.toLowerCase())
    );
};

const Contact = (props) => {
    return (
        <p>{props.name}: {props.number}</p>
    );
};

const Contacts = (props) => {
    return (
        <div>
            {filterContacts(props).map(contact =>
                <Contact key={contact[0]} name={contact[0]} number={contact[1]} />
            )}
        </div>
    );
};

export default Contacts;
