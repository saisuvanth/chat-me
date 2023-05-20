import { FC, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Login from "../pages/Login";
import Loading from "./Loading";

interface Props {
	children: React.ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <Loading />
	}

	if (user) {
		return <>
			{children}
		</>
	}
	return <Login />
}

export default PrivateRoute