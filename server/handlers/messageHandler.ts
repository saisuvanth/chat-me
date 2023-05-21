import { Server, Socket } from "socket.io";
import Message from "../models/Message";

const messageHandler = (io: Server, socket: Socket) => {
	socket.on('send-message', async (roomId, message) => {
		console.log(socket)
		console.log((io.sockets as any))
		const user = socket.data.user;
		console.log(roomId, message, user);
		let sMessage = await Message.create({ room: roomId, sendBy: user._id, message });
		console.log(sMessage)
		sMessage = await sMessage.populate('sendBy');
		io.to(roomId).emit('message', sMessage);
	})
}
export default messageHandler;