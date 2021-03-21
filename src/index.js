const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var usersAndPositions = [];
setInterval(() => {
  usersAndPositions = [];
}, 10000);
const checkForUserAndPosition = (msg) => {
  // finds the position of the user in the array usersAndPositions
  const index = usersAndPositions.findIndex((obj) => {
    return obj.name === msg.user;
  });
  if (index != -1) {
    usersAndPositions[index].position = msg.cursorPosition;
  } else {
    console.log('Pushing');
    usersAndPositions.push({ name: msg.user, position: msg.cursorPosition });
  }
};

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    checkForUserAndPosition(msg);
    io.emit('textUpdated', msg, usersAndPositions);
  });
});

http.listen(port, () => {
  console.log('listening on *: ', port);
});
