import { useState } from "react"
import Avatar from "./Avatar"
import Message from "./Message"

const ChatWindow = () => {
	const [message, setMessage] = useState<string>();

	const handleSend = () => {
		console.log(message)
	}


	return (
		<div className="bg-[#f0f8fd] flex flex-col w-full rounded-lg">
			<div className="flex justify-between bg-white p-5 rounded-t-lg">
				<div className="flex gap-4 items-center text-lg font-semibold">
					<Avatar />
					Alison
				</div>
			</div>
			<div className="flex flex-col flex-grow p-2">
				<Message />
				<Message />
			</div>
			<div className="flex flex-row-reverse gap-2">
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
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							></path>
						</svg>
					</span>
				</button>
				<div className="flex-grow px-3">
					<input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2.5"
						value={message}
						onChange={(event) => setMessage(event.target.value)}
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