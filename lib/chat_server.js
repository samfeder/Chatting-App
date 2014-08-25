var createChat = function (server) {


  var nicknames = {};

  var io = require('socket.io').listen(server)

  io.sockets.on('connection', function(socket) {
    socket.on('message', function (msg) {
      io.sockets.emit('sendMessage', msg);
    });
  });

}

exports.createChat = createChat