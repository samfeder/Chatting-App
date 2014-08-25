//var io = require('socket.io').listen(server)
//
// io.sockets.on('connection', function (socket) {
//   socket.on('message', function (from, msg) {
//     io.sockets.emit(from + ": " + msg);
//   });
// });

var createChat = function (server) {
  //var io = socketio.listen(server);
  var io = require('socket.io').listen(server)

  io.sockets.on('connection', function(socket) {
    socket.on('message', function (msg) {
      io.sockets.emit(msg);
    });
  });

}

exports.createChat = createChat