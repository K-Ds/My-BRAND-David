import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import postValidator from "../validators/postValidator";
import commentValidator from "../validators/commentValidator";
import object_IdValidator from "../validators/object_IdValidator";
import multerUploads from "../middleware/multer";

import * as postsControllers from "../controllers/postControllers";

const router = express.Router();

/**
 * @openapi
 * /api/posts:
 *  get:
 *    summary: Use to request all posts
 *    tags:
 *      - Posts
 *    responses:
 *      200:
 *        description: A successful response of all posts
 *      500:
 *        description: Server Error
 */
router.get("/", postsControllers.getAllPosts);

/**
 * @openapi
 * /api/posts/{postId}:
 *  get:
 *    summary: Returns a post by ID.
 *    tags:
 *      - Posts
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: The ID of the post to return.
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 *      400:
 *        description: Invalid ID.
 *      404:
 *        description: Blog not found.
 *      500:
 *        description: Server Error.
 */
router.get("/:id", object_IdValidator, postsControllers.getPost);

/**
 * @openapi
 * /api/posts:
 *  post:
 *    summary: Use to post a new post to db
 *    tags:
 *      - Posts
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - in: header
 *        name: x-auth-token
 *        description: The user jwt token
 *        schema:
 *          type: string
 *
 *      - in: formData
 *        name: title
 *        description: The post Title.
 *        exmaple: Example title
 *        required: true
 *        type: string
 *
 *      - in: formData
 *        name: author
 *        description: The author of the post.
 *        exmaple: John Doe
 *        required: true
 *        type: string
 *
 *      - in: formData
 *        name: image
 *        description: The image of post.
 *        required: true
 *        type: file
 *
 *      - in: formData
 *        name: body
 *        description: The body of post.
 *        exmaple: lorem ipsum dolor
 *        required: true
 *        type: string
 *
 *    responses:
 *      201:
 *        description: A successful post
 *      401:
 *        description: Not logged in
 *      403:
 *        description: Not an Admin.
 *      400:
 *        description: some required parameters not passed.
 *      503:
 *        description: Service not available.
 */
router.post(
  "/",
  [auth, admin, multerUploads, postValidator],
  postsControllers.newPost
);

/**
 * @openapi
 * /api/posts/{postId}:
 *  put:
 *    summary: Use to update/edit a post
 *    tags:
 *      - Posts
 *    consumes:
 *      - multipart/form-data
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        description: The ID of the post to return.
 *        schema:
 *          type: string
 *
 *      - in: formData
 *        name: title
 *        description: The title of the post
 *        type: string
 *        required: true
 *        example: Title example
 *
 *      - in: formData
 *        name: author
 *        description: The author of the post
 *        type: string
 *        required: true
 *        example: Jane Doe
 *
 *      - in: formData
 *        name: image
 *        description: The Image of the post
 *        type: file
 *        required: true
 *
 *      - in: formData
 *        name: body
 *        description: The body of the post
 *        type: string
 *        required: true
 *        example: lorem ipsum dolor sit amet
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
 *      201:
 *        description: A successful post
 *      401:
 *        description: Not logged in
 *      403:
 *        description: Not an Admin.
 *      400:
 *        description: some required parameters not passed.
 *      404:
 *        description: Post not found.
 *      503:
 *        description: Service not available.
 */
router.put(
  "/:id",
  [auth, admin, object_IdValidator, multerUploads, postValidator],
  postsControllers.updatePost
);

/**
 * @openapi
 * /api/posts/{postId}:
 *  delete:
 *    summary: Use to delete post by id
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
 *      204:
 *        description: A successful delete of the post.
 *      401:
 *        description: Not logged in
 *      403:
 *        description: Not Admin
 *      400:
 *        description: Invalid ID.
 *      404:
 *        description: Blog not found.
 *
 */
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
router.post(
  "/:id/comment",
  [auth, commentValidator],
  postsControllers.addComment
);

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

export default router;
