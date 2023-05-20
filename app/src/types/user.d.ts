import type { User, UserCredential } from "firebase/auth";

interface AuthContextProps {
	user?: User;
	login: () => Promise<UserCredential>;
	logout: () => Promise<void>;
	loading: boolean;
}