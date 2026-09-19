import express from "express";
import { setupProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/upload.js";

const userRouter = express.Router();

userRouter.post(
    "/setup-profile",
    upload.single("profilePicture"),
    setupProfile,
);

export default userRouter;
