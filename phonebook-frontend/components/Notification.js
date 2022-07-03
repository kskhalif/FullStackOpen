import React from 'react';

const Notification = (props) => {
    if (props.message.content) {
        const messageColor = props.message.status ? 'green' : 'red';
        const notificationStyle = {
            color: messageColor,
            background: 'lightGrey',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
        };
        return (
            <div style={notificationStyle}>
                {props.message.content}
            </div>
        );
    }
};

export default Notification;
