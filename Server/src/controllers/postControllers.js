import * as postServices from "../services/postServices";
import postValidator from "../validators/postValidator";
import commentValidator from "../validators/commentValidator";
import cloudinary from "../cloudinary";

// Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await postServices.getAll();
  return res.status(200).json(posts);
};

// Get a post by its ID
export const getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postServices.getOnePost(postId);
    return res.json(post).status(200);
  } catch (e) {
    return res.status(404).json({ err: "Blog not found" });
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
  const input = {
    title: req.body.title,
    author: req.body.author,
    img: imgUrl,
    body: req.body.body,
  };

  const validePost = postValidator(input);

  if (validePost.error) {
    return res.status(404).json(validePost.error.details[0].message);
  }
  const result = await postServices.createPost(input);
  return res.status(201).json(result);
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const input = {
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
      body: req.body.body,
    };

    const validePost = postValidator(input);

    if (validePost.error) {
      return res.status(404).json(validePost.error.details[0].message);
    }

    const result = await postServices.updatePost(postId, input);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
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

  const validComment = commentValidator(input);

  if (validComment.error) {
    return res.status(404).json(validComment.error.details[0].message);
  }

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
