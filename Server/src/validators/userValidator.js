import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(255).required(),
});

const validationUser = (req, res, next) => {
  const valideUser = schema.validate({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  if (valideUser.error) {
    return res.status(400).json({ error: valideUser.error.details[0].message });
  }

  next();
};

export default validationUser;
