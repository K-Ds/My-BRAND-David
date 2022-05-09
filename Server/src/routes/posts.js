import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import {
  validationPost,
  validationUpdatePost,
} from "../validators/postValidator";
import commentValidator from "../validators/commentValidator";
import object_IdValidator from "../validators/object_IdValidator";
import multerUploads from "../middleware/multer";

import * as postsControllers from "../controllers/postControllers";

const router = express.Router();

router.get("/", postsControllers.getAllPosts);

router.get("/:id", object_IdValidator, postsControllers.getPost);

router.post(
  "/",
  [auth, admin, multerUploads, validationPost],
  postsControllers.newPost
);

router.put(
  "/:id",
  [auth, admin, object_IdValidator, multerUploads, validationUpdatePost],
  postsControllers.updatePost
);

router.delete(
  "/:id",
  [auth, admin, object_IdValidator],
  postsControllers.deletePost
);

/**
 * @openapi
 * /api/posts/{postId}/comment:
 *  post:
 *    summary: Use to comment on a blog
 *    tags:
 *      - Posts
 *      - Comments
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        description: The ID of the post to return.
 *        schema:
 *          type: string
 *
 *      - in: body
 *        name: body
 *        description: The comment to post.
 *        schema:
 *          type: object
 *          required:
 *            - content
 *            - user
 *          properties:
 *           content:
 *             type: string
 *             example: Very Good Job.
 *           user:
 *             type: string
 *             example: Jane Doe
 *
 *      - in: header
 *        name: x-auth-token
 *        description: The user jwt token
 *        schema:
 *          type: object
 *          required:
 *            - x-auth-token
 *          properties:
 *           x-auth-token:
 *             type: string
 *
 *    responses:
 *      200:
 *        description: A successful response
 *      401:
 *        description: Not logged in
 */
router.post("/:id/comment", [commentValidator], postsControllers.addComment);

/**
 * @openapi
 * /api/posts/{postId}/like:
 *  post:
 *    summary: Use to like a post.
 *    tags:
 *      - Posts
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        description: The ID of the post to return.
 *        schema:
 *          type: string
 *
 *
 *    responses:
 *      204:
 *        description: A successful response
 *      401:
 *        description: Not logged in
 */
router.post("/:id/like", postsControllers.likePost);

/**
 * @openapi
 * /api/posts/{postId}/dislike:
 *  post:
 *    summary: Use to dislike a post.
 *    tags:
 *      - Posts
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        description: The ID of the post.
 *        schema:
 *          type: string
 *
 *
 *    responses:
 *      204:
 *        description: A successful response
 *      401:
 *        description: Not logged in
 */
router.post("/:id/dislike", postsControllers.dislikePost);

export default router;
