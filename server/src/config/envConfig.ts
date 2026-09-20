import dotenv from "dotenv";
dotenv.config();

interface Config {
    jwt_secret: string;
    cloudinary_cloud: string;
    cloudinary_api_key: string;
    cloudinary_api_secret: string;
}

const getEnvValue = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable for key: ${key}`);
    }
    return value;
};

const config: Config = {
    jwt_secret: getEnvValue("JWT_SECRET"),
    cloudinary_cloud: getEnvValue("CLOUDINARY_CLOUD"),
    cloudinary_api_key: getEnvValue("CLOUDINARY_API_KEY"),
    cloudinary_api_secret: getEnvValue("CLOUDINARY_API_SECRET"),
};

export default config;
