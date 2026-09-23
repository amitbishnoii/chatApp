import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { Navigate, useNavigate } from "react-router-dom";
import FriendSection, { type FriendShape } from "../components/FriendSection";
import ChatWindow from "../components/ChatWindow";
import useAuth from "../hooks/useAuth";
import { fetchFriendsService } from "../services/userService";

const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [currentFriends, setCurrentFriends] = useState<FriendShape[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        socket.connect();
        socket.on("newMessage", (message) => {
            setChats((prev) => [...prev, message]);
        });
        socket.on("connect_error", (err) => {
            alert(err.message);
            Navigate({ to: "/login", replace: true });
        });
        return () => {
            socket.off("newMessage");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!user) {
            setError("Please Log-In!");
            navigate("/login", { replace: true });
            return;
        }
        const loadFriends = async () => {
            const friends = await fetchFriendsService(
                user.id,
                user.accessToken,
            );
            setCurrentFriends(friends);
        };
        loadFriends();
    }, []);

    const handleSend = () => {
        socket.emit("sendMessage", message);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center gap-5 bg-[#170a0d] px-6">
            <FriendSection friends={currentFriends} />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;
