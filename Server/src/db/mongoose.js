import mongoose from "mongoose";

let mongoDb;
if (process.env.NODE_ENV === "production") {
  mongoDb = process.env.MONGODB + "BRAND_DB";
} else if (process.env.NODE_ENV === "development") {
  mongoDb = process.env.MONGODB + "BRAND_DB_DEV";
} else {
  mongoDb = process.env.MONGODB + "BRAND_DB_TEST";
}

mongoose
  .connect(mongoDb)
  .then(() => {
    console.log(`Connected to DB`);
  })
  .catch(() => {
    console.log("database unable to connect");
  });

export default mongoose;
