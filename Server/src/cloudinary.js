const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "k-ds",
  api_key: "823114164825559",
  api_secret: "cTaAd4Nmhx9HDZQkx6OsngbpT5M",
});

const upload = async (image) => {
  const result = cloudinary.uploader.upload_(image).then((result) => {
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
