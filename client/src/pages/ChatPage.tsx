import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { Navigate } from "react-router-dom";
import FriendSection from "../components/FriendSection";
import ChatWindow from "../components/ChatWindow";
import useAuth from "../hooks/useAuth";

const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [ID, setID] = useState<string>("");
    const { user } = useAuth();

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

    const handleSend = () => {
        socket.emit("sendMessage", message);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center gap-5 bg-[#170a0d] px-6">
            <FriendSection />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;
