import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import queryValidator from "../validators/queryValidator";
import * as queryControllers from "../controllers/queryControllers";

const router = express.Router();

router.get("/", [auth, admin], queryControllers.getAllQueries);

router.post("/", queryValidator, queryControllers.newQuery);

router.get("/:id", [auth, admin, queryValidator], queryControllers.getQuery);

router.delete(
  "/:id",
  [auth, admin, queryValidator],
  queryControllers.deleteQuery
);

export default router;
