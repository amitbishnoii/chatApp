import { io, type Socket } from "socket.io-client";

export interface ClientToServerEvents {
    sendMessage: (message: string) => void;
}

export interface ServerToClientEvents {
    newMessage: (message: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    "http://localhost:3000/",
    {
        autoConnect: false,
        auth: (cb) => cb({ token: localStorage.getItem("token") }),
    },
);
