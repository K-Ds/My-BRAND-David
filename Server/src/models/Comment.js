const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: { type: String },
  user: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
