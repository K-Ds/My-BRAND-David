import express from "express";
import * as userControllers from "../controllers/userControllers";
import userValidator from "../validators/userValidator";

const router = express.Router();

router.post("/", userValidator, userControllers.createUser);

export default router;
