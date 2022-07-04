import React from 'react';

const SearchByName = (props) => {
    return (
        <div>
            Search by name:
            <input
                value={props.input}
                onChange={props.handleInputChange}
            />
        </div>
    );
};

export default SearchByName;
