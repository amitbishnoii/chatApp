import type { Socket } from "socket.io";

export const registerMessageHandlers = (socket: Socket) => {
    socket.on("sendMessage", (data) => {
        console.log("data: ", data);
        console.log("socket data: ", socket.data);
        socket.broadcast.emit("newMessage", data);
    });
};
