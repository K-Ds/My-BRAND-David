import express from "express";
import authValidator from "../validators/authValidator";

import * as authControllers from "../controllers/authControllers";

const router = express.Router();

/**
 * @openapi
 * /api/auth:
 *  post:
 *    summary: Login and returns JWT token
 *    tags:
 *      - Users
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The credentials.
 *        schema:
 *          type: object
 *          properties:
 *           email:
 *             type: string
 *             example: john.doe@gmail.com
 *           password:
 *             type: string
 *             example: Password@123
 *
 *    responses:
 *      200:
 *        description: A successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *      400:
 *        description: Incorrect email or password.
 */
router.post("/", authValidator, authControllers.checkAuth);

export default router;
