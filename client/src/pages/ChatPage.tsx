import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { Navigate } from "react-router-dom";

const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

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
        <div>
            
        </div>
    );
};

export default ChatPage;
