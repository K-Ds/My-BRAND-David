import bcrypt from "bcrypt";
import User from "../models/User";

// Create a user in DB

export const createUser = async (input) => {
  let user = await User.findOne({ email: input.email });

  // check if user already exists
  if (user) {
    throw new Error("User with email already exists");
    return;
  }
  user = new User(input);

  // hashing password
  const hash = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, hash);

  return await user.save();
};
