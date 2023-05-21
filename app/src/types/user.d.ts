import type { User, UserCredential } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";
import { Socket } from 'socket.io-client'
interface AuthContextProps {
	user?: User;
	login: () => Promise<UserCredential>;
	logout: () => Promise<void>;
	loading: boolean;
}

type Room = {
	roomId: string;
	roomName: string;
	members: string[];
}


type Notifs = {
	roomId: string;
	unseen: number;
}


interface SocketContextProps {
	socket?: Socket;
	isConnected: boolean;
	rooms: Room[];
	activeChat?: Room;
	messages: Message[];
	sendMessage: (message: string) => void;
	setActiveChat: (data?: Room) => void;
	roomError?: string;
	setRoomError: Dispatch<SetStateAction<string>>;
	notifs: Notifs[];
	handleLeave: (roomId: string) => void;
}
type IUser = {
	avatar: string;
	userId: string;
	email: string;
	name: string;
	status: string;
	_id: string;
}

type Message = {
	room: string;
	message: string;
	sendBy: IUser;
	createdAt: string;
	updatedAt: string;
	_id: string;
}