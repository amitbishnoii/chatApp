import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { registerMessageHandlers } from "./handlers/messageHandler.js";

export interface ClientToServerEvents {
    sendMessage: () => void;
}

export interface ServerToClientEvents {
    newMessage: () => void;
}

let io: Server<ClientToServerEvents, ServerToClientEvents>;

export const initSocket = (server: HttpServer) => {
    io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
        cors: { origin: "http://localhost:5173" },
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
