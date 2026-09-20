import express from "express";
import { setupProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post(
    "/setup-profile",
    authMiddleware,
    upload.single("profilePicture"),
    setupProfile,
);

export default userRouter;
