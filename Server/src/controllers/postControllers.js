import postServices from "../services/postServices";
import postValidator from "../validators/postValidator";

const postController = {};

// Get all posts
postController.getAllPosts = async (req, res) => {
  const posts = await postServices.getAll();
  return res.json(posts);
};

// Get a post by its ID
postController.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postServices.getOnePost(postId);
    return res.json(post);
  } catch (e) {
    return res.status(404).json({ err: "Blog not found" });
  }
};

// Create new post
postController.newPost = async (req, res) => {
  const input = {
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    body: req.body.body,
  };

  const validePost = postValidator(input);

  if (validePost.error) {
    return res.status(404).json(validePost.error);
  }
  const result = await postServices.createPost(input);
  return res.json(result);
};

// Update a post
postController.updatePost = async (req, res) => {
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
      return res.status(404).json(validePost.error);
    }

    const result = await postServices.updatePost(postId, input);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// Delete post from DB
postController.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await postServices.deletePost(postId);
    return res.status(204).json({ message: "Post deleted" });
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
};

export default postController;
