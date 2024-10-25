import React, { useState, useEffect } from 'react';
import { getNotifications, createNotification, deleteNotification } from '../services/api';
import "./Admin.css";

const Admin = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createNotification(newNotification);
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    fetchNotifications();
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Panel</h2>
      <form className="notification-form" onSubmit={handleCreate}>
        <input
          type="text"
          className="notification-input"
          value={newNotification.title}
          onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          className="notification-input"
          value={newNotification.description}
          onChange={(e) => setNewNotification({ ...newNotification, description: e.target.value })}
          placeholder="Description"
        />
        <button className="create-button" type="submit">Create</button>
      </form>

      <ul className="notification-list">
        {notifications.map((notif) => (
          <li key={notif._id} className="notification-item">
            {notif.title}: {notif.description}
            <button className="delete-button" onClick={() => handleDelete(notif._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
