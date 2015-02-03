var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var uuidGen = require('uuid');
var users = {};
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendfile('index.html');
});



io.on('connection', function(socket){

  io.on('disconnect', function(){
    console.log('user disconnected'); //TODO: remove from client's connected users
  });

  socket.on('join', function(user){
    io.emit('user connected', user.name);
    // Generate a v4 (random) id
    var uuid = uuidGen.v4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
    users[uuid] = user.name;
    //socket.emit('my user details', {id: uuid, name: user.name});
  });

  socket.on('chat message', function(userMsg){
    io.emit('chat message', userMsg);
  });

});



http.listen(port, function(){
  console.log('listening on *:' + port);
});