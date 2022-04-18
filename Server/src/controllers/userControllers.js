import _ from "lodash";
import * as userServices from "../services/userServices";

// Create new user
export const createUser = async (req, res) => {
  const input = _.pick(req.body, ["name", "email", "password"]);

  try {
    const result = await userServices.createUser(input);
    return res.status(201).json(_.pick(result, ["_id", "name", "email"]));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
