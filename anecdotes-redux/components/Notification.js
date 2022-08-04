import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  if (notification.message) {
    const notificationColor = notification.status ? 'green' : 'red';
    const notificationStyle = {
      color: notificationColor,
      border: 'solid',
      padding: 10,
      borderWidth: 1
    };
    return (
      <p style={notificationStyle}>
        {notification.message}
      </p>
    );
  }
};

export default Notification;
