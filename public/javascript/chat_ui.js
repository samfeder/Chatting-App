(function (root) {
  var App = root.App = (root.App || {});

  var ChatUI = App.ChatUI = function (chat) {
    this.chat = chat;

    var chatUi = this;

    this.chat.socket.on('sendMessage', function(data) {
      $('#chat-messages').append($('<li>').append(
        data.username + ": " + data.text
      ));
    })

    this.chat.socket.on('nicknameChangeResult', function(data) {
      if ( data.success === false ){
        console.log(data.message);
      } else {
        console.log("new nickname is " + data.newName);
      }
    })

    this.chat.socket.on('adminMessage', function(data){
      $('#chat-messages').append($('<li>').append(data.message));
    })



    $('#send-message').on('submit', function(event) {
      event.preventDefault();
      chatUi.processInput();
    });

    ChatUI.prototype.processInput = function () {

      var text = $('#chat-input').val();
      $('#chat-input').val('');
      if (text[0] === "/"){
        var entry = text.slice(1).split(" ");
        var command = entry[0];
        var val = entry.slice(1).join(" ");

        if (command === "nick") {
          this.chat.nicknameChangeRequest(val)
        }
      } else {
        this.chat.sendMessage(text);
      }
    }

  }
}(this));
