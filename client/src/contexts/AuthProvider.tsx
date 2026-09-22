import type React from "react";
import { AuthContext, type User } from "./AuthContext";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkToken = () => {
            const accessToken = localStorage.getItem("token");
            const id = localStorage.getItem("ID");
            const role = localStorage.getItem("role");
            const username = localStorage.getItem("username");
            if (accessToken && id && role && username) {
                setUser({
                    accessToken,
                    id,
                    role: role as User["role"],
                    username,
                });
            }
            setIsLoading(false);
        };
        checkToken();
    }, []);

    const login = (user: User) => {
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("ID", user.id);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("ID");
        localStorage.removeItem("role");
        setUser(null);
    };
    const setupPartialData = (
        data: Pick<User, "bio" | "firstName" | "lastName">,
    ) => {
        setUser((prev) => {
            if (!prev) return prev;
            return { ...prev, ...data };
        });
    };

    return (
        <AuthContext.Provider
            value={{ login, logout, isLoading, user, setupPartialData }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
