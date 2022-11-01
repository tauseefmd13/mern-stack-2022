import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authCheck = async (req, res, next) => {
	try {
		const authorization =
			req.headers["Authorization"] || req.headers["authorization"];

		const token = authorization && authorization.split(" ")[1];

		const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

		req.user = await User.findById(_id).select("-password");

		next();
	} catch (error) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized.",
		});
	}
};

export default authCheck;
