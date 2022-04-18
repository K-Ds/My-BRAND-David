import mongoose from "mongoose";
const Schema = mongoose.Schema;

const querySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  date: { type: Date, default: Date.now },
  body: { type: String, required: true },
});

const Query = mongoose.model("Query", querySchema);

export default Query;
