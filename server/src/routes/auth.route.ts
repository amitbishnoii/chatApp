import express from "express";
import { LoginUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", LoginUser);

export default authRouter;
