const express = require("express");
const mongoose = require("mongoose");
const posts = require("./routes/posts");

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
