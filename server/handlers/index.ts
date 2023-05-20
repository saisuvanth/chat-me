import { Socket } from "socket.io";
import { changeStatus } from "../controllers/auth";
import roomHandler from "./roomHandler";
import messageHandler from "./messageHandler";

const socketController = (socket: Socket) => {

	roomHandler(socket);
	messageHandler(socket);

	socket.on('disconnect', () => {
		changeStatus(socket.data.user.userId, 'offline');
	})
}


export default socketController;