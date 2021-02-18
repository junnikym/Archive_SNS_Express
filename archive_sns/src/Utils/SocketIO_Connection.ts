import { isObject } from "class-validator";
import { Server, Socket } from "socket.io";

import jwt from "jsonwebtoken";
import { env } from "../env";

export class SocketIO {

	public io;
	public socket;

	public async connect(server) {
		this.io = new Server(server);

		this.io.on('connection', async (socket) => {
			
			this.socket = socket;

			const req = socket.request;
			const ip = req.headers['x-forwarrded-for'] || req.connection.remoteAddress;

			console.log('클라이언트 접속', ip, socket.id);
			console.log("login : ", socket.rooms);

			socket.on('login_report', (token) => {
				const decrypted_token = 
					jwt.verify(token, env.jwt.secret_access_key);
				
				socket.join(decrypted_token.pk, function() {
					this.io.to(decrypted_token.pk).emit('login_report_success', decrypted_token.pk);
				});
				console.log("login : ", socket.rooms);
			});

			socket.on('disconnect', () => {
				console.log('클라이언트 접속 해제', ip, socket.id);
				clearInterval(socket.interval);
			});

			socket.interval = setInterval(()=> {
				socket.emit('news','Hello Socket.IO', ip, socket.id);
			},3000);
	
			socket.on('error', (error) => {
				console.log(error);
				socket.on('reply', (data) => {
					console.log(data);
				});
			});

		});
	}
}