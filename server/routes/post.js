import { Router } from "express";
import * as PostController from "../controllers/PostController.js";

const router = Router();

router.get("/", PostController.index);
router.get("/:id", PostController.show);
router.post("/", PostController.store);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.destroy);

export default router;
