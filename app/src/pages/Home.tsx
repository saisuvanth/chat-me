import { FC } from "react"
import PrivateRoute from "../components/PrivateRoute"
import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import SocketProvider from "../context/SocketContext"

const Home: FC = () => {


	return (
		<PrivateRoute>
			<SocketProvider>
				<div className="flex bg-[#edf2f7] max-h-screen">
					<Sidebar />
					<div className="flex flex-grow p-5">
						<ChatWindow />
					</div>
				</div>
			</SocketProvider>
		</PrivateRoute>
	)
}

export default Home