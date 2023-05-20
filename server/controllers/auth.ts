import { Handler } from "express";
import User from "../models/User";
import redisClient from "../redisClient";

export const getUser = async (user: IUser) => {
	try {
		const my_user = await User.findOne({ userId: user.userId });
		if (my_user) {
			return my_user;
		} else {
			const newUser = await User.create(user);
			return newUser;
		}
	} catch (err) {
		console.log(err)
	}
}

export const fetch: Handler = async (req, res) => {
	const user = req.body;
	if (user) {
		const my_user = await getUser({ userId: user.uid, name: user.displayName, email: user.email, avatar: user.photoURL, status: 'online' });
		res.status(200).json(my_user);
	} else {
		res.status(400).json({ message: 'No user found' })
	}
}

export const changeStatus = async (userId: string, status: string) => {
	try {
		await User.findOneAndUpdate({ userId }, { status }, { new: true });
	} catch (err) {
		console.log(err)
	}
}

