import * as Cloudinary from "cloudinary";

Cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (image) => {
  const result = Cloudinary.uploader
    .upload(image)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
  return result;
};

export default upload;
