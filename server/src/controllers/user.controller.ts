import type { Request, Response } from "express";
import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../config/cloudinary.js";
import User from "../models/User.js";

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
        const filePath = path.join(
            __dirname,
            "../../upload",
            req.file?.originalname,
        );
        writeFileSync(
            path.join(__dirname, "../../upload", req.file.originalname),
            req.file.buffer,
        );
        const url = await uploadToCloudinary(filePath);
        if (!req.user) {
            return res
                .status(401)
                .send({ message: "User not authenticated!", success: false });
        }
        const userInfo = await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: { profilePicture: url, bio: bio },
            },
            { runValidators: true, new: true },
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
