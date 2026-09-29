import type { Socket } from "socket.io";
import Room from "../../models/Room.js";
import Message from "../../models/Message.js";
import type { ClientToServerEvents, ServerToClientEvents } from "../index.js";

export const registerMessageHandlers = (
    socket: Socket<ClientToServerEvents, ServerToClientEvents>,
) => {
    socket.on("sendMessage", async (data) => {
        const message = await Message.create({
            sender: socket.data.user.id,
            content: data.message,
            roomID: data.roomID,
        });
        if (message) {
            socket
                .to(data.roomID)
                .emit("newMessage", {
                    content: message.content,
                    timeStamp: new Date(),
                    sender: socket.data.user.id,
                });
        }
    });
};
