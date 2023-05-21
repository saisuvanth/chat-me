import { useContext, useState } from "react";
import Avatar from "./Avatar"
import CustomModal from "./CustomModal";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { Room } from "../types/user";



const Sidebar = () => {
	const { user } = useContext(AuthContext);
	const { socket, rooms, setActiveChat, activeChat, roomError, notifs } = useContext(SocketContext);
	const [showModal, setShowModal] = useState(false);
	const [modalState, setModalState] = useState<'create' | 'join'>();

	const handleSubmit = (roomId: string) => {
		if (socket) {
			if (modalState === 'create') {
				socket.emit('create-room', roomId);
			} else {
				socket.emit('join-room', roomId);
			}
		}
	}

	const handleClick = (room: Room) => {
		setActiveChat(room);
	}


	return (
		<div className="flex flex-col bg-white w-72 pl-6 pt-6 pr-2 border-r h-screen text-gray-800">
			<div className="flex flex-col gap-4">
				<div className="flex flex-row items-center justify-center gap-2 h-12 w-full">
					<div
						className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
							></path>
						</svg>
					</div>
					<div className="ml-2 font-bold text-2xl text-gray-700">Mercor Chat</div>
				</div>
				<div
					className="flex flex-col items-center bg-indigo-100 border border-gray-200 w-full py-6 px-4 rounded-lg"
				>
					<div className="h-20 w-20 rounded-full border overflow-hidden">
						<img
							src={user?.photoURL as string}
							alt="Avatar"
							className="h-full w-full"
						/>
					</div>
					<div className="text-md font-semibold mt-2">{user?.displayName}</div>
					<div className="flex flex-row items-center mt-3">
						<div
							className="flex flex-col justify-center h-4 w-8 bg-green-500 rounded-full"
						>
							<div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
						</div>
						<div className="leading-none ml-1 text-xs">Active</div>
					</div>
				</div>
				<div className="flex justify-between px-1">
					<button
						className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded text-white px-4 py-1 flex-shrink-0"
						onClick={() => { setModalState('create'); setShowModal(true) }}
					>
						Create Room
					</button>
					<button
						className="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded text-white px-4 py-1 flex-shrink-0"
						onClick={() => { setModalState('join'); setShowModal(true) }}
					>
						Join Room
					</button>
				</div>
			</div>
			<div className="w-full h-full flex flex-col">
				<div className="flex flex-col w-full mt-6">
					<div className="flex justify-between items-center">
						<div className="text-md font-bold text-gray-600">Active Conversations</div>
						<div>{rooms.length}</div>
					</div>
				</div>
				<div className="flex flex-col pr-2 overflow-y-scroll h-fit">
					{rooms?.map((room, index) => (
						<div key={index}
							className={`flex flex-row items-center cursor-pointer hover:bg-gray-200 rounded-md p-2 justify-between w-full mt-4 ${activeChat?.roomId === room.roomId ? 'bg-gray-200' : ''}`}
							onClick={() => handleClick(room)}
						>
							<div className="flex flex-row items-center">
								<Avatar name={room.roomName} />
								<div className="flex flex-col ml-2">
									<div className="text-sm font-semibold">{room.roomName}</div>
								</div>
							</div>
							<div className="flex flex-col bg-red-400 px-1 py-0.25 rounded">
								<div className="text-xs font-semibold text-white">{notifs[index]?.unseen}</div>
							</div>
						</div>
					))}
				</div>
			</div>
			{
				showModal ? <CustomModal setOpen={setShowModal} state={modalState} roomError={roomError} handleSubmit={handleSubmit} /> : null
			}
		</div>
	)
}

export default Sidebar