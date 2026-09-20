import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            console.log("token is missing");
            return res
                .status(401)
                .send({ message: "Token is missing!", success: false });
        }
        const headerToken = token.split(" ")[1];
        if (typeof headerToken !== "string") {
            console.log("invalid token");
            return res
                .status(401)
                .send({ message: "Invalid Token!", success: false });
        }
        const decodedToken = jwt.verify(headerToken, config.jwt_secret);
        req.user = decodedToken as {
            _id: string;
            role: "admin" | "user";
            username: string;
        };
        return next();
    } catch (error) {
        if (error instanceof Error && error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .send({ message: "Token is Invalid!", success: false });
        } else {
            return res
                .status(500)
                .send({ message: "Internal server Error", success: false });
        }
    }
};
