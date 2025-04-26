import { Router } from "express";
import {
  createPost,
  likePost,
  commentPost,
} from "../controllers/post.controller";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { commentSchema, postSchema } from "../schemas/post.schema";

const router = Router();

router.post("/", auth, validate(postSchema), createPost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, validate(commentSchema), commentPost);

export default router;
