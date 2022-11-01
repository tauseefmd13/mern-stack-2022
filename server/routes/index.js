import { Router } from "express";
import authCheck from "../middleware/auth.js";
import authRoutes from "./auth.js";
import userRoutes from "./user.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authCheck, userRoutes);

export default router;
