import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema(
	{
		body: {
			type: String,
			required: true,
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export default new mongoose.model("Comment", commentSchema);
