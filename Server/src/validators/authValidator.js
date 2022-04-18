import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().max(255).required().email(),
  password: Joi.string().max(255).required(),
});

const validationAuth = (req, res, next) => {
  const valideAuth = schema.validate({
    email: req.body.email,
    password: req.body.password,
  });

  if (valideAuth.error) {
    return res.status(400).json({ error: valideAuth.error.details[0].message });
  }

  next();
};

export default validationAuth;
