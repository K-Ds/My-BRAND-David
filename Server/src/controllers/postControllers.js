const postServices = require("../services/postServices");
const postValidator = require("../validators/postValidator");

// Get all posts
module.exports.getAllPosts = async (req, res) => {
  const posts = await postServices.getAll();
  res.send(posts);
};

// Get a post by its ID
module.exports.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postServices.getOnePost(postId);
    return res.send(post);
  } catch (e) {
    return res.status(404).send("Blog not found");
  }
};

// Create new post
module.exports.newPost = async (req, res) => {
  const input = {
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    body: req.body.body,
  };

  validePost = postValidator(input);

  if (validePost.error) {
    return res.status(404).send(validePost.error);
  }
  const result = await postServices.createPost(input);
  return res.send(result);
};

// Update a post
module.exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const input = {
      title: req.body.title,
      author: req.body.author,
      img: req.body.img,
      body: req.body.body,
    };

    validePost = postValidator(input);

    if (validePost.error) {
      return res.status(404).send(validePost.error);
    }

    const result = await postServices.updatePost(postId, input);
    return res.send(result);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

// Delete post from DB
module.exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const result = await postServices.deletePost(postId);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
};
