import { Router } from "express";
import {
	login,
	register,
	forgotPassword,
	resetPassword,
} from "../controllers/AuthController.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:id/:token", resetPassword);

export default router;
