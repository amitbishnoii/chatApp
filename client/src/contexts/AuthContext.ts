import { createContext } from "react";

interface User {
    id: string;
    accessToken: string;
    username: string;
    role: "admin" | "user";
    firstName: string;
    lastName: string;
    bio: string;
}

interface AuthContext {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
