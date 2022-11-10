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
		user_id: mongoose.Types.ObjectId,
	},
	{
		timestamps: true,
	}
);

export default new mongoose.model("Post", postSchema);
