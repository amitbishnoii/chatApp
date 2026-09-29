import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getMessages } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/get/:roomId", authMiddleware, getMessages);

export default messageRouter;
