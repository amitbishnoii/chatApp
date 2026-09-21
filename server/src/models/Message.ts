import mongoose from "mongoose";

interface MessageShape extends mongoose.Document {
    content: string;
    timeStamp: Date;
    sender: mongoose.Schema.Types.ObjectId;
    roomID: mongoose.Schema.Types.ObjectId;
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
