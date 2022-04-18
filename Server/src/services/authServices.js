import bcrypt from "bcrypt";
import User from "../models/User";

//check if credentials already exists
export const checkAuth = async (input) => {
  let user = await User.findOne({ email: input.email });

  // check if user exists
  if (!user) {
    throw new Error("Invalid Email or Password");
    return;
  }

  // compare password given
  const validPassword = await bcrypt.compare(input.password, user.password);

  if (!validPassword) {
    throw new Error("Invalid Email or Password");
    return;
  }
  const token = user.generateToken();
  return token;
};
