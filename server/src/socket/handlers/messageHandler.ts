import type { Socket } from "socket.io";
import Room from "../../models/Room.js";
import Message from "../../models/Message.js";

export const registerMessageHandlers = (socket: Socket) => {
    socket.on("sendMessage", async (data) => {
        const message = await Message.create({
            sender: socket.data.user.id,
            content: data.message,
            roomID: data.roomID,
        });
        if (message) {
            socket.to(data.roomID).emit("newMessage", message);
        }
    });
};
