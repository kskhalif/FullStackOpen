import React from 'react';

const Contact = (props) => {
    return (
        <p>
            {props.name}: {props.number} {' '} 
            <button onClick={props.remove}>
                remove
            </button>
        </p>
    );
};

const Contacts = (props) => {
    return (
        <div>
            {props.phonebook.map(contact =>
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
