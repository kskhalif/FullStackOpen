import React from 'react';

const Filter = (props) => {
    return (
        <div>
            filter:
            <input
                value={props.userFilter}
                onChange={props.handleFilterChange}   
            />
        </div>
    );
};

export default Filter;
