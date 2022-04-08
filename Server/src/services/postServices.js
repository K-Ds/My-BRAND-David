const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Get All posts in DB
exports.getAll = async () => {
  const posts = await Post.find();
  return posts;
};

// Get a post by its ID
exports.getOnePost = async (postId) => {
  const post = await Post.findOne({ _id: postId });

  if (!post || Object.keys(post).length === 0) {
    throw new Error("Brog not found");
    return;
  }
  return post;
};

// Create a post in DB

exports.createPost = async (input) => {
  const post = new Post(input);

  return await post.save();
};

// update a blog
exports.updatePost = async (postId, input) => {
  const updatePost = await Post.findByIdAndUpdate(postId, input, {
    new: true,
  });

  if (!updatePost) {
    throw new Error("Brog not found");
    return;
  }

  return updatePost;
};

// Delete Blog from DB
exports.deletePost = async (postId) => {
  const deletedPost = await Post.deleteOne({ _id: postId });

  if (deletedPost.deletedCount == 0) {
    throw new Error("Brog not found");
    return;
  }
  return deletedPost;
};
