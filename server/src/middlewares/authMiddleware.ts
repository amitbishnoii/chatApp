import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res
            .status(401)
            .send({ message: "Token is missing!", success: false });
    }
    const headerToken = token.split(" ")[1];
    if (typeof headerToken !== "string") {
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
};
