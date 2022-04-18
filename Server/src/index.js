import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import config from "config";

// ROutes
import posts from "./routes/posts";
import users from "./routes/users";
import queries from "./routes/queries";
import auth from "./routes/auth";

const app = express();

mongoose
  .connect(config.get("db"))
  .then(() => {
    console.log(`Connected to ${config.get("db")}`);
  })
  .catch(() => {
    console.log("database unable to connect");
  });

const port = process.env.PORT || 5000;

// Start Server

app.use(express.json());

app.use("/api/posts", posts);
app.use("/api/queries", queries);
app.use("/api/users", users);
app.use("/api/auth", auth);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = server;
