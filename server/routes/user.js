import { Router } from "express";
import * as UserController from "../controllers/UserController.js";

const router = Router();

router.get("/me", UserController.me);
router.post("/change-password", UserController.changePassword);

export default router;
