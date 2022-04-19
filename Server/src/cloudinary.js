import * as Cloudinary from "cloudinary";

Cloudinary.config({
  cloud_name: "k-ds",
  api_key: 823114164825559,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (image) => {
  const result = Cloudinary.uploader.upload(image).then((result) => {
    return result;
  });
  return result;
};

export default upload;
