import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  body: Joi.string().required(),
});

export const validationPost = (req, res, next) => {
  const validePost = schema.validate({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });

  const validateImg = validationImage(req.file);

  if (validePost.error) {
    return res.status(400).json({ error: validePost.error.details[0].message });
  }
  if (validateImg.error) {
    return res.status(400).json({ error: validateImg.error });
  }

  next();
};

export const validationUpdatePost = (req, res, next) => {
  const validePost = schema.validate({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });

  if (req.file) {
    const validateImg = validationImage(req.file);
    if (validateImg.error) {
      return res.status(400).json({ error: validateImg.error });
    }
  }

  if (validePost.error) {
    return res.status(400).json({ error: validePost.error.details[0].message });
  }

  next();
};

const validationImage = (imgFile) => {
  if (!imgFile) {
    const error = { error: "Image required" };
    return error;
  }
  const multerKeys = [
    "fieldname",
    "originalname",
    "encoding",
    "mimetype",
    "buffer",
    "size",
  ];

  const objectValidator = Object.keys(imgFile).every((key) => {
    return multerKeys.includes(key);
  });

  const typeValidator = imgFile.mimetype.split("/")[0] == "image";

  if (objectValidator && typeValidator) {
    const message = { message: "success" };
    return message;
  } else if (!objectValidator) {
    const error = { error: "Unable to upload image" };
    return error;
  } else if (!typeValidator) {
    const error = { error: "Invalid file type" };
    return error;
  }
};

export default validationPost;
