import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/test", (req, res) => {
    res.send("running...");
});
app.use(errorHandler);

export default app;
