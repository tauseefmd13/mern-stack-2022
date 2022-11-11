import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
	{
		body: {
			type: String,
			max: 500,
		},
		image: {
			type: String,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Like",
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export default new mongoose.model("Post", postSchema);
