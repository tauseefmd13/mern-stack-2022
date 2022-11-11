import { Router } from "express";
import * as LikeController from "../controllers/LikeController.js";

const router = Router();

router.post("/", LikeController.store);
router.delete("/:id", LikeController.destroy);

export default router;
