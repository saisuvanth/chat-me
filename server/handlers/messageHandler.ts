import { Socket } from "socket.io";
import Message from "../models/Message";

const messageHandler = (socket: Socket) => {
	socket.on('send-message', async ({ roomId, message }) => {
		const user = socket.data.user;
		const sMessage = await Message.create({ roomId, userId: user.userId, message });
		console.log(sMessage)
		socket.to(roomId).emit('receive-message', message);
	})
}
export default messageHandler;