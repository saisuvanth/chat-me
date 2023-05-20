import { Schema, model } from "mongoose";

const UserSchema = new Schema<IUser>({
	userId: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
})

export default model('Users', UserSchema);