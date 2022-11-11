import mongoose from "mongoose";
const { Schema } = mongoose;

const likeSchema = new Schema(
	{
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

export default new mongoose.model("Like", likeSchema);
