import type React from "react";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

type loginData = {
    role: "admin" | "user";
    accessToken: string;
    id: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<loginData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkToken = () => {
            const accessToken = localStorage.getItem("token");
            const id = localStorage.getItem("ID");
            const role = localStorage.getItem("role");
            if (accessToken && id && role) {
                setUser({ accessToken, id, role: role as loginData["role"] });
            }
            setIsLoading(false);
        };
        checkToken();
    }, []);

    const login = (user: loginData) => {
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("role", user.role);
        localStorage.setItem("ID", user.id);
        setUser(user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("ID");
        localStorage.removeItem("role");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
