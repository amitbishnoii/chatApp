import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerMessageHandlers } from "./handlers/messageHandler.js";
import jwt from "jsonwebtoken";
import config from "../config/envConfig.js";
import Room from "../models/Room.js";

export interface ClientToServerEvents {
    sendMessage: (data: { message: string; roomID: string }) => void;
    joinRoom: (
        data: { receiverID: string },
        callback: (res: { roomID: string }) => void,
    ) => void;
}

export interface ServerToClientEvents {
    newMessage: (message: {
        content: string;
        timeStamp: Date;
        sender: string;
    }) => void;
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

        socket.on("joinRoom", async (data, callback) => {
            let room = await Room.findOne({
                participants: { $all: [data.receiverID, socket.data.user.id] },
            });

            if (!room) {
                room = await Room.create({
                    participants: [socket.data.user.id, data.receiverID],
                });
            }

            socket.join(room._id.toString());
            callback({ roomID: room._id.toString() });
        });

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
