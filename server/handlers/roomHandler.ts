import { Server, Socket } from "socket.io";
import client from "../redisClient";
import * as uuid from 'uuid';
import Message from "../models/Message";
import { getRoom } from "../controllers/room";



const roomHandler = (io: Server, socket: Socket) => {
	socket.on('create-room', async (roomName) => {
		const user = socket.data.user;
		const roomId = await getRoom(roomName);
		if (roomId === '') {
			const roomId = uuid.v4();
			const res = await client.hSet('rooms', roomId, roomName);
			console.log('Created Room', res);
			socket.join(roomId);
			const res1 = await client.sAdd(roomId, user.userId);
			io.to(roomId).emit('user-connected', [{ roomId, roomName }], []);
		}
	})

	socket.on('join-room', async (roomName) => {
		let roomId: string = '';
		const user = socket.data.user;
		roomId = await getRoom(roomName);
		if (roomId === '') {
			socket.emit('room-not-found');
			roomId = uuid.v4();
			const res = await client.hSet('rooms', roomId, roomName);
			console.log('Created Room', res);
		}
		const res = await client.sAdd(roomId, user.userId);
		console.log('Added User to room', res);
		socket.join(roomId);
		const messages = await Message.find({ room: roomId }).populate('sendBy');
		io.to(roomId).emit('user-connected', [{ roomName, roomId }], messages);
	})


	socket.on('leave-room', async (roomId) => {
		const user = socket.data.user;
		const res = await client.sRem(roomId, user.userId);
		console.log(res);
		socket.leave(roomId);
		// socket.to(roomId).emit('user-disconnected', user);
	})
}

export default roomHandler;