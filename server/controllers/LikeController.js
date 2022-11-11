import Like from "../models/Like.js";

export const store = async (req, res) => {
	try {
		const like = await Like({ ...req.body, user: req.user._id });

		await like.save();

		return res.status(201).json({
			success: true,
			message: "Liked successfully.",
			data: Like,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const destroy = async (req, res) => {
	try {
		const like = await Like.findById(req.params.id);
		if (!like) {
			return res
				.status(404)
				.json({ success: false, message: "Like not found." });
		}

		await like.deleteOne();

		return res.status(200).json({
			success: true,
			message: "Like deleted successfully.",
			data: null,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
