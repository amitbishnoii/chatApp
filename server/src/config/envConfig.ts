import dotenv from "dotenv";
dotenv.config();

interface Config {
    jwt_secret: string;
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
};

export default config;
