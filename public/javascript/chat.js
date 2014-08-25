(function(root){
  var App = root.App = (root.App || {})

  var Chat = App.Chat = function(socket){
    var chat = this
    this.socket = socket;

    Chat.prototype.sendMessage = function(msg){
      chat.socket.emit('message', { text: msg})
    }
  };
}(this))