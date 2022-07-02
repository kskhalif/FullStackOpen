import React from 'react';

const Notification = (props) => {
    if (props.message) {
        return (
            <div className='error'>
                {props.message}
            </div>
        );
    }
};

export default Notification;
