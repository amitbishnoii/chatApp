import express from "express";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use("/api/auth", authRouter);

app.get("/test", (req, res) => {
    res.send("running...");
});

export default app;
