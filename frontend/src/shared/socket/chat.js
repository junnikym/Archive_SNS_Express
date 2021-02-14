function SendChat(message) {
	socket.emit('send message', $('#message').val());
}

function ReceiveChat() {
	
}