import { Schema, model } from "mongoose";

const RoomSchema = new Schema<IRoom>({
	users: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
})


export default model<IRoom>('Room', RoomSchema);