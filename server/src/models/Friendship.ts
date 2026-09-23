import mongoose from "mongoose";

interface FriendShipShape {
    requester: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
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

const FriendShip = mongoose.model<FriendShipShape>(
    "FriendShip",
    FriendShipSchema,
);

export default FriendShip;
