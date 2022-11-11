import multer from "multer";
import path from "path";
import { Router } from "express";

const router = Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const filename = path.parse(file.originalname).name.toLowerCase();
		const extname = path.extname(file.originalname).toLowerCase();
		cb(null, filename.replace(/\s/g, "-") + "-" + uniqueSuffix + extname);
	},
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
	try {
		return res.status(200).json({
			success: true,
			message: "File uploaded successfully.",
			data: {
				filename: req.file.filename,
				path: req.file.path.replace(/\\/g, "/"),
				fullpath: process.env.APP_URL + "/" + req.file.path.replace(/\\/g, "/"),
			},
		});
	} catch (error) {
		return res.status(500).json({ success: false, message: error.message });
	}
});

export default router;
