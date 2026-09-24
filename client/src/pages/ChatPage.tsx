import { useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { Navigate, useNavigate } from "react-router-dom";
import FriendSection, { type FriendShape } from "../components/FriendSection";
import ChatWindow from "../components/ChatWindow";
import useAuth from "../hooks/useAuth";
import { fetchFriendsService } from "../services/userService";

const ChatPage = () => {
    const [currentFriends, setCurrentFriends] = useState<FriendShape[]>([]);
    const [selectedFriend, setSelectedFriend] = useState<FriendShape>();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        socket.connect();
        socket.on("connect_error", (err) => {
            alert(err.message);
            Navigate({ to: "/login", replace: true });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!user) {
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

    return (
        <div className="relative inset-0 flex items-center justify-center gap-5 bg-[#170a0d] px-6">
            <FriendSection
                selectedFriend={selectedFriend}
                friends={currentFriends}
                onSelect={setSelectedFriend}
            />
            <ChatWindow socket={socket} friend={selectedFriend} />
        </div>
    );
};

export default ChatPage;
