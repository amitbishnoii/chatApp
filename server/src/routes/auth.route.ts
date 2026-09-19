import express from "express";
import { LoginUser, SignUpUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", LoginUser);
authRouter.post("/signup", SignUpUser);

export default authRouter;
