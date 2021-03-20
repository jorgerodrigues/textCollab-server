const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    io.emit('textUpdated', msg);
  });
});

http.listen(port, () => {
  console.log('listening on *: ', port);
});
