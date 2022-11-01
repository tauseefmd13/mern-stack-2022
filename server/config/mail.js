import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: false, // true for 465
	auth: {
		user: process.env.MAIL_USERNAME, // Admin Gmail ID
		pass: process.env.MAIL_PASSWORD, // Admin Gmail Password
	},
});

export default transporter;
