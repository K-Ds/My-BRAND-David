import * as queryServices from "../services/queryServices";
import queryValidator from "../validators/queryValidator";

// Get all query
export const getAllQueries = async (req, res) => {
  const queries = await queryServices.getAll();
  return res.status(200).json(queries);
};

// Get a query by its ID
export const getQuery = async (req, res) => {
  const queryId = req.params.id;
  try {
    const query = await queryServices.getOneQuery(queryId);
    return res.json(query).status(200);
  } catch (e) {
    return res.status(404).json({ error: "Query not found" });
  }
};

// Create new query
export const newQuery = async (req, res) => {
  const input = {
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    body: req.body.body,
  };

  const result = await queryServices.createQuery(input);
  return res.status(200).json(result);
};

// Delete query from DB
export const deleteQuery = async (req, res) => {
  const queryId = req.params.id;
  try {
    const result = await queryServices.deleteQuery(queryId);
    return res.status(204).json({ message: "query deleted" });
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
};
