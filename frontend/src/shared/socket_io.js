
import SocketIO from "socket.io-client";

const ws = { socket: undefined };

export function initSocketIO() {
	ws.socket = SocketIO.connect();
}

export default ws;