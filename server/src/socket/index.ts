import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerMessageHandlers } from "./handlers/messageHandler.js";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";

export interface ClientToServerEvents {
    sendMessage: (message: string) => void;
}

export interface ServerToClientEvents {
    newMessage: (message: string) => void;
}

let io: Server<ClientToServerEvents, ServerToClientEvents>;

export const initSocket = (server: HttpServer) => {
    io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: { origin: "http://localhost:5173" },
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if (!token) {
                throw new Error("token is missing!");
            }
            const decoded = jwt.verify(token, config.jwt_secret);
            socket.data.user = decoded;
            next();
        } catch (error) {
            next(new Error("Authentication Failed!"));
        }
    });

    io.on("connection", (socket) => {
        console.log("socket connected", socket.id);
        registerMessageHandlers(socket);

        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io Error");
    }
    return io;
};
