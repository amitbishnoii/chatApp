import mongoose from "mongoose";

interface MessageShape {
    content: string;
    timeStamp: Date;
    sender: mongoose.Types.ObjectId;
    roomID: mongoose.Types.ObjectId;
}

const messageSchema = new mongoose.Schema<MessageShape>({
    content: { type: String, required: true, trim: true },
    timeStamp: { type: Date, default: Date.now },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    roomID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Room",
    },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
