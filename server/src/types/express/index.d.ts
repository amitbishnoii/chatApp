import { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
    _id: string;
    role: "admin" | "user";
    username: string;
}

declare global {
    namespace Express {
        interface Request {
            user: DecodedUser | string;
        }
    }
}

export {};
