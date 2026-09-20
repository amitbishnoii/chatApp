import { v2 as cloudinary } from "cloudinary";
import config from "./envConfig.js";

cloudinary.config({
    cloud_name: config.cloudinary_cloud,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
});

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "profile-pictures" },
            (error, result) => {
                if (error || !result) {
                    return reject(error);
                }
                resolve(result.secure_url);
            },
        );
        stream.end(fileBuffer);
    });
};

export default cloudinary;
