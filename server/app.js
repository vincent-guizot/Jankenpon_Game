var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected'); 
  
  socket.on('handSubmitted', (hand) => {
    console.log(hand)
    socket.broadcast.emit('sendOpponentHand', hand)
  });

  socket.on('aPlayerJoined', (player) => {
    console.log(player)
    socket.broadcast.emit('sendJoinedPlayer', player)
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});