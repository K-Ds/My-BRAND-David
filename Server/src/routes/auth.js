import express from "express";
import authValidator from "../validators/authValidator";

import * as authControllers from "../controllers/authControllers";

const router = express.Router();

router.post("/", authValidator, authControllers.checkAuth);

export default router;
