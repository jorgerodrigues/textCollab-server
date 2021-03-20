const e = require('express');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var usersAndPositions = [];
const checkForUserAndPosition = (msg) => {
  const index = usersAndPositions.findIndex((obj) => {
    return obj.name === msg.user;
  });
  console.log(index);
  if (index != -1) {
    usersAndPositions[index].position = msg.cursorPosition;
  } else {
    console.log('Pushing');
    usersAndPositions.push({ name: msg.user, position: msg.cursorPosition });
  }
  console.log(usersAndPositions);
};

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    checkForUserAndPosition(msg);
    io.emit('textUpdated', msg);
  });
});

http.listen(port, () => {
  console.log('listening on *: ', port);
});
