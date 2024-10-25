import io from 'socket.io-client';

let socket;

export const initiateSocket = () => {
  socket = io('http://localhost:5000');
};

export const subscribeToNotificationUpdates = (callback) => {
  if (!socket) return;
  socket.on('notificationUpdate', (data) => {
    callback(data);
  });
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
