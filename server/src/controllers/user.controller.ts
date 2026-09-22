import type { NextFunction, Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../config/cloudinary.js";
import User from "../models/User.js";
import FriendShip from "../models/Friendship.js";
import AppError from "../utils/AppError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { bio } = req.body;
        if (!req.file) {
            throw new AppError("File not provided", 404);
        }
        const url = await uploadToCloudinary(req.file.buffer);
        if (!req.user) {
            throw new AppError("User not authenticated!", 401);
        }
        const userInfo = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: { profilePicture: url, bio: bio },
            },
            { runValidators: true, returnDocument: "after" },
        ).select("-password -birthday");
        res.send({ user: userInfo, success: true });
    } catch (error) {
        next(error);
    }
};

export const addFriend = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { reqSenderId, reqReceiverId } = req.body;
        const receiverExists = await User.findById(reqReceiverId);
        if (!receiverExists) {
            throw new AppError("User not found!", 404);
        }

        const existingFriendship = await FriendShip.findOne({
            $or: [
                { requester: reqSenderId, receiver: reqReceiverId },
                { requester: reqReceiverId, receiver: reqSenderId },
            ],
        });

        if (existingFriendship) {
            if (existingFriendship.status === "accepted") {
                res.status(200).send({
                    message: "Already friends!",
                    success: true,
                });
                return;
            } else if (existingFriendship.status === "pending") {
                if (existingFriendship?.requester.toString() === reqSenderId) {
                    throw new AppError("Request already sent!", 409);
                } else {
                    existingFriendship.status = "accepted";
                    await existingFriendship.save();
                    res.status(200).send({
                        message: "Friend request accepted!",
                        success: true,
                    });
                    return;
                }
            } else if (existingFriendship.status === "blocked") {
                throw new AppError("Unable to send request!", 403);
            }
        }
        await FriendShip.create({
            requester: reqSenderId,
            receiver: reqReceiverId,
        });
        return res
            .status(201)
            .send({ message: "Request sent!", success: true });
    } catch (error) {
        return next(error);
    }
};

export const searchFriend = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const username = req.body.username;
        const exists = await User.findOne({ username: username });

        if (!exists) {
            throw new AppError("User not found!", 404);
        }

        res.status(200).send({ user: exists, success: true });
    } catch (error) {
        next(error);
    }
};
