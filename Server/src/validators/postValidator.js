import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  img: Joi.string().required(),
  body: Joi.string().required(),
});

const validationPost = (req, res, next) => {
  const validePost = schema.validate({
    title: req.body.title,
    author: req.body.author,
    img: req.body.img,
    body: req.body.body,
  });

  if (validePost.error) {
    return res.status(400).json({ error: validePost.error.details[0].message });
  }
  next();
};

export default validationPost;
