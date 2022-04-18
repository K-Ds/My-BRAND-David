import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// ROutes
import posts from "./routes/posts";
import users from "./routes/users";
import queries from "./routes/queries";
import auth from "./routes/auth";

const app = express();

mongoose
  .connect("mongodb://localhost/PortfolioDB")
  .then(() => {
    console.log("Database Connected");
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
