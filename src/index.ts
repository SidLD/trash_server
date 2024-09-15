import express from 'express';
import bodyParser from 'body-parser';
import userAPI from './api/user';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import socket.io

const app = express();
const port = process.env.PORT || 8888;

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
const io = new Server(server);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

const corsOptions = {
  origin: process.env.FRONT_URI,
};
app.use(cors(corsOptions));
app.use(userAPI);

// Database
try {
  mongoose.set('strictQuery', false);
  mongoose.connect(`${process.env.ATLAS_URI}`);
  console.log('Connected to Database.');
} catch (error) {
  console.log(error);
}

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle custom events
  socket.on('message', (data) => {
    console.log('Message received:', data);
    // Broadcast the message to all clients
    io.emit('message', data);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
