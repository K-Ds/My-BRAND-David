import _ from "lodash";
import * as authServices from "../services/authServices";

// Create new auth
export const checkAuth = async (req, res) => {
  const input = _.pick(req.body, ["email", "password"]);

  try {
    const token = await authServices.checkAuth(input);
    return res.status(201).json({ token: token });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};
