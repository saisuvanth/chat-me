import { Schema, model } from "mongoose";

const MessageSchema = new Schema<IMessage>({
	message: {
		type: String,
		required: true,
	},
	sendBy: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
	room: {
		type: String,
		required: true
	}
}, {
	timestamps: true,
});

export default model('Message', MessageSchema);