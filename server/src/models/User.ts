import mongoose from "mongoose";

interface UserShape {
    firstName: string;
    lastName: string;
    bio: string;
    username: string;
    password: string;
    birthday: string;
    profilePicture: string;
    role: "admin" | "user";
}

const userSchema = new mongoose.Schema<UserShape>({
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    bio: { type: String, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    birthday: { type: String, required: true },
    profilePicture: { type: String, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export type { UserShape };
export default User;
