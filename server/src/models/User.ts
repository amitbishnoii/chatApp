import mongoose from "mongoose";

interface UserShape extends mongoose.Document {
    username: string;
    password: string;
    name: string;
    profilePicture: string;
    role: "admin" | "user";
}

const userSchema = new mongoose.Schema<UserShape>({
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    profilePicture: { type: String, trim: true },
});

const User = mongoose.model("User", userschema);

export type { UserShape };
export default User;
