import type { FriendShape } from "./FriendSection";
import MessageInput from "./MessageInput";
import { MessageCircle, Sparkles, User, Users } from "lucide-react";

const ChatWindow = ({ friend }: { friend: FriendShape | undefined }) => {
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

            <section className="min-h-0 flex-1 overflow-y-auto bg-[#0a0a0c] px-7 py-7">
                <div className="mx-auto flex max-w-3xl flex-col gap-4">
                    <div className="flex items-center gap-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
                        <span className="h-px flex-1 bg-white/10" />
                        <span>Today</span>
                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* {messages.map((message) => (
                        <div
                            key={`${message.time}-${message.text}`}
                            className={`flex ${message.incoming ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`max-w-[min(75%,34rem)] px-4 py-3 ${
                                    message.incoming
                                        ? "rounded-2xl rounded-tl-md border border-white/10 bg-[#17171b] text-slate-100"
                                        : "rounded-2xl rounded-tr-md bg-[#ff2e55] text-white"
                                }`}
                            >
                                <p className="text-sm leading-6">
                                    {message.text}
                                </p>
                                <p
                                    className={`mt-1.5 text-[10px] font-semibold tracking-wide ${
                                        message.incoming
                                            ? "text-slate-600"
                                            : "text-white/70"
                                    }`}
                                >
                                    {message.time}
                                </p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </section>
            <div className="shrink-0 border-t border-white/10 bg-[#0f0f12] px-7 py-5">
                <div className="mx-auto max-w-3xl">
                    <MessageInput />
                </div>
            </div>
        </main>
    );
};

export default ChatWindow;
