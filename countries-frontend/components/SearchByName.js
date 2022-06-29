import React from 'react';

const SearchByName = (props) => {
    return (
        <div>
            search by name:
            <input
                value={props.name}
                onChange={props.handleNameChange}
            />
        </div>
    );
};

export default SearchByName;
