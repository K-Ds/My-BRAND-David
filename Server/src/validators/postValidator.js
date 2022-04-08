import Joi from "joi";

function validationPost(input) {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    img: Joi.string().required(),
    body: Joi.string().required(),
  });

  const result = schema.validate({
    title: input.title,
    author: input.author,
    img: input.img,
    body: input.body,
  });

  return result;
}

export default validationPost;
