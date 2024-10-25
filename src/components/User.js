import React, { useEffect, useState } from 'react';
import { getNotifications } from '../services/api';
import io from 'socket.io-client';
import Chatbot from './Chatbot'; 
import "./User.css";

const socket = io('http://localhost:5000');

const User = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    socket.on('notificationUpdate', (updatedNotifications) => {
      setNotifications(updatedNotifications);
    });
  }, []);

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  return (
    <div className="user-container">
      <h2 className="user-title">User Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notif) => (
          <li key={notif._id} className="notification-item">
            <p className="title">{notif.title}</p>
            <p className="description">{notif.description}</p>
          </li>
        ))}
      </ul>
      <Chatbot className="chatbot-container"/> 
    </div>
  );
};

export default User;
