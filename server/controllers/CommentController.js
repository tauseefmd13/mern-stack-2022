import Comment from "../models/Comment.js";

export const store = async (req, res) => {
	try {
		const comment = await Comment({ ...req.body, user: req.user._id });

		await comment.save();

		return res.status(201).json({
			success: true,
			message: "Comment created successfully.",
			data: comment,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const destroy = async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			return res
				.status(404)
				.json({ success: false, message: "Comment not found." });
		}

		if (comment.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Forbidden." });
		}

		await comment.deleteOne();

		return res.status(200).json({
			success: true,
			message: "Comment deleted successfully.",
			data: null,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
