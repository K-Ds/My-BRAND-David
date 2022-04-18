const mongoose = require("mongoose");

export const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: String, default: "anonymous" },
  date: { type: Date, default: Date.now },
});

export const Comment = mongoose.model("Comment", commentSchema);
