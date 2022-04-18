import * as postServices from "../services/postServices";
import commentValidator from "../validators/commentValidator";
import cloudinary from "../cloudinary";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postServices.getAll();
    return res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a post by its ID
export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postServices.getOnePost(postId);
    return res.json(post).status(200);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

// Create new post
export const newPost = async (req, res) => {
  let imgUrl = "";
  try {
    const cloudinaryResult = await cloudinary(req.body.img);
    imgUrl = cloudinaryResult.url;
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  try {
    const input = {
      title: req.body.title,
      author: req.body.author,
      img: imgUrl,
      body: req.body.body,
    };

    const result = await postServices.createPost(input);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ err: err.message });
  }
};

// Update a post
export const updatePost = async (req, res) => {
  let imgUrl = "";
  try {
    const cloudinaryResult = await cloudinary(req.body.img);
    imgUrl = cloudinaryResult.url;
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  try {
    const postId = req.params.id;
    const input = {
      title: req.body.title,
      author: req.body.author,
      img: imgUrl,
      body: req.body.body,
    };

    const result = await postServices.updatePost(postId, input);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete post from DB
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await postServices.deletePost(postId);
    return res.status(204).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

// add comment
export const addComment = async (req, res) => {
  const input = { user: req.body.user, content: req.body.content };

  const postId = req.params.id;

  try {
    const result = await postServices.addComment(postId, input);

    return res.status(204).json({ message: "Comment Posted" });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await postServices.likePost(postId);

    return res.status(204).json({ message: "Blog Liked" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
