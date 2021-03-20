const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  socket.on('messageUpdated', (msg) => {
    const currentText = msg.msg;
    console.log(msg.user, ': ', msg.msg);
    setTimeout(() => {
      console.log('Emitting, ', msg);
      io.emit('textUpdated', msg);
    }, 3000);
    // io.emit('textUpdated', currentText);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
