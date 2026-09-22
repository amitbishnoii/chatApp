import { useEffect, useState } from "react";
import { findUserService } from "../services/userService";
import useAuth from "../hooks/useAuth";

const FriendPage = () => {
    const [username, setUsername] = useState<string>("");
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            return;
        }
        const timeout = setTimeout(() => {
            const fn = async () => {
                await findUserService(username, user?.id);
            };
            fn();
        }, 600);

        return () => {
            clearTimeout(timeout);
        };
    }, [username]);

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
    );
};

export default FriendPage;
