import { createContext } from "react";

export interface User {
    id: string;
    accessToken: string;
    username: string;
    role: "admin" | "user";
    firstName?: string;
    lastName?: string;
    bio?: string;
}

interface AuthContext {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    setupPartialData: (
        data: Pick<User, "bio" | "firstName" | "lastName">,
    ) => void;
    isLoading: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
