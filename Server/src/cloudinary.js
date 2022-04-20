const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (image) => {
  const result = cloudinary.uploader.upload(image).then((result) => {
    return result;
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
