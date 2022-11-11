import { Router } from "express";
import * as CommentController from "../controllers/CommentController.js";

const router = Router();

router.post("/", CommentController.store);
router.delete("/:id", CommentController.destroy);

export default router;
