import { Server, Socket } from "socket.io";
import { changeStatus } from "../controllers/auth";
import roomHandler from "./roomHandler";
import messageHandler from "./messageHandler";
import redisClient from "../redisClient";
import Message from "../models/Message";

const getAllRooms = async (userId: string) => {
	const res = await redisClient.hKeys('rooms');
	if (!res) {
		console.error(res);
	} else {
		const roomsWithUser: any[] = [];

		for (let index = 0; index < res.length; index++) {
			const roomId = res[index];
			const res1 = await redisClient.sIsMember(roomId, userId);
			if (!res1) {
				console.error(res1);
			} else {
				const roomData = await redisClient.hGet('rooms', roomId);
				const res2 = await redisClient.sMembers(roomId);
				roomsWithUser.push({ roomId, roomName: roomData, members: res2 });
			}
		}
		return roomsWithUser;
	}
}

const socketHandler = async (io: Server) => {
	io.on('connection', async (socket: Socket) => {
		changeStatus(socket.data.user.userId, 'online');
		const user = socket.data.user;
		// await redisClient.flushAll()
		const rooms = await getAllRooms(user.userId);
		// console.log('rooms', rooms);
		rooms?.forEach(room => socket.join(room.roomId));
		const messages = await Message.find({ room: { $in: rooms?.map(room => room.roomId) } }).populate('sendBy');
		// console.log('messages', messages);
		socket.emit('user-connected', rooms, messages);

		roomHandler(io, socket);
		messageHandler(io, socket);

		socket.on('disconnect', () => {
			changeStatus(socket.data.user.userId, 'offline');
		})
	})
}


export default socketHandler;