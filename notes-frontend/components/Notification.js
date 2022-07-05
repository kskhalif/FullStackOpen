import React from 'react';

const Notification = (props) => {
    if (props.message) {
        const notificationStyle = {
            color: 'red',
            background: 'lightGrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        };
        return (
            <div style={notificationStyle}>
                {props.message}
            </div>
        );
    }
};

export default Notification;
