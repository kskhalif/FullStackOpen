import React from 'react';

const ShowToggle = (props) => {
    return (
        <button onClick={props.handleShowClick}>
        show {props.showAll ? 'important' : 'all'}
        </button>
    );
};

export default ShowToggle;
