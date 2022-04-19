import express from "express";
import * as userControllers from "../controllers/userControllers";
import userValidator from "../validators/userValidator";

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *  post:
 *    description: Use to create user
 *    tags:
 *      - Users
 *    consumes:
 *      - application/json
 *    parameters:
 *
 *      - in: body
 *        description: The User to create.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *          properties:
 *           name:
 *             type: string
 *             default: Jane Doe
 *           email:
 *             type: string
 *             default: janedoe@gmail.com
 *           password:
 *             type: string
 *             default: password@123
 *           isAdmin:
 *             type: boolean
 *             default: false
 *
 *    responses:
 *      - '200':
 *        description: A successful response
 *      - '401':
 *        description: Not logged in
 *      - '403':
 *        description: Not Admin
 */
router.post("/", userValidator, userControllers.createUser);

export default router;
