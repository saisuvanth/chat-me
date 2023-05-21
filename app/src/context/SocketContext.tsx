import { ReactNode, createContext } from "react";
import useSocket from "../hooks/useSocket";
import { SocketContextProps } from "../types/user";

export const SocketContext = createContext<SocketContextProps>({} as any);

const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { ...rest } = useSocket();

	return (
		<SocketContext.Provider value={rest}>
			{children}
		</SocketContext.Provider>
	)
}

export default SocketProvider;