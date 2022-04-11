import Joi from "joi";

const schema = Joi.object({
  content: Joi.string().required(),
  user: Joi.string(),
});

function validationComment(input) {
  const result = schema.validate({
    user: input.user,
    content: input.content,
  });

  return result;
}

export default validationComment;
