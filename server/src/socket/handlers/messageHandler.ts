import type { Socket } from "socket.io";
import Room from "../../models/Room.js";
import Message from "../../models/Message.js";

export const registerMessageHandlers = (socket: Socket) => {
    socket.on("sendMessage", async (data) => {
        const roomExists = await Room.findOne({
            participants: {
                $all: [socket.data.user.id, data.receiverID],
            },
        });

        if (roomExists) {
            const message = await Message.create({
                sender: socket.data.user.id,
                content: data.message,
                roomID: roomExists._id,
            });
            if (message) {
                socket.broadcast.emit("newMessage", message);
            }
            return;
        }

        const room = await Room.create({
            participants: [socket.data.user.id, data.receiverID],
        });
        const message = await Message.create({
            sender: socket.data.user.id,
            content: data.message,
            roomID: room._id,
        });
        if (message) {
            socket.broadcast.emit("newMessage", message);
        }
    });
};
