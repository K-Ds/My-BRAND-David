import * as Cloudinary from "cloudinary";

Cloudinary.config({
  cloud_name: "k-ds",
  api_key: 823114164825559,
  api_secret: "cTaAd4Nmhx9HDZQkx6OsngbpT5M",
});

const upload = async (image) => {
  const result = Cloudinary.uploader.upload(image).then((result) => {
    return result;
  });
  return result;
};

export default upload;
