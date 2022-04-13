import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import postValidator from "../validators/postValidator";
import commentValidator from "../validators/commentValidator";

import * as postsControllers from "../controllers/postControllers";

const router = express.Router();

router.get("/", postsControllers.getAllPosts);

router.post("/", [auth, admin, postValidator], postsControllers.newPost);

router.get("/:id", postsControllers.getPost);

router.patch("/:id", [auth, admin, postValidator], postsControllers.updatePost);

router.delete("/:id", [auth, admin], postsControllers.deletePost);

router.post(
  "/:id/comment",
  [auth, commentValidator],
  postsControllers.addComment
);

router.post("/:id/like", postsControllers.likePost);

export default router;
