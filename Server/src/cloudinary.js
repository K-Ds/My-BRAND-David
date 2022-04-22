import { v2 as cloudinary } from "cloudinary";

const upload = async (image) => {
  const result = cloudinary.uploader
    .upload(image)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      throw err;
    });
  return result;
};

const upload_test = async (image) => {
  return {
    url: "https://res.cloudinary.com/k-ds/image/upload/v1649666870/sample.jpg",
  };
};

let default_export = upload;

if (process.env.NODE_ENV == "test") {
  default_export = upload_test;
}

export default default_export;

// export default upload;
