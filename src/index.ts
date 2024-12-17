import express from 'express';
import bodyParser from 'body-parser';
import userAPI from './api/user';
import cors from 'cors';
import mongoose from 'mongoose';
import _http, { createServer } from 'http'; 
import { emitNotification, initializeSocket } from './util/socket';
import foodwasteAPI from './api/food-waste';
import statAPI from './api/stat';
import notificatioAPI from './api/notification';

const app = express();
const server = createServer(app);

// Initialize Socket.IO
const io = initializeSocket(server);
const port = process.env.PORT || 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

const corsOptions = {
  origin: process.env.FRONT_URI,
};
console.log(corsOptions)
app.use(cors(corsOptions));
app.use(userAPI);
app.use(foodwasteAPI)
app.use(statAPI)
app.use(notificatioAPI)

// Database
try {
  mongoose.set('strictQuery', false);
  mongoose.connect(`${process.env.ATLAS_URI}`);
  console.log('Connected to Database.');
} catch (error) {
  console.log(error);
}
setTimeout(() => {
  emitNotification({})
}, 5000)
// Start the server
server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
