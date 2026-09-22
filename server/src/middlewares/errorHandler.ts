import type { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof AppError) {
        return res
            .status(err.statusCode)
            .send({ message: err.message, success: false });
    }
    if (err instanceof Error && err.name === "ValidationError") {
        return res.status(400).send({ message: err.message, success: false });
    }
    console.error(err);
    return res.status(500).send({
        message: "Internal server error!",
        success: false,
    });
};
