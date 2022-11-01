import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";
import User from "../models/User.js";

export const me = (req, res) => {
	return res.json({ success: true, message: "Data found.", data: req.user });
};

export const changePassword = async (req, res) => {
	const v = new Validator(req.body, {
		password: "required|minLength:8",
		password_confirmation: "required|same:password",
	});

	const validated = await v.check();

	if (!validated) {
		return res.status(422).json({
			success: false,
			message: "Validation failed.",
			errors: v.errors,
		});
	}

	const { password } = req.body;

	try {
		//hash the password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(password, salt);

		await User.findByIdAndUpdate(req.user._id, {
			$set: { password: hashPassword },
		});

		return res.json({
			success: true,
			message: "Password changed successfully.",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong." });
	}
};
