import Query from "../models/Query";

// Get All queries in DB
export const getAll = async () => {
  const queries = await Query.find();
  return queries;
};

// Get a query by its ID
export const getOneQuery = async (queryId) => {
  const query = await Query.findOne({ _id: queryId });

  if (!query || Object.keys(query).length === 0) {
    throw new Error("Brog not found");
    return;
  }
  return query;
};

// Create a query in DB

export const createQuery = async (input) => {
  const query = new Query(input);

  return await query.save();
};

// Delete Blog from DB
export const deleteQuery = async (queryId) => {
  const deletedQuery = await Query.deleteOne({ _id: queryId });

  if (deletedQuery.deletedCount == 0) {
    throw new Error("Brog not found");
    return;
  }
  return deletedQuery;
};
