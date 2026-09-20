import { v2 as cloudinary } from "cloudinary";
import config from "./envConfig.js";

cloudinary.config({
    cloud_name: config.cloudinary_cloud,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export const uploadToCloudinary = async (file: string) => {
    const result = await cloudinary.uploader.upload(file);
    return result.secure_url;
};

export default cloudinary;
