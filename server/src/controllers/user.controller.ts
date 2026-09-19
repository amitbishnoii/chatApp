import type { Request, Response } from "express";

export const setupProfile = async (req: Request, res: Response) => {
    try {
        const { bio } = req.body;
        console.log("bio:", bio);
        console.log("file:", req.file);
        const { profilePicture } = req.file;
        console.log("profilePicture: ", profilePicture);
        res.send("hello world");
    } catch (error) {
        console.log("error occured", error);
    }
};
