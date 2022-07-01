import React from 'react';

const filterContacts = (props) => {
    if (!props.userFilter) {
        return props.phonebook;
    }
    return props.phonebook.filter(contact => 
        contact.id.toLowerCase().includes(props.userFilter.toLowerCase())
    );
};

const Contact = (props) => {
    return (
        <p>
            {props.name}: {props.number} 
            <button onClick={props.remove}>
                remove
            </button>
        </p>
    );
};

const Contacts = (props) => {
    return (
        <div>
            {filterContacts(props).map(contact =>
                <Contact 
                    key={contact.id} 
                    name={contact.id} 
                    number={contact.content}
                    remove={() => props.remove(contact.id)}  
                />
            )}
        </div>
    );
};

export default Contacts;
