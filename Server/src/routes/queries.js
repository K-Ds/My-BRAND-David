import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import queryValidator from "../validators/queryValidator";
import objectIdValidator from "../validators/object_IdValidator";
import * as queryControllers from "../controllers/queryControllers";

const router = express.Router();

/**
 * @openapi
 * /api/queries:
 *  get:
 *    summary: Use to request all queries
 *    tags:
 *      - Queries
 *    parameters:
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
 *    responses:
 *      200:
 *        description: A successful response of all queries
 *      401:
 *        description: Not logged in
 *      403:
 *        description: Not Admin
 *      500:
 *        description: Server Error
 */
router.get("/", [auth, admin], queryControllers.getAllQueries);

/**
 * @openapi
 * /api/queries:
 *  post:
 *    summary: Use to post a new query.
 *    tags:
 *      - Queries
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: body
 *        description: The query to create.
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *           name:
 *             type: string
 *             example: John Doe
 *           email:
 *             type: string
 *             example: Jane.Doe@gmail.com
 *           subject:
 *             type: string
 *             example: Job Offer
 *           body:
 *             type: string
 *             example: Lorem ipsum
 *
 *    responses:
 *      201:
 *        description: A successful post of query
 *      400:
 *        description: some required parameters not passed.
 */
router.post("/", queryValidator, queryControllers.newQuery);

/**
 * @openapi
 * /api/queries/{queryId}:
 *  get:
 *    summary: Returns a query by ID.
 *    tags:
 *      - Queries
 *    parameters:
 *      - in: path
 *        name: queryId
 *        required: true
 *        description: The ID of the post to return.
 *        schema:
 *          type: string
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
 *    responses:
 *      200:
 *        description: A successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *
 *      401:
 *        description: Not logged in
 *      403:
 *        description: Not Admin
 *      400:
 *        description: Invalid ID.
 *      404:
 *        description: Blog not found.
 *      500:
 *        description: Server Error.
 */
router.get("/:id", [auth, admin, objectIdValidator], queryControllers.getQuery);

router.delete(
  "/:id",
  [auth, admin, queryValidator],
  queryControllers.deleteQuery
);

export default router;
