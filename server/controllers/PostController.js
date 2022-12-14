import Post from "../models/Post.js";

export const index = async (req, res) => {
	try {
		const userPosts = await Post.find({ user: req.user._id })
			.populate("user", "first_name last_name avatar")
			.sort({ createdAt: -1 });

		if (!userPosts.length) {
			return res
				.status(404)
				.json({ success: false, message: "Posts not found." });
		}

		return res.status(200).json({
			success: true,
			message: "Posts found.",
			data: userPosts,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const show = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found." });
		}

		return res.status(200).json({
			success: true,
			message: "Post found.",
			data: post,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const store = async (req, res) => {
	try {
		const post = await Post({ ...req.body, user: req.user._id });

		await post.save();

		return res.status(201).json({
			success: true,
			message: "Post created successfully.",
			data: post,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const update = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found." });
		}

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Forbidden." });
		}

		const updatedPost = await Post.findByIdAndUpdate(
			post._id,
			{ $set: req.body },
			{ new: true }
		);

		return res.status(200).json({
			success: true,
			message: "Post updated successfully.",
			data: updatedPost,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};

export const destroy = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ success: false, message: "Post not found." });
		}

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ success: false, message: "Forbidden." });
		}

		await post.deleteOne();

		return res.status(200).json({
			success: true,
			message: "Post deleted successfully.",
			data: null,
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
};
