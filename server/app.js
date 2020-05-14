var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected'); 
  socket.on('chat', (msg) => {
    console.log('msg', msg);
    socket.broadcast.emit('chat-clien', msg)
  });
  
  socket.on('name', (msg) => {
    console.log('name : ', msg);
    socket.broadcast.emit('name-clien', msg)
  });
  socket.on('watch-server', (status) => {
    socket.broadcast.emit('watch-c', status)
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});