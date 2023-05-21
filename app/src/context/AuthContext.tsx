import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { FC, createContext, useEffect, useState } from "react";
import auth from '../../firebase.config'
import { AuthContextProps } from "../types/user";

interface Props {
	children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);


export const AuthProvider: FC<Props> = ({ children }) => {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState<boolean>(true);

	const login = async () => {
		return signInWithPopup(auth, new GoogleAuthProvider);
	}

	const logout = () => {
		return auth.signOut();
	}

	useEffect(() => {
		const fn = auth.onAuthStateChanged((user) => {
			console.log(user)
			if (user === null) {
				setLoading(false);
			}
			if (user) {
				setUser(user);
				setLoading(false);
			}
		})
		if (user) {
			setLoading(false);
		}
		return fn;
	}, [user])

	return (
		<AuthContext.Provider value={{ login, logout, user, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

