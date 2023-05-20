import { FC, useContext, useEffect } from "react"
import PrivateRoute from "../components/PrivateRoute"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import useSocket from "../hooks/useSocket"
import { AuthContext } from "../context/AuthContext"

const Home: FC = () => {
	const { user } = useContext(AuthContext);
	const { socket } = useSocket();

	useEffect(() => {
		console.log(socket);
		if (socket && user) {
			// socket.emit('join-room', user)
		}
	}, [socket, user])


	return (
		<PrivateRoute>
			<div className="flex bg-[#edf2f7]">
				<Sidebar />
				<div className="flex flex-grow p-5">
					<ChatWindow />
				</div>
			</div>
		</PrivateRoute>
	)
}

export default Home