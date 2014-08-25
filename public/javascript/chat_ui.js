(function (root) {
  var App = root.App = (root.App || {});

  var ChatUI = App.ChatUI = function (chat) {
    this.chat = chat;

    var chatUi = this;

    this.chat.socket.on('sendMessage', function(data) {
      $('#chat-messages').append($('<li>').append(data.text));
      $('#chat-input').val('');
    })

    $('#send-message').on('submit', function(event) {
      event.preventDefault();
      chatUi.processInput();
    });

    ChatUI.prototype.processInput = function () {
      var text = $('#chat-input').val();
      //$('#chat-messages').append($('<li>').append(text));
      //$('#chat-input').val('');
      this.chat.sendMessage(text);
    }

  }
}(this));
