import { Socket } from "socket.io";
import client from "../redisClient";

const roomHandler = (socket: Socket) => {
	socket.on('join-room', async (roomId) => {
		const room = await client.lRange(roomId, 0, -1);
		const user = socket.data.user;
		console.log(room)
		if (room.length === 0) {
			await client.rPush(roomId, user.userId);
		}
		socket.join(roomId);
		socket.to(roomId).emit('user-connected', user);
	})

	socket.on('leave-room', async (roomId) => {
		const user = socket.data.user;
		await client.lRem(roomId, 0, user.userId);
		socket.to(roomId).emit('user-disconnected', user);
	})
}

export default roomHandler;