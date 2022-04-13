import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
  subject: Joi.string().required(),
  body: Joi.string().required(),
});

const validationQuery = (req, res, next) => {
  const valideQuery = schema.validate({
    name: req.body.name,
    email: req.body.email,

    subject: req.body.subject,
    body: req.body.body,
  });

  if (valideQuery.error) {
    return res.status(400).json(valideQuery.error.details[0].message);
  }
  next();
};

export default validationQuery;
