import mongoose from "mongoose";
import { CLIENT_RENEG_WINDOW } from "node:tls";

export const connectDB = async () => {
    const conn = await mongoose.connect("mongodb://localhost:27017/chatDB");
    if (conn) {
        console.log("db connected");
    } else {
        console.log("error occured db not connected!");
    }
};
