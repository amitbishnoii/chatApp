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

export const searchUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const username = req.params.username;
        if (!(typeof username === "string")) {
            return;
        }
        const exists = await User.findOne({ username: username }).select(
            "-password -role",
        );

        if (!exists) {
            throw new AppError("User not found!", 404);
        }

        res.status(200).send({ user: exists, success: true });
    } catch (error) {
        next(error);
    }
};

export const getFriends = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userId = req.params.userId;
        if (typeof userId !== "string") {
            console.log("userid type: ", typeof userId);
            throw new AppError("Invalid ID!", 400);
        }
        const friends = await FriendShip.find({
            status: "accepted",
            $or: [{ requester: userId }, { receiver: userId }],
        })
            .select("-password -role")
            .populate(
                "requester receiver",
                "username firstName lastName profilePicture",
            );
        if (!friends) {
            res.status(200).send({
                message: "No friends Found!",
                users: null,
                success: true,
            });
            return;
        }
        let newFriends = friends.map((obj) => {
            return obj.requester._id.toString() === userId
                ? obj.receiver
                : obj.requester;
        });
        res.status(200).send({ users: newFriends, success: true });
    } catch (error) {
        next(error);
    }
};
