import type { NextFunction, Request, Response } from "express";
import Message from "../models/Message.js";
import AppError from "../utils/AppError.js";

export const getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const roomId = req.params.roomId;
        if (!roomId) {
            return next(new AppError("'roomId' not provided", 400));
        }
        const messages = await Message.find({
            roomID: roomId,
        });
        if (!messages) {
            return next(new AppError("Messages not found!", 404));
        }
        res.status(200).send({ data: messages, success: true });
    } catch (error) {
        next(error);
    }
};
