import express from "express";
import postsController from "../controllers/postControllers";

const router = express.Router();

router.get("/", postsController.getAllPosts);

router.post("/", postsController.newPost);

router.get("/:id", postsController.getPost);

router.patch("/:id", postsController.updatePost);

router.delete("/:id", postsController.deletePost);

export default router;
