import express from "express";
import { addFriend, searchFriend, setupProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/u/:username", authMiddleware, searchFriend);
userRouter.post(
    "/setup-profile",
    authMiddleware,
    upload.single("profilePicture"),
    setupProfile,
);
userRouter.post("/add-friend", authMiddleware, addFriend);

export default userRouter;
