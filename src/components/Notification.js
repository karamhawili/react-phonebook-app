import React from 'react';

const Notification = ({ type, message }) => {
  if (message === null || type === null) return null;

  const notificationStyle = {
    width: '40%',
    backgroundColor: type === 'error' ? '#ff3030' : '#229954',
    marginBottom: 15,
    padding: 5,
    color: 'white',
  };

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
