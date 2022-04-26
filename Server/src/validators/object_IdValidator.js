import mongoose from "mongoose";

const idValidator = (req, res, next) => {
  const valideId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!valideId) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  next();
};

export default idValidator;
