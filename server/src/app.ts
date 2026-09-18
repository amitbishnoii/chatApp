import express from "express";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", authRouter);

app.get("/test", (req, res) => {
    res.send("running...");
});

export default app;
