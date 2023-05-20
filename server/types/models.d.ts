interface IUser {
	userId: string;
	email: string;
	name: string;
	avatar: string;
	status: string;
}

interface IRoom {
	users: IUser[];
}

interface IMessage {
	message: string;
	sendBy: IUser;
	room: IRoom;
}