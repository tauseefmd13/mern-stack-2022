import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		first_name: {
			type: String,
			required: true,
		},
		last_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		email_verified_at: { type: Date, default: null },
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.toJSON = function () {
	let obj = this.toObject();
	delete obj.password;
	return obj;
};

export default new mongoose.model("User", userSchema);
