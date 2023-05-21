import client from '../redisClient';


export const getRoom = async (roomName: string): Promise<string> => {
	const rooms = await client.hGetAll('rooms');
	if (!rooms) {
		console.error(rooms);
		return ''
	}
	const roomId = Object.keys(rooms).find(key => rooms[key] === roomName);
	if (!roomId) return '';
	return roomId;
}