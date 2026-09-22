import type { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../config/cloudinary.js";
import User from "../models/User.js";
import FriendShip from "../models/Friendship.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupProfile = async (req: Request, res: Response) => {
    try {
        const { bio } = req.body;
        if (!req.file) {
            return res
                .status(404)
                .send({ message: "no file found", success: false });
        }
        const url = await uploadToCloudinary(req.file.buffer);
        if (!req.user) {
            return res
                .status(401)
                .send({ message: "User not authenticated!", success: false });
        }
        const userInfo = await User.findByIdAndUpdate(
            req.user.id,
            {
                $set: { profilePicture: url, bio: bio },
            },
            { runValidators: true, returnDocument: "after" },
        ).select("-password -birthday");
        return res.send({ user: userInfo, success: true });
    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            return res
                .status(400)
                .send({ message: error.message, success: false });
        } else if (error instanceof Error) {
            return res
                .status(500)
                .send({ message: error.message, success: false });
        } else {
            return res.status(500).send({
                message: "Internal server Error!",
                success: false,
            });
        }
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const { reqSenderId, reqReceiverId } = req.body;
        const receiverExists = await User.findById(reqReceiverId);
        if (!receiverExists) {
            return res
                .status(404)
                .send({ message: "User not found!", success: false });
        }

        const existingFriendship = await FriendShip.findOne({
            $or: [
                { requester: reqSenderId, receiver: reqReceiverId },
                { requester: reqReceiverId, receiver: reqSenderId },
            ],
        });

        if (existingFriendship) {
            if (existingFriendship.status === "accepted") {
                return res
                    .status(200)
                    .send({ message: "Already friends!", success: true });
            } else if (existingFriendship.status === "pending") {
                if (existingFriendship?.requester.toString() === reqSenderId) {
                    return res.status(409).send({
                        message: "Request already sent!",
                        success: false,
                    });
                } else {
                    existingFriendship.status = "accepted";
                    await existingFriendship.save();
                    return res.status(200).send({
                        message: "Friend request accepted!",
                        success: true,
                    });
                }
            } else if (existingFriendship.status === "blocked") {
                return res.status(403).send({
                    message: "Unable to send request!",
                    success: false,
                });
            }
        }
        const friendship = await FriendShip.create({
            requester: reqSenderId,
            receiver: reqReceiverId,
        });
        return res
            .status(201)
            .send({ message: "Request sent!", success: true });
    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            return res
                .status(400)
                .send({ message: error.message, success: false });
        } else if (error instanceof Error) {
            return res
                .status(500)
                .send({ message: error.message, success: false });
        } else {
            return res.status(500).send({
                message: "Internal server Error!",
                success: false,
            });
        }
    }
};
