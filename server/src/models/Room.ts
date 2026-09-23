import mongoose from "mongoose";

interface RoomShape {
    participants: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const roomSchema = new mongoose.Schema<RoomShape>({
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
