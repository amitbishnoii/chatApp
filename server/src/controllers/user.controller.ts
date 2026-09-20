import type { Request, Response } from "express";
import { writeFileSync } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../config/cloudinary.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const setupProfile = async (req: Request, res: Response) => {
    try {
        const { bio } = req.body;
        if (req.file) {
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
            res.send({ bio: bio, url: url });
        }
    } catch (error) {
        console.log("error occured", error);
    }
};
