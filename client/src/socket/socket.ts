import { io, type Socket } from "socket.io-client";
import type { MessageShape } from "../components/ChatWindow";

export interface ClientToServerEvents {
    sendMessage: ({
        message,
        roomId,
    }: {
        message: string;
        roomId: string;
    }) => void;
}

export interface ServerToClientEvents {
    newMessage: (message: MessageShape) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000/",
    {
        autoConnect: false,
        auth: (cb) => cb({ token: localStorage.getItem("token") }),
    },
);
