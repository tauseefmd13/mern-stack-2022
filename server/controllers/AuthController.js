import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Validator } from "node-input-validator";
import User from "../models/User.js";
import transporter from "../config/mail.js";

export const register = async (req, res) => {
	const v = new Validator(req.body, {
		first_name: "required|maxLength:255",
		last_name: "required|maxLength:255",
		email: "required|email",
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

	const { first_name, last_name, email, password } = req.body;

	try {
		//check user exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res
				.status(409)
				.json({ success: false, message: "The email has already been taken." });
		}

		//hash the password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(password, salt);

		const user = await User({
			first_name,
			last_name,
			email,
			password: hashPassword,
		});

		await user.save();

		//create jwt token
		const token = jwt.sign(
			{
				_id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: process.env.JWT_EXPIRE_TIME,
			}
		);

		return res.status(201).json({
			success: true,
			message: "Registered successfully.",
			data: { user, token },
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong." });
	}
};

export const login = async (req, res) => {
	const v = new Validator(req.body, {
		email: "required",
		password: "required",
	});

	const validated = await v.check();

	if (!validated) {
		return res.status(422).json({
			success: false,
			message: "Validation failed.",
			errors: v.errors,
		});
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "These credentials do not match our records.",
			});
		}

		const passwordMatched = await bcrypt.compare(password, user.password);

		if (!passwordMatched) {
			return res.status(404).json({
				success: false,
				message: "These credentials do not match our records.",
			});
		}

		//create jwt token
		const token = jwt.sign(
			{
				_id: user._id,
				email: user.email,
			},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: process.env.JWT_EXPIRE_TIME,
			}
		);

		return res.json({
			success: true,
			message: "Logged in successfully.",
			data: { user, token },
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong." });
	}
};

export const forgotPassword = async (req, res) => {
	const v = new Validator(req.body, {
		email: "required",
	});

	const validated = await v.check();

	if (!validated) {
		return res.status(422).json({
			success: false,
			message: "Validation failed.",
			errors: v.errors,
		});
	}

	const { email } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user) {
			const secretKey = user._id + process.env.JWT_SECRET_KEY;

			const token = jwt.sign(
				{
					_id: user._id,
					email: user.email,
				},
				secretKey,
				{
					expiresIn: "15m",
				}
			);

			const link = `http://localhost:3000/reset-password/${user._id}/${token}`;
			console.log(link);

			// Send Email
			// const info = await transporter.sendMail({
			// 	from: process.env.MAIL_FROM_ADDRESS,
			// 	to: user.email,
			// 	subject: "Password Reset Link",
			// 	html: `<a href=${link}>Click Here</a> to Reset Your Password`,
			// });
		}

		return res.json({
			success: true,
			message: "We have emailed your password reset link.",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: "Something went wrong." });
	}
};

export const resetPassword = async (req, res) => {
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
	const { id, token } = req.params;

	try {
		const user = await User.findById(id);

		const secretKey = user._id + process.env.JWT_SECRET_KEY;
		jwt.verify(token, secretKey);

		//hash the password
		const saltRounds = 10;
		const salt = await bcrypt.genSalt(saltRounds);
		const hashPassword = await bcrypt.hash(password, salt);

		await User.findByIdAndUpdate(user._id, {
			$set: { password: hashPassword },
		});

		return res.json({
			success: true,
			message: "Your password has been reset.",
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: "Invalid token." });
	}
};
