import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Socket, io } from 'socket.io-client';
import { AuthContext } from "../context/AuthContext";
import type { Message, Notifs, Room, SocketContextProps } from "../types/user";

const useSocket = (): SocketContextProps => {
	const { user } = useContext(AuthContext);

	const [socket, setSocket] = useState<Socket>();
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [rooms, setRooms] = useState<Room[]>([]);
	const [activeChat, _setActiveChat] = useState<Room>();
	const [messages, setMessages] = useState<Message[]>([]);
	const [roomError, setRoomError] = useState<string>('');
	const [notifs, setNotifs] = useState<Notifs[]>([]);
	const activeChatRef = useRef(activeChat);

	const setActiveChat = (data?: Room) => {
		activeChatRef.current = data;
		_setActiveChat(data);
	}

	useEffect(() => {
		(async function () {
			if (user) {
				const token = await user?.getIdToken();
				if (token) {
					const newSocket = io(import.meta.env.VITE_APP_BACKEND_URL, {
						query: { token },
						transports: ['websocket'],
					});
					setSocket(newSocket);
					setIsConnected(true);
				}
			}
		})()
	}, [user]);

	const handleNotif = useCallback((message: Message) => {
		setNotifs((prev) => {
			const notifs = [...prev];
			console.log(activeChat);
			if (message.room !== activeChatRef.current?.roomId) {
				const unseen = notifs.find(notif => notif.roomId === message?.room);
				console.log(unseen?.unseen);
				if (unseen) {
					unseen.unseen++;
				}
			}
			console.log(notifs);
			return notifs;
		})
	}, [activeChat]);

	useEffect(() => {
		if (socket) {
			socket.on('user-connected', (rooms: Room[], messages) => {
				console.log(rooms, messages);
				setRooms(prev => {
					const filterRooms = rooms.filter(room => !prev.find(prevRoom => prevRoom.roomId === room.roomId))
					return [...prev, ...filterRooms];
				});
				setNotifs(prev => {
					const notifs = [...prev];
					rooms.forEach(room => {
						notifs.push({ roomId: room.roomId, unseen: 0 });
					})
					return notifs;
				})
				setMessages(prev => [...prev, ...messages]);
			})
			socket.on('message', (message: Message) => {
				console.log(message);
				setMessages(prev => [...prev, message]);
				handleNotif(message);
			})
			socket.on('room-not-found', () => {
				console.log('Room not found');
				setRoomError('Room not found');
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);

	useEffect(() => {
		setNotifs((prev) => {
			const notifs = [...prev];
			const notif = notifs.find(notif => notif.roomId === activeChat?.roomId);
			if (notif) {
				notif.unseen = 0;
			}
			return notifs;
		})
	}, [activeChat])

	const sendMessage = (message: string) => {
		socket?.emit('send-message', activeChat?.roomId, message);
	}

	const handleLeave = (roomId: string) => {
		setRooms(prev => prev.filter(room => room.roomId !== roomId));
		setActiveChat(undefined);
		socket?.emit('leave-room', roomId);
	}

	return {
		socket,
		isConnected,
		rooms,
		setActiveChat,
		activeChat,
		messages,
		sendMessage,
		roomError,
		setRoomError,
		notifs,
		handleLeave
	}
}

export default useSocket