import type { Socket } from "socket.io";

export const registerMessageHandlers = (socket: Socket) => {
    socket.on("sendMessage", (data) => {
        console.log("data: ", data);
        socket.broadcast.emit("newMessage", data);
    });
};
