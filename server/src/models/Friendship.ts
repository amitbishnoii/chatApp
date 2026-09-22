import mongoose from "mongoose";

interface FriendShipShape extends mongoose.Document {
    requester: mongoose.Schema.Types.ObjectId;
    receiver: mongoose.Schema.Types.ObjectId;
    status: "pending" | "accepted" | "blocked";
}

const FriendShipSchema = new mongoose.Schema<FriendShipShape>({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["pending", "accepted", "blocked"],
        default: "pending",
    },
});

const FriendShip = mongoose.model("FriendShip", FriendShipSchema);

export default FriendShip;
