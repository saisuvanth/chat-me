import { useContext, useEffect, useState } from "react"
import { Socket, io } from 'socket.io-client';
import { AuthContext } from "../context/AuthContext";

const useSocket = () => {
	const { user } = useContext(AuthContext);

	const [socket, setSocket] = useState<Socket>();
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [rooms, setRooms] = useState([]);

	const connect = async () => {
		const token = await user?.getIdToken();
		if (token) {
			const newSocket = io('http://localhost:3001', {
				query: { token },
				transports: ['websocket']
			});
			setSocket(newSocket);
			setIsConnected(true);
		}
	}

	useEffect(() => {
		connect();
	}, [user]);

	useEffect(() => {
		if (socket) {
			socket.on('user-connected', (user) => {
				console.log(user);
			})
		}
	}, [socket]);

	return { socket, isConnected }
}

export default useSocket