import useAuth from "../hooks/useAuth";
import type { MessageShape } from "./ChatWindow";

const BubbleText = ({ message }: { message: MessageShape }) => {
    const { user } = useAuth();
    const isOwnMessage = user?.id === message.sender;
    const time = new Date(message.timeStamp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <div
            className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`flex max-w-[82%] flex-col ${isOwnMessage ? "items-end" : "items-start"}`}
            >
                <p
                    className={`rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-lg sm:max-w-md ${
                        isOwnMessage
                            ? "rounded-br-md bg-[#ff6480] text-white shadow-[#ff6480]/10"
                            : "rounded-bl-md border border-white/8 bg-[#1b1b20] text-slate-100 shadow-black/20"
                    }`}
                >
                    {message.content}
                </p>
                <time className="mt-1.5 px-1 text-[10px] font-medium text-slate-600">
                    {time}
                </time>
            </div>
        </div>
    );
};

export default BubbleText;
