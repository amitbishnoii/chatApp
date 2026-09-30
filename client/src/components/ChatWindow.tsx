import type { Socket } from "socket.io-client";
import type { FriendShape } from "./FriendSection";
import MessageInput from "./MessageInput";
import { MessageCircle, MouseOff, Sparkles, User, Users } from "lucide-react";
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../socket/socket";
import { Fragment, useEffect, useRef, useState } from "react";
import BubbleText from "./BubbleText";
import useAuth from "../hooks/useAuth";
import { fetchMessages } from "../services/messageService";
import DateDivider from "./DateDivider";

export interface MessageShape {
    content: string;
    timeStamp: Date;
    sender: string;
}

const ChatWindow = ({
    friend,
    socket,
}: {
    friend: FriendShape | undefined;
    socket: Socket<ServerToClientEvents, ClientToServerEvents>;
}) => {
    const [messages, setMessages] = useState<MessageShape[]>([]);
    const [roomId, setRoomId] = useState<string | null>(null);
    const { user } = useAuth();
    const sentinalDivRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleNewMessage = (message: MessageShape) => {
            console.log(message);
            setMessages((prev) => [...prev, message]);
        };
        socket.on("newMessage", handleNewMessage);
    }, []);

    useEffect(() => {
        if (!friend) {
            return;
        }
        socket.emit("joinRoom", { receiverID: friend._id }, (res) => {
            setRoomId(res.roomID);
            const getMessages = async () => {
                if (!user) {
                    return;
                }
                const messagesResponse = await fetchMessages(
                    res.roomID,
                    user.accessToken,
                );
                setMessages(messagesResponse);
            };
            getMessages();
        });
    }, [friend]);

    useEffect(() => {
        sentinalDivRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleMessageSend = (msg: string) => {
        if (msg.trim() === "" || !user) {
            return;
        }
        setMessages((prev) => [
            ...prev,
            {
                content: msg,
                sender: user.id,
                timeStamp: new Date(),
            },
        ]);
        if (!roomId) return;
        socket.emit("sendMessage", { message: msg, roomID: roomId });
    };

    const isSameDay = (a: Date, b: Date) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return (
            dateA.getFullYear() === dateB.getFullYear() &&
            dateA.getMonth() === dateB.getMonth() &&
            dateA.getDate() === dateB.getDate()
        );
    };

    if (!friend) {
        return (
            <main className="fixed inset-y-5 left-98 right-5 flex flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0c] px-8 text-center text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                <div className="relative mb-7 grid size-24 place-items-center rounded-4xl border border-white/10 bg-[#17171b] text-slate-400 shadow-[0_20px_50px_rgba(0,0,0,.3)]">
                    <MessageCircle className="size-10" strokeWidth={1.5} />
                    <Sparkles
                        className="absolute -right-2 -top-2 size-7 text-slate-500"
                        strokeWidth={1.75}
                    />
                </div>
                <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-slate-500">
                    <Users className="size-3.5" />
                    Your conversations
                </p>
                <h1 className="max-w-md text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                    Pick a friend to start chatting
                </h1>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                    Choose someone from your friends list and your conversation
                    will appear here.
                </p>
            </main>
        );
    }

    return (
        <main className="fixed inset-y-5 left-98 right-5 flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0a0a0c] text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
            <header className="flex items-center gap-4 border-b border-white/10 bg-[#0f0f12] px-7 py-5">
                <div className="relative">
                    {friend.profilePicture ? (
                        <img
                            src={friend.profilePicture}
                            alt={`${friend.firstName} ${friend.lastName}`}
                            className="size-12 rounded-full border border-white/10 object-cover"
                        />
                    ) : (
                        <div className="grid size-12 place-items-center rounded-full bg-[#e6e6e6] text-sm font-bold text-black">
                            <User className="size-6" strokeWidth={1.75} />
                        </div>
                    )}
                    <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-[#0f0f12] bg-[#39ff88]" />
                </div>
                <div className="min-w-0">
                    <h1 className="truncate text-base font-bold text-white">
                        {friend.firstName} {friend.lastName}
                    </h1>
                    <p className="mt-0.5 text-xs font-medium text-[#39ff88]/90">
                        Active now
                    </p>
                </div>
            </header>

            <section className="[scrollbar-color:#3f3f46_#0a0a0c] scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-[#0a0a0c] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3f3f46] [&::-webkit-scrollbar-thumb:hover]:bg-[#52525b] min-h-0 flex-1 overflow-y-auto bg-[#0a0a0c] px-5 py-7 sm:px-7">
                <div className="mx-auto flex max-w-3xl flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        {messages.map((msg, index) => {
                            const prevMsg = messages[index - 1];
                            const showDivider =
                                !prevMsg ||
                                !isSameDay(msg.timeStamp, prevMsg.timeStamp);
                            return (
                                <Fragment key={`${msg.content}_${index}`}>
                                    {showDivider && (
                                        <DateDivider date={msg.timeStamp} />
                                    )}
                                    <BubbleText
                                        key={`${msg.sender}-${index}`}
                                        message={msg}
                                    />
                                </Fragment>
                            );
                        })}
                        <div ref={sentinalDivRef} />
                    </div>
                </div>
            </section>
            <div className="shrink-0 border-t border-white/10 bg-[#0f0f12] px-7 py-5">
                <div className="mx-auto max-w-3xl">
                    <MessageInput onSend={handleMessageSend} />
                </div>
            </div>
        </main>
    );
};

export default ChatWindow;
