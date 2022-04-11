import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  img: { type: String, required: true },
  date: { type: Date, default: Date.now },
  body: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
