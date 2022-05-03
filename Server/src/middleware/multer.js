import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single(`image`);

const dUri = new DatauriParser();

export const dataUri = (req) => {
  return dUri.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );
};

export default multerUploads;
