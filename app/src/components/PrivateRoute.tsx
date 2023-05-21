import { FC, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	console.log(loading)


	if (loading) {
		return <Loading />
	}

	if (user) {
		return <>
			{children}
		</>
	}
	return <Navigate to="/login" />
}

export default PrivateRoute