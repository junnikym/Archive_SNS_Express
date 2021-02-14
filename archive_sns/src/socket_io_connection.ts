import { Server, Socket } from "socket.io";

export function SocketIO(server) {
	const io = new Server(server, {path:'/socket.io'});

	io.on('connection', (socket) => {

		const req = socket.request;
		const ip = req.headers['x-forwarrded-for'] || req.connection.remoteAddress;

		socket.on('disconnect', () => {
			console.log('클라이언트 접속 해제', ip, socket.id);
			clearInterval(socket.interval);
		});

		socket.on('error', (error) => {
			console.log(error);
			socket.on('reply', (data) => {
				console.log(data);
			});
		});

		// // 3초 마다 news 이벤트를 발생시킨다.
		// socket.interval = setInterval(()=> {
		// 	socket.emit('news','Hello Socket.IO');
		// },3000);

		// const chat = new Chat(socket_io, socket);

		// socket.on(
		// 	"SendChat",
		// 	(message) => {
		// 		console.log(message);
		// 		io.emit("RecevieChat", message);
		// });
	});
}

// socket.on('RecevieChat', res=>console.log(res));