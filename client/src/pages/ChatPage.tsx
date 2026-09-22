import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

const ChatPage = () => {
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        socket.connect();
        socket.on("newMessage", () => {});
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
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="enter your message"
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default ChatPage;
