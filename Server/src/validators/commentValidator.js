import Joi from "joi";

const schema = Joi.object({
  content: Joi.string().required(),
  user: Joi.string(),
});

const validationComment = (req, res, next) => {
  const valideComment = schema.validate({
    user: req.body.user,
    content: req.body.content,
  });

  if (valideComment.error) {
    return res.status(400).json({ error: validePost.error.details[0].message });
  }
  next();
};

export default validationComment;
