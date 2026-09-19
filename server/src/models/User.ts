import mongoose from "mongoose";

interface UserShape extends mongoose.Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    birthday: string;
    profilePicture: string;
    role: "admin" | "user";
}

const userSchema = new mongoose.Schema<UserShape>({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    birthday: { type: String, required: true },
    profilePicture: { type: String, trim: true },
});

const User = mongoose.model("User", userSchema);

export type { UserShape };
export default User;
