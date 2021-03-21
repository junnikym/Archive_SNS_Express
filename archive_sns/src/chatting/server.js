const express = require('express');
const app = express();
const http = require('http').Server(app); 
const io = require('socket.io')(http);    
const path = require('path');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	// 루트 페이지로 접속시 chat.pug 렌더링
	res.render('chat');
});

const name = "Kim";
io.on('connection', function(socket){
	socket.name = name;
	console.log('user connected :' + socket.name);

	// 채팅방 접속이 끊어졌을 때 - 2
	socket.on('disconnect', function(){
		console.log('user disconnected: ' + socket.name);
	});
	
	// 메세지를 보냈을 때 - 3 
	socket.on('send message', function(content){
		const msg = socket.name +' : ' + content;
		console.log(msg);


		io.emit('receive message', msg);
	});

	//알림
	socket.on('send notice', function(){
		socket.notice = "알림이 도착했다.";
		const msg = socket.notice

		console.log(socket.id);
		this.io.socket.emit('notice', msg);
	});
	
});

http.listen(3000, function(){ 
	console.log('server on..');
});