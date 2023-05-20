import { Server } from "socket.io";
import auth from "./firebase.config";
import { getUser } from "./controllers/auth";

export const checkAuth = (io: Server) => {
	io.use(async (socket, next) => {
		const token = socket.handshake.query.token
		try {
			if (token) {
				const payload = await auth.verifyIdToken(token as string);
				if (payload) {
					console.log(payload)
					const user = await getUser({ userId: payload.uid, email: payload.email!, name: payload.name, avatar: payload.picture!, status: 'online' });
					console.log(user)
					socket.data.user = user;
					return next();
				}
			} else {
				return next(new Error("Not authorized"));
			}
		} catch (err) {
			console.log(err);
			return next(new Error("Not authorized"));
		}
	})
}