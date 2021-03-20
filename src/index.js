const e = require('express');

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var usersAndPositions = [{ name: '', position: 1 }];

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    const index = usersAndPositions.findIndex((obj) => {
      obj.name = msg.name;
    });
    if (index) {
      usersAndPositions[index].position = msg.position;
    } else {
      usersAndPositions.push({ name: msg.name, position: msg.position });
    }
    console.log(usersAndPositions);
    io.emit('textUpdated', msg);
  });
});

http.listen(port, () => {
  console.log('listening on *: ', port);
});
