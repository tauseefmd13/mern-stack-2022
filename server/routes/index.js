import { Router } from "express";
import authCheck from "../middleware/auth.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";
import postRoutes from "./post.js";
import likeRoutes from "./like.js";
import commentRoutes from "./comment.js";
import uploadRoutes from "./upload.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authCheck, userRoutes);
router.use("/posts", authCheck, postRoutes);
router.use("/likes", authCheck, likeRoutes);
router.use("/comments", authCheck, commentRoutes);
router.use("/upload", authCheck, uploadRoutes);

export default router;
