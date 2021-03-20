const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    const currentText = msg.msg;
    console.log(msg.user, ': ', msg.msg);
    setTimeout(() => {
      console.log('Emitting, ', msg);
      io.emit('textUpdated', msg);
    }, port);
    // io.emit('textUpdated', currentText);
  });
});

http.listen(port, () => {
  console.log('listening on *:3000');
});
