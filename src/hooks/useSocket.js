import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (event, callback) => {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    if (event) {
      socket.on(event, callback);
    }

    return () => {
      socket.disconnect();
    };
  }, [event, callback]);
};

export default useSocket;
