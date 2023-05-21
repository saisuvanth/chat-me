import { useContext, useEffect, useRef, useState } from "react"
import Avatar from "./Avatar"
import CustomMessage from "./CustomMessage"
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import type { Message } from "../types/user";


const ChatWindow = () => {
	const { user } = useContext(AuthContext);
	const { activeChat, sendMessage, messages, handleLeave } = useContext(SocketContext);
	const [message, setMessage] = useState<string>('');
	const [activeMessages, setActiveMessages] = useState<Message[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const chatContainer = useRef<HTMLDivElement>(null);

	const handleSend = () => {
		if (message === '') {
			return;
		}
		sendMessage(message as string);
		setMessage('');
	}

	const autoScroll = () => {
		chatContainer.current?.scrollIntoView({ behavior: 'smooth' });
	}

	useEffect(() => {
		const onFocus = () => {
			inputRef.current?.focus();
			autoScroll();
		}
		window.addEventListener('focus', onFocus)
		return () => {
			window.removeEventListener('focus', onFocus);
		}
	}, [])

	useEffect(() => {
		setActiveMessages(messages.filter(msg => msg.room === activeChat?.roomId))
	}, [messages, activeChat])

	useEffect(() => {
		autoScroll();
	}, [activeMessages])

	if (!activeChat) {
		return null;
	}

	return (
		<div className="bg-[#f0f8fd] flex flex-col w-full rounded-lg">
			<div className="flex justify-between bg-white p-5 rounded-t-lg">
				<div className="flex gap-4 items-center text-lg font-semibold">
					<Avatar name={activeChat?.roomName} />
					{activeChat?.roomName}
				</div>
				<div>
					<button className="bg-red-500 hover:bg-red-600 rounded-md text-white px-4 py-1 flex-shrink-0"
						onClick={() => handleLeave(activeChat?.roomId as string)}
					>
						Leave
					</button>
				</div>
			</div>
			<div className="flex flex-col flex-grow p-2 h-fit overflow-y-scroll">
				{activeMessages?.map((message, index) => (
					<CustomMessage key={index} avatar={message?.sendBy?.avatar} message={message.message as string} self={message.sendBy.userId === user?.uid} />
				))}
				<div ref={chatContainer}></div>
			</div>
			<div className="flex flex-row-reverse gap-2 pr-4">
				<button
					onClick={handleSend}
					className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
				>
					<span>Send</span>
					<span className="ml-2">
						<svg
							className="w-4 h-4 transform rotate-45 -mt-px"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							></path>
						</svg>
					</span>
				</button>
				<div className="flex-grow px-3">
					<input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2.5"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
						ref={inputRef}
						onKeyUp={(event) => {
							if (event.key === "Enter") handleSend()
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChatWindow