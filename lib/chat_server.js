var createChat = function (server) {

  var guestnumber = 0;
  var username;
  var nicknames = {};

  var io = require('socket.io').listen(server)

  io.sockets.on('connection', function(socket) {
    guestnumber++;
    username = "guest" + guestnumber;
    nicknames[socket.id] = username;

    console.log("you are user: " + guestnumber);

    var that = this;

    socket.on('message', function (msg) {
      msg['username'] = nicknames[socket.id];
      io.sockets.emit('sendMessage', msg);
    });

    socket.on('nicknameChange', function (val) {
      if (validName(val.newName, socket.id)){
        io.sockets.emit('nicknameChangeResult', val);
      }
      else {
        io.sockets.emit('nicknameChangeResult', {
          success: false,
          message: val + ' is an invalid nickname'
        });
      }
    });

    socket.on('disconnect', function () {
      io.sockets.emit('adminMessage',
        {message: nicknames[socket.id] + " has left the building."
      });
      delete nicknames[socket.id];
    });
  });

  function validName(nickname, socketId) {
    var valid = true
    if (nickname.slice(0,5) === "guest"){
      valid = false;
    }

    for (var key in nicknames) {
      if (nickname === nicknames[key]){
        valid = false;
      }
    }

    if (valid === true) {
      console.log(nicknames)
      nicknames[socketId] = nickname;
    }
    return valid
  }

}

exports.createChat = createChat