import express from "express";
import * as postsControllers from "../controllers/postControllers";

const router = express.Router();

router.get("/", postsControllers.getAllPosts);

router.post("/", postsControllers.newPost);

router.get("/:id", postsControllers.getPost);

router.patch("/:id", postsControllers.updatePost);

router.delete("/:id", postsControllers.deletePost);

router.post("/:id/comment", postsControllers.addComment);

router.post("/:id/like", postsControllers.likePost);

export default router;
