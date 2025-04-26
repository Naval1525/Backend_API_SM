import { Server } from 'socket.io';
import http from 'http';

const startSocketServer = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins for now
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on('sendMessage', (data) => {
      // Emit the message to the receiver
      socket.to(data.receiverId).emit('receiveMessage', data);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export default startSocketServer;
