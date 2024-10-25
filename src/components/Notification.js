import React, { useState } from 'react';
import "./Notification.css";

const Notification = ({ onSubmit }) => {
  const [notification, setNotification] = useState({ title: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(notification);
    setNotification({ title: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="notification-form">
      <input
        type="text"
        value={notification.title}
        onChange={(e) => setNotification({ ...notification, title: e.target.value })}
        placeholder="Title"
        className="notification-input"
      />
      <input
        type="text"
        value={notification.description}
        onChange={(e) => setNotification({ ...notification, description: e.target.value })}
        placeholder="Description"
        className="notification-input"
      />
      <button type="submit" className="add-button">Add Notification</button>
    </form>
  );
};

export default Notification;
