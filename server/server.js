
require('./config/config')

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
